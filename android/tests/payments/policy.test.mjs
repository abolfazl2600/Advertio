import test from 'node:test'
import assert from 'node:assert/strict'
import {assertRequestAllowed,authorizeAuthLink,consumeAuthLink,isPaymentLocation,PAYMENT_NOTICE,PURCHASES_ENABLED,CREDIT_SPENDING_ENABLED} from '../../mobile/overlays/payments/policy.mjs'
const origin='https://api.example.invalid'
test('purchase and unapproved credit-spending capabilities fail closed',()=>{
 assert.equal(PURCHASES_ENABLED,false);assert.equal(CREDIT_SPENDING_ENABLED,false);assert.equal(PAYMENT_NOTICE,'خرید سکه به‌زودی فعال می‌شود')
 for(const path of ['/api/wallet/topup','/api/wallet/packs','/api/wallet/manual-payments','/api/wallet/payments/fixture/refund','/api/payments/checkout','/api/leads','/api/leads/fixture/boost','/api/leads/fixture/contact','/api/users/me/identity-verification']) assert.throws(()=>assertRequestAllowed('POST',path,origin))
 for(const path of ['/api/wallet','/api/wallet/transactions','/api/wallet/payments','/api/leads?page=2','/api/users/me']) assert.doesNotThrow(()=>assertRequestAllowed('GET',path,origin))
 assert.throws(()=>assertRequestAllowed('GET','https://other.invalid/api/wallet',origin))
})
test('direct/nested/encoded routes cannot reach checkout',()=>{
 for(const path of ['/wallet/topup','/wallet/%74opup','/wallet?returnTo=%252Fcheckout','/profile?action=upgrade','https://checkout.stripe.com/session','https://t.me/$fixture','/wallet?next=https%3A%2F%2Ft.me%2Fbot%3Fstart%3Dmp_fixture']) assert.equal(isPaymentLocation(path),true,path)
 assert.equal(isPaymentLocation('/wallet'),false)
})
test('only explicitly authorized bot login link can leave the app, exactly once',()=>{
 const auth='https://t.me/fixture_bot?start=login_synthetic'
 assert.throws(()=>consumeAuthLink(auth));authorizeAuthLink(auth);assert.equal(consumeAuthLink(auth),auth);assert.throws(()=>consumeAuthLink(auth))
 for(const value of ['https://checkout.stripe.com/x','https://t.me/fixture_bot?start=mp_synthetic','https://t.me/fixture_bot?start=login_x&checkout=y','https://evil.invalid?start=login_x','javascript:alert(1)']) assert.throws(()=>authorizeAuthLink(value))
})
