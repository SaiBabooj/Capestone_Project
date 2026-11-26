const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'docs/shot_dashboard.png', fullPage: false });
  // valid upload
  await page.setInputFiles('#files', ['/tmp/valid-image.png']);
  await page.click('#uploadBtn');
  await page.waitForTimeout(6000);
  await page.screenshot({ path: 'docs/shot_valid.png', fullPage: true });
  // blocked upload
  await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
  await page.setInputFiles('#files', ['/tmp/fake-image.jpg.exe']);
  await page.click('#uploadBtn');
  await page.waitForTimeout(6000);
  await page.screenshot({ path: 'docs/shot_blocked.png', fullPage: true });
  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
