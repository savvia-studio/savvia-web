// Ronda 236 · abre la web de cada estudio de referencia y lista sus vídeos (src y duración): el reel suele estar incrustado
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const SITIOS = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const u of SITIOS) {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
    const medios = new Set();
    p.on('response', (r) => { const t = r.headers()['content-type'] || ''; if (/video|mpegurl|dash/.test(t) || /\.(mp4|webm|m3u8)(\?|$)/.test(r.url())) medios.add(r.url().slice(0, 160)); });
    try {
      await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 30000 }); await p.waitForTimeout(7000);
      for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(700); }
      const vids = await p.evaluate(() => [...document.querySelectorAll('video, iframe')].map((v) => v.tagName === 'IFRAME' ? 'iframe ' + v.src.slice(0, 140) : `video ${(v.currentSrc || v.src || '').slice(0, 140)} dur=${Math.round(v.duration || 0)}`).filter((x) => /video |vimeo|youtube/.test(x)));
      const reel = await p.evaluate(() => [...document.querySelectorAll('a,button')].filter((a) => /reel|showreel/i.test(a.textContent)).map((a) => (a.textContent.trim().slice(0, 30) + ' → ' + (a.href || '')).slice(0, 160)).slice(0, 4));
      console.log('\n##', u, '\n  vídeos:', JSON.stringify(vids.slice(0, 8)), '\n  enlaces reel:', JSON.stringify(reel), '\n  red:', JSON.stringify([...medios].slice(0, 6)));
    } catch (e) { console.log('\n##', u, 'ERROR', String(e).slice(0, 100)); }
    await p.context().close();
  }
  await b.close();
})();
