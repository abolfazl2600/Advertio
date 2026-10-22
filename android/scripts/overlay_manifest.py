#!/usr/bin/env python3
"""Combine public Android payload fragments with explicit, hash-bound supersession."""
import json
from pathlib import Path
from source_workspace import BuildError

def load_manifest(root):
    root = Path(root)
    base = json.loads((root/'manifest.json').read_text())
    documents = [base] + [json.loads(p.read_text()) for p in sorted((root/'manifests').glob('*.json'))]
    merged = {}
    for doc in documents:
        if doc.get('schema') != 1 or not isinstance(doc.get('files'), list):
            raise BuildError('Invalid overlay fragment')
        for entry in doc['files']:
            target = entry['target']
            previous = merged.get(target)
            supersedes = entry.get('supersedesSha256')
            if previous and supersedes != previous['sha256']:
                raise BuildError('Unreviewed duplicate overlay target')
            if not previous and supersedes:
                raise BuildError('Missing overlay predecessor')
            merged[target] = {k: entry[k] for k in ('target','payload','sha256')}
    return {'schema':1, 'files':[merged[k] for k in sorted(merged)]}
