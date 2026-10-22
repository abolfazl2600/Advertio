#!/usr/bin/env python3
"""Read-only pinned source acquisition. Never prints git output or credentials."""
import contextlib
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import shutil

class BuildError(RuntimeError):
    pass

def load_lock(path):
    lock = json.loads(Path(path).read_text())
    if lock.get('schema') != 1 or not re.fullmatch(r'https://gitlab\.com/[a-zA-Z0-9_./-]+\.git', lock.get('repository', '')):
        raise BuildError('Invalid source repository/schema')
    if '..' in lock['repository'].split('/'):
        raise BuildError('Invalid source path')
    if not re.fullmatch(r'[0-9a-f]{40}', lock.get('revision', '')):
        raise BuildError('Full immutable source SHA required')
    if lock.get('webPath') != 'apps/web' or lock.get('packageManager') != 'pnpm@11.9.0':
        raise BuildError('Unexpected source build contract')
    return lock

def run(argv, cwd, env=None):
    result = subprocess.run(argv, cwd=cwd, env=env, capture_output=True, text=True)
    if result.returncode:
        raise BuildError('Private command failed; inspect only on the secure runner')
    return result.stdout.strip()

@contextlib.contextmanager
def workspace(parent='/tmp'):
    """Owned ASCII directory outside any worktree; delete on success and exception."""
    parent = Path(parent).resolve()
    if any(ord(c) > 127 for c in str(parent)):
        raise BuildError('Staging parent must be ASCII')
    if subprocess.run(['git', '-C', str(parent), 'rev-parse', '--show-toplevel'],
                      capture_output=True).returncode == 0:
        raise BuildError('Staging must be outside a Git worktree')
    with tempfile.TemporaryDirectory(prefix='advertio-', dir=parent) as folder:
        os.chmod(folder, 0o700)
        yield Path(folder)

def verify_revision(source, expected, env=None):
    actual = run(['git', 'rev-parse', 'HEAD'], source, env)
    if actual != expected:
        raise BuildError('Pinned source revision mismatch')
    if run(['git', 'status', '--porcelain'], source, env):
        raise BuildError('Source checkout is not clean')

def fetch_source(lock, root, token_file):
    token_file = Path(token_file).resolve()
    if not token_file.is_file() or token_file.stat().st_mode & 0o077:
        raise BuildError('Token file must exist with owner-only permissions')
    token = token_file.read_text().strip()
    if not token or '\n' in token or '\r' in token:
        raise BuildError('Invalid credential file')
    helper = root / 'askpass.py'
    helper.write_text('#!/usr/bin/env python3\nimport os,sys\nfrom pathlib import Path\n'
                      'print(os.environ["ADVERTIO_GITLAB_USER"] if "username" in sys.argv[1].lower() '
                      'else Path(os.environ["ADVERTIO_TOKEN_FILE"]).read_text().strip())\n')
    helper.chmod(0o700)
    username = os.environ.get('ADVERTIO_GITLAB_USER', '')
    if not re.fullmatch(r'[a-zA-Z0-9_.+@-]+', username):
        raise BuildError('Deploy-token username required')
    env = {k: v for k, v in os.environ.items() if not k.startswith(('GIT_', 'ADVERTIO_'))}
    env.update(GIT_CONFIG_NOSYSTEM='1', GIT_CONFIG_GLOBAL='/dev/null',
               GIT_TERMINAL_PROMPT='0', GIT_ASKPASS=str(helper),
               ADVERTIO_TOKEN_FILE=str(token_file), ADVERTIO_GITLAB_USER=username)
    source = root / 'source'
    source.mkdir()
    git = ['git', '-c', 'credential.helper=', '-c', 'core.hooksPath=/dev/null',
           '-c', 'http.sslVerify=true', '-c', 'http.followRedirects=false',
           '-c', 'protocol.file.allow=never']
    run(git + ['init', '-q'], source, env)
    run(git + ['fetch', '--quiet', '--no-tags', '--depth=1', lock['repository'], lock['revision']], source, env)
    run(git + ['checkout', '--quiet', '--detach', 'FETCH_HEAD'], source, env)
    verify_revision(source, lock['revision'], env)
    helper.unlink()
    return source

def import_snapshot(lock, root, source_dir, manifest_path):
    """Import an owner-reviewed connector export without exporting connector credentials.

    The external manifest is bound into the approved source lock. The operator
    must verify it against the tree/blobs read at the pinned repository revision.
    Dependency folders and unlisted files are never imported.
    """
    source_dir, manifest_path = Path(source_dir).resolve(), Path(manifest_path).resolve()
    if hashlib.sha256(manifest_path.read_bytes()).hexdigest() != lock.get('snapshotManifestSha256'):
        raise BuildError('Snapshot manifest is not bound to the approved source lock')
    record = json.loads(manifest_path.read_text())
    if record.get('schema') != 1 or any(record.get(k) != lock.get(k) for k in ('repository', 'revision')):
        raise BuildError('Snapshot repository/revision mismatch')
    files = record.get('files')
    if not isinstance(files, dict) or not all(p in files for p in ('package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'apps/web/package.json')):
        raise BuildError('Incomplete source snapshot')
    plan = []
    for rel, expected in files.items():
        path = Path(rel)
        if path.is_absolute() or '..' in path.parts or any(p in ('node_modules', '.git') for p in path.parts):
            raise BuildError('Unsafe snapshot path')
        src = source_dir / path
        if src.is_symlink() or not src.resolve().is_relative_to(source_dir) or not src.is_file():
            raise BuildError('Snapshot file missing or unsafe')
        if not isinstance(expected, str) or hashlib.sha256(src.read_bytes()).hexdigest() != expected:
            raise BuildError('Snapshot source drift')
        plan.append((path, src))
    source = root / 'source'
    source.mkdir()
    for rel, src in plan:
        dst = source / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, dst)
    return source
