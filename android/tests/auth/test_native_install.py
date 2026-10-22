import importlib.util
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('install', ROOT/'mobile/native/install.py')
m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)

class NativeInstallTests(unittest.TestCase):
    def test_installs_registers_idempotently_and_rejects_custom_activity(self):
        with tempfile.TemporaryDirectory(prefix='native-اندروید ') as d:
            root=Path(d)
            app=root/'android/app'
            activity=app/'src/main/java/com/advertio/development/MainActivity.java'
            activity.parent.mkdir(parents=True)
            activity.write_text('package com.advertio.development;\n\nimport com.getcapacitor.BridgeActivity;\n\npublic class MainActivity extends BridgeActivity {}\n')
            (app/'build.gradle').write_text('// fixture\n')
            (root/'capacitor.config.ts').write_text('const config = {};\nexport default config\n')
            shutil.copytree(ROOT/'mobile/native', root/'native', ignore=shutil.ignore_patterns('__pycache__'))
            m.install(root); first=activity.read_text(); m.install(root)
            self.assertEqual(activity.read_text(),first)
            self.assertEqual((app/'build.gradle').read_text().count("apply from: 'advertio-native.gradle'"),1)
            self.assertIn('registerPlugin(SecureSessionPlugin.class)',first)
            self.assertIn("loggingBehavior = 'none'",(root/'capacitor.config.ts').read_text())
            self.assertTrue((app/'src/main/java/com/advertio/nativebridge/SecureSessionPlugin.java').exists())
            activity.write_text('custom activity')
            with self.assertRaises(ValueError): m.install(root)
