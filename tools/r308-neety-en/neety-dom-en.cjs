// RONDA 303 · Andoni: «la web de Neety con IA: que parezcan componentes reales, no capturas, y que se vea bien de calidad». Extrae de neety.treseiscero.app
// el HTML de sus secciones y TODO su CSS (con fuentes e imágenes descargadas en local) → hf/assets/neety-dom/ para montarlos de verdad (vectorial).
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const BASE = 'https://neety.treseiscero.app';
const OUT = path.join(__dirname, 'captura'); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 810 }, userAgent }); const p = await ctx.newPage();
  const bajado = new Map();
  p.on('response', async (r) => { try { const u = r.url(); if (!/\.(woff2?|png|jpe?g|webp|avif|svg)(\?|$)|\/_next\/image/.test(u) || r.status() >= 400) return; const buf = await r.body(); bajado.set(u, buf); } catch {} });
  await p.goto(BASE + '/en/home', { waitUntil: 'networkidle', timeout: 60000 }); await p.waitForTimeout(2500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 200) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(150); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(2000);
  const r = await p.evaluate(() => {
    let css = '';
    for (const s of document.styleSheets) { try { for (const k of s.cssRules) css += k.cssText + '\n'; } catch (e) { css += `/* sin acceso: ${s.href} */\n`; } }
    const root = getComputedStyle(document.documentElement); const vars = [...root].filter((n) => n.startsWith('--')).map((n) => `${n}:${root.getPropertyValue(n)}`).join(';');
    return { css, vars, htmlCls: document.documentElement.className, bodyCls: document.body.className, bodyStyle: document.body.getAttribute('style') || '', bodyBg: getComputedStyle(document.body).backgroundColor, bodyFont: getComputedStyle(document.body).fontFamily, secs: [] };
  });
  const N = await p.evaluate(() => { const secs = [...document.querySelectorAll('body section, body footer')].filter((e) => e.offsetHeight > 300); const hero = document.querySelector('h1').closest('.rounded-2xl') || document.querySelector('h1').closest('div.relative'); const l = [hero, ...secs]; l.forEach((e, i) => e.setAttribute('data-sv', i)); return l.length; });
  for (let i = 0; i < N; i++) {
    const top = await p.evaluate((i) => { const e = document.querySelector(`[data-sv="${i}"]`); return Math.max(0, e.getBoundingClientRect().top + scrollY - 80); }, i);
    await p.evaluate((y) => scrollTo(0, y), top); await p.waitForTimeout(i === 0 ? 300 : 2600);
    if (i === 0) { try { await p.waitForFunction(() => /key people/i.test(document.body.innerText), { timeout: 15000 }); await p.waitForTimeout(900); } catch {} }
    const s = await p.evaluate((i) => { const e = document.querySelector(`[data-sv="${i}"]`); return { h: e.offsetHeight, t: (e.querySelector('h1,h2')?.textContent || '').trim().slice(0, 50), html: e.outerHTML }; }, i);
    r.secs.push(s);
  }

  // fuentes e imágenes a local
  const local = (u) => { const abs = new URL(u, BASE).href; const buf = bajado.get(abs); if (!buf) return null; const ext = (abs.match(/\.(woff2?|png|jpe?g|webp|avif|svg)/) || [, 'bin'])[1]; const ext2 = (abs.match(/\.(woff2?|png|jpe?g|webp|avif|svg|mp4|webm)(\?|$)/) || [, ext])[1]; const n = crypto.createHash('md5').update(abs).digest('hex').slice(0, 12) + '.' + (abs.includes('/_next/image') ? 'img' : ext2); fs.writeFileSync(path.join(OUT, n), buf); return n; };
  let css = r.css.replace(/url\((["']?)([^)"']+)\1\)/g, (m, q, u) => { if (u.startsWith('data:')) return m; const n = local(u); return n ? `url(${n})` : m; });
  const bajaYa = async (u) => { const abs = new URL(u.replace(/&amp;/g, '&'), BASE).href; if (!bajado.has(abs)) { try { const r = await fetch(abs); if (r.ok) bajado.set(abs, Buffer.from(await r.arrayBuffer())); } catch {} } return local(abs); };
  const fix = async (h) => { const urls = new Set(); h.replace(/(src|srcset|poster)="([^"]+)"/g, (m, a, v) => { v.split(',').forEach((x) => urls.add(x.trim().split(' ')[0])); }); h.replace(/url\(&quot;([^&]+)&quot;\)/g, (m, u) => urls.add(u));
    const mapa = {}; for (const u of urls) { if (u && !u.startsWith('data:')) mapa[u] = await bajaYa(u); }
    h = h.replace(/url\(&quot;([^&]+)&quot;\)/g, (m, u) => { const n = mapa[u]; return n ? `url(&quot;assets/neety-dom/${n}&quot;)` : m; });
    return h.replace(/(src|srcset|poster)="([^"]+)"/g, (m, a, v) => { const first = v.split(',')[0].trim().split(' ')[0]; const n = mapa[first]; return n ? `${a}="assets/neety-dom/${n}"` : m; }); };
  fs.writeFileSync(path.join(OUT, 'neety.css'), `:host{${r.vars}}\n` + css.replace(/:root/g, ':host'));
  fs.writeFileSync(path.join(OUT, 'secciones.json'), JSON.stringify({ bodyBg: r.bodyBg, bodyFont: r.bodyFont, htmlCls: r.htmlCls, bodyCls: r.bodyCls, bodyStyle: r.bodyStyle, secs: await Promise.all(r.secs.map(async (s) => ({ ...s, html: await fix(s.html) }))) }));
  console.log('css', (css.length / 1024).toFixed(0) + 'K', 'recursos', bajado.size, 'secciones', r.secs.map((s) => s.h + ' ' + s.t).join(' | '));
  await b.close();
})();
