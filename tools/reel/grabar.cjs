// REEL (ronda 60) · planos reales de las webs para el reel del menú. Dos tomas por web, en Chrome real a 1920×1080 (DPR 1):
//  · VIVO: screencast CDP desde que se abre la página (la intro y las animaciones de entrada a su velocidad real), remuestreado a 30 fps por marca de tiempo.
//  · SCROLL: paso a paso (scroll exacto por fotograma + espera + captura): sin tirones, aunque la página tarde en pintar.
// Zernio sale en MARCA BLANCA («Amarra»): nombre y logotipo se cambian en la página antes de grabar; su web no se toca.
// node tools/reel/grabar.cjs <slug|todos> [vivo|scroll]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const FF = '/opt/homebrew/bin/ffmpeg', FPS = 30;
const MOVIL_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const SITIOS = {
  multiverse: { url: 'https://multiverse-home.vercel.app/' },
  zernio: { url: 'https://zernio.treseiscero.app/', blanca: true },
  playground: { url: 'https://playground-iep-two.vercel.app/home-v5.html' },
  neety: { url: 'https://neety.treseiscero.app/home' },
  invopop: { url: 'https://invopop.com' },
  isotrol: { url: 'https://isotrol.com' },
  remerge: { url: 'https://remerge.io', w: 390, h: 844, movil: true },
  'business-online-payroll': { url: 'https://businessonlinepayroll.com' },
  cubbo: { url: 'https://cubbo.com' },
};

// — marca blanca: cambia «Zernio» por «Amarra» en todo el texto y el logotipo por uno de texto —
function marcaBlanca() {
  const cambia = (s) => s.replace(/ZERNIO/g, 'AMARRA').replace(/Zernio/g, 'Amarra').replace(/zernio/g, 'amarra').replace(/Late is now Amarra\.?/g, 'Amarra 2.0 ·');
  const pasa = () => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) if (/zernio|late is now/i.test(n.nodeValue)) n.nodeValue = cambia(n.nodeValue);
    document.querySelectorAll('img[alt="Zernio"], img[src*="d81bc566"]').forEach((img) => {
      if (img.dataset.blanca) return; img.dataset.blanca = 1;
      const r = img.getBoundingClientRect(), s = document.createElement('span');
      s.textContent = 'amarra';
      s.style.cssText = `display:inline-flex;align-items:center;height:${r.height || 28}px;font:600 ${Math.round((r.height || 28) * 1.05)}px/1 inherit;letter-spacing:-0.04em;color:currentColor`;
      const punto = document.createElement('i'); punto.style.cssText = `display:inline-block;width:.32em;height:.32em;border-radius:50%;background:#ee4a23;margin-right:.18em;transform:translateY(.12em)`;
      s.prepend(punto); img.replaceWith(s);
    });
    if (/zernio/i.test(document.title)) document.title = cambia(document.title);
  };
  pasa(); new MutationObserver(pasa).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
}

// — lo que no es de la web: controles de maqueta, avisos de cookies, botones flotantes —
async function limpiar(p) {
  for (const t of ['Accept all', 'Aceptar todo', 'Aceptar todas', 'I accept', 'Accept cookies', 'Accept all cookies', 'Accept', 'Aceptar', 'Allow all', 'OK', 'Got it', 'I agree']) {
    const btn = p.getByRole('button', { name: new RegExp('^' + t + '$', 'i') }).first();
    if (await btn.count()) { try { await btn.click({ timeout: 800 }); await p.waitForTimeout(400); break; } catch {} }
  }
  await p.evaluate(() => {
    document.querySelectorAll('body *').forEach((e) => {
      const cs = getComputedStyle(e); if (cs.position !== 'fixed' && cs.position !== 'sticky' && cs.position !== 'absolute') return;
      const r = e.getBoundingClientRect(), txt = (e.textContent || '').toLowerCase();
      const aviso = cs.position === 'fixed' && /cookie|consent|privacidad|privacy/.test(txt) && r.top > innerHeight * 0.3;
      const maqueta = /replay intro|best experienced on a bigger/.test(txt) && txt.length < 60;
      const boton = cs.position === 'fixed' && r.width < 90 && r.height < 90 && r.bottom > innerHeight - 140 && r.left < 140;
      if (aviso || maqueta || boton) e.style.setProperty('display', 'none', 'important');
    });
    // el conmutador de variantes de la maqueta de Zernio («HERO A·Código B·Esquema»)
    document.querySelectorAll('body *').forEach((e) => { if (/^HERO\s*A\s*·\s*Código/.test((e.textContent || '').trim()) && e.getBoundingClientRect().height < 60) e.style.setProperty('visibility', 'hidden', 'important'); });
  });
  await p.addStyleTag({ content: 'html,body{scroll-behavior:auto!important} #usercentrics-root,#usercentrics-cmp-ui,[id^="usercentrics"]{display:none!important} ::-webkit-scrollbar{display:none}' });
}

async function abrir(b, s) {
  const w = s.w || 1920, h = s.h || 1080;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: s.movil ? 3 : 1, userAgent: s.movil ? MOVIL_UA : userAgent, isMobile: !!s.movil, hasTouch: !!s.movil });
  if (s.blanca) await ctx.addInitScript(`addEventListener('DOMContentLoaded', ${marcaBlanca.toString()})`);
  return ctx.newPage();
}

async function vivo(b, slug, s, dir) {
  const p = await abrir(b, s), cdp = await p.context().newCDPSession(p), frames = [];
  fs.mkdirSync(dir, { recursive: true });
  cdp.on('Page.screencastFrame', (f) => { frames.push({ t: f.metadata.timestamp, d: f.data }); cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, everyNthFrame: 1 });
  await p.goto(s.url, { waitUntil: 'commit', timeout: 60000 });
  const t0 = Date.now() / 1000;
  await p.waitForLoadState("load", { timeout: 20000 }).catch(() => {}); console.log(slug, "cargada", frames.length);
  await limpiar(p); console.log(slug, "limpia", frames.length);
  await p.waitForTimeout(Math.max(0, 9000 - (Date.now() / 1000 - t0) * 1000));
  await cdp.send('Page.stopScreencast');
  // remuestreo a 30 fps: cada fotograma de salida toma el último recibido antes de su instante
  const inicio = frames[0].t, fin = frames[frames.length - 1].t, N = Math.floor((fin - inicio) * FPS);
  let k = 0;
  for (let i = 0; i < N; i++) {
    const t = inicio + i / FPS; while (k + 1 < frames.length && frames[k + 1].t <= t) k++;
    fs.writeFileSync(path.join(dir, 'f' + String(i).padStart(4, '0') + '.jpg'), Buffer.from(frames[k].d, 'base64'));
  }
  console.log(slug, 'vivo', frames.length, 'recibidos →', N, 'fotogramas (' + (frames.length / (fin - inicio)).toFixed(1) + ' fps reales)');
  await p.context().close();
}

async function scroll(b, slug, s, dir) {
  const p = await abrir(b, s);
  await p.goto(s.url, { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(3500); await limpiar(p);
  const max = await p.evaluate(() => Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 3.2));
  for (let y = 0; y <= max; y += 300) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(140); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(2000); await limpiar(p);
  fs.mkdirSync(dir, { recursive: true });
  const DUR = 8, N = DUR * FPS;
  for (let i = 0; i < N; i++) {
    const k = i / (N - 1), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    await p.evaluate((yy) => { const sc = document.scrollingElement; sc.scrollTop = yy; window.__lenis?.scrollTo?.(yy, { immediate: true, force: true }); window.lenis?.scrollTo?.(yy, { immediate: true, force: true }); }, Math.round(max * e));
    await p.waitForTimeout(90);
    await p.screenshot({ path: path.join(dir, 'f' + String(i).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 90 });
  }
  console.log(slug, 'scroll', N, 'fotogramas · recorrido', Math.round(max), 'px');
  await p.context().close();
}

(async () => {
  const [quien = 'todos', que = 'ambos'] = process.argv.slice(2);
  const lista = quien === 'todos' ? Object.keys(SITIOS) : quien.split(',');
  const b = await chromium.launch({ ...launchOpts, args: [...launchOpts.args.filter((a) => !a.startsWith('--window-size')), '--window-size=1920,1080'] });
  fs.mkdirSync('tools/reel/planos', { recursive: true });
  for (const slug of lista) {
    const s = SITIOS[slug];
    for (const toma of que === 'ambos' ? ['vivo', 'scroll'] : [que]) {
      const dir = path.join('tools/grab/reel', slug + '-' + toma); fs.rmSync(dir, { recursive: true, force: true });
      try { await (toma === 'vivo' ? vivo : scroll)(b, slug, s, dir); } catch (e) { console.log(slug, toma, 'FALLO', e.message); continue; }
      const escala = s.movil ? 'scale=1170:-2' : 'scale=1920:-2';
      execSync(`${FF} -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.jpg -vf "${escala}" -c:v libx264 -pix_fmt yuv420p -crf 18 -preset medium -an tools/reel/planos/${slug}-${toma}.mp4`);
    }
  }
  await b.close();
})();
