#!/usr/bin/env python3
"""Authenticated Android-owned source snapshot. No GitLab access at build time."""
import argparse
import base64
import gzip
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import tarfile
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

MAGIC = b'ADVERTIO-ANDROID-SOURCE-1\n'
ROOT_FILES = {'package.json','pnpm-lock.yaml','pnpm-workspace.yaml'}
MAX_BYTES = 40 * 1024 * 1024

def allowed(name):
    p = PurePosixPath(name)
    return (not p.is_absolute() and '..' not in p.parts and str(p)==name and
            (name in ROOT_FILES or name.startswith('apps/web/')) and
            not any(x in ('node_modules','dist','.git') or x.startswith('.env') for x in p.parts))

def key_bytes(value):
    key = base64.b64decode(value, validate=True)
    if len(key) != 32: raise ValueError('32-byte source key required')
    return key

def seal(source, bundle, key):
    source = Path(source)
    paths = [p for p in sorted(source.rglob('*')) if p.is_file() and allowed(p.relative_to(source).as_posix())]
    data = {}; total = 0
    for p in paths:
        if p.is_symlink(): raise ValueError('Source symlinks prohibited')
        content = p.read_bytes();total += len(content)
        if total > MAX_BYTES: raise ValueError('Snapshot too large')
        data[p.relative_to(source).as_posix()] = content
    if not ROOT_FILES <= data.keys(): raise ValueError('Missing build manifests')
    manifest = {'schema':1,'files':{name:hashlib.sha256(content).hexdigest() for name,content in data.items()}}
    raw = io.BytesIO()
    with tarfile.open(fileobj=raw, mode='w:gz') as tar:
        for name, content in [('android-source-manifest.json',json.dumps(manifest,sort_keys=True).encode()),*data.items()]:
            info = tarfile.TarInfo(name);info.size=len(content);info.mode=0o600
            tar.addfile(info,io.BytesIO(content))
    nonce = os.urandom(12)
    Path(bundle).write_bytes(MAGIC+nonce+AESGCM(key).encrypt(nonce,raw.getvalue(),MAGIC))
    return len(data)

def unpack(bundle, destination, key):
    blob = Path(bundle).read_bytes()
    if not blob.startswith(MAGIC): raise ValueError('Invalid source envelope')
    nonce = blob[len(MAGIC):len(MAGIC)+12]
    # Authentication happens before parsing or writing any private source.
    plain = AESGCM(key).decrypt(nonce,blob[len(MAGIC)+12:],MAGIC)
    if len(plain)>MAX_BYTES: raise ValueError('Snapshot too large')
    with tarfile.open(fileobj=io.BytesIO(plain),mode='r:gz') as tar:
        members=tar.getmembers(); names=set();total=0;data={}
        for member in members:
            if (not member.isfile() or member.name in names or
                (member.name!='android-source-manifest.json' and not allowed(member.name))):
                raise ValueError('Unsafe source entry')
            names.add(member.name);total+=member.size
            if total>MAX_BYTES: raise ValueError('Expanded source too large')
            data[member.name]=tar.extractfile(member).read()
    manifest=json.loads(data.pop('android-source-manifest.json'))
    if manifest.get('schema')!=1 or set(manifest['files'])!=set(data) or not ROOT_FILES<=data.keys():
        raise ValueError('Source manifest mismatch')
    for name,content in data.items():
        if hashlib.sha256(content).hexdigest()!=manifest['files'][name]:raise ValueError('Source integrity mismatch')
    dest=Path(destination)
    if dest.exists(): raise ValueError('Fresh external destination required')
    dest.mkdir(mode=0o700,parents=True)
    for name,content in data.items():
        p=dest/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(content);p.chmod(0o600)
    return manifest['files']

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('command',choices=['seal','unpack']);parser.add_argument('source');parser.add_argument('destination');args=parser.parse_args()
    key=key_bytes(os.environ['ADVERTIO_ANDROID_SOURCE_KEY'])
    if args.command=='seal':seal(args.source,args.destination,key)
    else:unpack(args.source,args.destination,key)
