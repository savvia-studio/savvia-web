// Recorre las páginas renderizadas y lista cada texto (y título, descripción, alt y aria-label) que lleva «·», «—» o «–»
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:4332/proyectos/?carga=0'); await p.waitForTimeout(800);
  const casos = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="/proyectos/"]')].map((a) => a.getAttribute('href').replace(/\/$/, '')))]);
  const metodo = await (async () => { await p.goto('http://localhost:4332/metodo'); return p.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="/metodo/"]')].map((a) => a.getAttribute('href').replace(/\/$/, '')))]); })();
  const base = ['/', '/proyectos', '/manifiesto', '/metodo', '/sistema', '/lab', '/404', ...casos, ...metodo, ...['quantus','patchbay','playground','neety','invopop','business-online-payroll','cubbo','remerge','isotrol'].map((s) => '/proyectos/' + s)];
  const rutas = [...base, ...base.map((r) => '/en' + (r === '/' ? '/' : r))];
  const out = {};
  for (const r of rutas) {
    const res = await p.goto('http://localhost:4332' + r + (r.includes('?') ? '&' : '?') + 'carga=0').catch(() => null);
    if (!res || res.status() >= 400) { out[r] = ['(' + (res ? res.status() : 'fallo') + ')']; continue; }
    await p.waitForTimeout(500);
    out[r] = await p.evaluate(() => {
      const re = /[·—–]/, hits = new Set();
      const w = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode()); ) { const pa = n.parentElement; if (!pa || pa.closest('script,style,noscript,template')) continue; const t = n.textContent.replace(/\s+/g, ' ').trim(); if (re.test(t)) hits.add(t.slice(0, 160)); }
      document.querySelectorAll('[alt],[aria-label],[title],meta[name=description],meta[property^="og:"]').forEach((e) => ['alt', 'aria-label', 'title', 'content'].forEach((a) => { const v = e.getAttribute(a); if (v && re.test(v)) hits.add('[' + a + '] ' + v.slice(0, 160)); }));
      if (re.test(document.title)) hits.add('[title] ' + document.title);
      return [...hits];
    });
  }
  fs.writeFileSync('tools/r307-slop/encontrado.json', JSON.stringify(out, null, 1));
  const unicos = new Set(Object.values(out).flat()); console.log('rutas', rutas.length, 'textos únicos', unicos.size);
  await b.close();
})();
