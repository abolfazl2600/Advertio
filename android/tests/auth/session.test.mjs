import test from 'node:test'
import assert from 'node:assert/strict'
import { createSession, readClaims } from '../../mobile/overlays/auth/session.mjs'
const jwt = (sub = 'fixture-user', extra = {}) => [Buffer.from(JSON.stringify({alg:'RS256'})).toString('base64url'), Buffer.from(JSON.stringify({sub,exp:2000,phone_verified:false,...extra})).toString('base64url'), 'syntheticSignature'].join('.')
const tick = () => new Promise((r) => setImmediate(r))
function fixture(overrides = {}) {
  let saved = null, current, clears = 0, time = 1000_000
  const vault = { read: async () => saved, write: async (v) => {saved=v}, clear: async () => {saved=null}, ...overrides }
  const manager = createSession({vault, now: () => time, notify: (s) => {current=s}, clearPrivateData: () => {clears++}})
  return {manager, vault, get state(){return current}, get saved(){return saved}, get clears(){return clears}, setTime(v){time=v}}
}
test('malformed/expired/unsigned sessions are rejected; PhoneGate is not invented', async () => {
  assert.equal(readClaims('broken'),null)
  assert.equal(readClaims(jwt('a',{exp:0}),1000),null)
  const f=fixture(); await f.manager.accept(jwt())
  assert.equal(f.state.claims.phoneVerified,false)
  assert.equal(f.state.status,'authenticated')
  await assert.rejects(f.manager.accept(jwt('other'),'fixture-user'), /INVALID_SESSION/)
  assert.equal(f.saved,null)
})
test('disk restore validates identity and revocation; outage never exposes a token', async () => {
  const f=fixture(); await f.manager.accept(jwt()); await f.manager.restore(async () => 'wrong-user')
  assert.equal(f.saved,null); assert.equal(f.state.token,null)
  await f.manager.accept(jwt()); await f.manager.restore(async () => {throw Error('offline')})
  assert.equal(f.state.status,'failed'); assert.equal(f.state.token,null); assert.ok(f.saved)
  await f.manager.restore(async () => {throw Object.assign(Error(),{code:'UNAUTHORIZED'})})
  assert.equal(f.saved,null)
})
test('logout wins over a late secure write and cannot be undone', async () => {
  let release
  const f=fixture({write: () => new Promise((r) => {release=r})})
  const login=f.manager.accept(jwt()); await tick()
  const logout=f.manager.logout(); assert.equal(f.state.token,null)
  release(); assert.equal(await login,false); await logout
  assert.equal(f.state.token,null); assert.ok(f.clears>=2)
})
test('late restore cannot overwrite a newer account', async () => {
  const f=fixture(); await f.manager.accept(jwt('first'))
  let release
  const restore=f.manager.restore(() => new Promise((r) => {release=r})); await tick()
  await f.manager.accept(jwt('second')); release('first'); await restore
  assert.equal(f.state.claims.sub,'second')
})
test('expiry clears both memory and durable storage on resume/request', async () => {
  const f=fixture(); await f.manager.accept(jwt()); f.setTime(2000_000)
  assert.equal(f.manager.current(),null); await f.manager.settled()
  assert.equal(f.saved,null)
})
test('storage failure fails closed and clears the previous account', async () => {
  const f=fixture({write: async () => {throw Error('disk failure')}})
  await assert.rejects(f.manager.accept(jwt()),/STORAGE_UNAVAILABLE/)
  assert.equal(f.state.token,null); assert.equal(f.state.status,'failed')
})
test('failed older write cannot clear a newer persisted account', async () => {
 let rejectFirst, saved=null, attempt=0
 const manager=createSession({now:()=>1000_000,notify:()=>{},clearPrivateData:()=>{},vault:{read:async()=>saved,write:(value)=>{if(++attempt===1)return new Promise((_,reject)=>{rejectFirst=reject});saved=value;return Promise.resolve()},clear:async()=>{saved=null}}})
 const first=manager.accept(jwt('first')); await tick()
 const second=manager.accept(jwt('second'));rejectFirst(Error('synthetic write failure'))
 await assert.rejects(first,/STORAGE_UNAVAILABLE/);await second
 assert.equal(manager.current(),jwt('second'));assert.equal(saved,jwt('second'))
})
test('explicit logout and request-time expiry notify provider cleanup', async () => {
 let signOuts=0,time=1000_000
 const manager=createSession({now:()=>time,notify:()=>{},clearPrivateData:()=>{},onLogout:()=>{signOuts++},vault:{read:async()=>null,write:async()=>{},clear:async()=>{}}})
 await manager.accept(jwt());await manager.logout();assert.equal(signOuts,1)
 await manager.accept(jwt());time=2000_000;manager.current();await manager.settled();assert.equal(signOuts,2)
})
