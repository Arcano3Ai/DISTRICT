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

async function runTestSuite() {
  const port = 4190;
  const server = await startServer(path.resolve('dist'), port);
  console.log(`Server running on port ${port}`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  const networkFailures = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));
  page.on('requestfailed', req => {
    networkFailures.push(`${req.url()} (${req.failure()?.errorText})`);
  });

  const results = {
    testsPassed: 0,
    testsFailed: 0,
    details: []
  };

  function assert(condition, message) {
    if (condition) {
      results.testsPassed++;
      results.details.push(`✅ PASS: ${message}`);
      console.log(`✅ PASS: ${message}`);
    } else {
      results.testsFailed++;
      results.details.push(`❌ FAIL: ${message}`);
      console.error(`❌ FAIL: ${message}`);
    }
  }

  try {
    // 1. CARGA INICIAL Y METADATOS
    console.log('\n--- 1. Carga Inicial & Metadatos ---');
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });
    const pageTitle = await page.title();
    assert(pageTitle.includes('DISTRICT Arquitectura'), `Título correcto: "${pageTitle}"`);

    // 2. VIDEO INTRO INICIAL (MODAL AUTOMÁTICO)
    console.log('\n--- 2. Modal de Video Intro Inicial ---');
    const autoModalVisible = await page.evaluate(() => {
      const modal = document.querySelector('div.fixed video');
      return !!modal;
    });
    assert(autoModalVisible, 'Modal de video intro se abrió automáticamente al inicio');

    // Cerrar modal inicial para permitir interacción
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Saltar Intro'));
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 3. LOGO EN NAVBAR
    console.log('\n--- 3. Logotipo en Navbar ---');
    const navbarLogo = await page.evaluate(() => {
      const header = document.querySelector('header');
      const img = header ? header.querySelector('img') : null;
      return {
        hasImg: !!img,
        src: img ? img.src : '',
        naturalWidth: img ? img.naturalWidth : 0,
        alt: img ? img.alt : '',
        parentText: header ? header.querySelector('a')?.innerText.trim() : null
      };
    });
    assert(navbarLogo.hasImg && navbarLogo.naturalWidth > 0, `Logo en Navbar cargado con resolución (${navbarLogo.naturalWidth}px)`);
    assert(navbarLogo.parentText === '', `Navbar no contiene texto duplicado al lado del logo (encontrado: "${navbarLogo.parentText}")`);

    // 4. ARQUITECTO & VIDEO EN HERO SECTION
    console.log('\n--- 4. Pestañas de Arquitecto & Video en Hero ---');
    const heroArchitectImg = await page.evaluate(() => {
      const img = document.querySelector('#hero img');
      return {
        found: !!img,
        src: img ? img.src : '',
        complete: img ? img.complete : false,
        naturalWidth: img ? img.naturalWidth : 0,
        alt: img ? img.alt : ''
      };
    });
    assert(heroArchitectImg.found && heroArchitectImg.naturalWidth > 0, `Imagen de Arq. Jaime Facundo (con camisa District) renderizada en Hero (${heroArchitectImg.naturalWidth}px, src: ${heroArchitectImg.src})`);

    // Cambiar a la pestaña de Video Intro 3D
    await page.evaluate(() => {
      const videoTabBtn = Array.from(document.querySelectorAll('#hero button')).find(b => b.innerText.includes('Video Intro 3D'));
      if (videoTabBtn) videoTabBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const heroVideo = await page.evaluate(() => {
      const v = document.querySelector('#hero video');
      return {
        found: !!v,
        paused: v ? v.paused : true,
        muted: v ? v.muted : false,
        readyState: v ? v.readyState : 0,
        width: v ? v.videoWidth : 0,
        height: v ? v.videoHeight : 0,
        src: v ? v.currentSrc : ''
      };
    });
    assert(heroVideo.found, 'Elemento de video encontrado al activar la pestaña "Video Intro 3D"');
    assert(!heroVideo.paused, 'Video del Hero se reproduce automáticamente');
    assert(heroVideo.muted, 'Video del Hero está silenciado para compatibilidad con autoplay');
    assert(heroVideo.width >= 1280, `Video del Hero en alta definición: ${heroVideo.width}x${heroVideo.height}`);

    // 5. APERTURA MANUAL DEL MODAL DE VIDEO
    console.log('\n--- 5. Apertura Manual de Video Modal ---');
    await page.evaluate(() => {
      const popupBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toUpperCase().includes('VER VIDEO 3D'));
      if (popupBtn) popupBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const manualModal = await page.evaluate(() => {
      const v = document.querySelector('div.fixed video');
      return !!v;
    });
    assert(manualModal, 'Botón "Ver Video 3D (Popup)" abre el modal correctamente');

    // Cerrar modal
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => 
        b.innerText.toUpperCase().includes('SALTAR INTRO') || 
        b.innerText.toUpperCase().includes('CERRAR VIDEO')
      );
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 6. PORTAFOLIO Y FILTRADO
    console.log('\n--- 6. Portafolio & Filtros ---');
    await page.evaluate(() => document.getElementById('portafolio')?.scrollIntoView());
    await new Promise(r => setTimeout(r, 400));

    const totalProjects = await page.evaluate(() => {
      return document.querySelectorAll('#portafolio .grid > div').length;
    });
    assert(totalProjects === 6, `Total de 6 proyectos visibles en "Todos los Proyectos" (encontrados: ${totalProjects})`);

    // Probar filtro "Renders 3D HD"
    await page.evaluate(() => {
      const filterBtn = Array.from(document.querySelectorAll('#portafolio button')).find(b => b.innerText.toUpperCase().includes('RENDERS 3D'));
      if (filterBtn) filterBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const rendersCount = await page.evaluate(() => {
      return document.querySelectorAll('#portafolio .grid > div').length;
    });
    assert(rendersCount === 1, `Filtro de Renders muestra 1 proyecto exclusivo (encontrados: ${rendersCount})`);

    // Volver a "Todos los Proyectos"
    await page.evaluate(() => {
      const allBtn = Array.from(document.querySelectorAll('#portafolio button')).find(b => b.innerText.toUpperCase().includes('TODOS'));
      if (allBtn) allBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 7. IMAGEN LOCAL GENERADA DE OBRA Y LEVANTAMIENTO
    console.log('\n--- 7. Imagen Generada de Obra en Terreno ---');
    const obraImg = await page.evaluate(() => {
      const card = Array.from(document.querySelectorAll('#portafolio .grid > div')).find(c => c.innerText.includes('Levantamiento en Terreno'));
      const img = card ? card.querySelector('img') : null;
      return {
        found: !!img,
        src: img ? img.src : '',
        complete: img ? img.complete : false,
        naturalWidth: img ? img.naturalWidth : 0
      };
    });
    assert(obraImg.found && obraImg.complete && obraImg.naturalWidth > 0, `Imagen local de obra y levantamiento cargada con éxito (${obraImg.naturalWidth}px, src: ${obraImg.src})`);

    // 8. CALCULADORA INTERACTIVA DE PRESUPUESTO
    console.log('\n--- 8. Calculadora Interactiva 3D ---');
    await page.evaluate(() => document.getElementById('calculadora')?.scrollIntoView());
    await new Promise(r => setTimeout(r, 400));

    const initialEstimate = await page.evaluate(() => {
      const priceEl = document.querySelector('#calculadora h3, #calculadora .text-gradient');
      return priceEl ? priceEl.innerText : '';
    });
    assert(initialEstimate.length > 0, `Cotizador interactivo muestra estimación calculada: ${initialEstimate}`);

    // 9. LOGO EN EL FOOTER
    console.log('\n--- 9. Logotipo en Footer ---');
    await page.evaluate(() => document.getElementById('contacto')?.scrollIntoView());
    await new Promise(r => setTimeout(r, 400));

    const footerLogo = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      const img = footer ? footer.querySelector('img') : null;
      return {
        found: !!img,
        naturalWidth: img ? img.naturalWidth : 0,
        src: img ? img.src : ''
      };
    });
    assert(footerLogo.found && footerLogo.naturalWidth > 0, `Logotipo en Footer renderizado con éxito (${footerLogo.naturalWidth}px)`);

    // 10. AUDITORÍA DE RED Y CONSOLA
    console.log('\n--- 10. Auditoría de Red & Consola ---');
    assert(consoleErrors.length === 0, `Consola sin errores de JavaScript (encontrados: ${consoleErrors.length})`);
    assert(networkFailures.length === 0, `Red sin recursos fallidos (encontrados: ${networkFailures.length})`);

  } catch (err) {
    console.error('Error in test execution:', err);
    assert(false, `Excepción en prueba: ${err.message}`);
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n====================================');
  console.log(`RESUMEN FINAL: ${results.testsPassed} PASARON | ${results.testsFailed} FALLARON`);
  console.log('====================================');

  if (results.testsFailed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error(err);
  process.exit(1);
});
