import {build} from 'esbuild'
import {mkdir,writeFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
const android=fileURLToPath(new URL('../../',import.meta.url))
const out=path.join(android,'.tmp/entry-fixture');await mkdir(out,{recursive:true})
const contract=path.join(android,'tests/navigation/entry-contracts.tsx')
const alias=Object.fromEntries(['@/app/providers','@/app/router','@/shared/auth/LoginScreen','@/shared/auth/useSession','@/shared/platform/useThemeSync','@/shared/platform/native-runtime','@/shared/platform/haptics','@/shared/config/journeys.config','@/shared/constants/routes','@/shared/components/layout/Screen','@/shared/components/ui/Icon'].map(name=>[name,contract]))
alias['@/shared/components/layout/TabBar']=path.join(android,'mobile/overlays/components/layout/TabBar.tsx')
alias['@/shared/onboarding']=path.join(android,'mobile/overlays/onboarding')
await build({entryPoints:[path.join(android,'tests/navigation/entry-fixture.tsx')],outfile:path.join(out,'entry.js'),bundle:true,format:'esm',jsx:'automatic',nodePaths:[path.join(android,'tests/harness/node_modules')],alias})
await writeFile(path.join(out,'index.html'),'<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Synthetic Android entry QA</title><link rel="stylesheet" href="/entry.css"></head><body><div id="root"></div><script type="module" src="/entry.js"></script></body></html>')
console.log('PASS: synthetic entry fixture bundled')
