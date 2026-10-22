import { createController } from '../../mobile/overlays/platform/controller.mjs'
let back:((event:{canGoBack:boolean})=>void)|undefined
export const native=createController({
 historyIndex:()=>window.history.state?.idx??0,historyBack:()=>history.back(),minimize:async()=>{document.body.dataset.minimized='true'},
 listen:async(name,fn)=>{if(name==='backButton')back=fn;return{remove:async()=>{}}},onActive:()=>{},statusBar:async()=>{},
 open:async()=>{},haptic:async()=>{},hideKeyboard:async()=>{},confirmExit:async()=>window.confirm('Leave Advertio?'),
})
void native.start()
Object.assign(window,{fixtureBack:()=>back?.({canGoBack:true})})
