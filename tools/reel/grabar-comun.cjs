// Común a grabar.cjs y momentos.cjs: las webs del reel, la marca blanca de Zernio y la limpieza de avisos. (Extraído de grabar.cjs.)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
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

module.exports = { SITIOS, marcaBlanca, limpiar, abrir };
