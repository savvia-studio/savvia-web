// RONDA 265 · REEL «LA SAVIA». Andoni: «el reel, hacer algo más original que cuente un poco lo que contamos en la web. Con el guion de la web».
// Idea: la web cuenta que la savia da vida (el roble del hero se pinta desde una gota). El reel hace eso mismo con cada dolor de la web: una web de
// PLANTILLA (gris, genérica, «AI slop», rota) recibe una gota y, desde el impacto, se pinta con papel rasgado la web de verdad que hicimos. Guion = el
// de la home, en su orden: hero → «¿Te suena alguno?» → tres dolores → savvia agentic → proyectos destacados (las cuatro estaciones) → tres formas de
// trabajar → Eric y Andoni → «La savvia de tu web.».
// node tools/r265-reel/build.cjs [bpm] [primer-pulso] [cancion.mp3] → hf/index.html
const fs = require('fs'), path = require('path');
const BPM = +(process.argv[2] || 93), P0 = +(process.argv[3] || 1.02), MUSICA = process.argv[4] || 'distant-miles.mp3';
const T = 60 / BPM, f30 = (x) => Math.round(x * 30) / 30;
const B = (n) => f30(P0 + n * T);
const FIN = B(73);
let html = '', js = '', z = 10, vid = 0;
const escena = (id, a, b, fondo, inner, cls = '') => {
  html += `<div class="esc ${cls}" id="${id}" style="z-index:${z++};background:${fondo}">${inner}</div>\n`;
  js += `tl.set('#${id}', { opacity: 1 }, ${f30(a)}); tl.set('#${id}', { opacity: 0 }, ${f30(b)});\n`;
};
const video = (src, a, b, ms = 0) => `<video id="v${++vid}" class="full" src="assets/${src}.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="${ms}" data-track-index="${1 + (vid % 3)}" muted playsinline></video>`;
const entra = (sel, t, d = 0.6) => { js += `tl.fromTo('${sel}', { opacity: 0, filter: 'blur(20px)', y: 30 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: ${d}, ease: 'expo.out', immediateRender: false }, ${f30(t)});\n`; };
const sale = (sel, t, d = 0.35) => { js += `tl.to('${sel}', { opacity: 0, filter: 'blur(14px)', y: -22, duration: ${d}, ease: 'power2.in' }, ${f30(t)});\n`; };
// palabra a palabra
const palabras = (txt, cls = '') => txt.split(' ').map((w) => `<span class="pw ${cls}">${w}</span>`).join(' ');
const porPalabra = (sel, t, paso = 0.07) => { js += `tl.fromTo('${sel} .pw', { opacity: 0, filter: 'blur(16px)', y: 26 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .6, ease: 'expo.out', stagger: ${paso}, immediateRender: false }, ${f30(t)});\n`; };
// el PINTADO de savvia: la máscara de papel rasgado crece desde un punto (como el roble del hero)
const pinta = (sel, t, d = 1.1, hasta = 3600) => { js += `tl.fromTo('${sel}', { '--m': '0px' }, { '--m': '${hasta}px', duration: ${d}, ease: 'power2.inOut', immediateRender: false }, ${f30(t)});\n`; };
// una gota de agua que cae a (x, y) de la pantalla y salpica en el instante t
let GOTAS = '';
const gota = (id, x, y, t, caida = 0.55) => {
  GOTAS += `<div class="caida" id="${id}" style="left:${x}px;top:${y}px"><i class="onda" id="${id}o"></i><i class="onda o2" id="${id}o2"></i><svg class="g" id="${id}g" viewBox="-8 -10 16 20"><path d="M0 -9C3 -4 6 0 6 3.4A6 6 0 0 1 -6 3.4C-6 0 -3 -4 0 -9Z" fill="url(#agua)"/><ellipse cx="-2.2" cy="1" rx="1.4" ry="2.2" fill="#fff" fill-opacity=".85"/></svg></div>`;
  js += `tl.set('#${id}', { opacity: 1 }, ${f30(t - caida - 0.05)});
tl.fromTo('#${id}g', { y: -${y + 60}, scaleY: 1.5, opacity: 1 }, { y: 0, scaleY: 1.15, duration: ${caida}, ease: 'power2.in', immediateRender: false }, ${f30(t - caida)});
tl.to('#${id}g', { scaleX: 2.4, scaleY: .15, opacity: 0, duration: .12, ease: 'power2.out' }, ${f30(t + 1 / 30)});
tl.fromTo('#${id}o', { scale: .2, opacity: .9 }, { scale: 9, opacity: 0, duration: .9, ease: 'expo.out', immediateRender: false }, ${f30(t)});
tl.fromTo('#${id}o2', { scale: .2, opacity: .6 }, { scale: 15, opacity: 0, duration: 1.2, ease: 'expo.out', immediateRender: false }, ${f30(t + 0.08)});
tl.set('#${id}', { opacity: 0 }, ${f30(t + 1.3)});\n`;
};

// ── 1 · LA GOTA Y EL ROBLE · «Elevamos tu web con IA.» (el hero)
{
  const a = 0, b = B(8);
  escena('e1', a, b, '#3b231b', `<img class="full rasgo" id="h1img" style="--x:960px;--y:880px" src="assets/hero-otono.jpg" alt="" />
<div class="centro alto"><p class="lin" id="h1t">${palabras('Elevamos tu web con IA.')}</p><p class="sub" id="h1s">Especialistas en orquestar el desarrollo agéntico.</p></div>`);
  gota('g1', 960, 880, B(0), 0.75);
  pinta('#h1img', B(0), 2.4, 4200);
  porPalabra('#h1t', B(1.5), 0.09); entra('#h1s', B(3));
  sale('#h1t', B(7.2)); sale('#h1s', B(7.25));
}
// ── 2 · «¿Te suena alguno?» (la pregunta de la sección de los dolores)
{
  const a = B(8), b = B(11);
  escena('e2', a, b, '#3b231b', `<div class="centro"><p class="eye" id="e2e">¿Te suena alguno?</p></div>`);
  entra('#e2e', B(8.2)); sale('#e2e', B(10.6));
}
// ── 3 · LOS TRES DOLORES. La web de plantilla; la gota cae en ella y desde el impacto se pinta la web de verdad; el dolor deja paso a la respuesta.
const PLANTILLAS = [
  // 1 · genérica: no se parece a nadie
  `<div class="pl gen"><div class="pl-nav"><b>LOGO</b><i></i><i></i><i></i><u>Contact</u></div><div class="pl-hero"><h3>Welcome to Our Company</h3><p>We provide innovative solutions for your business needs.</p><u>Learn more</u></div><div class="pl-img"></div><div class="pl-cards"><i></i><i></i><i></i></div></div>`,
  // 2 · «AI slop»: degradado morado, brillo y promesas
  `<div class="pl slop"><div class="pl-nav"><b>✦ Nexora</b><i></i><i></i><i></i><u>Get started</u></div><div class="blob b1"></div><div class="blob b2"></div><div class="pl-hero"><h3>Unlock the Power of AI ✨</h3><p>Revolutionize your workflow with next‑gen intelligent solutions.</p><u>Start free trial →</u></div><div class="pl-cards"><i>🚀<br>Fast</i><i>🔒<br>Secure</i><i>⚡<br>Scalable</i></div></div>`,
  // 3 · la que se rompe con cada cambio: tipos, colores y botones que no casan, bloques descolocados
  `<div class="pl rota"><div class="pl-nav"><b>Brand</b><i></i><i></i><u class="r1">BUY NOW</u></div><div class="pl-hero"><h3 class="r2">Our new <span>product</span></h3><p class="r3">Updated by marketing · v7_final_FINAL</p><u class="r4">Click here!!</u><u class="r5">Demo</u></div><div class="pl-cards"><i class="r6"></i><i class="r7"></i><i class="r8"></i></div></div>`,
];
const DOLORES = [
  ['Si tu web no se alinea con tu marca…', 'Pasamos tiempo mano a mano contigo.', 'kuanta-port', 'kuanta.ai'],
  ['Si lo que haces se ve como AI Slop…', 'Tu dirección. Nuestro criterio.', 'playground-x-notas', 'playground.iep'],
  ['Si la consistencia se rompe en cada cambio…', 'savvia: el agente que guía tu web.', 'neety-vivo', 'neety.com'],
];
DOLORES.forEach(([dolor, resp, clip, url], k) => {
  const a = B(11 + k * 8), b = B(19 + k * 8), imp = a + 3 * T;
  escena(`d${k}`, a, b, '#f3eee7', `<p class="dolor" id="d${k}a">${palabras(dolor)}</p><p class="dolor resp" id="d${k}b">${palabras(resp)}</p>
<div class="nav" id="d${k}n"><div class="bar"><i></i><i></i><i></i><span id="d${k}u">www.tu-web.com</span><span class="u2" id="d${k}u2">${url}</span></div><div class="scr">${PLANTILLAS[k]}<div class="real rasgo" id="d${k}r" style="--x:640px;--y:330px">${video(clip, imp - 0.1, b + 0.1, k === 2 ? 4 : 0.5)}</div></div></div>`);
  js += `tl.fromTo('#d${k}n', { opacity: 0, y: 60, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .8, ease: 'expo.out', immediateRender: false }, ${f30(a + 0.05)});\n`;
  porPalabra(`#d${k}a`, a + 0.15, 0.06);
  if (k === 2) js += `tl.to('#d2n .r2', { rotation: -3, x: 18, duration: .18, yoyo: true, repeat: 5, ease: 'steps(2)' }, ${f30(a + 0.9)});
tl.to('#d2n .r4', { x: 40, y: 8, duration: .2, yoyo: true, repeat: 5, ease: 'steps(2)' }, ${f30(a + 1.0)});
tl.to('#d2n .r7', { y: 22, rotation: 4, duration: .2, yoyo: true, repeat: 5, ease: 'steps(2)' }, ${f30(a + 1.1)});\n`;
  // la gota cae en el centro de la pantalla del navegador (960, 600 de la pantalla)
  gota(`g${k + 2}`, 960, 600, imp, 0.6);
  pinta(`#d${k}r`, imp, 1.3, 3200);
  js += `tl.to('#d${k}u', { opacity: 0, duration: .2 }, ${f30(imp + 0.2)}); tl.fromTo('#d${k}u2', { opacity: 0 }, { opacity: 1, duration: .3, immediateRender: false }, ${f30(imp + 0.35)});\n`;
  sale(`#d${k}a`, imp + 0.1, 0.3);
  porPalabra(`#d${k}b`, imp + 0.45, 0.07);
  if (k < 2) { sale(`#d${k}b`, b - 0.45); js += `tl.to('#d${k}n', { opacity: 0, y: -30, filter: 'blur(10px)', duration: .4, ease: 'power2.in' }, ${f30(b - 0.45)});\n`; }
});
// ── 4 · «savvia agentic: tu web conectada con la IA.» (el manifiesto): la web de Neety se aleja y queda la frase
{
  const a = B(35), b = B(40);
  escena('e4', a, b, '#3b231b', `<div class="centro"><p class="lin" id="e4a">${palabras('savvia agentic:')}</p><p class="lin tenue" id="e4b">${palabras('tu web conectada con la IA.')}</p></div>`);
  js += `tl.to('#d2n', { scale: .6, opacity: 0, filter: 'blur(12px)', duration: .7, ease: 'power3.in' }, ${f30(a - 0.7)});\n`;
  porPalabra('#e4a', a + 0.1); porPalabra('#e4b', B(36.2)); sale('#e4a', B(39.4)); sale('#e4b', B(39.45));
}
// ── 5 · PROYECTOS DESTACADOS: las cuatro estaciones del hero de fondo y los proyectos, uno por pulso, en el navegador
{
  const a = B(40), b = B(52);
  const EST = ['otono', 'invierno', 'primavera', 'verano'];
  const PRO = [['kuanta', 'Kuanta'], ['multiverse', 'Multiverse Computing'], ['neety', 'Neety'], ['playground', 'Playground IEP'], ['amarra', 'Amarra'], ['invopop', 'Invopop'], ['isotrol', 'Isotrol'], ['arkdev', 'Arkdev'], ['cubbo', 'Cubbo']];
  escena('e5', a, b, '#3b231b', `${EST.map((e, i) => `<img class="full est" id="es${i}" src="assets/hero-${e}.jpg" alt="" />`).join('')}<i class="velo"></i>
<p class="titp" id="e5t">${palabras('Proyectos destacados con desarrollo agéntico.')}</p>
<div class="nav peq" id="e5n"><div class="bar"><i></i><i></i><i></i>${PRO.map(([s], i) => `<span class="pu" id="pu${i}">${s}</span>`).join('')}</div><div class="scr">${PRO.map(([s], i) => `<img class="full po" id="po${i}" src="assets/port/${s}-portada.jpg" alt="" />`).join('')}</div></div>
<p class="pnom" id="pnom">${PRO.map(([, n], i) => `<span id="pn${i}">${n}</span>`).join('')}</p>`);
  EST.forEach((_, i) => { js += `tl.fromTo('#es${i}', { opacity: 0 }, { opacity: 1, duration: .8, ease: 'power1.inOut', immediateRender: false }, ${f30(a + i * 3 * T)});\n`; });
  porPalabra('#e5t', a + 0.1, 0.05);
  js += `tl.fromTo('#e5n', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: .8, ease: 'expo.out', immediateRender: false }, ${f30(B(41))});\n`;
  PRO.forEach((_, i) => {
    const t = B(41.5 + i * 1.1);
    js += `tl.fromTo('#po${i}', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: .08, ease: 'none', immediateRender: false }, ${f30(t)});
tl.set('#pu${i}', { opacity: 1 }, ${f30(t)}); tl.set('#pn${i}', { opacity: 1 }, ${f30(t)});
${i > 0 ? `tl.set('#po${i - 1}', { opacity: 0 }, ${f30(t + 0.1)});` : ''}
${i < PRO.length - 1 ? `tl.set('#pu${i}', { opacity: 0 }, ${f30(B(41.5 + (i + 1) * 1.1))}); tl.set('#pn${i}', { opacity: 0 }, ${f30(B(41.5 + (i + 1) * 1.1))});` : ''}\n`;
  });
  sale('#e5t', b - 0.4); js += `tl.to('#e5n, #pnom', { opacity: 0, filter: 'blur(10px)', duration: .4, ease: 'power2.in' }, ${f30(b - 0.4)});\n`;
}
// ── 6 · «Trabajamos de tres formas contigo.» End-to-end · Colaboración · Consultoría, cada una con lo que incluye
{
  const a = B(52), b = B(62);
  const TODO = ['Narrativa de la web', 'Arquitectura de contenidos', 'Auditoría', 'Diseño digital', 'Sistema de diseño', 'Ilustraciones animadas', 'Animaciones 3D', 'Interacciones GSAP', 'Desarrollo agéntico', 'Integraciones con CMS', 'Multilenguaje', 'Migraciones a IA', 'SEO técnico', 'Accesibilidad', 'savvia.md', 'Formación'];
  const FORMAS = [['End-to-end', TODO.map((_, i) => i)], ['Colaboración', [3, 4, 5, 8, 9, 10, 14, 15]], ['Consultoría', [0, 1, 2, 4, 14, 15]]];
  escena('e6', a, b, '#f3eee7', `<p class="titp osc" id="e6t">${palabras('Trabajamos de tres formas contigo.')}</p>
<div class="formas">${FORMAS.map(([n], i) => `<p class="forma" id="fo${i}">${n}</p>`).join('')}</div>
<div class="tags">${TODO.map((t, i) => `<span class="tag" id="tg${i}">${t}</span>`).join('')}</div>`);
  porPalabra('#e6t', a + 0.1, 0.05);
  FORMAS.forEach(([, inc], i) => {
    const t = B(53.5 + i * 2.8);
    entra(`#fo${i}`, t, 0.5); if (i < 2) sale(`#fo${i}`, B(53.5 + (i + 1) * 2.8) - 0.3, 0.3);
    TODO.forEach((_, k) => { const si = inc.includes(k); js += `tl.to('#tg${k}', { opacity: ${si ? 1 : 0.16}, scale: ${si ? 1 : 0.94}, duration: .35, ease: 'expo.out' }, ${f30(t + 0.15 + k * 0.025)});\n`; });
  });
  js += `tl.fromTo('.tag', { opacity: 0, y: 20 }, { opacity: .16, y: 0, duration: .5, stagger: .02, ease: 'expo.out', immediateRender: false }, ${f30(B(52.6))});\n`;
  sale('#e6t', b - 0.4); sale('.formas', b - 0.4); js += `tl.to('.tags', { opacity: 0, duration: .35 }, ${f30(b - 0.4)});\n`;
}
// ── 7 · Eric y Andoni · «El estudio web que orquesta la IA.»
{
  const a = B(62), b = B(66.5);
  escena('e7', a, b, '#3b231b', `<img class="juntos" id="jt" src="assets/juntos-r140.webp" alt="" /><p class="lin izq" id="e7t">El estudio web<br/>que orquesta la IA.</p><p class="eye nombres" id="e7n">Andoni · Eric</p>`);
  js += `tl.fromTo('#jt', { opacity: 0, y: 40, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .9, ease: 'expo.out', immediateRender: false }, ${f30(a + 0.05)});\n`;
  entra('#e7t', a + 0.5); entra('#e7n', a + 1.1); sale('#e7t', b - 0.35); sale('#e7n', b - 0.35);
  js += `tl.to('#jt', { opacity: 0, filter: 'blur(10px)', duration: .35 }, ${f30(b - 0.35)});\n`;
}
// ── 8 · «La savvia de tu web.» El roble se pinta desde una gota; el logotipo y savvia.studio
{
  const a = B(66.5), b = FIN + 0.1;
  escena('e8', a, b, '#3b231b', `<img class="roble rasgo" id="rb" style="--x:630px;--y:560px" src="assets/arbol-otono.webp" alt="" />
<div class="cierre"><p class="lin" id="e8t">${palabras('La savvia de tu web.')}</p><i class="logo" id="lg"></i><p class="url" id="url">savvia.studio</p></div>`);
  gota('g9', 960, 1012, a + 0.55, 0.5);
  pinta('#rb', a + 0.55, 2.2, 3000);
  porPalabra('#e8t', a + 0.4, 0.08);
  js += `tl.to('#e8t', { opacity: 0, filter: 'blur(12px)', duration: .4 }, ${f30(B(70))});
tl.fromTo('#lg', { opacity: 0, scale: .94, filter: 'blur(12px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: .8, ease: 'expo.out', immediateRender: false }, ${f30(B(70.3))});\n`;
  entra('#url', B(71));
}

const out = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
@font-face { font-family: 'Family'; src: url('assets/family-regular.woff2') format('woff2'); font-weight: 400; }
@font-face { font-family: 'Timeless Sans'; src: url('assets/TimelessSans-Regular.woff2') format('woff2'); font-weight: 420; }
@font-face { font-family: 'Comic Sans MS'; src: local('Comic Sans MS'); }
@font-face { font-family: 'Areal Mono'; src: url('assets/abc-areal-mono-regular.woff2') format('woff2'); font-weight: 400; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1920px; height: 1080px; overflow: hidden; background: #3b231b; }
#root { position: relative; width: 100%; height: 100%; overflow: hidden; background: #3b231b; }
.esc { position: absolute; inset: 0; opacity: 0; overflow: hidden; }
.full { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; }
.centro { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
.centro.alto { justify-content: flex-start; padding-top: 250px; }
.lin { font: 400 100px/1.06 'Family', Georgia, serif; letter-spacing: -.025em; color: #f5f0ea; text-align: center; white-space: nowrap; }
.lin.tenue { color: rgba(245,240,234,.62); }
.pw { display: inline-block; opacity: 0; }
.sub { margin-top: 26px; font: 420 26px/1.3 'Timeless Sans', sans-serif; color: rgba(245,240,234,.7); opacity: 0; }
.eye { font: 400 64px/1.1 'Family', Georgia, serif; color: #f5f0ea; opacity: 0; }
.rasgo { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(var(--x) - var(--m) / 2) calc(var(--y) - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(var(--x) - var(--m) / 2) calc(var(--y) - var(--m) / 2) / var(--m) var(--m) no-repeat; }
/* la gota */
.caida { position: absolute; width: 0; height: 0; z-index: 60; opacity: 0; }
.caida .g { position: absolute; left: -16px; top: -40px; width: 32px; height: 40px; overflow: visible; transform-origin: 50% 100%; filter: drop-shadow(0 6px 8px rgba(0,0,0,.25)); }
.onda { position: absolute; left: -30px; top: -10px; width: 60px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,240,224,.8); opacity: 0; }
.onda.o2 { border-width: 1px; }
/* los dolores */
.dolor { position: absolute; left: 0; right: 0; top: 86px; text-align: center; font: 400 72px/1.08 'Family', Georgia, serif; letter-spacing: -.022em; color: #2a1712; white-space: nowrap; }
.dolor.resp { color: #2a1712; }
.nav { position: absolute; left: 50%; top: 250px; width: 1280px; margin-left: -640px; border-radius: 18px; overflow: hidden; background: #e8e2d9; box-shadow: 0 0 0 1px rgba(48,32,24,.1), 0 50px 110px rgba(48,32,24,.22); opacity: 0; transform-origin: 50% 40%; }
.nav .bar { height: 44px; display: flex; align-items: center; gap: 8px; padding: 0 18px; position: relative; background: #ece6dd; }
.nav .bar i { width: 11px; height: 11px; border-radius: 50%; background: rgba(48,32,24,.18); }
.nav .bar span { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font: 400 15px/1 'Areal Mono', monospace; color: rgba(48,32,24,.65); }
.nav .bar .u2, .nav .bar .pu { opacity: 0; }
.nav .scr { position: relative; width: 100%; height: 720px; overflow: hidden; background: #fff; }
.real { position: absolute; inset: 0; z-index: 3; }
.real video { object-position: 50% 0; }
/* las plantillas */
.pl { position: absolute; inset: 0; font-family: Arial, Helvetica, sans-serif; color: #444; background: #fff; }
.pl-nav { height: 70px; display: flex; align-items: center; gap: 36px; padding: 0 60px; border-bottom: 1px solid #eee; }
.pl-nav b { font-size: 22px; letter-spacing: .1em; color: #999; margin-right: auto; }
.pl-nav i { width: 70px; height: 10px; border-radius: 5px; background: #ddd; }
.pl-nav u { text-decoration: none; padding: 12px 22px; background: #bbb; color: #fff; border-radius: 4px; font-size: 15px; }
.pl-hero { padding: 70px 60px 0; }
.pl-hero h3 { font-size: 54px; font-weight: 700; color: #555; }
.pl-hero p { margin-top: 18px; font-size: 22px; color: #999; }
.pl-hero u { display: inline-block; margin-top: 30px; text-decoration: none; padding: 16px 30px; background: #999; color: #fff; border-radius: 4px; font-size: 17px; }
.pl-img { position: absolute; right: 60px; top: 140px; width: 420px; height: 300px; background: linear-gradient(135deg, #e6e6e6, #cfcfcf); border-radius: 6px; }
.pl-cards { position: absolute; left: 60px; right: 60px; bottom: 50px; display: flex; gap: 30px; }
.pl-cards i { flex: 1; height: 150px; background: #f1f1f1; border-radius: 8px; font-style: normal; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 22px; line-height: 1.4; color: #c9c3ff; text-align: center; }
.slop { background: #0b0a1e; color: #fff; }
.slop .pl-nav { border-color: rgba(255,255,255,.08); } .slop .pl-nav b { color: #fff; } .slop .pl-nav i { background: rgba(255,255,255,.15); }
.slop .pl-nav u { background: linear-gradient(90deg, #7b5cff, #c04cff); border-radius: 30px; }
.slop .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .7; }
.slop .b1 { left: 300px; top: 60px; width: 520px; height: 420px; background: #6d3bff; } .slop .b2 { left: 700px; top: 160px; width: 460px; height: 360px; background: #ff3bd4; opacity: .45; }
.slop .pl-hero { position: relative; text-align: center; }
.slop .pl-hero h3 { color: #fff; font-size: 64px; background: linear-gradient(90deg, #fff, #c9b8ff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.slop .pl-hero p { color: rgba(255,255,255,.65); } .slop .pl-hero u { background: linear-gradient(90deg, #7b5cff, #c04cff); border-radius: 40px; }
.slop .pl-cards i { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); color: #fff; }
.rota .pl-hero h3 { font-family: 'Comic Sans MS', cursive; color: #1d4ed8; } .rota .pl-hero h3 span { font-family: 'Times New Roman', serif; color: #dc2626; font-style: italic; }
.rota .pl-hero p { font-family: 'Courier New', monospace; color: #16a34a; }
.rota .r1 { background: #f59e0b !important; border-radius: 0 !important; } .rota .r4 { background: #ec4899 !important; border-radius: 30px !important; } .rota .r5 { background: #0ea5e9 !important; margin-left: 14px; border-radius: 2px !important; }
.rota .r6 { background: #fde68a; } .rota .r7 { background: #c7d2fe; margin-top: 30px; } .rota .r8 { background: #fecaca; border-radius: 30px; }
/* proyectos */
.est { opacity: 0; filter: blur(2px) brightness(.62); }
.velo { position: absolute; inset: 0; background: linear-gradient(rgba(59,35,27,.7), rgba(59,35,27,.15) 40%, rgba(59,35,27,.55)); }
.titp { position: absolute; left: 0; right: 0; top: 74px; text-align: center; font: 400 64px/1.1 'Family', Georgia, serif; letter-spacing: -.02em; color: #f5f0ea; white-space: nowrap; }
.titp.osc { color: #2a1712; top: 110px; }
.nav.peq { top: 210px; width: 1180px; margin-left: -590px; background: #2a1712; }
.nav.peq .bar { background: #2a1712; } .nav.peq .bar i { background: rgba(245,240,234,.25); } .nav.peq .bar span { color: rgba(245,240,234,.7); }
.nav.peq .scr { height: 664px; }
.po { opacity: 0; }
.pnom { position: absolute; left: 0; right: 0; bottom: 70px; text-align: center; font: 400 22px/1 'Areal Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: rgba(245,240,234,.8); }
.pnom span { position: absolute; left: 0; right: 0; opacity: 0; }
/* tres formas */
.formas { position: absolute; left: 0; right: 0; top: 300px; height: 200px; }
.forma { position: absolute; left: 0; right: 0; text-align: center; font: 400 170px/1 'Family', Georgia, serif; letter-spacing: -.035em; color: #2a1712; opacity: 0; }
.tags { position: absolute; left: 240px; right: 240px; top: 600px; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.tag { padding: 14px 24px; border-radius: 40px; border: 1.5px solid rgba(42,23,18,.5); font: 420 22px/1 'Timeless Sans', sans-serif; color: #2a1712; opacity: 0; }
/* Eric y Andoni */
.juntos { position: absolute; right: 120px; bottom: 0; height: 960px; width: auto; opacity: 0; }
.lin.izq { position: absolute; left: 140px; top: 330px; text-align: left; font-size: 104px; opacity: 0; }
.nombres { position: absolute; left: 144px; top: 610px; font: 400 24px/1 'Areal Mono', monospace; letter-spacing: .16em; text-transform: uppercase; color: rgba(245,240,234,.7); }
/* cierre */
.roble { position: absolute; left: 50%; bottom: 0; width: 1260px; margin-left: -630px; }
.cierre { position: absolute; left: 0; right: 0; top: 200px; display: flex; flex-direction: column; align-items: center; }
.cierre .lin { position: absolute; top: 40px; }
.logo { display: block; width: 520px; height: 193px; background: #f5f0ea; -webkit-mask: url(assets/savvia-logo.svg) center / contain no-repeat; mask: url(assets/savvia-logo.svg) center / contain no-repeat; opacity: 0; }
.url { margin-top: 28px; font: 400 26px/1 'Areal Mono', monospace; letter-spacing: .16em; color: rgba(245,240,234,.75); opacity: 0; }
#grano { position: absolute; inset: 0; background: url(assets/grano.png); opacity: .55; pointer-events: none; z-index: 900; }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${FIN}" data-width="1920" data-height="1080">
<svg width="0" height="0" style="position:absolute"><defs><radialGradient id="agua" cx=".4" cy=".55" r=".7"><stop offset="0" stop-color="#fff6ea" stop-opacity=".35"/><stop offset=".7" stop-color="#f3d7b6" stop-opacity=".55"/><stop offset="1" stop-color="#fff3e4" stop-opacity=".95"/></radialGradient></defs></svg>
${html}
${GOTAS}
<div id="grano" data-layout-allow-occlusion></div>
<audio id="music" data-timeline-role="music" src="assets/${MUSICA}" data-start="0" data-duration="${FIN}" data-track-index="9" data-media-start="0"
  data-automation='{"version":1,"lanes":[{"target":"volume","points":[{"t":0,"v":0.9},{"t":${f30(FIN - 2.4)},"v":0.9},{"t":${FIN},"v":0}]}]}'></audio>
</div>
<script>
const tl = gsap.timeline({ paused: true });
${js}
window.__timelines['main'] = tl;
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'hf', 'index.html'), out);
console.log('index.html · FIN', FIN, 's ·', vid, 'vídeos · BPM', BPM);
