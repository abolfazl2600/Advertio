#!/usr/bin/env python3
"""Read-only pinned source acquisition. Never prints git output or credentials."""
import contextlib
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile

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

def verify_revision(source, expected):
    actual = run(['git', 'rev-parse', 'HEAD'], source)
    if actual != expected:
        raise BuildError('Pinned source revision mismatch')
    if run(['git', 'status', '--porcelain'], source):
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
    verify_revision(source, lock['revision'])
    helper.unlink()
    return source
