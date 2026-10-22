import { registerPlugin } from '@capacitor/core'
import { visibleLayout, createScrollMemory } from './ux-policy.mjs'
interface Insets {top:number;bottom:number;left:number;right:number;keyboardHeight:number}
const ux=registerPlugin<{
  activate(input:{dark:boolean}):Promise<void>;setTheme(input:{dark:boolean}):Promise<void>
  confirmExit():Promise<{confirmed:boolean}>
  addListener(name:'insetsChanged',fn:(insets:Insets)=>void):Promise<{remove():Promise<void>}>
}>('AdvertioNativeUx')
let keyboardHeight=0,started:Promise<void>|undefined
export const keyboardVisible=()=>keyboardHeight>0
export const confirmExit=async()=> (await ux.confirmExit()).confirmed
export function installNativeUX():Promise<void> {
  started??=(async()=>{
    document.documentElement.classList.add('android-native')
    let fullHeight=window.innerHeight, insets:Insets={top:0,bottom:0,left:0,right:0,keyboardHeight:0}
    const dark=()=>document.documentElement.dataset.theme==='dark'
    const apply=()=>{
      const visual=window.visualViewport?.height??window.innerHeight
      if(!insets.keyboardHeight) fullHeight=Math.max(window.innerHeight,visual)
      const layout=visibleLayout({fullHeight,visualHeight:visual,...insets})
      const root=document.documentElement.style
      for(const key of ['top','bottom','left','right'] as const) root.setProperty(`--android-safe-${key}`,`${layout[key]}px`)
      root.setProperty('--android-visible-height',`${layout.height}px`)
      keyboardHeight=insets.keyboardHeight
      requestAnimationFrame(()=>{
        const focused=document.activeElement
        if(focused instanceof HTMLElement && focused.matches('input,textarea,[contenteditable="true"]')) focused.scrollIntoView({block:'nearest',inline:'nearest'})
      })
    }
    await ux.addListener('insetsChanged',(next)=>{insets=next;apply()})
    await ux.activate({dark:dark()})
    window.visualViewport?.addEventListener('resize',apply)
    window.addEventListener('resize',apply)
    window.addEventListener('orientationchange',()=>{fullHeight=window.innerHeight;apply()})
    document.addEventListener('focusin',apply)
    new MutationObserver(()=>{void ux.setTheme({dark:dark()}).catch(()=>{})}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']})
    const memory=createScrollMemory()
    const path=()=>location.pathname+location.search
    const areas=()=>Array.from(document.querySelectorAll<HTMLElement>('[data-android-scroll],.scroll-area,.scroll,.screen-scroll')).filter((element)=>element.scrollHeight>element.clientHeight)
    const save=()=>memory.save(path(),areas().map((element)=>element.scrollTop))
    const restore=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{const positions=memory.read(path());areas().forEach((element,i)=>{element.scrollTop=positions[i]??0})}))
    for(const method of ['pushState','replaceState'] as const) {
      const original=history[method].bind(history)
      history[method]=(state:unknown,title:string,url?:string|URL|null)=>{save();original(state,title,url);restore()}
    }
    document.addEventListener('scroll',save,true)
    window.addEventListener('popstate',restore)
    const network=()=>{
      let banner=document.getElementById('android-offline')
      if(navigator.onLine){banner?.remove();return}
      if(!banner){banner=document.createElement('p');banner.id='android-offline';banner.setAttribute('role','status');banner.textContent='Offline — your changes stay here. Reconnect and retry.';document.body.append(banner)}
    }
    window.addEventListener('online',network);window.addEventListener('offline',network)
    apply();network()
  })()
  return started
}
