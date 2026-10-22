import test from 'node:test'
import assert from 'node:assert/strict'
import {visibleLayout,directionFor,createScrollMemory} from '../../mobile/overlays/platform/ux-policy.mjs'
test('IME resize is not subtracted twice; unresized viewport avoids the keyboard',()=>{
 assert.equal(visibleLayout({fullHeight:800,visualHeight:500,keyboardHeight:300}).height,500)
 assert.equal(visibleLayout({fullHeight:800,visualHeight:800,keyboardHeight:300}).height,500)
 assert.equal(visibleLayout({fullHeight:800,visualHeight:800,keyboardHeight:0,top:24,bottom:32}).bottom,32)
 assert.equal(visibleLayout({fullHeight:800,visualHeight:500,keyboardHeight:300,bottom:32}).bottom,0)
})
test('RTL/LTR direction follows language and bounded tab scroll positions restore independently',()=>{
 assert.equal(directionFor('fa-IR'),'rtl');assert.equal(directionFor('en-CA'),'ltr')
 const memory=createScrollMemory(2)
 memory.save('/housing',[110,12]);memory.save('/jobs',[240]);assert.deepEqual(memory.read('/housing'),[110,12])
 memory.save('/saved',[16]);assert.deepEqual(memory.read('/housing'),[]);assert.deepEqual(memory.read('/jobs'),[240])
})
