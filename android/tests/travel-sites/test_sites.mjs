import assert from 'node:assert/strict'
import test from 'node:test'
import { TRAVEL_SITES, listTravelSites, SITE_FILTERS } from '../../mobile/overlays/travel-sites/sites.mjs'

test('Google Flights and three curated sites are present exactly once', () => {
  assert.deepEqual(TRAVEL_SITES.map((site) => site.id), ['google-flights', 'bewelcome', 'worldpackers', 'couchsurfing'])
  assert.equal(new Set(TRAVEL_SITES.map((site) => site.id)).size, TRAVEL_SITES.length)
})

test('curated destinations use official HTTPS origins without credentials', () => {
  const origins = ['www.google.com', 'www.bewelcome.org', 'www.worldpackers.com', 'www.couchsurfing.com']
  assert.deepEqual(TRAVEL_SITES.map((site) => new URL(site.url).hostname), origins)
  for (const site of TRAVEL_SITES) {
    const parsed = new URL(site.url)
    assert.equal(parsed.protocol, 'https:')
    assert.equal(parsed.username, '')
    assert.equal(parsed.password, '')
  }
})

test('category and Persian search work', () => {
  assert.deepEqual(SITE_FILTERS, ['all', 'flights', 'stays', 'volunteering'])
  assert.deepEqual(listTravelSites({ category: 'stays' }).map((site) => site.id), ['bewelcome', 'couchsurfing'])
  assert.deepEqual(listTravelSites({ query: 'داوطلبانه', locale: 'fa' }).map((site) => site.id), ['worldpackers'])
  assert.deepEqual(listTravelSites({ query: 'Flights', locale: 'en' }).map((site) => site.id), ['google-flights'])
  assert.deepEqual(listTravelSites({ query: 'nonsense' }), [])
})

test('cards provide localized copy and business model', () => {
  for (const site of TRAVEL_SITES) {
    assert.ok(site.model)
    for (const locale of ['fa', 'en']) {
      assert.ok(site[locale].title)
      assert.ok(site[locale].description)
      assert.ok(site[locale].detail)
    }
  }
})
