import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'scripts'))
from source_workspace import BuildError, import_snapshot

class SnapshotTests(unittest.TestCase):
    def test_approved_pinned_snapshot_rejects_drift_and_ignores_unlisted_files(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d); exported = root/'export'; exported.mkdir(); staging = root/'staging'; staging.mkdir()
            files = {}
            for rel in ['package.json','pnpm-lock.yaml','pnpm-workspace.yaml','apps/web/package.json']:
                p = exported/rel; p.parent.mkdir(parents=True, exist_ok=True); p.write_text('synthetic')
                files[rel] = hashlib.sha256(p.read_bytes()).hexdigest()
            (exported/'unlisted-secret').write_text('never import')
            record = dict(schema=1, repository='https://gitlab.com/example/project.git', revision='a'*40, files=files)
            manifest = root/'manifest.json'; manifest.write_text(json.dumps(record))
            lock = dict(record, snapshotManifestSha256=hashlib.sha256(manifest.read_bytes()).hexdigest())
            result = import_snapshot(lock, staging, exported, manifest)
            self.assertFalse((result/'unlisted-secret').exists())
            (exported/'package.json').write_text('drift')
            with self.assertRaises(BuildError): import_snapshot(lock, root, exported, manifest)
            lock['snapshotManifestSha256'] = '0'*64
            with self.assertRaises(BuildError): import_snapshot(lock, root, exported, manifest)

    def test_snapshot_cannot_escape_or_change_revision(self):
        with tempfile.TemporaryDirectory() as d:
            root=Path(d); manifest=root/'manifest.json'
            files={}
            for rel in ['package.json','pnpm-lock.yaml','pnpm-workspace.yaml','apps/web/package.json']:
                p=root/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_text('fixture')
                files[rel]=hashlib.sha256(p.read_bytes()).hexdigest()
            files['../escape']='a'*64
            record=dict(schema=1,repository='repo',revision='a'*40,files=files)
            manifest.write_text(json.dumps(record));lock=dict(record,snapshotManifestSha256=hashlib.sha256(manifest.read_bytes()).hexdigest())
            lock['revision']='b'*40
            with self.assertRaisesRegex(BuildError,'repository/revision'):import_snapshot(lock,root,root,manifest)
            lock['revision']='a'*40
            with self.assertRaisesRegex(BuildError,'Unsafe snapshot path'):import_snapshot(lock,root,root,manifest)
