import {mkdtemp,cp,mkdir,writeFile,symlink,rm} from 'node:fs/promises'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import os from 'node:os'
const android=fileURLToPath(new URL('../../',import.meta.url))
const temp=await mkdtemp(path.join(os.tmpdir(),'advertio-types-'))
try{
 await cp(path.join(android,'mobile/overlays'),path.join(temp,'src'),{recursive:true})
 await mkdir(path.join(temp,'stubs'))
 await writeFile(path.join(temp,'stubs/contracts.ts'),`
import type {ReactNode,CSSProperties} from 'react'
export type ThemeName='light'|'dark'
export function useTheme():ThemeName{return 'light'}
export function useThemeStore<T>(selector:(state:{setPlatform:(value:ThemeName)=>void})=>T):T{return selector({setPlatform:()=>{}})}
export const API={auth:{me:'/api/users/me',logout:'/api/auth/logout',requestOtp:'/api/auth/phone/otp',telegramLinkStart:'/api/auth/telegram/link',telegramLinkStatus:(ticket:string)=>'/api/auth/telegram/link/'+ticket,provider:(name:string)=>'/api/auth/'+name},wallet:{payments:'/api/wallet/payments'}}
export function useWallet(){return {data:{balance:10},isLoading:false,isError:false,refetch:async()=>{}}}
export const PhoneGate=(props:{reason:string;children:ReactNode})=>props.children
export const AppHeader=(_props:{title:string})=>null
export const Screen=(props:{children:ReactNode;style?:CSSProperties})=>props.children
export const ScrollArea=Screen
export const WalletActivity=()=>null
`)
 await writeFile(path.join(temp,'env.d.ts'),`interface ImportMeta {readonly env:Record<string,string|undefined>}\ndeclare module '*.css'\ndeclare module './main'\n`)
 // Private entrypoint is NOT copied. A synthetic entry tests only the public adapter contract.
 await writeFile(path.join(temp,'src/payments/main.ts'),'export {}\n')
 await symlink(path.join(android,'tests/harness/node_modules'),path.join(temp,'node_modules'),'dir')
 const capacitor=path.join(android,'mobile/node_modules/@capacitor')
 const paths={
  '@/shared/api/endpoints':['./stubs/contracts.ts'],'@/shared/api/useWallet':['./stubs/contracts.ts'],
  '@/shared/stores/theme.store':['./stubs/contracts.ts'],'@/shared/auth/PhoneGate':['./stubs/contracts.ts'],
  '@/shared/components/layout/*':['./stubs/contracts.ts'],'@/shared/wallet/WalletActivity':['./stubs/contracts.ts'],
  '@capacitor/*':[capacitor+'/*'],'@/shared/*':['./src/*'],
 }
 await writeFile(path.join(temp,'tsconfig.json'),JSON.stringify({compilerOptions:{target:'ES2022',module:'ESNext',moduleResolution:'Bundler',strict:true,skipLibCheck:true,noEmit:true,jsx:'react-jsx',paths},include:['src/**/*.ts','src/**/*.tsx','env.d.ts']}))
 const result=spawnSync(process.execPath,[path.join(android,'tests/harness/node_modules/typescript/bin/tsc'),'-p',path.join(temp,'tsconfig.json')],{encoding:'utf8'})
 process.stdout.write(result.stdout);process.stderr.write(result.stderr)
 if(result.status!==0)process.exitCode=result.status??1
 else console.log('PASS: original Android overlays typecheck against public dependencies and synthetic application contracts')
}finally{await rm(temp,{recursive:true,force:true})}
