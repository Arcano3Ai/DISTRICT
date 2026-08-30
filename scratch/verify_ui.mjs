import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// Simple static server for dist/
function startServer(distDir, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
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

async function verify() {
  const port = 4179;
  const distDir = path.resolve('dist');
  console.log('Starting local static test server for dist at port', port);
  const server = await startServer(distDir, port);

  console.log('Launching browser to test UI...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  const networkErrors = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[PAGE ERROR] ${err.message}`));
  page.on('requestfailed', req => {
    networkErrors.push(`FAIL: ${req.url()} (${req.failure()?.errorText})`);
  });

  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

  // 1. Check Navbar logo
  const logoInfo = await page.evaluate(() => {
    const navbar = document.querySelector('header');
    const logoImg = navbar ? navbar.querySelector('img') : null;
    return {
      navbarFound: !!navbar,
      imgFound: !!logoImg,
      src: logoImg ? logoImg.src : null,
      naturalWidth: logoImg ? logoImg.naturalWidth : 0,
      naturalHeight: logoImg ? logoImg.naturalHeight : 0,
      alt: logoImg ? logoImg.alt : null,
      parentText: navbar ? navbar.querySelector('a')?.innerText.trim() : null
    };
  });

  console.log('\n--- LOGO IN NAVBAR ---');
  console.log(JSON.stringify(logoInfo, null, 2));

  // 2. Check Hero Video
  const videoInfo = await page.evaluate(() => {
    const hero = document.getElementById('hero');
    const video = hero ? hero.querySelector('video') : null;
    return {
      heroFound: !!hero,
      videoFound: !!video,
      currentSrc: video ? video.currentSrc : null,
      paused: video ? video.paused : null,
      muted: video ? video.muted : null,
      readyState: video ? video.readyState : null,
      videoWidth: video ? video.videoWidth : null,
      videoHeight: video ? video.videoHeight : null
    };
  });

  console.log('\n--- VIDEO IN HERO ---');
  console.log(JSON.stringify(videoInfo, null, 2));

  // Screenshot of Hero Section
  await page.screenshot({ path: 'scratch/verified_hero.png', clip: { x: 0, y: 0, width: 1440, height: 850 } });

  // 3. Test clicking "Ver Video 3D (Popup)"
  console.log('\nTesting opening Intro Video Modal...');
  const openVideoBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Video') || b.innerText.includes('Ver'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  await new Promise(r => setTimeout(r, 800));

  const modalInfo = await page.evaluate(() => {
    const modalVideo = document.querySelector('div.fixed video');
    return {
      modalVideoFound: !!modalVideo,
      currentSrc: modalVideo ? modalVideo.currentSrc : null,
      paused: modalVideo ? modalVideo.paused : null,
      muted: modalVideo ? modalVideo.muted : null,
      readyState: modalVideo ? modalVideo.readyState : null
    };
  });

  console.log('\n--- MODAL VIDEO ---');
  console.log(JSON.stringify(modalInfo, null, 2));

  await page.screenshot({ path: 'scratch/verified_modal.png' });

  // Screenshot Footer
  await page.evaluate(() => {
    document.getElementById('contacto')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/verified_footer.png', clip: { x: 0, y: 450, width: 1440, height: 450 } });

  // Full page screenshot
  await page.screenshot({ path: 'scratch/verified_fullpage.png', fullPage: true });

  console.log('\n--- CONSOLE ERRORS ---');
  console.log(consoleLogs.filter(l => l.includes('error') || l.includes('ERROR')).join('\n') || 'None');

  console.log('\n--- NETWORK ERRORS ---');
  console.log(networkErrors.join('\n') || 'None');

  await browser.close();
  server.close();
  console.log('\nVerification completed successfully!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
