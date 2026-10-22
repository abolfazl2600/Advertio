from pathlib import Path
import subprocess
import tempfile
import unittest

GUARD = Path(__file__).resolve().parents[2] / 'scripts/guard-scope.sh'

class ScopeTests(unittest.TestCase):
    def test_invalid_base_and_both_rename_paths(self):
        with tempfile.TemporaryDirectory(prefix='scope-اندروید ') as d:
            def git(*args):
                return subprocess.run(['git', '-C', d, *args], check=True, capture_output=True)
            git('init', '-q')
            (Path(d) / 'outside').write_text('fixture')
            git('add', '.')
            git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'base')
            def check(base='HEAD'):
                return subprocess.run(['bash', str(GUARD), base], cwd=d, capture_output=True).returncode
            self.assertEqual(check(), 0)
            self.assertNotEqual(check('missing-ref'), 0)
            (Path(d) / 'android').mkdir()
            git('mv', 'outside', 'android/inside')
            self.assertNotEqual(check(), 0)
            git('reset', '--hard', 'HEAD')
            (Path(d) / 'android').mkdir(exist_ok=True)
            (Path(d) / 'android/allowed').touch()
            self.assertEqual(check(), 0)
            (Path(d) / 'untracked outside').touch()
            self.assertNotEqual(check(), 0)
