#!/usr/bin/env python3
"""Credential-free DNS/TLS/health/read/preflight probe. No response bodies/URLs logged."""
import argparse
import urllib.request
import urllib.error
import json
import socket
import ssl
from urllib.parse import urlsplit


def probe(origin, timeout=10):
    url = urlsplit(origin)
    if url.scheme != 'https' or url.username or url.password or url.path not in ('', '/') or url.query or url.fragment:
        raise ValueError('HTTPS origin required')
    socket.getaddrinfo(url.hostname, url.port or 443, type=socket.SOCK_STREAM)
    results = []
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *args, **kwargs):
            return None
    opener = urllib.request.build_opener(NoRedirect(), urllib.request.HTTPSHandler(context=ssl.create_default_context()))
    for method, path in [('GET', '/health'), ('GET', '/api/categories'), ('OPTIONS', '/api/categories')]:
        headers = {'Origin': 'https://localhost'}
        if method == 'OPTIONS':
            headers.update({'Access-Control-Request-Method': 'GET', 'Access-Control-Request-Headers': 'authorization,content-type'})
        request = urllib.request.Request(origin.rstrip('/') + path, method=method, headers=headers)
        try:
            response = opener.open(request, timeout=timeout)
        except urllib.error.HTTPError as error:
            response = error
        try:
            cors = response.headers.get('Access-Control-Allow-Origin')
            methods = response.headers.get('Access-Control-Allow-Methods', '')
            allowed_headers = response.headers.get('Access-Control-Allow-Headers', '').lower()
            okay = 200 <= response.status < 300 and cors in ('https://localhost', '*')
            if method == 'OPTIONS':
                # Authorization is a non-wildcard header: it must be explicitly named.
                okay = okay and ('GET' in methods or methods == '*') and 'authorization' in allowed_headers and ('content-type' in allowed_headers or allowed_headers == '*')
            results.append({'probe': method + ' ' + path, 'http': response.status, 'cors': 'PASS' if okay else 'FAIL'})
        finally:
            response.close()
    return results

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--origin', required=True)
    args = parser.parse_args()
    try:
        results = probe(args.origin)
        print(json.dumps(results, indent=2))
        raise SystemExit(0 if all(r['cors'] == 'PASS' for r in results) else 1)
    except (OSError, ssl.SSLError, ValueError):
        print('BLOCKED: DNS/TLS/network probe failed; no response data or credentials logged.')
        raise SystemExit(2)
