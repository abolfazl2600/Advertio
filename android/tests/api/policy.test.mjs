import test from 'node:test'
import assert from 'node:assert/strict'
import { httpsOrigin, apiUrl, mediaUrl, normalizeMedia } from '../../mobile/overlays/api/policy.mjs'
const api = 'https://api.example.invalid'
const media = 'https://media.example.invalid'
test('base URL fails closed without HTTPS exact allowed origin', () => {
  assert.equal(httpsOrigin(api, [api]), api)
  for (const url of ['', 'http://api.example.invalid', api+'/api', api+'?token=x', 'https://u:p@api.example.invalid', 'https://localhost'])
    assert.throws(() => httpsOrigin(url, [api, 'https://localhost']))
  assert.throws(() => httpsOrigin(api, []))
})
test('API paths cannot send Bearer to other hosts, traversal or protocol-relative hosts', () => {
  assert.equal(apiUrl('/api/leads?page=2', api), api+'/api/leads?page=2')
  for (const url of ['//evil.invalid/api/leads', 'https://evil.invalid/api/leads', '/api/../admin', '/api', '/health'])
    assert.throws(() => apiUrl(url, api))
})
test('relative avatar resolves to origin and signed media URL is preserved', () => {
  const signed=media+'/photo?X-Signature=synthetic%2Bvalue&expires=123'
  assert.equal(mediaUrl(signed,api,[api,media]),signed)
  assert.equal(mediaUrl('/api/avatar/synthetic',api,[api]),api+'/api/avatar/synthetic')
  for (const url of ['http://media.example.invalid/a','//evil.invalid/a','data:image/png,a','javascript:alert(1)'])
    assert.throws(() => mediaUrl(url,api,[api,media]))
  assert.deepEqual(normalizeMedia({avatarUrl:'/api/avatar/x',imageUrls:[signed],deepLink:'https://t.me/bot'},api,[api,media]),
    {avatarUrl:api+'/api/avatar/x',imageUrls:[signed],deepLink:'https://t.me/bot'})
})
