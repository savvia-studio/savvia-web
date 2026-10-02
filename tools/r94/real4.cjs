// RONDA 94 · el latido del punto del eyebrow real (cada 40 ms) y la entrada del hero tras la carga.
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'commit' });
  await p.waitForSelector('h1');
  const out = await p.evaluate(() => new Promise((res) => {
    const t0 = performance.now(), r = [];
    const h1 = document.querySelector('h1'); const ey = h1.previousElementSibling; const dot = ey.querySelector('span');
    const ctas = h1.nextElementSibling;
    const f = () => { const t = Math.round(performance.now() - t0);
      const s = (e) => { const c = getComputedStyle(e); return (+c.opacity).toFixed(2) + ' ' + c.transform.replace(/matrix\(([^)]*)\)/, (m, a) => a.split(',').map(Number).map(x=>x.toFixed(2)).join(',')); };
      r.push([t, dot.style.transform, dot.firstElementChild.style.transform, dot.firstElementChild.style.opacity, s(ey), s(h1), s(ctas)]);
      if (t < 7000) setTimeout(f, 40); else res(r); };
    f(); }));
  out.filter((_, i) => i % 3 === 0).forEach((r) => console.log(r.join(' | ')));
  await b.close();
})();
