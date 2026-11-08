import {createRequire} from 'node:module'
import {mkdir,readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import assert from 'node:assert/strict'
const {chromium}=createRequire(import.meta.url)(process.env.ADVERTIO_PLAYWRIGHT_MODULE??'playwright')
const fixture=fileURLToPath(new URL('../../.tmp/entry-fixture/',import.meta.url))
const images=fileURLToPath(new URL('../../mobile/overlays/onboarding/assets/',import.meta.url))
const output=fileURLToPath(new URL('./snapshots/entry/',import.meta.url));await mkdir(output,{recursive:true})
const html=await readFile(fixture+'index.html','utf8'),js=await readFile(fixture+'entry.js','utf8'),css=await readFile(fixture+'entry.css','utf8')
const artworks=await Promise.all([1,2,3].map(i=>readFile(images+`slide-0${i}.webp`)))
const browser=await chromium.launch({headless:true,executablePath:process.env.ADVERTIO_CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote']})
try{
 for(const [name,width,height,lang,dark] of [['small-en',360,800,'en',false],['phone-fa',390,844,'fa',false],['landscape-dark',800,600,'en',true]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});const page=await context.newPage();const errors=[];let api=0
  page.on('pageerror',e=>errors.push(e.message))
  await context.route('**/*',async route=>{const url=new URL(route.request().url());if(url.pathname.startsWith('/api'))api++
   if(url.origin!=='https://localhost'){await route.abort();return}
   if(url.pathname==='/entry.js')return route.fulfill({contentType:'application/javascript',body:js})
   if(url.pathname==='/entry.css')return route.fulfill({contentType:'text/css',body:css})
   const img=url.pathname.match(/^\/onboarding\/slide-0([1-3])\.webp$/)
   if(img)return route.fulfill({contentType:'image/webp',body:artworks[Number(img[1])-1]})
   return route.fulfill({contentType:'text/html',body:html.replace('lang="en"',`lang="${lang}"`).replace('<body>',`<body data-theme="${dark?'dark':'light'}">`)})
  })
  await page.goto('https://localhost/');await page.locator('.android-welcome').waitFor()
  assert.equal(await page.locator('.tabbar').count(),0)
  assert.equal(await page.locator('.android-onboarding-dots span').count(),3)
  assert.equal(await page.locator('.android-onboarding-art img').count(),1)
  assert.equal(await page.locator('.android-onboarding-art img').evaluate(el=>el.complete&&el.naturalWidth>0),true)
  await page.screenshot({path:output+name+'-welcome.png'})
  await page.locator('.android-entry-primary').click()
  assert.equal(await page.locator('.android-onboarding-dots span.active').evaluate(el=>Array.from(el.parentElement.children).indexOf(el)),1)
  await page.evaluate(()=>window.entryFixtureBack());assert.equal(await page.locator('.android-onboarding-dots span.active').evaluate(el=>Array.from(el.parentElement.children).indexOf(el)),0)
  await page.locator('.android-entry-primary').click();await page.locator('.android-entry-primary').click()
  assert.equal(await page.locator('.android-onboarding-dots span.active').evaluate(el=>Array.from(el.parentElement.children).indexOf(el)),2)
  await page.locator('.android-entry-primary').click();await page.getByTestId('complete-login').waitFor()
  assert.equal(await page.evaluate(()=>localStorage.getItem('advertio.android.welcome.v2')),'seen')
  await page.evaluate(()=>window.entryFixtureBack())
  await page.getByRole('heading',{name:'Active listings',exact:true}).waitFor()
  assert.equal(await page.evaluate(()=>window.entryFixtureStatus()),'needs-login')
  assert.equal(await page.locator('.tabbar > *').count(),4);assert.equal(await page.locator('.tabbar a[href="/wallet"]').count(),0)
  await page.reload();await page.getByTestId('complete-login').waitFor();assert.equal(await page.locator('.android-welcome').count(),0)
  await page.locator('.android-entry-login-body .android-entry-secondary').click()
  await page.locator('a[href="/profile"]').click();await page.getByTestId('complete-login').waitFor()
  await page.locator('a[href="/"]').click();await page.getByRole('link',{name:'Wallet fixture'}).click()
  await page.locator('.android-wallet-badge').waitFor();assert.equal(await page.getByText(/Balance:|History|Activity/).count(),0)
  assert.equal(api,0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true)
  await page.screenshot({path:output+name+'-wallet.png'})
  await page.locator('.android-wallet-card button').click();await page.getByRole('heading',{name:'Active listings',exact:true}).waitFor()
  await page.evaluate(()=>localStorage.clear());await page.reload();await page.locator('.android-welcome').waitFor()
  await page.locator('.android-entry-primary').click();await page.locator('.android-entry-primary').click();await page.locator('.android-entry-primary').click()
  await page.getByTestId('complete-login').click();await page.getByRole('heading',{name:'Active listings',exact:true}).waitFor()
  assert.equal(await page.evaluate(()=>window.entryFixtureStatus()),'authenticated');assert.deepEqual(errors,[])
  await context.close();console.log('PASS: '+name+' three illustrated onboarding slides, login, back, persistence, guest/profile, wallet')
 }
}finally{await browser.close()}
