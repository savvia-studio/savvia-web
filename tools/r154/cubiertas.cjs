// RONDA 154 · la carátula de cada caso, capturada a 1280 y a 390 (DPR 2) + hoja de contacto. node tools/r154/cubiertas.cjs [slugs,…] [motor]
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const { execSync } = require('child_process');
const SL = (process.argv[2] || 'kuanta,arkdev,playground,neety,invopop,business-online-payroll,cubbo,remerge,isotrol').split(','), motor = process.argv[3] || 'chromium';
const O = 'tools/r154/shots';
(async () => {
  const b = await pw[motor].launch(motor === 'chromium' ? pw.launchOpts : { headless: true });
  for (const [W, H] of [[1280, 800], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'chromium' ? pw.userAgent : undefined });
    await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
    for (const s of SL) {
      const p = await ctx.newPage(); const errs = [];
      p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      await p.goto(`http://localhost:4322/proyectos/${s}?carga=0`, { waitUntil: 'load' }); await p.waitForTimeout(800);
      const el = p.locator('.portada').first(); await el.scrollIntoViewIfNeeded(); await p.evaluate(() => scrollBy(0, -40)); await p.waitForTimeout(3200);
      const info = await p.evaluate(() => { const v = document.querySelector('.pz-grande video'), l = document.querySelector('.pz-grande .lamina').getBoundingClientRect(), m = document.querySelector('.pz-grande :is(.mockup,.telefono-m)').getBoundingClientRect();
        return { vista: document.querySelector('.pz-grande').classList.contains('vista'), suena: !v.paused, src: v.currentSrc.split('/').slice(-2).join('/'), lam: [Math.round(l.width), Math.round(l.height)], web: [Math.round(m.width), Math.round(m.height)], fuera: Math.round(m.bottom - l.bottom), desborde: document.documentElement.scrollWidth - innerWidth }; });
      await el.screenshot({ path: `${O}/cub-${s}-${W}.jpg`, type: 'jpeg', quality: 78 });
      console.log(motor, W, s, JSON.stringify(info), errs.slice(0, 2).join(' | '));
      await p.close();
    }
    await ctx.close();
  }
  await b.close();
  for (const W of [1280, 390]) { const [cw, ch, c] = W === 1280 ? [600, 340, 3] : [260, 330, 9];
    execSync(`ffmpeg -loglevel error -y ${SL.map((s) => `-i ${O}/cub-${s}-${W}.jpg`).join(' ')} -filter_complex "${SL.map((_, i) => `[${i}]scale=${cw}:${ch}:force_original_aspect_ratio=decrease,pad=${cw + 8}:${ch + 8}:4:4:white[v${i}]`).join(';')};${SL.map((_, i) => `[v${i}]`).join('')}xstack=inputs=${SL.length}:layout=${SL.map((_, i) => `${(i % c) * (cw + 8)}_${Math.floor(i / c) * (ch + 8)}`).join('|')}:fill=white" ${O}/hoja-cubiertas-${W}.jpg`); }
})();
