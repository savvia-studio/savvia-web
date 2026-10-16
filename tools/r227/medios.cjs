// RONDA 227 · Andoni: «cerciorarse de que ninguna de las imágenes de los case studies sale cortada, y que se ven en buena calidad».
// Para cada vídeo e imagen de los casos (y del portfolio): carga el medio, compara la proporción REAL con la de la caja donde se pinta (con
// object-fit: cover, si difieren más de un 2 % se recorta) y la CALIDAD: píxeles reales frente a los que ocupa a ×2 (retina); por encima de ×1,3, blando.
// Las ventanas que salen cortadas por el borde de su pieza a propósito (la carátula y la rejilla, «saliendo desde abajo») se cuentan aparte.
// Uso: node tools/r227/medios.cjs [base] [ancho]
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const base = process.argv[2] || 'http://localhost:4332', W = +(process.argv[3] || 1440);
const SLUGS = ['kuanta', 'arkdev', 'playground', 'neety', 'invopop', 'business-online-payroll', 'cubbo', 'remerge', 'isotrol'];
(async () => {
  const b = await pw.chromium.launch(pw.launchOpts);
  const c = await b.newContext({ viewport: { width: W, height: 900 }, deviceScaleFactor: 2 });
  await c.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await c.newPage(); let malos = 0;
  for (const ruta of [...SLUGS.map((s) => `/proyectos/${s}`), '/proyectos']) {
    await p.goto(`${base}${ruta}?carga=0`, { waitUntil: 'load', timeout: 180000 });
    // que todo lo que espera a verse ya esté en su sitio (sin animaciones de entrada) y cargar todos los vídeos
    await p.addStyleTag({ content: '*{transition:none!important;animation:none!important}' });
    await p.evaluate(async () => {
      document.querySelectorAll('[data-pieza-obra]').forEach((e) => e.classList.add('vista'));
      const vs = [...document.querySelectorAll('video')];
      vs.forEach((v) => { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.preload = 'metadata'; });
      await Promise.all(vs.map((v) => (v.readyState >= 1 ? 0 : new Promise((r) => { v.addEventListener('loadedmetadata', r, { once: true }); v.addEventListener('error', r, { once: true }); setTimeout(r, 8000); }))));
      document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; if (!i.src && i.dataset.src) i.src = i.dataset.src; });
      await Promise.all([...document.querySelectorAll('img')].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }))));
    });
    const r = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('main video, main img, .pieza video, [data-obra-medio] video, [data-obra-medio] img')) {
        const nw = el.videoWidth || el.naturalWidth, nh = el.videoHeight || el.naturalHeight; if (!nw || !nh) { out.push({ que: (el.currentSrc || el.dataset.src || el.src || '').split('/').slice(-2).join('/'), error: 'sin cargar' }); continue; }
        const rc = el.getBoundingClientRect(); if (rc.width < 40) continue;
        const cs = getComputedStyle(el), fit = cs.objectFit;
        const caja = rc.width / rc.height, real = nw / nh;
        const recorte = fit === 'cover' ? Math.abs(caja - real) / real : 0;
        const intencion = !!el.closest('.pz-grande, .pz-sube, .mesa, .slide, .destacados'); // cortes a propósito (carátula, rejilla, mesa, slider)
        const escala = (rc.width * 2) / nw;
        out.push({ que: (el.currentSrc || el.src).split('/').slice(-2).join('/'), caja: `${Math.round(rc.width)}×${Math.round(rc.height)}`, real: `${nw}×${nh}`, recorte: +(recorte * 100).toFixed(1), escala: +escala.toFixed(2), intencion });
      }
      return out;
    });
    const mal = r.filter((x) => x.error || (!x.intencion && x.recorte > 2) || x.escala > 1.3);
    malos += mal.length;
    console.log(`${ruta}: ${r.length} medios · ${mal.length} a revisar`);
    for (const x of mal) console.log('   ', x.error ? `${x.que} · ${x.error}` : `${x.que} · caja ${x.caja} · real ${x.real} · recorte ${x.recorte}% · escala ×${x.escala}${x.intencion ? ' (corte a propósito)' : ''}`);
  }
  console.log('TOTAL a revisar:', malos);
  await b.close();
})();
