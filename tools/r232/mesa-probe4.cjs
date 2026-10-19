const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('.mesa:has(.foto-e)').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(3000);
  await (await p.$('.mesa:has(.foto-e)')).screenshot({ path: 'tools/shots/r232-mesa-antes.jpg', type: 'jpeg', quality: 50 });
  console.log(await p.evaluate(() => [...document.querySelectorAll('.mesa:has(.foto-e) img')].map(i=>i.dataset.e+':'+getComputedStyle(i).display+':'+i.currentSrc.split('/').pop()).join(' ')));
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
  await p.waitForTimeout(200);
  const r = await p.evaluate(() => { const m = document.querySelector('.mesa:has(.foto-e)'); const c = [...m.querySelectorAll('img')].find((i) => i.style.position === 'absolute'); const l = m.closest('.lamina'); const rc = c.getBoundingClientRect(), rl = l.getBoundingClientRect(); const out = { src: c.currentSrc.split('/').pop(), nw: c.naturalWidth, mask: getComputedStyle(c).getPropertyValue('mask-position') + ' | ' + getComputedStyle(c).getPropertyValue('mask-size'), rc: [rc.left, rc.top, rc.width, rc.height].map(Math.round), rl: [rl.left, rl.top, rl.width, rl.height].map(Math.round), off: [c.offsetWidth, c.offsetHeight], mesaT: getComputedStyle(m).transform, scale: getComputedStyle(m).scale }; c.style.setProperty('mask', 'none'); c.style.setProperty('-webkit-mask', 'none'); c.remove = () => {}; return out; });
  console.log(JSON.stringify(r));
  await (await p.$('.mesa:has(.foto-e)')).screenshot({ path: 'tools/shots/r232-mesa-sinmask.jpg', type: 'jpeg', quality: 50 });
  await b.close();
})();
