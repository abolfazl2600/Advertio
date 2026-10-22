import test from 'node:test'
import assert from 'node:assert/strict'
import { nativeRequest } from '../../mobile/overlays/api/native-request.mjs'
const origin='https://api.example.test'
test('native API transport retains HTTPS origin, explicit Bearer, JSON and redirect rejection',async()=>{
 let sent
 const result=await nativeRequest({request:async options=>{sent=options;return{status:401,data:{},headers:{},url:options.url}}},origin,
  {url:'/api/users/me',headers:{Authorization:'Bearer synthetic-token'},timeout:1000})
 assert.equal(sent.url,origin+'/api/users/me');assert.equal(sent.disableRedirects,true)
 assert.equal(sent.headers.Authorization,'Bearer synthetic-token');assert.equal(result.status,401)
 await assert.rejects(()=>nativeRequest({request:()=>{throw Error('must not run')}},origin,{url:'https://other.test/api'}))
 await assert.rejects(()=>nativeRequest({request:async()=>({url:'https://other.test/api'})},origin,{url:'/api/users/me'}))
})
test('native multipart keeps field/file bytes and leaves boundary generation to the SDK',async()=>{
 const form=new FormData();form.append('caption','نمونه');form.append('file',new Blob([new Uint8Array([0,255,42])],{type:'image/jpeg'}),'photo.jpg')
 let sent
 await nativeRequest({request:async options=>{sent=options;return{status:200,url:options.url}}},origin,{url:'/api/media',method:'post',headers:{'content-type':'multipart/form-data; boundary=invalid'},data:form})
 assert.equal(sent.dataType,'formData');assert.equal(sent.headers['Content-Type'],'multipart/form-data')
 assert.equal(sent.headers['content-type'],undefined);assert.equal(sent.data[0].value,'نمونه')
 assert.equal(sent.data[1].value,'AP8q');assert.equal(sent.data[1].fileName,'photo.jpg')
})
test('native requests fail before send on oversized/header-injected multipart and pre-cancellation',async()=>{
 const bridge={request:()=>{throw Error('must not send')}}
 const large=new FormData();large.append('file',new Blob([new Uint8Array(16*1024*1024)]),'large.jpg')
 await assert.rejects(()=>nativeRequest(bridge,origin,{url:'/api/media',data:large}),/UPLOAD_TOO_LARGE/)
 const invalid=new FormData();invalid.append('bad\r\nfield','x')
 await assert.rejects(()=>nativeRequest(bridge,origin,{url:'/api/media',data:invalid}),/INVALID_MULTIPART_FIELD/)
 await assert.rejects(()=>nativeRequest(bridge,origin,{url:'/api/users/me',signal:{aborted:true}}),/REQUEST_CANCELLED/)
})
test('native request deadline and cancellation ignore pending native results',async()=>{
 const pending={request:()=>new Promise(()=>{})}
 await assert.rejects(()=>nativeRequest(pending,origin,{url:'/api/users/me',timeout:5}),/REQUEST_TIMEOUT/)
 const abort=new AbortController()
 const waiting=nativeRequest(pending,origin,{url:'/api/users/me',signal:abort.signal})
 abort.abort();await assert.rejects(()=>waiting,/REQUEST_CANCELLED/)
})
