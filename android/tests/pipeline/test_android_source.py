import importlib.util
from pathlib import Path
import os
import tempfile
import unittest
ROOT=Path(__file__).resolve().parents[2]
s=importlib.util.spec_from_file_location('android_source',ROOT/'scripts/android_source.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)

class IndependentSourceTests(unittest.TestCase):
    def fixture(self,root):
        src=root/'input';src.mkdir()
        for name in m.ROOT_FILES:(src/name).write_text('{}')
        (src/'apps/web/src').mkdir(parents=True)
        (src/'apps/web/src/App.tsx').write_text('synthetic Android-owned UI')
        return src

    def test_roundtrip_and_authentication_before_writes(self):
        with tempfile.TemporaryDirectory() as d:
            root=Path(d);src=self.fixture(root);key=os.urandom(32);blob=root/'source.enc'
            m.seal(src,blob,key);out=root/'out';m.unpack(blob,out,key)
            self.assertEqual((out/'apps/web/src/App.tsx').read_text(),'synthetic Android-owned UI')
            with self.assertRaises(Exception):m.unpack(blob,root/'wrong',os.urandom(32))
            self.assertFalse((root/'wrong').exists())
            repo=root/'repo';repo.mkdir()
            m.subprocess.run(['git','init','-q',str(repo)],check=True)
            with self.assertRaises(ValueError):m.unpack(blob,repo/'decoded',key)
            self.assertFalse((repo/'decoded').exists())
            data=bytearray(blob.read_bytes());data[-1]^=1;blob.write_bytes(data)
            with self.assertRaises(Exception):m.unpack(blob,root/'tampered',key)
            self.assertFalse((root/'tampered').exists())

    def test_disallowed_paths_and_secret_files(self):
        for name in ['../escape','/absolute','apps/web/../escape','apps/web/.env','apps/web/node_modules/file','apps/web/dist/bundle.js']:
            self.assertFalse(m.allowed(name),name)
        self.assertTrue(m.allowed('apps/web/src/App.tsx'))
