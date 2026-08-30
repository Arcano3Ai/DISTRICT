import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  
  const logoPath = path.resolve('public/logodistrict.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoUrl = 'data:image/png;base64,' + logoBase64;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1200px;
          height: 630px;
          background: #030712;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .logo {
          width: 520px;
          height: auto;
          object-fit: contain;
          margin-bottom: 24px;
        }
        .tagline {
          color: #94a3b8;
          font-size: 26px;
          letter-spacing: 6px;
          text-transform: uppercase;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img class="logo" src="${logoUrl}" />
        <div class="tagline">Adaptamos Tu Idea</div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  
  const ogPng = path.resolve('public/og-image.png');
  const ogJpg = path.resolve('public/og-image.jpg');

  await page.screenshot({ path: ogPng, type: 'png' });
  await page.screenshot({ path: ogJpg, type: 'jpeg', quality: 95 });

  console.log('Successfully generated WhatsApp OG Logo banner in public/!');

  await browser.close();
})();
