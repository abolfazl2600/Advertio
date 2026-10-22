import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { native } from '@/shared/platform/native-runtime'
let openSheets=0,previousOverflow=''
const sheets:object[]=[]
export function Sheet({onClose,children,className=''}:{onClose:()=>void;children:ReactNode;className?:string}) {
  const panel=useRef<HTMLDivElement>(null)
  const closeRef=useRef(onClose);closeRef.current=onClose
  useEffect(()=>{
    const identity={};sheets.push(identity)
    const restoreFocus=document.activeElement instanceof HTMLElement?document.activeElement:null
    if(openSheets++===0){previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden'}
    const removeBack=native.registerBack(()=>closeRef.current())
    const focusable=()=>Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href],[tabindex="0"]')??[])
    focusable()[0]?.focus()
    const key=(event:KeyboardEvent)=>{
      if(sheets.at(-1)!==identity)return
      if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();closeRef.current()}
      if(event.key==='Tab'){
        const nodes=focusable(),first=nodes[0],last=nodes.at(-1)
        if(!first){event.preventDefault();panel.current?.focus();return}
        if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus()}
        else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus()}
      }
    }
    document.addEventListener('keydown',key,true)
    return()=>{sheets.splice(sheets.indexOf(identity),1);removeBack();document.removeEventListener('keydown',key,true);if(--openSheets===0)document.body.style.overflow=previousOverflow;restoreFocus?.focus()}
  },[])
  return createPortal(<div className="android-sheet-backdrop" onClick={(event)=>{if(event.target===event.currentTarget)onClose()}} role="presentation"><div ref={panel} className={`android-sheet ${className}`} role="dialog" aria-modal="true" aria-label="Dialog" tabIndex={-1}><button className="android-sheet-close" type="button" aria-label="Close dialog" onClick={onClose}>×</button>{children}</div></div>,document.body)
}
