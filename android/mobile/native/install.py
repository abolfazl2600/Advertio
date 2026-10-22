#!/usr/bin/env python3
"""Install original local native modules into a disposable copy of the public mobile skeleton."""
import json
from pathlib import Path
import shutil
import sys

def install(mobile):
    mobile = Path(mobile).resolve()
    native = mobile / 'native'
    app = mobile / 'android/app'
    if not (app/'build.gradle').is_file():
        raise ValueError('Capacitor foundation #41 must be installed first')
    # Public scaffold only. Refuse to overwrite a customized Activity.
    activity = app/'src/main/java/com/advertio/development/MainActivity.java'
    current = activity.read_text()
    if 'ADVERTIO_GENERATED_BRIDGE' not in current and current.strip() != 'package com.advertio.development;\n\nimport com.getcapacitor.BridgeActivity;\n\npublic class MainActivity extends BridgeActivity {}':
        raise ValueError('Review customized Activity before native installation')
    plugins, gradle = [], []
    for manifest in sorted(native.glob('*/module.json')):
        record = json.loads(manifest.read_text())
        if record.get('schema') != 1:
            raise ValueError('Invalid native module manifest')
        plugins.append(record['plugin'])
        src = manifest.parent/'src'
        if src.exists(): shutil.copytree(src, app/'src/main/java', dirs_exist_ok=True)
        deps = manifest.parent/'dependencies.gradle'
        if deps.exists(): gradle.append(deps.read_text())
    imports = '\n'.join('import '+p+';' for p in plugins)
    registration = '\n'.join('        registerPlugin('+p.split('.')[-1]+'.class);' for p in plugins)
    activity.write_text('package com.advertio.development;\n// ADVERTIO_GENERATED_BRIDGE\nimport android.os.Bundle;\nimport com.getcapacitor.BridgeActivity;\n'+imports+'\npublic class MainActivity extends BridgeActivity {\n    @Override public void onCreate(Bundle savedInstanceState) {\n'+registration+'\n        super.onCreate(savedInstanceState);\n    }\n}\n')
    config = mobile/'capacitor.config.ts'
    text = config.read_text()
    marker_config = '// ADVERTIO_NATIVE_SECURITY'
    if marker_config not in text:
        if 'export default config' not in text:
            raise ValueError('Review Capacitor config export before native installation')
        text = text.replace('export default config', marker_config+"\nconfig.loggingBehavior = 'none'\nconfig.android = { ...config.android, allowMixedContent: false, webContentsDebuggingEnabled: false }\nexport default config")
        config.write_text(text)
    (app/'advertio-native.gradle').write_text('\n'.join(gradle)+'\n')
    build = app/'build.gradle'
    marker = "apply from: 'advertio-native.gradle'"
    if marker not in build.read_text(): build.write_text(build.read_text()+'\n'+marker+'\n')

if __name__ == '__main__':
    install(sys.argv[1])
