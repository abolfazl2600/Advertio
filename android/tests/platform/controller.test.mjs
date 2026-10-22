import test from 'node:test'
import assert from 'node:assert/strict'
import { createController, detectChannel, secureExternalUrl } from '../../mobile/overlays/platform/controller.mjs'

test('native precedence never evaluates Telegram or needs initData', () => {
  assert.equal(detectChannel(true, () => { throw Error('must not probe') }), 'android')
  assert.equal(detectChannel(false, () => true), 'telegram')
  assert.equal(detectChannel(false), 'browser')
  assert.equal(detectChannel(false, () => { throw Error() }), 'browser')
})

function fixture() {
  const events = {}, calls = []
  let idx = 0
  const services = {
    historyIndex: () => idx, historyBack: () => calls.push('back'),
    minimize: async () => { calls.push('minimize') },
    listen: async (name, fn) => { events[name] = fn; return { remove: async () => { calls.push(`remove:${name}`) } } },
    onActive: (v) => calls.push(v), statusBar: async () => {}, open: async (url) => calls.push(url),
    haptic: async () => { throw Error('optional plugin') }, hideKeyboard: async () => {},
  }
  return { controller: createController(services), services, events, calls, setIndex: (v) => { idx = v } }
}
const settle = () => new Promise((resolve) => setImmediate(resolve))
test('hardware Back uses page callback then router index then minimizes root', async () => {
  const f = fixture()
  await Promise.all([f.controller.start(), f.controller.start()])
  const off = f.controller.registerBack(() => f.calls.push('sheet'))
  f.events.backButton({ canGoBack: true }); await settle()
  off(); f.setIndex(1)
  f.events.backButton({ canGoBack: true }); await settle()
  f.setIndex(0)
  f.events.backButton({ canGoBack: true }); await settle()
  assert.deepEqual(f.calls, ['sheet', 'back', 'minimize'])
  f.events.appStateChange({ isActive: false })
  assert.equal(f.calls.at(-1), false)
  await f.controller.stop()
  assert.equal(f.calls.filter((x) => String(x).startsWith('remove:')).length, 2)
})
test('listener registration stopped mid-flight removes pending listener', async () => {
  const f = fixture()
  const started = f.controller.start()
  await f.controller.stop(); await started
  assert.equal(f.calls.filter((x) => String(x).startsWith('remove:')).length, 2)
})
test('invalid links and invoice escape are rejected; haptic failures are harmless', async () => {
  for (const url of ['javascript:alert(1)', 'http://t.me/bot', 'https://a:b@t.me/bot', 'https://t.me/$invoice', 'intent://anything'])
    assert.throws(() => secureExternalUrl(url, true))
  assert.throws(() => secureExternalUrl('https://example.org', true))
  assert.equal(secureExternalUrl('https://t.me/test_bot?start=synthetic', true), 'https://t.me/test_bot?start=synthetic')
  const f=fixture()
  await f.controller.haptic('light')
  await f.controller.openExternal('https://t.me/test_bot', true)
  assert.equal(f.calls.at(-1), 'https://t.me/test_bot')
})
