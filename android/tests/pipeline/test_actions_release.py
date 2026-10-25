import importlib.util
import unittest
import tempfile
from unittest.mock import patch
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
s = importlib.util.spec_from_file_location('actions_release', ROOT/'scripts/ci/release_actions.py')
m = importlib.util.module_from_spec(s)
s.loader.exec_module(m)

class ActionsReleaseTests(unittest.TestCase):
    def test_only_apk_is_staged(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            source=root/'private';source.mkdir()
            (source/'app.apk').write_bytes(b'synthetic-verified-apk')
            (source/'key.p12').write_bytes(b'private-key-fixture')
            result=m.stage_apk(source/'app.apk',root)
            self.assertEqual(result.read_bytes(),b'synthetic-verified-apk')
            self.assertEqual([p.name for p in result.parent.iterdir()],['Advertio-release.apk'])
            result.unlink();result.symlink_to(source/'key.p12')
            with self.assertRaises(m.BuildError):m.stage_apk(source/'app.apk',root)
            self.assertEqual((source/'key.p12').read_bytes(),b'private-key-fixture')

    def test_missing_config_lists_all_names_without_values(self):
        with patch.dict(m.os.environ, {}, clear=True):
            with self.assertRaises(m.MissingConfiguration) as result:
                m.configuration()
        self.assertEqual(len(result.exception.names), 7)
        with patch.dict(m.os.environ, {'ADVERTIO_ANDROID_SOURCE_KEY':'synthetic-secret-value'}, clear=True):
            with self.assertRaises(m.MissingConfiguration) as result:
                m.configuration()
        self.assertEqual(len(result.exception.names), 6)
        self.assertNotIn('synthetic-secret-value', str(result.exception))
        self.assertNotIn('ADVERTIO_ANDROID_SOURCE_KEY', result.exception.names)

    def test_external_upload_configuration_not_required(self):
        values={'ADVERTIO_'+name:'synthetic' for name in m.CONFIG_NAMES}
        with patch.dict(m.os.environ,values,clear=True):
            self.assertEqual(len(m.configuration()),7)
