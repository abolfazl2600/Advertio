import {test} from 'node:test'
import assert from 'node:assert/strict'
import {hasSeenWelcome,completeWelcome,WELCOME_KEY} from '../../mobile/overlays/onboarding/entry.mjs'
test('guest completion stores only a presentation preference',()=>{
 const values=new Map();const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)}
 assert.equal(hasSeenWelcome(storage),false);completeWelcome(storage)
 assert.equal(hasSeenWelcome(storage),true);assert.deepEqual([...values],[[WELCOME_KEY,'seen']])
})
test('unavailable storage never prevents browsing',()=>{
 const blocked={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}}
 assert.equal(hasSeenWelcome(blocked),false);assert.doesNotThrow(()=>completeWelcome(blocked))
 assert.equal(hasSeenWelcome(),false);assert.doesNotThrow(()=>completeWelcome())
})
