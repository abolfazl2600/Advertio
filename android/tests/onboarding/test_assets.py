"""Verify onboarding media and hash-bound public overlay payloads without private sources."""
import hashlib
import json
import unittest
from pathlib import Path

ANDROID = Path(__file__).resolve().parents[2]
OVERLAY = ANDROID / 'mobile' / 'overlays'

class OnboardingAssetsTest(unittest.TestCase):
    def test_three_images_are_local_and_hash_bound(self):
        entries = json.loads((OVERLAY / 'manifests' / 'welcome.json').read_text())['files']
        entries = {e['target']: e for e in entries}
        for i in range(1, 4):
            target = f'apps/web/public/onboarding/slide-0{i}.webp'
            entry = entries[target]
            data = (OVERLAY / entry['payload']).read_bytes()
            self.assertTrue(data.startswith(b'RIFF'))
            self.assertEqual(data[8:12], b'WEBP')
            self.assertEqual(hashlib.sha256(data).hexdigest(), entry['sha256'])

    def test_changed_source_payload_hashes(self):
        entries = json.loads((OVERLAY / 'manifests' / 'welcome.json').read_text())['files']
        for e in entries:
            f = OVERLAY / e['payload']
            if f.exists():
                self.assertEqual(hashlib.sha256(f.read_bytes()).hexdigest(), e['sha256'])

if __name__ == '__main__':
    unittest.main()
