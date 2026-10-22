import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts'))
spec = importlib.util.spec_from_file_location('runner', ROOT / 'scripts/build-private.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

class OverlayTests(unittest.TestCase):
    def test_drift_hash_and_traversal_fail_without_mutation(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            source, overlay = root/'source', root/'overlays'
            (source/'apps/web').mkdir(parents=True)
            overlay.mkdir()
            dst = source/'apps/web/file.ts'
            payload = overlay/'file.ts'
            dst.write_text('synthetic original')
            payload.write_text('synthetic Android code')
            pin = m.digest(dst)
            manifest = {'schema':1,'files':[{'target':'apps/web/file.ts','payload':'file.ts','sha256':m.digest(payload)}]}
            lock = {'files': {'apps/web/file.ts': pin}}
            for field, value in [('target', '../escape'), ('sha256', '0'*64), ('payload', '../escape')]:
                bad = json.loads(json.dumps(manifest))
                bad['files'][0][field] = value
                with self.assertRaises((m.BuildError, OSError)):
                    m.apply_overlays(source, overlay, bad, lock)
                self.assertEqual(m.digest(dst), pin)
            with self.assertRaises(m.BuildError):
                m.apply_overlays(source, overlay, manifest, {'files':{}})
            m.apply_overlays(source, overlay, manifest, lock)
            self.assertEqual(dst.read_text(), payload.read_text())

    def test_two_independent_overlay_runs_match(self):
        hashes=[]
        for _ in range(2):
            with tempfile.TemporaryDirectory() as d:
                root=Path(d)
                (root/'source').mkdir()
                (root/'payload').mkdir()
                p=root/'payload/native.ts'
                p.write_text('original synthetic fixture')
                manifest={'schema':1,'files':[{'target':'apps/web/native.ts','payload':'native.ts','sha256':m.digest(p)}]}
                m.apply_overlays(root/'source',root/'payload',manifest,{'files':{'apps/web/native.ts':'ABSENT'}})
                hashes.append(m.digest(root/'source/apps/web/native.ts'))
        self.assertEqual(*hashes)

    def test_nonexistent_output_inside_git_is_rejected(self):
        with self.assertRaises(m.BuildError):
            m.external(ROOT / 'not-created-yet/deeper/private-output')

    def test_duplicate_and_symlink_escape_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            root=Path(d)
            (root/'source/apps/web').mkdir(parents=True)
            (root/'payload').mkdir()
            payload=root/'payload/new.ts'
            payload.write_text('synthetic')
            entry={'target':'apps/web/new.ts','payload':'new.ts','sha256':m.digest(payload)}
            with self.assertRaises(m.BuildError):
                m.apply_overlays(root/'source', root/'payload', {'schema':1,'files':[entry,entry]}, {'files':{'apps/web/new.ts':'ABSENT'}})
            (root/'source/apps/web/escape').symlink_to(root/'payload',target_is_directory=True)
            with self.assertRaises(m.BuildError):
                m.child(root/'source','apps/web/escape/new.ts')
