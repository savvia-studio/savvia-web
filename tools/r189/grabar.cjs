// RONDA 189 · copia de tools/grabar-paso.cjs que corre en el Mac de Eric (Playwright y Chrome locales).
// RONDA 43 · «el vídeo de invopop va como a tirones el scroll»: el screencast CDP de grabar-otros.cjs soltaba fotogramas (49 repetidos de 192 en el
// tramo de scroll). Grabación DETERMINISTA: en cada fotograma se coloca el scroll exacto (sin suavizado), se espera a que la página se asiente y se
// captura; luego ffmpeg a 30 fps. node tools/grabar-paso.cjs <slug>
const { chromium } = require('/Users/ericruiz/ShipStudio/andonimart-multiverse-home/node_modules/playwright-core'); const launchOpts = { executablePath: '/Users/ericruiz/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' }; const userAgent = undefined;
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const FPS = 30, DUR = 7.4, QUIETO = 1.2, FINAL = 1.0;
const SITIOS = {
  kymatio: { url: 'https://kymatio.com', w: 1440, h: 900 },
  wisable: { url: 'https://wisable.com', w: 1440, h: 900 },
  'transcend-network': { url: 'https://www.transcend-network.com', w: 1440, h: 900, espera: 9000 }, // tiene pantalla de carga
  monad: { url: 'https://monad.com', w: 1440, h: 900 },
  thx: { url: 'https://www.thx.vision', w: 1440, h: 900 },
  'remerge-escritorio': { url: 'https://remerge.io', w: 1440, h: 900 },
  invopop: { url: 'https://invopop.com', w: 1440, h: 900 },
  'business-online-payroll': { url: 'https://businessonlinepayroll.com', w: 1440, h: 900 },
  cubbo: { url: 'https://cubbo.com', w: 1440, h: 900 },
  remerge: { url: 'https://remerge.io', w: 390, h: 844, movil: true },
  'remerge-movil': { url: 'https://remerge.io', w: 390, h: 844, movil: true }, // ronda 190: la vista del móvil sobre la mesa
  isotrol: { url: 'https://isotrol.com', w: 1440, h: 900 },
  // ronda 191 · el slider de /proyectos: neety.com, SurePayroll, Claudia BE, Home of Ambrose y Eleven Lab
  'neety-com': { url: 'https://neety.com', w: 1440, h: 900 },
  surepayroll: { url: 'https://www.surepayroll.com/', w: 1440, h: 900 },
  'claudia-be': { url: 'https://claudiabe.studio/', w: 1440, h: 900, espera: 5000 },
  'home-of-ambrose': { url: 'https://www.homeofambrose.com/', w: 1440, h: 900, espera: 5000 },
  'eleven-lab': { url: 'https://www.elevenlab.org/', w: 1440, h: 900, espera: 5000 },
};
const clave = process.argv[2], s = SITIOS[clave], slug = clave === 'remerge-escritorio' ? 'remerge' : clave;
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1, userAgent: s.movil ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' : userAgent, isMobile: !!s.movil, hasTouch: !!s.movil });
  const p = await ctx.newPage();
  await p.goto(s.url, { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(s.espera || 3000);
  for (const t of ['Accept all', 'Aceptar todo', 'Aceptar todas', 'I accept', 'Accept cookies', 'Accept all cookies', 'Accept', 'Aceptar', 'Allow all', 'OK', 'Got it', 'I agree']) {
    const btn = p.getByRole('button', { name: new RegExp('^' + t + '$', 'i') }).first();
    if (await btn.count()) { try { await btn.click({ timeout: 800 }); await p.waitForTimeout(500); break; } catch {} }
  }
  // avisos de cookies que no son <button> (enlaces, divs) y los botones flotantes de consentimiento: fuera del vídeo
  for (const t of [/^I accept$/i, /^Accept all$/i, /^Aceptar$/i, /^Aceptar todo$/i]) { const el = p.getByText(t).first(); if (await el.count()) { try { await el.click({ timeout: 800 }); await p.waitForTimeout(500); } catch {} } }
  await p.evaluate(() => {
    document.querySelectorAll('body *').forEach((e) => {
      const cs = getComputedStyle(e); if (cs.position !== 'fixed' && cs.position !== 'sticky') return;
      const r = e.getBoundingClientRect(), txt = (e.textContent || '').toLowerCase();
      const aviso = /cookie|consent|privacidad|privacy/.test(txt) && r.top > innerHeight * 0.3;
      const boton = r.width < 90 && r.height < 90 && r.bottom > innerHeight - 140 && r.left < 140; // p. ej. el botón de consentimiento de Remerge
      if (aviso || boton) e.style.setProperty('display', 'none', 'important');
    });
  });
  await p.addStyleTag({ content: 'html,body{scroll-behavior:auto!important} #usercentrics-root,#usercentrics-cmp-ui,[id^="usercentrics"]{display:none!important}' }); // Remerge: el botón de Usercentrics vive en un shadow root
  const max = await p.evaluate(() => Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 2.2));
  // precargar: bajar y volver (imágenes perezosas), y esperar
  for (let y = 0; y <= max; y += 300) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(120); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
  const dir = path.join('tools/grab', slug + '-paso'); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const N = Math.round(DUR * FPS);
  for (let i = 0; i < N; i++) {
    const t = i / FPS, k = Math.min(1, Math.max(0, (t - QUIETO) / (DUR - QUIETO - FINAL))), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    await p.evaluate((yy) => { const sc = document.scrollingElement; sc.scrollTop = yy; window.__lenis?.scrollTo?.(yy, { immediate: true, force: true }); }, Math.round(max * e));
    await p.waitForTimeout(90);
    await p.screenshot({ path: path.join(dir, 'f' + String(i).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 });
  }
  const outW = s.movil ? 390 : 960;
  execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.jpg -vf "scale=${outW}:-2" -c:v libx264 -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart -an public/media/anteriores/video/${slug}.mp4`);
  execSync(`ffmpeg -y -loglevel error -i ${dir}/f0000.jpg -vf "scale=${outW}:-2" public/media/anteriores/video/${slug}.jpg`);
  console.log(slug, N, 'fotogramas · scroll', Math.round(max), (fs.statSync(`public/media/anteriores/video/${slug}.mp4`).size / 1024).toFixed(0) + 'K');
  await b.close();
})();
