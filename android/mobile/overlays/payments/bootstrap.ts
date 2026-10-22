import { Capacitor, registerPlugin } from '@capacitor/core'
import { apiClient } from '@/shared/api/client'
import { native } from '@/shared/platform/native-runtime'
import { assertRequestAllowed, isPaymentAction, isPaymentLocation, PAYMENT_NOTICE } from './policy.mjs'
const policy=registerPlugin<{activate():Promise<void>}>('AdvertioNavigationPolicy')
let installed=false
function notice() {
  if(!document.body) return
  let element=document.getElementById('android-payment-notice')
  if(!element) {element=document.createElement('p');element.id='android-payment-notice';element.setAttribute('role','status');element.lang='fa';element.dir='rtl';document.body.append(element)}
  element.textContent=PAYMENT_NOTICE
}
export async function installPaymentBoundary(): Promise<void> {
  if(!Capacitor.isNativePlatform() || Capacitor.getPlatform()!=='android') throw new Error('ANDROID_REQUIRED')
  if(installed) return
  installed=true
  apiClient.interceptors.request.use((config)=>{
    assertRequestAllowed(config.method,config.url??'',apiClient.defaults.baseURL!)
    return config
  })
  const originalPush=history.pushState.bind(history), originalReplace=history.replaceState.bind(history)
  const route=(fn:typeof history.pushState)=>(state:unknown,title:string,url?:string|URL|null)=>{
    if(url!=null && isPaymentLocation(String(url))) {fn(state,title,'/wallet');notice();queueMicrotask(()=>window.dispatchEvent(new PopStateEvent('popstate')))}
    else fn(state,title,url)
  }
  history.pushState=route(originalPush);history.replaceState=route(originalReplace)
  if(isPaymentLocation(location.href)) {originalReplace(history.state,'','/wallet');notice()}
  window.addEventListener('popstate',()=>{if(isPaymentLocation(location.href)){originalReplace(history.state,'','/wallet');notice()}})
  window.addEventListener('hashchange',()=>{if(isPaymentLocation(location.href)){originalReplace(history.state,'','/wallet');notice()}})
  window.addEventListener('advertio:payment-blocked',notice)
  window.open=((url?:string|URL)=>{if(url) void native.openExternal(String(url)).catch(notice);return null}) as typeof window.open
  const scan=()=>document.querySelectorAll<HTMLElement>('button,a,[role="button"]').forEach((element)=>{
    if(isPaymentAction(element.textContent) || (element instanceof HTMLAnchorElement && isPaymentLocation(element.href))) {
      element.dataset.paymentDisabled='true';element.setAttribute('aria-disabled','true')
      if(element instanceof HTMLButtonElement) element.disabled=true
      if(element.textContent!==PAYMENT_NOTICE) element.textContent=PAYMENT_NOTICE
      if(element instanceof HTMLAnchorElement) element.removeAttribute('href')
    }
  })
  document.addEventListener('click',(event)=>{
    const target=event.target instanceof Element ? event.target.closest<HTMLElement>('button,a,[role="button"]') : null
    if(target && (target.dataset.paymentDisabled || isPaymentAction(target.textContent) || (target instanceof HTMLAnchorElement && isPaymentLocation(target.href)))) {event.preventDefault();event.stopImmediatePropagation();notice()}
  },true)
  const observe=()=>{scan();new MutationObserver(scan).observe(document.body,{subtree:true,childList:true,characterData:true})}
  if(document.body) observe();else document.addEventListener('DOMContentLoaded',observe,{once:true})
  await policy.activate()
}
