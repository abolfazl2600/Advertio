export function visibleLayout(input:{fullHeight:number;visualHeight:number;keyboardHeight?:number;top?:number;bottom?:number;left?:number;right?:number}):{height:number;top:number;bottom:number;left:number;right:number}
export function directionFor(language:string):'rtl'|'ltr'
export function createScrollMemory(limit?:number):{save(key:string,positions:number[]):void;read(key:string):number[]}
