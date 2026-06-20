const puppeteer = require('puppeteer');
const W = 740, H = 1046;
(async () => {
  const browser = await puppeteer.launch({ headless:'new', args:[
    '--no-sandbox','--disable-setuid-sandbox','--use-gl=angle',
    '--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  for (const mode of ['flat','solid']) {
    const page = await browser.newPage();
    await page.setViewport({ width:W, height:H, deviceScaleFactor:2 });
    await page.goto(`http://127.0.0.1:8077/demo3d/index.html?mode=${mode}`, {waitUntil:'load'});
    await page.waitForFunction('window.__done === true', { timeout:20000 });
    await new Promise(r=>setTimeout(r,300));
    await page.screenshot({ path:`assets/unit3d-${mode}.png` });
    console.log('rendered', mode);
    await page.close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
