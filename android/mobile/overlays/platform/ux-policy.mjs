/** Insets in CSS pixels. Avoid subtracting an IME already absorbed by WebView resize. */
export function visibleLayout({fullHeight,visualHeight,keyboardHeight=0,top=0,bottom=0,left=0,right=0}) {
  const full=Math.max(1,Number(fullHeight)||1),visual=Math.max(1,Number(visualHeight)||full)
  const keyboard=Math.max(0,Number(keyboardHeight)||0)
  const height=Math.max(1,Math.min(visual,full-keyboard))
  return {height,top:Math.max(0,top),bottom:keyboard>0?0:Math.max(0,bottom),left:Math.max(0,left),right:Math.max(0,right)}
}
export function directionFor(language) {return /^(fa|ar|he|ur)(-|$)/i.test(language??'')?'rtl':'ltr'}
export function createScrollMemory(limit=64) {
  const pages=new Map()
  return {
    save(key,positions) {pages.delete(key);pages.set(key,positions.map((v)=>Math.max(0,Number(v)||0)));while(pages.size>limit) pages.delete(pages.keys().next().value)},
    read(key) {return [...(pages.get(key)??[])]},
  }
}
