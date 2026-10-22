import test from 'node:test'
import assert from 'node:assert/strict'
import {createGoogleLogin} from '../../mobile/overlays/auth/google.mjs'
function fixture({native,exchange,accept} = {}) {
  let epoch=0; const calls=[]
  const api=createGoogleLogin({native:native ?? {signIn:async()=>({idToken:'synthetic-id-token'}),clear:async()=>calls.push('clear')},
    exchange:exchange ?? (async(token)=>{calls.push(token);return {token:'synthetic-api-token',userId:'existing-fixture-user'}}),
    accept:accept ?? (async(token,id)=>{calls.push([token,id]);return true}),epoch:()=>epoch})
  return {api,calls,logout(){epoch++}}
}
test('only backend identity is accepted, never the Google provider id',async()=>{
  const f=fixture(); await f.api.signIn()
  assert.deepEqual(f.calls,['synthetic-id-token',['synthetic-api-token','existing-fixture-user']])
  await f.api.clear(); assert.equal(f.calls.at(-1),'clear')
})
test('cancellation cannot trigger API exchange',async()=>{
  let exchanged=false
  const f=fixture({native:{signIn:async()=>{throw Error('GOOGLE_CANCELLED')},clear:async()=>{}},exchange:async()=>{exchanged=true}})
  await assert.rejects(f.api.signIn(),/CANCELLED/); assert.equal(exchanged,false)
})
test('logout cancels a late native credential or late API response',async()=>{
  let release
  const f=fixture({native:{signIn:()=>new Promise(r=>{release=r}),clear:async()=>{}}})
  const request=f.api.signIn(); f.logout(); release({idToken:'synthetic'})
  await assert.rejects(request,/CANCELLED/); assert.deepEqual(f.calls,[])
  let finish
  const g=fixture({exchange:()=>new Promise(r=>{finish=r})})
  const second=g.api.signIn(); await new Promise(r=>setImmediate(r)); g.logout(); finish({token:'synthetic',userId:'fixture'})
  await assert.rejects(second,/CANCELLED/); assert.deepEqual(g.calls,[])
})
test('busy requests and rejected backend credentials never create sessions',async()=>{
  let release
  const f=fixture({exchange:()=>new Promise((r,reject)=>{release=reject})})
  const first=f.api.signIn(); await new Promise(r=>setImmediate(r))
  await assert.rejects(f.api.signIn(),/IN_PROGRESS/); release(Error('API_401'))
  await assert.rejects(first,/API_401/); assert.deepEqual(f.calls,[])
})
