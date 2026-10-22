import {build} from 'esbuild'
import {mkdir,copyFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
const android=fileURLToPath(new URL('../../',import.meta.url))
const publicDir=path.join(android,'.tmp/navigation-fixture')
await mkdir(publicDir,{recursive:true})
await build({entryPoints:[path.join(android,'tests/navigation/fixture.tsx')],outfile:path.join(publicDir,'fixture.js'),bundle:true,format:'esm',jsx:'automatic',nodePaths:[path.join(android,'tests/harness/node_modules')],alias:{'@/shared/platform/native-runtime':path.join(android,'tests/navigation/fixture-runtime.ts')}})
await copyFile(path.join(android,'tests/navigation/fixture.html'),path.join(publicDir,'fixture.html'))
console.log('Synthetic public fixture bundled in android/.tmp/navigation-fixture')
