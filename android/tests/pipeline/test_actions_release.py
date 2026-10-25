import importlib.util
import unittest
from unittest.mock import patch
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
s = importlib.util.spec_from_file_location('actions_release', ROOT/'scripts/ci/release_actions.py')
m = importlib.util.module_from_spec(s)
s.loader.exec_module(m)

class ActionsReleaseTests(unittest.TestCase):
    def test_signed_https_object_destination_only(self):
        u = 'https://private.example.invalid/build.apk?signature=synthetic'
        self.assertEqual(m.delivery_url(u,'private.example.invalid'),u)
        for bad in ['http://private.example.invalid/build.apk','https://other.invalid/build.apk',
                    'https://name:password@private.example.invalid/build.apk',
                    'https://private.example.invalid/','https://private.example.invalid/build.apk#x',
                    'https://private.example.invalid:8443/build.apk']:
            with self.assertRaises(m.BuildError): m.delivery_url(bad,'private.example.invalid')
        with self.assertRaises(m.BuildError): m.delivery_url('https://localhost/build.apk','localhost')

    def test_delivery_redirect_rejected(self):
        with self.assertRaises(m.BuildError): m.NoRedirect().redirect_request(None,None,None,None,None,None)

    def test_missing_config_lists_all_names_without_values(self):
        with patch.dict(m.os.environ, {}, clear=True):
            with self.assertRaises(m.MissingConfiguration) as result:
                m.configuration()
        self.assertEqual(len(result.exception.names), 11)
        with patch.dict(m.os.environ, {'ADVERTIO_GITLAB_TOKEN':'synthetic-secret-value'}, clear=True):
            with self.assertRaises(m.MissingConfiguration) as result:
                m.configuration()
        self.assertEqual(len(result.exception.names), 10)
        self.assertNotIn('synthetic-secret-value', str(result.exception))
        self.assertNotIn('ADVERTIO_GITLAB_TOKEN', result.exception.names)
