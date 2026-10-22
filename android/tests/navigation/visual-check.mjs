// Run after npm ci in tests/harness and bundling this fixture. Uses an installed Playwright.
import {createRequire} from 'node:module'
import {mkdir,readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import assert from 'node:assert/strict'
const require=createRequire(import.meta.url)
const {chromium}=require(process.env.ADVERTIO_PLAYWRIGHT_MODULE??'playwright')
const output=fileURLToPath(new URL('./snapshots/',import.meta.url));await mkdir(output,{recursive:true})
const fixtureDir=fileURLToPath(new URL('../../.tmp/navigation-fixture/',import.meta.url))
const html=await readFile(fixtureDir+'fixture.html','utf8')
const css=await readFile(fixtureDir+'fixture.css','utf8')
const js=await readFile(fixtureDir+'fixture.js','utf8')
const browser=await chromium.launch({headless:true,executablePath:process.env.ADVERTIO_CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote']})
try{
 for(const [name,width,height,rtl] of [['small-rtl',360,800,1],['phone-ltr',390,844,0],['landscape-rtl',800,600,1]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1})
  await page.setContent(html.replace(/<script[^>]*src=\"[^\"]+\"[^>]*><\/script>/g,'').replace(/<link[^>]+>/g,''))
  await page.evaluate((value)=>{window.fixtureRtl=Boolean(value)},rtl)
  await page.addStyleTag({content:css})
  await page.addScriptTag({content:js,type:'module'})
  await page.locator('#open-sheet').click();await page.locator('[role=dialog]').waitFor()
  assert.equal(await page.locator('[role=dialog]').count(),1)
  await page.locator('#nested').click();assert.equal(await page.locator('[role=dialog]').count(),2)
  await page.keyboard.press('Escape');assert.equal(await page.locator('[role=dialog]').count(),1)
  await page.screenshot({path:output+name+'.png'})
  await page.evaluate(()=>window.fixtureBack());await page.locator('[role=dialog]').waitFor({state:'hidden'})
  await page.evaluate(()=>{window.fixtureKeyboard(260);document.getElementById('address').focus();document.getElementById('address').scrollIntoView({block:'nearest'})})
  const box=await page.locator('#address').boundingBox();assert.ok(box.y>=24 && box.y+box.height<=height-260,JSON.stringify(box))
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true)
  await page.close()
 }
 console.log('PASS: actual Sheet rendered; nested Escape, hardware-Back mock, 3 viewport snapshots and input visibility checks')
}finally{await browser.close()}
