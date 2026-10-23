import {createRequire} from 'node:module'
import {mkdir,readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import assert from 'node:assert/strict'
const {chromium}=createRequire(import.meta.url)(process.env.ADVERTIO_PLAYWRIGHT_MODULE??'playwright')
const fixture=fileURLToPath(new URL('../../.tmp/entry-fixture/',import.meta.url))
const output=fileURLToPath(new URL('./snapshots/entry/',import.meta.url));await mkdir(output,{recursive:true})
const html=await readFile(fixture+'index.html','utf8'),js=await readFile(fixture+'entry.js','utf8'),css=await readFile(fixture+'entry.css','utf8')
const browser=await chromium.launch({headless:true,executablePath:process.env.ADVERTIO_CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote']})
try{
 for(const [name,width,height,lang,dark] of [['small-en',360,800,'en',false],['phone-fa',390,844,'fa',false],['landscape-dark',800,600,'en',true]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});const page=await context.newPage();const errors=[];let api=0
  page.on('pageerror',e=>errors.push(e.message))
  await context.route('**/*',async route=>{const url=new URL(route.request().url());if(url.pathname.startsWith('/api'))api++
   if(url.origin!=='https://localhost'){await route.abort();return}
   if(url.pathname==='/entry.js')return route.fulfill({contentType:'application/javascript',body:js})
   if(url.pathname==='/entry.css')return route.fulfill({contentType:'text/css',body:css})
   if(url.pathname==='/logo-mark.png')return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect width="36" height="36" rx="10" fill="#2876ed"/><path d="M9 26 18 9l9 17m-13-6h8" fill="none" stroke="white" stroke-width="3"/></svg>'})
   return route.fulfill({contentType:'text/html',body:html.replace('lang="en"',`lang="${lang}"`).replace('<body>',`<body data-theme="${dark?'dark':'light'}">`)})
  })
  await page.goto('https://localhost/');await page.locator('.android-welcome').waitFor()
  assert.equal(await page.locator('.tabbar').count(),0);assert.equal(await page.locator('.android-entry-actions button').count(),2)
  await page.screenshot({path:output+name+'-welcome.png'})
  await page.locator('.android-entry-primary').click();await page.getByTestId('complete-login').waitFor()
  await page.evaluate(()=>window.entryFixtureBack());await page.locator('.android-welcome').waitFor()
  await page.locator('.android-entry-primary').click();await page.locator('.android-entry-secondary').click()
  await page.getByRole('heading',{name:'Active listings',exact:true}).waitFor()
  assert.equal(await page.evaluate(()=>window.entryFixtureStatus()),'needs-login')
  assert.equal(await page.locator('.tabbar > *').count(),4);assert.equal(await page.locator('.tabbar a[href="/wallet"]').count(),0)
  await page.reload();await page.getByRole('heading',{name:'Active listings',exact:true}).waitFor();assert.equal(await page.locator('.android-welcome').count(),0)
  await page.locator('a[href="/profile"]').click();await page.getByTestId('complete-login').waitFor()
  await page.locator('a[href="/"]').click();await page.getByRole('link',{name:'Wallet fixture'}).click()
  await page.locator('.android-wallet-badge').waitFor();assert.equal(await page.getByText(/Balance:|History|Activity/).count(),0)
  assert.equal(api,0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true)
  await page.screenshot({path:output+name+'-wallet.png'})
  await page.locator('.android-wallet-card button').click();await page.getByRole('heading',{name:'Active listings',exact:true}).waitFor()
  await page.evaluate(()=>localStorage.clear());await page.reload();await page.locator('.android-entry-primary').click()
  await page.getByTestId('complete-login').click();await page.getByRole('heading',{name:'Active listings',exact:true}).waitFor()
  assert.equal(await page.evaluate(()=>window.entryFixtureStatus()),'authenticated');assert.deepEqual(errors,[])
  await context.close();console.log('PASS: '+name+' welcome, optional login, Back, guest/relaunch/profile, 4 tabs and static future wallet')
 }
}finally{await browser.close()}
