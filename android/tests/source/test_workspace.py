import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('source_workspace', ROOT / 'scripts/source_workspace.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

class WorkspaceTests(unittest.TestCase):
    def test_cleanup_on_error(self):
        with self.assertRaisesRegex(RuntimeError, 'synthetic'):
            with m.workspace() as path:
                saved = path
                (path / 'private.txt').write_text('synthetic private data')
                self.assertEqual(path.stat().st_mode & 0o777, 0o700)
                raise RuntimeError('synthetic')
        self.assertFalse(saved.exists())

    def test_cleanup_on_success(self):
        with m.workspace() as path:
            saved = path
        self.assertFalse(saved.exists())

    def test_lock_rejects_branch_and_remote_credentials(self):
        lock = dict(schema=1, repository='https://gitlab.com/example/fixture.git',
                    revision='1' * 40, webPath='apps/web', packageManager='pnpm@11.9.0')
        with tempfile.TemporaryDirectory() as folder:
            p = Path(folder) / 'lock.json'
            p.write_text(json.dumps(lock))
            m.load_lock(p)
            for field, value in [('revision', 'master'), ('repository', 'https://user:secret@gitlab.com/x.git')]:
                p.write_text(json.dumps(dict(lock, **{field: value})))
                with self.assertRaises(m.BuildError):
                    m.load_lock(p)

    def test_wrong_revision_and_dirty_checkout(self):
        with tempfile.TemporaryDirectory() as folder:
            subprocess.run(['git', 'init', '-q', folder], check=True)
            def git(*args):
                return subprocess.check_output(['git', '-C', folder, *args], text=True).strip()
            git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '--allow-empty', '-qm', 'fixture')
            sha = git('rev-parse', 'HEAD')
            m.verify_revision(folder, sha)
            with self.assertRaises(m.BuildError):
                m.verify_revision(folder, '0' * 40)
            (Path(folder) / 'unexpected').touch()
            with self.assertRaises(m.BuildError):
                m.verify_revision(folder, sha)

    def test_staging_inside_git_denied(self):
        with self.assertRaises(m.BuildError):
            with m.workspace(ROOT):
                self.fail('must reject')

if __name__ == '__main__':
    unittest.main()
