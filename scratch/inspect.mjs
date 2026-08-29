import puppeteer from 'puppeteer';
import fs from 'fs';

async function inspectPage() {
  const browser = await puppeteer.launch({ 
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true 
  });
  const page = await browser.newPage();
  
  const consoleLogs = [];
  const networkFailures = [];

  page.on('console', msg => consoleLogs.push(`[CONSOLE ${msg.type()}] ${msg.text()}`));
  page.on('requestfailed', req => {
    const err = req.failure() ? req.failure().errorText : 'unknown';
    networkFailures.push(`[REQ FAIL] ${req.url()} - ${err}`);
  });
  page.on('response', res => {
    if (res.status() >= 400) {
      networkFailures.push(`[HTTP ${res.status()}] ${res.url()}`);
    }
  });

  console.log('Navigating to https://arcano3ai.github.io/DISTRICT/...');
  await page.goto('https://arcano3ai.github.io/DISTRICT/', { waitUntil: 'networkidle2' });

  await page.screenshot({ path: 'live_screenshot.png', fullPage: true });

  const html = await page.content();
  fs.writeFileSync('page_dom.html', html);

  console.log('--- CONSOLE LOGS ---');
  console.log(consoleLogs.join('\n') || 'None');

  console.log('\n--- NETWORK FAILURES ---');
  console.log(networkFailures.join('\n') || 'None');

  await browser.close();
}

inspectPage().catch(err => console.error(err));
