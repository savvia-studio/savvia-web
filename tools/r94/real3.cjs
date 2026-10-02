// RONDA 94 · sondas del hero real: el punto del eyebrow, la entrada de [data-reveal] y la cinta de tarjetas (cada 50 ms).
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'commit' });
  await p.waitForSelector('h1');
  const out = await p.evaluate(() => new Promise((res) => {
    const t0 = performance.now(), r = [];
    const dot = document.querySelector('[data-reveal] span[aria-hidden]');
    const rev = [...document.querySelectorAll('[data-reveal]')];
    const feed = document.querySelector('.sf-card')?.parentElement;
    const f = () => {
      const t = Math.round(performance.now() - t0);
      const cards = [...document.querySelectorAll('.sf-card')].map((c) => (+getComputedStyle(c).opacity).toFixed(2));
      r.push([t, dot?.style.transform, dot?.firstElementChild?.style.transform, dot?.firstElementChild?.style.opacity, rev.map((e) => getComputedStyle(e).opacity + '|' + getComputedStyle(e).transform + '|' + getComputedStyle(e).filter).join(' ; '), feed?.style.transform, cards.join(',')]);
      if (t < 9000) setTimeout(f, 50); else res(r);
    };
    f();
  }));
  require('fs').writeFileSync('tools/shots/r94-real/sondas.json', JSON.stringify(out));
  const bg = await p.evaluate(() => getComputedStyle(document.querySelector('.home-hero-bg')).backgroundImage);
  console.log(bg);
  await b.close();
})();
