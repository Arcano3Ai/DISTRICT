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

async function scanImages() {
  const port = 4185;
  const server = await startServer(path.resolve('dist'), port);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const networkFailures = [];
  page.on('requestfailed', req => {
    networkFailures.push({ url: req.url(), error: req.failure()?.errorText });
  });

  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

  // Scroll through the entire page to trigger lazy loading of images
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  await new Promise(r => setTimeout(r, 1000));

  // Inspect all images on the page
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0
    }));
  });

  console.log('\n--- SCAN RESULTS: ALL IMAGES (' + images.length + ' found) ---');
  let brokenCount = 0;
  images.forEach((img, idx) => {
    const isOk = img.complete && img.naturalWidth > 0;
    if (!isOk) brokenCount++;
    console.log(`[#${idx + 1}] ${isOk ? 'OK' : 'BROKEN'} - alt: "${img.alt}" | dims: ${img.naturalWidth}x${img.naturalHeight} | src: ${img.src}`);
  });

  console.log('\n--- NETWORK FAILURES ---');
  console.log(networkFailures.length === 0 ? 'None' : JSON.stringify(networkFailures, null, 2));

  // Screenshot portfolio section specifically
  const portfolioEl = await page.$('#portafolio');
  if (portfolioEl) {
    await portfolioEl.screenshot({ path: 'scratch/scanned_portfolio.png' });
  }

  await browser.close();
  server.close();

  if (brokenCount === 0 && networkFailures.length === 0) {
    console.log('\nALL IMAGES VERIFIED: 100% COMPLETE AND HEALTHY');
  } else {
    console.log(`\nATTENTION: ${brokenCount} broken images, ${networkFailures.length} network failures.`);
  }
}

scanImages().catch(console.error);
