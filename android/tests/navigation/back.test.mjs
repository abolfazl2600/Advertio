import test from 'node:test'
import assert from 'node:assert/strict'
import {createController} from '../../mobile/overlays/platform/controller.mjs'
const tick=()=>new Promise(r=>setImmediate(r))
test('keyboard first, sheet second, route history third and home asks confirmation',async()=>{
 let back,keyboard=true,index=2,confirmed=false
 const calls=[]
 const controller=createController({listen:async(name,fn)=>{if(name==='backButton')back=fn;return{remove:async()=>{}}},onActive:()=>{},statusBar:async()=>{},
  historyIndex:()=>index,historyBack:()=>calls.push('history'),keyboardVisible:()=>keyboard,hideKeyboard:async()=>{keyboard=false;calls.push('keyboard')},
  confirmExit:async()=>{calls.push('confirm');return confirmed},minimize:async()=>calls.push('minimize'),open:async()=>{},haptic:async()=>{}})
 await controller.start();const close=controller.registerBack(()=>calls.push('sheet'))
 back({canGoBack:true});await tick();assert.deepEqual(calls,['keyboard'])
 back({canGoBack:true});await tick();close();assert.deepEqual(calls,['keyboard','sheet'])
 back({canGoBack:true});await tick();index=0
 back({canGoBack:true});await tick();assert.equal(calls.at(-1),'confirm');assert.equal(calls.includes('minimize'),false)
 confirmed=true;back({canGoBack:true});await tick();assert.equal(calls.at(-1),'minimize');await controller.stop()
})
