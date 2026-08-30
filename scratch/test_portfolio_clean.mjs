import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';

function startServer(distDir, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';
    const filePath = path.join(distDir, decodeURIComponent(reqUrl));

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found: ' + reqUrl);
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function capturePortfolio() {
  const port = 4187;
  const server = await startServer(path.resolve('dist'), port);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto(`http://localhost:${port}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    sessionStorage.setItem('district_intro_seen', 'true');
  });
  await page.reload({ waitUntil: 'networkidle0' });

  // Scroll to portfolio
  await page.evaluate(() => {
    document.getElementById('portafolio')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  const portfolioEl = await page.$('#portafolio');
  if (portfolioEl) {
    await portfolioEl.screenshot({ path: 'scratch/portfolio_clean_grid.png' });
  }

  await browser.close();
  server.close();
  console.log('Portfolio clean screenshot saved to scratch/portfolio_clean_grid.png');
}

capturePortfolio().catch(console.error);
