import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
from overlay_manifest import load_manifest
from source_workspace import BuildError

class FragmentTests(unittest.TestCase):
    def test_supersession_requires_exact_predecessor(self):
        with tempfile.TemporaryDirectory() as d:
            root=Path(d); (root/'manifests').mkdir()
            first={'target':'apps/web/file','payload':'original','sha256':'a'*64}
            (root/'manifest.json').write_text(json.dumps({'schema':1,'files':[first]}))
            second=dict(first,payload='replacement',sha256='b'*64)
            p=root/'manifests/45.json'
            p.write_text(json.dumps({'schema':1,'files':[second]}))
            with self.assertRaises(BuildError): load_manifest(root)
            second['supersedesSha256']='a'*64
            p.write_text(json.dumps({'schema':1,'files':[second]}))
            self.assertEqual(load_manifest(root)['files'][0]['sha256'],'b'*64)
            second['supersedesSha256']='c'*64
            p.write_text(json.dumps({'schema':1,'files':[second]}))
            with self.assertRaises(BuildError): load_manifest(root)
