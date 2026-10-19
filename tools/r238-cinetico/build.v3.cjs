// RONDA 238 · REEL CINÉTICO (prueba). Andoni: «podemos probar algo de este estilo» (Linearity AI, x.com/linearityhq/status/2110362970119454745: tipografía
// cinética, palabra a palabra y desenfocada, con la INTERFAZ dentro de la frase —«edit [anuncio] text»—, manchas de degradado cálido de respiro, centro en
// claro, apertura y cierre en negro). Aquí: savvia agentic contado con su librería, sus agentes y las webs. Cortes al pulso de «Distant Miles».
// node tools/r238-cinetico/build.cjs → hf/index.html
const fs = require('fs'), path = require('path');
const T = 0.6455, f30 = (x) => Math.round(x * 30) / 30, B = (n) => f30(1.02 + n * T);
const FIN = B(45);
let html = '', js = '', z = 10, vid = 0;
const escena = (id, a, b, fondo, inner) => {
  html += `<div class="esc" id="${id}" style="z-index:${z++};background:${fondo}">${inner}</div>\n`;
  js += `tl.set('#${id}', { opacity: 1 }, ${f30(a)}); tl.set('#${id}', { opacity: 0 }, ${f30(b)});\n`;
};
const video = (src, a, b, ms, cls = 'full') => `<video id="v${++vid}" class="${cls}" src="assets/${src}.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="${ms}" data-track-index="${1 + (vid % 3)}" muted playsinline></video>`;
// una palabra que entra desenfocada y sube; sale desenfocándose hacia arriba
const entra = (sel, t, d = 0.55) => { js += `tl.fromTo('${sel}', { opacity: 0, filter: 'blur(22px)', y: 34 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: ${d}, ease: 'expo.out', immediateRender: false }, ${f30(t)});\n`; };
const sale = (sel, t, d = 0.35) => { js += `tl.to('${sel}', { opacity: 0, filter: 'blur(16px)', y: -24, duration: ${d}, ease: 'power2.in' }, ${f30(t)});\n`; };
// una frase «palabra [interfaz] palabra»: el hueco central se abre empujando a las palabras y la interfaz brota en él
const frase = (id, izq, der, W, H, card, tAbre, tCierra) => {
  js += `tl.set('#${id} .hueco', { width: 0 }, 0); tl.set('#${id} .card', { scale: 0, opacity: 0 }, 0);
tl.to('#${id} .hueco', { width: ${W + 72}, duration: .7, ease: 'expo.inOut' }, ${f30(tAbre)});
tl.to('#${id} .card', { scale: 1, opacity: 1, duration: .7, ease: 'expo.out' }, ${f30(tAbre + 0.18)});\n`;
  if (tCierra) js += `tl.to('#${id} .card', { scale: .85, opacity: 0, filter: 'blur(10px)', duration: .35, ease: 'power2.in' }, ${f30(tCierra)});\n`;
  return `<div class="frase${id === 'f3' ? ' compacta' : ''}" id="${id}"><span class="w izq">${izq}</span><span class="hueco"><span class="card" style="width:${W}px;height:${H}px;margin:${-H / 2}px 0 0 ${-W / 2}px">${card}</span></span><span class="w der">${der}</span></div>`;
};

let CSS_EXTRA = '';
// ── 1 · NEGRO: la GOTA de agua de la carga cae al centro y, del impacto, nace el manifiesto de la web (home.ts › problemas)
{
  const a = 0, b = B(4.2);
  escena('e1', a, b, '#140d0a', `<div class="centro"><p class="lin" id="l1"><span id="w1">La IA es la base;</span></p><p class="lin tenue2" id="l2"><span id="w2">el criterio sigue siendo nuestro.</span></p></div>`);
  entra('#w1', B(0) + 0.15); entra('#w2', B(1.3));
  sale('#l1', B(3.7)); sale('#l2', B(3.75));
}
// ── 2 · «savvia agentic: tu web conectada con la IA.» (manifiesto), sobre negro liso
{
  const a = B(4), b = B(7.6);
  escena('e2', a, b, '#140d0a', `<div class="centro"><p class="lin" id="a1"><span>savvia agentic:</span></p><p class="lin tenue2" id="a2"><span>tu web conectada con la IA.</span></p></div>`);
  entra('#a1 span', B(4.2)); entra('#a2 span', B(5.2)); sale('#a1', B(7.1)); sale('#a2', B(7.15));
}
// ── 3 · CLARO: «Los fundamentos de diseño y desarrollo de tu web, [la librería] en una librería que cualquier IA sabe leer.» (savvia agentic)
const FILAS = ['Color', 'Tipografía', 'Voz', 'Espaciado', 'Radios y tokens', 'Componentes de la web'];
const libreria = (pref) => `<div class="lib"><div class="lib-bar"><i></i><i></i><i></i><span>neety / library</span></div><div class="lib-c"><p class="lib-h">La librería</p><p class="lib-g">Fundamentos</p>${FILAS.slice(0, 5).map((f, i) => `<div class="lib-r" id="${pref}r${i}"><i></i>${f}</div>`).join('')}<p class="lib-g">Componentes</p><div class="lib-r" id="${pref}r5"><i></i>${FILAS[5]}</div></div></div>`;
{
  const a = B(7.5), b = B(11.9);
  escena('e3', a, b, '#f6f3ee', `<p class="linea arriba" id="f3a">Los fundamentos de diseño y desarrollo de tu web,</p><div class="lib-caja" id="lib3" style="width:360px;height:440px">${libreria('l3')}</div><p class="linea abajo" id="f3b">en una librería que cualquier IA sabe leer.</p>`);
  js += `tl.fromTo('#e3', { opacity: 0 }, { opacity: 1, duration: .35, immediateRender: false }, ${f30(a)});
tl.fromTo('#lib3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'expo.out', immediateRender: false }, ${B(8.6)});
tl.to('#lib3', { scale: .85, opacity: 0, filter: 'blur(10px)', duration: .35, ease: 'power2.in' }, ${B(11.4)});\n`;
  entra('#f3a', B(7.7)); entra('#f3b', B(9.4));
  FILAS.forEach((_, i) => { js += `tl.fromTo('#l3r${i}', { backgroundColor: 'rgba(91,44,78,0)' }, { backgroundColor: 'rgba(91,44,78,.14)', duration: .12, immediateRender: false }, ${f30(B(9.8) + i * 0.14)});
tl.to('#l3r${i}', { backgroundColor: 'rgba(91,44,78,0)', duration: .4 }, ${f30(B(9.8) + i * 0.14 + 0.3)});\n`; });
  sale('#f3a', B(11.4)); sale('#f3b', B(11.45));
}
// ── 3b · LA LIBRERÍA, de verdad: «La web, su receta y los agentes que la mantienen al día.» (producto.frase) + la escena de savvia agentic
{
  const a = B(11.7), b = B(17.6), RATE = 1.6;
  escena('e3b', a, b, '#f6f3ee', `<p class="cabeza" id="cab3b">La web, su receta y los agentes que la mantienen al día.</p><div class="pelicula" id="peli"><video id="v${++vid}" class="full" src="assets/agentic.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="1.0" data-playback-rate="${RATE}" data-track-index="2" muted playsinline></video></div><p class="pie-obra visible" id="pie3b">Claude · Codex · tu equipo · savvia</p>`);
  js += `tl.fromTo('#peli', { opacity: 0, y: 80, scale: .94 }, { opacity: 1, y: 0, scale: 1, duration: .9, ease: 'expo.out', immediateRender: false }, ${f30(a)});
tl.fromTo('#peli', { scale: 1 }, { scale: 1.06, duration: ${f30(b - a - 1)}, ease: 'none', immediateRender: false }, ${f30(a + 0.9)});
tl.to('#peli', { opacity: 0, filter: 'blur(12px)', duration: .35, ease: 'power2.in' }, ${f30(B(17.1))});\n`;
  entra('#cab3b', B(11.9)); entra('#pie3b', B(12.7)); sale('#cab3b', B(17.05)); sale('#pie3b', B(17.05));
}
// ── 4 · «Así tú y tu equipo podréis cambiar lo que queráis» (savvia agentic) + la petición que se escribe
{
  const a = B(17.4), b = B(20.7), PEDIDO = 'Cambia el titular y añade una sección de precios';
  escena('e4', a, b, '#f6f3ee', `<p class="linea arriba" id="f4a">Así tú y tu equipo podréis cambiar lo que queráis</p><div class="lib-caja" id="pide4" style="width:720px;height:170px"><div class="pide"><p class="pide-t"><span class="chispa"></span>savvia agentic</p><p class="pide-x"><span id="tecla">${PEDIDO}</span><i class="cursor"></i></p><span class="enviar" id="enviar">↑</span></div></div>`);
  entra('#f4a', B(17.6));
  js += `tl.fromTo('#pide4', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'expo.out', immediateRender: false }, ${B(18.2)});
tl.fromTo('#tecla', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'steps(${PEDIDO.length})', immediateRender: false }, ${f30(B(18.6))});
tl.fromTo('#enviar', { scale: 1 }, { scale: .82, duration: .12, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, ${f30(B(20.2))});
tl.to('#pide4', { scale: .85, opacity: 0, filter: 'blur(10px)', duration: .35, ease: 'power2.in' }, ${B(20.4)});\n`;
  sale('#f4a', B(20.4));
}
// ── 5 · «edita [texto] textos» · «cambia [el hero en sus estaciones] colores» · «mueve [secciones] secciones»
{
  const a = B(20.6), b = B(26.6), N0 = 20.6;
  const edita = `<div class="mini">${video('neety-vivo', B(N0), B(N0 + 2.2), 3.6, 'full')}<i class="sel" id="sel"></i><i class="cur" id="cur"></i></div>`;
  const cambia = `<div class="mini arbol">${['otono', 'invierno', 'primavera', 'verano'].map((e, i) => `<img class="rob${i ? ' rasgo' : ''}" id="rob${i}" src="assets/hero-${e}.jpg" alt="" />`).join('')}</div>`;
  const mueve = `<div class="mini secs">${['#bcd3f5', '#f6a46b', '#5b2c4e'].map((c, i) => `<i class="sec" id="sec${i}" style="background:${c};top:${22 + i * 98}px"></i>`).join('')}</div>`;
  escena('e5', a, b, '#f6f3ee', frase('f5a', 'edita', 'textos', 560, 315, edita, B(N0 + 0.3), B(N0 + 1.9)) + frase('f5b', 'cambia', 'colores', 560, 315, cambia, B(N0 + 2.3), B(N0 + 3.9)) + frase('f5c', 'mueve', 'secciones', 560, 315, mueve, B(N0 + 4.3), B(N0 + 5.8)));
  [['f5a', N0], ['f5b', N0 + 2], ['f5c', N0 + 4]].forEach(([id, n]) => { entra(`#${id} .izq`, B(n + 0.05)); entra(`#${id} .der`, B(n + 0.55)); sale(`#${id} .izq`, B(n + 1.9)); sale(`#${id} .der`, B(n + 1.92)); });
  js += `tl.fromTo('#sel', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: .45, ease: 'expo.out', immediateRender: false }, ${f30(B(N0 + 0.9))});
tl.fromTo('#cur', { x: 200, y: 140, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .5, ease: 'expo.out', immediateRender: false }, ${f30(B(N0 + 0.6))});\n`;
  [1, 2, 3].forEach((i) => { js += `tl.fromTo('#rob${i}', { '--m': '0px' }, { '--m': '1400px', duration: .7, ease: 'power2.inOut', immediateRender: false }, ${f30(B(N0 + 2.5) + (i - 1) * 0.42)});\n`; });
  js += `tl.to('#sec0', { y: 196, duration: .5, ease: 'expo.inOut' }, ${f30(B(N0 + 4.8))}); tl.to('#sec2', { y: -196, duration: .5, ease: 'expo.inOut' }, ${f30(B(N0 + 4.8))});
tl.to('#sec1', { scaleX: .9, duration: .25, yoyo: true, repeat: 1, ease: 'power2.inOut' }, ${f30(B(N0 + 4.8))});\n`;
}
// ── 6 · «Proyectos destacados con desarrollo agéntico.»: las webs se MONTAN como en el reel de la mesa (retícula → cajas → agentes con fichas → la web real)
const { build, CSS: CSS_BUILD } = require('./build-obra.cjs');
{
  const a = B(26.5), b = B(36.2), BW = 1100, BH = 619;
  const OBRAS = [
    ['kuanta-portada', 'Kuanta', 0.15, { bg: '#16151b', ink: '234,221,231', boxes: [
      { k: 'logo', x: .06, y: .022, w: .075, h: .028 }, { k: 'row', n: 5, x: .445, y: .024, w: .2, h: .024 }, { k: 'btn', x: .775, y: .017, w: .065, h: .038, fill: '#e3263b' },
      { k: 'txt', n: 4, big: 1, x: .06, y: .275, w: .27, h: .37, l: 'h1 · 96/1.0' }, { k: 'txt', n: 3, x: .06, y: .665, w: .29, h: .085, from: [0, .04] },
      { k: 'btn', x: .06, y: .79, w: .115, h: .045, fill: '#e3263b', from: [0, .05] },
      { k: 'circ', x: .53, y: .19, w: .344, h: .611, l: '<canvas> esfera', fill: 'radial-gradient(circle, rgba(227,38,59,.32), rgba(227,38,59,.05) 60%, rgba(227,38,59,0) 71%)' }],
      agents: [{ k: 'claude', path: [[.52, .97, .7], [.2, .45, 1.3], [.7, .5, 1.85], [.13, .815, 2.35], [.34, .9, 2.85]] }],
      chips: [{ txt: 'Aa · 96 / 1.0', a: 0, b: 1.3, to: 3 }, { txt: 'esfera · 2 400 puntos', a: 0, b: 1.85, to: 6 }, { txt: '#E3263B', sw: '#e3263b', a: 0, b: 2.35, to: 5 }],
      prompt: { k: 'claude', txt: 'monta el hero de Kuanta con su librería' }, snap: 2.2 }],
    ['home-of-ambrose-grande', 'Home of Ambrose', 0.2, { bg: '#9a7a55', ink: '255,246,232', boxes: [
      { k: 'img', x: 0, y: 0, w: 1, h: 1, l: 'foto · a sangre', fill: 'radial-gradient(ellipse at 40% 45%, #c39b6c, #7a5a3a 75%)' },
      { k: 'logo', x: .01, y: .022, w: .13, h: .026 }, { k: 'row', n: 3, x: .8, y: .022, w: .18, h: .022 },
      { k: 'txt', n: 1, big: 1, x: .017, y: .11, w: .35, h: .19, l: 'h1 · a la deriva' }, { k: 'txt', n: 1, big: 1, x: .45, y: .31, w: .28, h: .17 },
      { k: 'txt', n: 1, big: 1, x: .885, y: .31, w: .1, h: .17 }, { k: 'txt', n: 1, big: 1, x: .26, y: .52, w: .17, h: .17 }, { k: 'txt', n: 1, big: 1, x: .58, y: .81, w: .09, h: .16 }],
      agents: [{ k: 'diseno', path: [[.5, .98, .6], [.2, .2, 1.3], [.55, .4, 1.75], [.35, .62, 2.2], [.7, .9, 2.85]] }],
      chips: [{ txt: 'Aa · titular a la deriva', a: 0, b: 1.3, to: 3 }, { txt: 'foto · luz de tarde', a: 0, b: 1.75, to: 0 }, { txt: 'h1 · 5 palabras sueltas', a: 0, b: 2.2, to: 6 }],
      prompt: { k: 'diseno', txt: 'compón el titular a la deriva sobre la foto' }, snap: 2.3 }],
    ['cubbo-grande', 'Cubbo', 0.2, { bg: '#3150e6', ink: '255,255,255', boxes: [
      { k: 'logo', x: .02, y: .015, w: .06, h: .026 }, { k: 'row', n: 6, x: .43, y: .018, w: .33, h: .022 }, { k: 'btn', x: .81, y: .012, w: .1, h: .032, fill: '#ffffff' },
      { k: 'txt', n: 2, big: 1, x: .08, y: .18, w: .6, h: .22, l: 'h1 · 56/1.1' },
      { k: 'circ', x: .62, y: .25, w: .45, h: .8, l: 'ondas', fill: 'radial-gradient(circle, rgba(255,255,255,.14), rgba(255,255,255,0) 70%)' },
      { k: 'txt', n: 2, x: .08, y: .86, w: .42, h: .06, from: [0, .04] }, { k: 'btn', x: .8, y: .885, w: .12, h: .05, fill: '#ffffff', from: [0, .05] }],
      agents: [{ k: 'codex', path: [[.9, .95, .6], [.3, .28, 1.3], [.85, .5, 1.75], [.86, .9, 2.2], [.6, .95, 2.85]] }],
      chips: [{ txt: 'h1 · 2 líneas', a: 0, b: 1.3, to: 3 }, { txt: '<Ondas anillos={6} />', a: 0, b: 1.75, to: 4 }, { txt: '#3150E6', sw: '#3150e6', a: 0, b: 2.2, to: 6 }],
      prompt: { k: 'codex', txt: 'monta el hero con el azul de Cubbo' }, snap: 2.3 }],
  ];
  let inner = `<p class="cabeza" id="cab6">Proyectos destacados con desarrollo agéntico.</p>`;
  OBRAS.forEach(([clip, nombre, ms, o], i) => {
    const t0 = B(27 + i * 3), take = B(29 + i * 3), t1 = B(30 + i * 3);
    const bb = build({ id: 'k' + i, W: BW, H: BH, s: 1.1, t0, take, ...o });
    inner += `<div class="obra montada" id="o6${i}"><div class="bar"><i></i><i></i><i></i><span>${nombre.toLowerCase().replace(/ /g, '')}</span></div><div class="scr">${video(clip, take - 0.1, t1 + 0.1, ms)}${bb.html}</div></div><p class="nombre-obra" id="n6${i}">${nombre}</p>`;
    js += bb.js;
    js += `tl.fromTo('#o6${i}', { opacity: 0, y: 160, rotationX: 22, scale: .92 }, { opacity: 1, y: 0, rotationX: 6, scale: 1, duration: .8, ease: 'expo.out', immediateRender: false }, ${f30(t0 - 0.2)});
tl.set('#o6${i}', { opacity: 0 }, ${f30(t1)});
tl.fromTo('#n6${i}', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out', immediateRender: false }, ${f30(take + 0.2)});
tl.set('#n6${i}', { opacity: 0 }, ${f30(t1)});\n`;
  });
  escena('e6', a, b, '#f6f3ee', inner);
  entra('#cab6', B(26.6)); sale('#cab6', B(35.7));
  CSS_EXTRA = CSS_BUILD;
}
// ── 8 · EL HERO de savvia, como en la web, con su titular: guías, haz, el roble pintado y las cuatro estaciones
{
  const a = B(36), b = FIN + 0.1, EST = ['otono', 'invierno', 'primavera', 'verano'];
  escena('e8', a, b, '#3b231b', EST.map((e, i) => `<img class="hero-est${i ? ' rasgo-h' : ''}" id="h8${i}" src="assets/hero-${e}.jpg" alt="" />`).join('') + `<div class="hero-t" id="ht8"><p class="hero-h1">Elevamos tu web con IA.</p><p class="hero-sub">Especialistas en orquestar el desarrollo agéntico.</p></div>`);
  js += `tl.fromTo('#e8', { opacity: 0 }, { opacity: 1, duration: .5, immediateRender: false }, ${f30(a)});
tl.fromTo('#h80', { scale: 1.04 }, { scale: 1, duration: 1.6, ease: 'expo.out', immediateRender: false }, ${f30(a)});
tl.fromTo('#ht8', { opacity: 0, filter: 'blur(20px)', y: 18 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .9, ease: 'expo.out', immediateRender: false }, ${B(36.4)});\n`;
  [1, 2, 3].forEach((i) => { js += `tl.fromTo('#h8${i}', { '--m': '0px' }, { '--m': '4800px', duration: 1.3, ease: 'power2.inOut', immediateRender: false }, ${B(36.2 + i * 1.8)});\n`; });
  js += `tl.to('#ht8', { color: '#22303e', duration: .6 }, ${f30(B(38) + 0.4)}); tl.to('#ht8', { color: '#f5f5f7', duration: .6 }, ${f30(B(39.8) + 0.4)});\n`;
}
const hs = (i) => { const x = Math.sin(i * 91.7 + 13.1) * 43758.5453; return x - Math.floor(x); };
let SALP = '', SALP_JS = '';
for (let i = 0; i < 11; i++) {
  const ang = Math.PI * (0.08 + 0.84 * (i + hs(i) * 0.6) / 11), v = 140 + 190 * hs(i + 7), dx = -Math.cos(ang) * v * 1.5, up = Math.sin(ang) * v, r = 4 + 6 * hs(i + 3);
  SALP += `<i class="sp" id="sp${i}" style="width:${r.toFixed(1)}px;height:${r.toFixed(1)}px;margin:${(-r / 2).toFixed(1)}px 0 0 ${(-r / 2).toFixed(1)}px"></i>`;
  const d = 0.55 + 0.25 * hs(i + 11), du = f30(d * 0.45);
  SALP_JS += `tl.fromTo('#sp${i}', { x: 0, opacity: .85 }, { x: ${dx.toFixed(0)}, duration: ${d.toFixed(2)}, ease: 'none', immediateRender: false }, ${B(0)});
tl.fromTo('#sp${i}', { y: 0 }, { y: ${(-up).toFixed(0)}, duration: ${du}, ease: 'power2.out', immediateRender: false }, ${B(0)});
tl.to('#sp${i}', { y: ${(up * 0.35).toFixed(0)}, opacity: 0, duration: ${f30(d * 0.55)}, ease: 'power2.in' }, ${f30(B(0) + du + 1 / 30)});\n`;
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
@font-face { font-family: 'Areal Mono'; src: url('assets/abc-areal-mono-regular.woff2') format('woff2'); font-weight: 400; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1920px; height: 1080px; overflow: hidden; background: #140d0a; }
#root { position: relative; width: 100%; height: 100%; overflow: hidden; background: #140d0a; }
.esc { position: absolute; inset: 0; opacity: 0; overflow: hidden; perspective: 2200px; }
.full { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; }
.centro { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.lin { font: 400 96px/1.08 'Family', Georgia, serif; letter-spacing: -.025em; color: #f5f0ea; text-align: center; white-space: nowrap; }
.lin span { display: inline-block; opacity: 0; }
.lin.claro { opacity: 0; } .lin.tenue { color: rgba(245, 240, 234, .55); }
.tach { position: relative; color: #ff616b; }
.tach i { position: absolute; left: -2%; right: -2%; top: 55%; height: 6px; border-radius: 3px; background: #ff616b; transform-origin: 0 50%; transform: scaleX(0); }
/* manchas del degradado (los respiros cálidos) */
.mancha { position: absolute; border-radius: 50%; filter: blur(120px); }
.m1 { left: 520px; top: 120px; width: 900px; height: 900px; background: #ff616b; opacity: .85; }
.m2 { left: 980px; top: 360px; width: 760px; height: 760px; background: #f0a83c; opacity: .75; }
.m3 { left: 220px; top: 420px; width: 820px; height: 820px; background: #c65c2d; opacity: .8; }
.grande { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font: 400 120px/1 'Family', Georgia, serif; color: #fff3ea; letter-spacing: -.03em; opacity: 0; }
.marca { position: absolute; left: 0; right: 0; top: 50%; margin-top: -90px; height: 180px; display: flex; align-items: center; justify-content: center; gap: 26px; opacity: 0; }
.marca img { height: 150px; width: auto; }
.marca span { font: 400 118px/1 'Family', Georgia, serif; color: #fff3ea; letter-spacing: -.02em; margin-top: 18px; }
.marca.cierre { top: 150px; margin-top: 0; } .marca.cierre img { height: 112px; } .marca.cierre span { font-size: 88px; margin-top: 12px; }
/* la frase con la interfaz dentro */
.frase { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.w { font: 400 88px/1 'Family', Georgia, serif; letter-spacing: -.025em; color: #2a1712; white-space: nowrap; opacity: 0; }
.w.der { color: #c0472a; }
.frase.compacta .w { font-size: 80px; }
.hueco { position: relative; display: block; width: 0; height: 10px; }
.card { position: absolute; left: 50%; top: 50%; transform-origin: 50% 50%; display: block; }
.lib { position: absolute; inset: 0; background: #fbf8f1; border-radius: 14px; overflow: hidden; box-shadow: 0 0 0 1px rgba(48,32,24,.1), 0 30px 70px rgba(48,32,24,.18); }
.lib-bar { height: 34px; display: flex; align-items: center; gap: 6px; padding: 0 12px; border-bottom: 1px solid rgba(48,32,24,.1); background: #f1ece2; }
.lib-bar i { width: 8px; height: 8px; border-radius: 50%; background: rgba(48,32,24,.2); }
.lib-bar span { margin-left: 10px; font: 400 14px/1 'Areal Mono', monospace; color: rgba(48,32,24,.75); }
.lib-c { padding: 22px 22px 16px; }
.lib-h { font: 400 34px/1 'Family', Georgia, serif; color: #2a1712; margin-bottom: 10px; }
.lib-g { font: 400 12px/1 'Areal Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: rgba(48,32,24,.7); margin: 12px 0 4px; }
.lib-r { display: flex; align-items: center; gap: 10px; height: 40px; padding: 0 10px; margin: 0 -10px; border-radius: 8px; font: 420 20px/1 'Timeless Sans', sans-serif; color: #3a2a24; }
.lib-r i { width: 5px; height: 5px; border-radius: 50%; background: #f0532d; }
.pide { position: absolute; inset: 0; background: #fff; border-radius: 18px; padding: 22px 24px; box-shadow: 0 0 0 1px rgba(48,32,24,.1), 0 30px 70px rgba(48,32,24,.16); }
.pide-t { display: flex; align-items: center; gap: 10px; font: 400 14px/1 'Areal Mono', monospace; color: rgba(48,32,24,.7); }
.chispa { width: 12px; height: 12px; border-radius: 50%; background: #ff616b; }
.pide-x { margin-top: 26px; font: 420 26px/1.2 'Timeless Sans', sans-serif; color: #2a1712; white-space: nowrap; display: flex; align-items: center; }
.cursor { display: inline-block; width: 2px; height: 30px; background: #2a1712; margin-left: 4px; }
.enviar { position: absolute; right: 20px; bottom: 18px; width: 44px; height: 44px; border-radius: 50%; background: #2a1712; color: #fff; font: 400 22px/44px 'Timeless Sans', sans-serif; text-align: center; }
.mini { position: absolute; inset: 0; border-radius: 14px; overflow: hidden; background: #fff; box-shadow: 0 0 0 1px rgba(48,32,24,.1), 0 30px 70px rgba(48,32,24,.18); }
.sel { position: absolute; left: 20px; top: 92px; width: 250px; height: 74px; border: 2px solid #f0532d; border-radius: 4px; transform-origin: 0 50%; opacity: 0; }
.cur { position: absolute; left: 266px; top: 158px; width: 18px; height: 22px; background: #2a1712; clip-path: polygon(0 0, 0 100%, 30% 72%, 52% 100%, 66% 92%, 45% 66%, 100% 64%); opacity: 0; }
.arbol .rob { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: 50% 100%; }
.rasgo { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(280px - var(--m) / 2) calc(315px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(280px - var(--m) / 2) calc(315px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.secs { background: #f7f3ec; }
.sec { position: absolute; left: 26px; right: 26px; height: 78px; border-radius: 8px; transform-origin: 50% 50%; }
/* las webs */
.obra { position: absolute; left: 50%; top: 50%; width: 1280px; margin: -380px 0 0 -640px; border-radius: 16px; overflow: hidden; background: #2a1712; box-shadow: 0 0 0 1px rgba(48,32,24,.14), 0 70px 140px rgba(48,32,24,.3); opacity: 0; transform-origin: 50% 50%; }
.obra .bar { height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 18px; position: relative; }
.obra .bar i { width: 11px; height: 11px; border-radius: 50%; background: rgba(245,240,234,.28); }
.obra .bar span { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font: 400 14px/1 'Areal Mono', monospace; color: rgba(245,240,234,.72); }
.obra .scr { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #fff; }
.pie-obra { position: absolute; left: 0; right: 0; bottom: 70px; text-align: center; font: 400 18px/1 'Areal Mono', monospace; color: rgba(42,23,18,.75); opacity: 0; }
.obra.ladeada { width: 1100px; margin: -300px 0 0 -550px; }
.nombre { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 400 150px/1 'Family', Georgia, serif; letter-spacing: -.035em; color: #2a1712; opacity: 0; white-space: nowrap; }
.roble-fin { position: absolute; left: 50%; bottom: 0; width: 1180px; margin-left: -590px; opacity: 1; }
.rasgo-fin { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(590px - var(--m) / 2) calc(546px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(590px - var(--m) / 2) calc(546px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.url { position: absolute; left: 0; right: 0; top: 300px; text-align: center; font: 400 22px/1 'Areal Mono', monospace; letter-spacing: .14em; color: rgba(245,240,234,.72); opacity: 0; }
.nombre-p { color: #fff3ea; }
.cabeza { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 400 60px/1.1 'Family', Georgia, serif; letter-spacing: -.02em; color: #2a1712; opacity: 0; }
.pelicula { position: absolute; left: 50%; top: 170px; width: 1440px; height: 810px; margin-left: -720px; border-radius: 18px; overflow: hidden; background: #f6f3ee; box-shadow: 0 0 0 1px rgba(48,32,24,.1), 0 40px 90px rgba(48,32,24,.18); opacity: 0; transform-origin: 50% 40%; }
.pelicula video { object-position: 50% 50%; }
.pie-obra.visible { bottom: 34px; }
.hero-est { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.rasgo-h { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.hero-t { position: absolute; left: 0; right: 0; top: 296px; text-align: center; color: #f5f5f7; opacity: 0; z-index: 5; }
.hero-h1 { font: 400 76px/1.05 'Family', Georgia, serif; letter-spacing: -.025em; }
.hero-sub { margin-top: 26px; font: 420 20px/1.3 'Timeless Sans', sans-serif; opacity: .72; }
${CSS_EXTRA}
#caida { position: absolute; left: 50%; top: 50%; width: 0; height: 0; z-index: 50; }
#gota0 { position: absolute; left: -170px; top: -40px; width: 210px; height: 80px; transform-origin: 170px 40px; overflow: visible; }
.onda { position: absolute; left: -20px; top: -20px; width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(246, 228, 204, .6); opacity: 0; }
.corona { position: absolute; left: -22px; top: -6px; width: 44px; height: 12px; border-radius: 50%; border: 2px solid rgba(246, 228, 204, .7); opacity: 0; }
.sp { position: absolute; left: 0; top: 0; border-radius: 50%; background: rgba(246, 228, 204, .7); box-shadow: inset -1px -1px 0 rgba(255,243,228,.6); opacity: 0; }
.lin.tenue2 { color: rgba(245, 240, 234, .55); }
.linea { position: absolute; left: 0; right: 0; text-align: center; font: 400 64px/1.1 'Family', Georgia, serif; letter-spacing: -.02em; color: #2a1712; opacity: 0; }
.linea.arriba { top: 150px; } .linea.abajo { bottom: 150px; color: #c0472a; }
.lib-caja { position: absolute; left: 50%; top: 50%; transform-origin: 50% 50%; display: block; }
#lib3 { margin: -220px 0 0 -180px; } #pide4 { margin: -40px 0 0 -360px; }
.obra.montada { top: 56%; width: 1100px; margin: -330px 0 0 -550px; }
.nombre-obra { position: absolute; left: 0; right: 0; bottom: 52px; text-align: center; font: 400 22px/1 'Areal Mono', monospace; letter-spacing: .08em; color: rgba(42,23,18,.75); opacity: 0; }
#grano { position: absolute; inset: 0; background: url(assets/grano.png); opacity: .55; pointer-events: none; z-index: 900; }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${FIN}" data-width="1920" data-height="1080">
${html}
<div id="caida"><div class="onda" id="onda0"></div><i class="corona" id="corona0"></i>${SALP}
<svg id="gota0" viewBox="-34 -8 42 16"><defs>
<filter id="ga-mb" filterUnits="userSpaceOnUse" x="-160" y="-60" width="220" height="120"><feGaussianBlur id="ga-mbn" stdDeviation="0 0"/></filter>
<radialGradient id="ga-agua" cx="0" cy="0" r="6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3dcc0" stop-opacity=".10"/><stop offset=".62" stop-color="#e9c9a3" stop-opacity=".18"/><stop offset=".86" stop-color="#f6e4cc" stop-opacity=".5"/><stop offset="1" stop-color="#fff3e4" stop-opacity=".85"/></radialGradient>
<radialGradient id="ga-trans" cx="0" cy="3.4" r="4.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd9a8" stop-opacity=".62"/><stop offset="1" stop-color="#ffd9a8" stop-opacity="0"/></radialGradient>
</defs>
<path id="estela0" filter="url(#ga-mb)" d="M0 -2.4C-22 -1.8 -70 -0.6 -110 0C-70 0.6 -22 1.8 0 2.4Z" fill="rgba(246,228,204,.3)" transform="scale(0 1)" opacity="0"/>
<circle r="6" fill="url(#ga-agua)"/>
<g transform="rotate(-90)"><circle r="4.6" fill="url(#ga-trans)" transform="translate(0 .4)"/><ellipse cx="-2.1" cy="-2.6" rx="1.7" ry="1.05" transform="rotate(-35 -2.1 -2.6)" fill="#fff" fill-opacity=".92"/><circle cx="2.4" cy="-1.2" r=".45" fill="#fff" fill-opacity=".6"/></g>
</svg></div>
<div id="grano" data-layout-allow-occlusion></div>
<audio id="music" data-timeline-role="music" src="assets/distant-miles.mp3" data-start="0" data-duration="${FIN}" data-track-index="9" data-media-start="0"
  data-automation='{"version":1,"lanes":[{"target":"volume","points":[{"t":0,"v":0.9},{"t":${f30(FIN - 2.2)},"v":0.9},{"t":${FIN},"v":0}]}]}'></audio>
</div>
<script>
const tl = gsap.timeline({ paused: true });
// — gancho: la gota de AGUA de la carga (Cargador.astro): cuelga, cae estirándose con su estela desenfocada y salpica; desde el impacto se abre Kuanta —
const mb = document.getElementById('ga-mbn'), gv = { v: 0 }, gmb = () => mb.setAttribute('stdDeviation', gv.v.toFixed(2) + ' 0');
tl.set('#gota0', { rotation: 90, y: -470, scale: 0 }, 0);
tl.to('#gota0', { scale: 1, duration: .34, ease: 'back.out(1.6)' }, .02);
tl.to('#gota0', { scaleX: 1.14, scaleY: .9, duration: .12, ease: 'sine.inOut', yoyo: true, repeat: 1 }, .25);
tl.to('#gota0', { y: 0, duration: ${f30(B(0) - 0.5)}, ease: 'power2.in' }, .5);
tl.to('#gota0', { scaleX: 1.42, scaleY: .8, duration: ${f30(B(0) - 0.5)}, ease: 'power2.in' }, .5);
tl.fromTo('#estela0', { attr: { transform: 'scale(0 1)' }, opacity: 0 }, { attr: { transform: 'scale(.42 1)' }, opacity: .7, duration: ${f30(B(0) - 0.62)}, ease: 'power2.in', immediateRender: false }, .62);
tl.to(gv, { v: 3.2, duration: ${f30(B(0) - 0.62)}, ease: 'power2.in', onUpdate: gmb }, .62);
tl.to('#gota0', { scaleX: .18, scaleY: 2.1, opacity: 0, duration: .1, ease: 'power2.out' }, ${B(0)});
tl.fromTo('#corona0', { scale: .3, opacity: .9 }, { scale: 7, opacity: 0, duration: .7, ease: 'expo.out', immediateRender: false }, ${B(0)});
${SALP_JS}
tl.fromTo('#onda0', { scale: .3, opacity: .7 }, { scale: 16, opacity: 0, duration: 1.0, ease: 'expo.out', immediateRender: false }, ${B(0)});
${js}
window.__timelines['main'] = tl;
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'hf', 'index.html'), out);
console.log('index.html · FIN', FIN, 's ·', vid, 'vídeos');
