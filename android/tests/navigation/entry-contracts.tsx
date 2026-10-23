// Synthetic application contracts only; no private UI, API or account data.
import {useSyncExternalStore,type ReactNode,type CSSProperties} from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import {WalletPage} from '../../mobile/overlays/pages/WalletPage'
let status='needs-login'
const listeners=new Set<()=>void>()
export function useSession(){return {status:useSyncExternalStore(fn=>{listeners.add(fn);return()=>listeners.delete(fn)},()=>status),canTransact:false}}
export function Providers({children}:{children:ReactNode}){return <BrowserRouter>{children}</BrowserRouter>}
export function AppRoutes(){return <Routes>
 <Route path="/" element={<main className="fixture-screen"><h1>Active listings</h1><p>Synthetic public listing fixture</p><Link to="/wallet">Wallet fixture</Link></main>}/>
 <Route path="/profile" element={<main className="fixture-screen"><h1>Profile</h1><LoginScreen/></main>}/>
 <Route path="/search" element={<main className="fixture-screen"><h1>Search</h1></main>}/>
 <Route path="/post" element={<LoginScreen/>}/><Route path="/wallet" element={<WalletPage/>}/>
 </Routes>}
export function LoginScreen({reason}:{reason?:string}){return <div className="error-state"><h1>Sign in</h1><p>{reason}</p><button type="button" data-testid="complete-login" onClick={()=>{status='authenticated';listeners.forEach(fn=>fn())}}>Complete synthetic login</button></div>}
export function Screen({children,style}:{children:ReactNode;style?:CSSProperties}){return <section className="fixture-screen-shell" style={style}>{children}</section>}
export function Icon({name}:{name:string;size?:number}){return <span aria-hidden="true">{{home:'⌂',search:'⌕',user:'○',plus:'+',wallet:'▣'}[name]??'○'}</span>}
export const useThemeSync=()=>{}
export const isJourneyPath=()=>false
export const postEntryPath=()=>'/post'
export const haptic=()=>{}
export const ROUTES={HOME:'/',SEARCH:'/search',MY_PROFILE:'/profile'}
const handlers:Array<()=>void>=[]
export const native={registerBack(fn:()=>void){handlers.push(fn);return()=>{handlers.splice(handlers.indexOf(fn),1)}}}
Object.assign(window,{entryFixtureBack:()=>handlers.at(-1)?.(),entryFixtureStatus:()=>status})
