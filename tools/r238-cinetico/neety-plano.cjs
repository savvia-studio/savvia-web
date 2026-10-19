// RONDA 256 · «Por qué Neety» en COLORES PLANOS: en su propia página se quitan sus degradados y cada combinación pinta fondo, tarjeta, cifras, texto y botón
// con colores lisos de la paleta de Neety (crema, berenjena, azul bebé, mint, naranja).
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const PAL = [
  { bg: '#F8F7EC', tx: '#431B44', sub: '#6b4a6c', card: '#FE8238', ctx: '#2A0E2C', stat: '#FFFFFF', num: '#431B44', btn: '#431B44', btx: '#F8F7EC' },
  { bg: '#431B44', tx: '#F8F7EC', sub: '#d9c9d9', card: '#A7C5F9', ctx: '#2A0E2C', stat: '#55285A', num: '#F8F7EC', btn: '#FE8238', btx: '#2A0E2C' },
  { bg: '#A7C5F9', tx: '#2A0E2C', sub: '#33405e', card: '#431B44', ctx: '#F8F7EC', stat: '#F8F7EC', num: '#2A0E2C', btn: '#FE8238', btx: '#2A0E2C' },
  { bg: '#EBFFF6', tx: '#0D4A3A', sub: '#2f6b59', card: '#0BB783', ctx: '#06261D', stat: '#FFFFFF', num: '#0D4A3A', btn: '#0D4A3A', btx: '#EBFFF6' },
];
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(200); }
  await p.addStyleTag({ content: '*{transition:none!important;animation:none!important} header,nav,[class*="navbar"]{display:none!important}' });
  const y0 = await p.evaluate(() => {
    const sec = [...document.querySelectorAll('section')].find((s) => /POR QU[EÉ] NEETY/i.test(s.innerText));
    sec.id = 'plano';
    for (const e of document.querySelectorAll('body *')) { const cs = getComputedStyle(e); if ((cs.position === 'fixed' || cs.position === 'sticky') && !sec.contains(e)) e.style.setProperty('display', 'none', 'important'); }
    document.body.style.background = '#fff';
    const sube = (el, w, hh) => { while (el && !(el.getBoundingClientRect().width > w && el.getBoundingClientRect().height > hh)) el = el.parentElement; return el; };
    const hoja = [...sec.querySelectorAll('*')].find((e) => e.childElementCount === 0 && /Empieza a vender/.test(e.textContent));
    sube(hoja, 220, 320).id = 'plano-card';
    [...sec.querySelectorAll('*')].filter((e) => e.childElementCount === 0 && /^\+?\d/.test(e.textContent.trim())).forEach((e) => { const c = sube(e, 140, 70); if (c) c.classList.add('plano-stat'); });
    return sec.getBoundingClientRect().top + scrollY;
  });
  for (let i = 0; i < PAL.length; i++) {
    const c = PAL[i];
    await p.evaluate((c) => {
      let st = document.getElementById('plano-css'); if (!st) { st = document.createElement('style'); st.id = 'plano-css'; document.head.appendChild(st); }
      st.textContent = `#plano{background:${c.bg}!important} #plano *{color:${c.sub}!important;border-color:transparent!important;box-shadow:none!important}
#plano h1,#plano h2,#plano h3{color:${c.tx}!important}
#plano img,#plano canvas,#plano video,#plano svg image{opacity:0!important}
#plano *{background-image:none!important;filter:none!important;backdrop-filter:none!important}
#plano-card{background:${c.card}!important;border-radius:16px!important} #plano-card *{color:${c.ctx}!important;background-color:transparent!important}
#plano-card a,#plano-card button{background:${c.btn}!important;color:${c.btx}!important} #plano-card a *,#plano-card button *{color:${c.btx}!important;background:${c.btx}}
.plano-stat{background:${c.stat}!important} .plano-stat *{color:${c.num}!important}`;
    }, c);
    await p.evaluate((y) => scrollTo(0, y - 20), y0); await p.waitForTimeout(500);
    await p.screenshot({ path: `neety/plano-${i}.jpg`, type: 'jpeg', quality: 88, clip: { x: 0, y: 0, width: 1120, height: 900 } });
  }
  await b.close(); })();
