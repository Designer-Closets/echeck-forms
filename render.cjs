const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1040, height: 760, deviceScaleFactor: 2 });

  const fileUrl = 'file://' + path.resolve(__dirname, 'coupon/index.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  // give web fonts a moment
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 800));

  // PNG of just the certificate stage
  await page.screenshot({
    path: 'assets/coupon-preview.png',
    fullPage: true,
  });

  // PDF (landscape certificate)
  await page.pdf({
    path: 'assets/coupon.pdf',
    landscape: true,
    printBackground: true,
    width: '1040px',
    height: '760px',
  });

  await browser.close();
  console.log('rendered');
})().catch(e => { console.error(e); process.exit(1); });
