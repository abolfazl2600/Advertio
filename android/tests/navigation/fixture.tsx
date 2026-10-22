import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Sheet } from '../../mobile/overlays/components/ui/Sheet'
import '../../mobile/overlays/platform/native-ux.css'
import { visibleLayout } from '../../mobile/overlays/platform/ux-policy.mjs'
import './fixture-runtime'
const rtl=Boolean((window as Window & {fixtureRtl?:boolean}).fixtureRtl)
document.documentElement.classList.add('android-native');document.documentElement.dir=rtl?'rtl':'ltr';document.documentElement.lang=rtl?'fa':'en';document.documentElement.dataset.theme='light'
const height=innerHeight
function layout(keyboardHeight=0){const result=visibleLayout({fullHeight:height,visualHeight:height,keyboardHeight,top:24,bottom:24});document.documentElement.style.setProperty('--android-visible-height',`${result.height}px`);for(const key of ['top','bottom'] as const)document.documentElement.style.setProperty(`--android-safe-${key}`,`${result[key]}px`)}
layout()
Object.assign(window,{fixtureKeyboard:(height:number)=>layout(height)})
function Fixture(){
 const[open,setOpen]=useState(false),[nested,setNested]=useState(false)
 return <div className="app-vh" style={{display:'flex',flexDirection:'column',background:'#f3f5f7',color:'#142333'}}>
  <header style={{padding:'14px 20px',background:'#fff',borderBottom:'1px solid #ddd'}}><strong>Advertio</strong><small style={{display:'block',marginTop:4}}>Synthetic browser QA · {rtl?'فارسی / RTL':'English / LTR'}</small></header>
  <main className="screen-scroll" data-android-scroll style={{flex:1,overflow:'auto',padding:16}}>
   <h1 style={{fontSize:24}}>{rtl?'آگهی جدید':'New listing'}</h1><p>{rtl?'نمونهٔ آزمایشی، بدون اطلاعات واقعی کاربر':'Public test fixture with synthetic data only'}</p>
   <button id="open-sheet" onClick={()=>setOpen(true)}>{rtl?'انتخاب شهر':'Choose city'}</button>
   {Array.from({length:9},(_,i)=><p key={i}>{rtl?'اطلاعات نمونه برای بررسی اسکرول':'Synthetic listing detail'} {i+1}</p>)}
   <label htmlFor="address">{rtl?'نشانی':'Address'}</label><input id="address" placeholder={rtl?'نشانی نمونه':'Synthetic address'} style={{display:'block',width:'90%',marginTop:8,font:'inherit',padding:8}}/>
  </main><nav style={{display:'flex',justifyContent:'space-around',padding:8,background:'#fff'}}>{(rtl?['خانه','ذخیره‌ها','پروفایل']:['Home','Saved','Profile']).map(item=><button key={item}>{item}</button>)}</nav>
  {open&&<Sheet onClose={()=>setOpen(false)}><h2>{rtl?'انتخاب شهر':'Choose city'}</h2><input aria-label="City search" placeholder={rtl?'جستجو':'Search'}/><p>{rtl?'شهر نمونه':'Synthetic city'}</p><button id="nested" onClick={()=>setNested(true)}>Nested dialog</button>{nested&&<Sheet onClose={()=>setNested(false)}><h2>Nested</h2><button>Focusable</button></Sheet>}</Sheet>}
 </div>
}
createRoot(document.getElementById('root')!).render(<Fixture/> )
