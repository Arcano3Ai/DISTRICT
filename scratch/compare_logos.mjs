import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function testLogos() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const p = (rel) => 'file:///' + path.resolve(rel).replace(/\\/g, '/');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { background: #070B14; color: white; font-family: sans-serif; padding: 20px; }
        .row { display: flex; gap: 20px; margin-bottom: 30px; }
        .card { background: #0E1626; border: 1px solid #1E293B; border-radius: 12px; padding: 15px; text-align: center; flex: 1; }
        .preview { height: 160px; display: flex; align-items: center; justify-content: center; background: #0B1120; border-radius: 8px; margin-bottom: 10px; border: 1px dashed #334155; }
        .preview.white { background: #FFFFFF; }
        img { max-height: 140px; max-width: 90%; object-fit: contain; }
      </style>
    </head>
    <body>
      <h2>Comparación de Logos sobre fondo Oscuro (#0B1120)</h2>
      <div class="row">
        <div class="card">
          <h4>assets/logo/logodistrict.png</h4>
          <div class="preview"><img src="${p('assets/logo/logodistrict.png')}" /></div>
        </div>
        <div class="card">
          <h4>assets/logo/logodistrict_clean.png</h4>
          <div class="preview"><img src="${p('assets/logo/logodistrict_clean.png')}" /></div>
        </div>
        <div class="card">
          <h4>assets/logo/logodistrict_dark.png</h4>
          <div class="preview"><img src="${p('assets/logo/logodistrict_dark.png')}" /></div>
        </div>
        <div class="card">
          <h4>logo-district-original.png</h4>
          <div class="preview"><img src="${p('logo-district-original.png')}" /></div>
        </div>
      </div>

      <h2>Sobre fondo Blanco (#FFFFFF)</h2>
      <div class="row">
        <div class="card">
          <h4>assets/logo/logodistrict.png</h4>
          <div class="preview white"><img src="${p('assets/logo/logodistrict.png')}" /></div>
        </div>
        <div class="card">
          <h4>assets/logo/logodistrict_clean.png</h4>
          <div class="preview white"><img src="${p('assets/logo/logodistrict_clean.png')}" /></div>
        </div>
        <div class="card">
          <h4>assets/logo/logodistrict_dark.png</h4>
          <div class="preview white"><img src="${p('assets/logo/logodistrict_dark.png')}" /></div>
        </div>
        <div class="card">
          <h4>logo-district-original.png</h4>
          <div class="preview white"><img src="${p('logo-district-original.png')}" /></div>
        </div>
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync('scratch/compare_logos.html', html);
  await page.goto(p('scratch/compare_logos.html'));
  await page.screenshot({ path: 'scratch/compare_logos.png', fullPage: true });
  await browser.close();
  console.log('Comparison screenshot saved to scratch/compare_logos.png');
}

testLogos().catch(console.error);
