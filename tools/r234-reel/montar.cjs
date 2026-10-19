// RONDA 234 · REEL «se construye con savvia agentic» (sobre el de la ronda 152). Andoni: «me gustaba lo de antes que se construían las webs; en algún frame,
// animaciones más en detalle en una fila de 2-3 y luego una se hace zoom; el inicio como en el hero, la caída de la gota y empiezan a crearse cosas; que se
// vea savvia agentic a lo largo del reel, cómo lo usamos para construir todo». La LIBRERÍA de savvia agentic nace de la gota y se queda acoplada a la
// izquierda: cada ficha que suelta un agente enciende el archivo del que la ha leído. node tools/r234-reel/montar.cjs
// (antes) RONDA 152 · REEL «solo se construye» — genera hf/index.html (HyperFrames). Base: ronda 138 (tools/r138-reel).
// Andoni: «dejar solamente las partes en las que se construye la web y replicar eso para animaciones concretas tipo la de zernio de los iconos
// estilo app que pasan como una ruleta. La gota inicial, como la de la animación de carga. Y al final sale savvia normal con typo.»
// Estructura (pulsos, 5 por bloque): 0 gota de agua → 0 Kuanta (hero) · 5 Arkdev (hero) · 10 Arkdev · ruleta de canales · 15 Playground (hero) ·
// 20 Kuanta · ilustraciones isométricas · 25 Neety (hero) · 30 Playground · notas del tablón · 35 Remerge en móvil · 40–45 «savvia» (palabra).
// Cada bloque: retícula → cajas → agente con fichas → orden → «✓ publicado» → la línea de savia descubre la grabación real (build.cjs).
// Tomas de las firmas: tools/r152-reel/firmas.cjs (recortadas a 1320×742 en hf/assets/*-ruleta|cubos|notas.mp4).
// Música: «Distant Miles» (JonasBlakewood, Pixabay Content License). 92 BPM: pulso n = 1,02 + 0,6455·n s (desde el principio del tema).
// node tools/r152-reel/montar.cjs
const fs = require('fs'), path = require('path');
const { build: buildBase, CSS: CSS_BUILD } = require('./build.cjs');
const HF = path.join(__dirname, 'hf');
const T = 0.6455, AUDIO_OFF = 0, B0 = 1.02 - AUDIO_OFF; // el tema entra desde el principio: la gota tiene 1,02 s para colgar y caer
const f30 = (x) => Math.round(x * 30) / 30;
const B = (n) => f30(B0 + n * T);
const FIN = B(45);
const W = 1920, H = 1080;

// ── LA LIBRERÍA de savvia agentic: cada ficha que suelta un agente enciende antes el archivo de la librería del que sale
const AGC = { claude: ['Claude', '#ff616b'], codex: ['Codex', '#96bfe6'], diseno: ['Diseño', '#eadde7'], savvia: ['savvia', '#ff616b'] };
const FILES = ['marca/color.md', 'marca/tipografia.md', 'marca/voz.md', 'sistema/espaciado.md', 'sistema/tokens.css', 'componentes/'];
const fichero = (t) => (/#|degradado|violeta/i.test(t) ? 0 : /Aa|h1|h2|líneas/i.test(t) ? 1 : /<|pegatina|esfera|notas|isom|clientes/i.test(t) ? 5 : /radio|px|col|giro|°/.test(t) ? 4 : 3);
const LIB = [];
const build = (o) => { (o.chips || []).forEach((c) => LIB.push({ t: f30(o.t0 + c.b * T - 0.32), f: fichero(c.txt), k: o.agents[c.a].k })); return buildBase(o); };
let html = '', js = '', vid = 0, z = 10;
const vtag = (clip, a, b, ini, cls = '') =>
  `<video id="v${++vid}" class="${cls}" src="assets/${clip}.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="${ini}" data-track-index="${1 + (vid % 3)}" muted playsinline></video>`;
// una escena: capa a sangre que se enciende y apaga en el timeline (no es .clip: dentro lleva vídeo con tiempo propio)
const escena = (id, a, b, inner, cls = '') => {
  html += `<div class="scene ${cls}" id="${id}" style="z-index:${z++}">${inner}</div>\n`;
  js += `tl.set('#${id}', { opacity: 1 }, ${f30(a)}); tl.set('#${id}', { opacity: 0 }, ${f30(b)});\n`;
};
const rotulo = (id, nombre, a, cls = '') => {
  js += `tl.fromTo('#${id} .pill', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: 'expo.out' }, ${f30(a)});\n`;
  return `<div class="pill ${cls}"><i></i><span>${nombre}</span></div>`;
};
const rieles = `<div class="rail v l"></div><div class="rail v r"></div><div class="rail h t"></div><div class="rail h b"></div>
<b class="cruz" style="left:96px;top:96px"></b><b class="cruz" style="left:1824px;top:96px"></b><b class="cruz" style="left:96px;top:984px"></b><b class="cruz" style="left:1824px;top:984px"></b>`;
const navegador = (nombre, clip, a, b, ini, claro = false) =>
  `<div class="br ${claro ? 'claro' : ''}"><div class="bar"><i></i><i></i><i></i><span>${nombre.toLowerCase()}</span></div><div class="scr">${vtag(clip, a, b, ini)}</div></div>`;
// whip: A sale y B entra en la misma dirección, misma curva (costura exacta) y desenfoque direccional que culmina a mitad
let whips = 0;
const whip = (a, b, t, dir = 1, eje = 'x') => {
  const k = ++whips, d = 0.5, t0 = f30(t - d / 2), L = eje === 'x' ? W : H;
  js += `tl.set(['#${a}','#${b}'], { filter: 'url(#wb${eje})' }, ${t0});
tl.fromTo('#${a}', { ${eje}: 0 }, { ${eje}: ${-dir * L}, duration: ${d}, ease: 'power3.inOut', immediateRender: false }, ${t0});
tl.fromTo('#${b}', { ${eje}: ${dir * L} }, { ${eje}: 0, duration: ${d}, ease: 'power3.inOut', immediateRender: false }, ${t0});
tl.to(blur${eje}, { v: 22, duration: ${d / 2}, ease: 'power3.in', onUpdate: wb${eje} }, ${t0});
tl.to(blur${eje}, { v: 0, duration: ${d / 2}, ease: 'power3.out', onUpdate: wb${eje} }, ${f30(t0 + d / 2)});
tl.set(['#${a}','#${b}'], { filter: 'none' }, ${f30(t0 + d)});
tl.set('#${b}', { opacity: 1 }, ${t0});\n`;
};
// movimiento de cámara sobre un navegador 3D (órbita lenta + llegada)
const orbita = (id, a, b, ry0, ry1) => {
  js += `tl.fromTo('#${id} .br', { rotationY: ${ry0}, rotationX: 9, y: 70, scale: .94 }, { rotationY: ${ry1}, rotationX: 4, y: 0, scale: 1, duration: ${f30(b - a)}, ease: 'power2.out', immediateRender: false }, ${f30(a)});\n`;
};


const BW = 1320, BH = 742.5; // pantalla del navegador
const sc = (W, H, inner) => `<div class="screen" style="width:${W}px;height:${H}px">${inner}</div>`;
// un bloque de 5 pulsos: construye de S a S+3 y la grabación real corre de S+3 a S+5 (+ el solape del whip)
const navEscena = (id, S, fondo, claro, barra, clip, ini, b, nombre, oscura) =>
  escena(id, B(S) - 0.25, B(S + 5) + 0.25, `<div class="bg ${fondo}"></div>${fondo === 'cacao' ? rieles : ''}<div class="stage"><div class="br ${claro ? 'claro' : ''}"><div class="bar"><i></i><i></i><i></i><span>${barra}</span></div><div class="scr">${vtag(clip, B(S + 3) - 0.1, B(S + 5) + 0.3, ini)}${b.html}</div></div></div>${rotulo(id, nombre, B(S + 3) + 0.25, oscura ? 'oscura' : '')}`);

// ── una construcción en navegador sobre Cacao (5 pulsos): construye de S a S+3 y la web real corre de S+3 a S+5
const obra = (id, S, clip, ini, b, nombre, barra, cls = '') => {
  escena(id, B(S) - 0.25, B(S + 5) + 0.25, `<div class="bg cacao"></div>${rieles}<div class="stage" id="${id}cam"><div class="br"><div class="bar"><i></i><i></i><i></i><span>${barra}</span></div><div class="scr">${vtag(clip, B(S + 3) - 0.1, B(S + 5) + 0.3, ini)}${b.html}</div></div></div>${rotulo(id, nombre, B(S + 3) + 0.25)}`, cls);
  js += b.js;
};
// ── 2 · NEETY, el primero: se abre con el canto rasgado desde la librería recién nacida; savvia orquesta a los tres agentes
{
  const S = 2, t0 = B(S), take = B(S + 3), b = build({ id: 'k3', W: BW, H: BH, s: 1.3, bg: '#f3f3f5', ink: '60,35,60', t0, take,
    boxes: [
      { k: 'pan', x: .03, y: .02, w: .94, h: .8, l: 'hero · panel', fill: 'linear-gradient(115deg,#bcd3f5 0%,#eee6ee 46%,#f6a46b 100%)' },
      { k: 'logo', x: .07, y: .045, w: .06, h: .028 },
      { k: 'row', n: 6, x: .52, y: .048, w: .4, h: .022 },
      { k: 'txt', n: 1, x: .08, y: .19, w: .15, h: .018 },
      { k: 'txt', n: 3, big: 1, x: .08, y: .235, w: .36, h: .17, l: 'h1 · 48/1.15' },
      { k: 'code', x: .63, y: .28, w: .23, h: .23, l: '<Señales />', fill: '#ffffff' },
      { k: 'btn', x: .08, y: .6, w: .09, h: .042, fill: '#5b2c4e' },
      { k: 'txt', n: 3, x: .08, y: .74, w: .25, h: .065 },
      { k: 'row', n: 5, x: .08, y: .9, w: .84, h: .09, l: 'clientes', from: [0, .1] },
    ],
    agents: [
      { k: 'claude', path: [[.3, 1.04, .6], [.25, .31, 1.3], [.22, .65, 2.3], [.18, .92, 2.85]] },
      { k: 'codex', path: [[.96, .9, .8], [.74, .4, 1.6], [.82, .62, 2.85]] },
      { k: 'diseno', path: [[.62, 1.04, .9], [.5, .42, 1.9], [.12, .62, 2.25], [.42, .95, 2.85]] },
    ],
    chips: [{ txt: 'h1 · 3 líneas', a: 0, b: 1.3, to: 4 }, { txt: '<Señales score="91%" />', a: 1, b: 1.6, to: 5 }, { txt: 'degradado · azul → naranja', a: 2, b: 1.9, to: 0 }, { txt: '#5B2C4E', sw: '#5b2c4e', a: 2, b: 2.25, to: 6 }],
    prompt: { k: 'savvia', txt: 'orquesta: hero, señales y clientes' }, snap: 2.3 });
  obra('s0', S, 'neety-vivo', 3.4, b, 'Neety', 'neety', 'rasgo');
}
// ── 7 · KUANTA: Claude monta el hero con la esfera
{
  const S = 7, b = build({ id: 'k0', W: BW, H: BH, bg: '#16151b', ink: '234,221,231', t0: B(S), take: B(S + 3), s: 1.3,
    boxes: [
      { k: 'logo', x: .06, y: .022, w: .075, h: .028 },
      { k: 'row', n: 5, x: .445, y: .024, w: .2, h: .024 },
      { k: 'btn', x: .775, y: .017, w: .065, h: .038, fill: '#e3263b' },
      { k: 'txt', n: 1, x: .06, y: .225, w: .12, h: .022 },
      { k: 'txt', n: 4, big: 1, x: .06, y: .275, w: .27, h: .37, l: 'h1 · 96/1.0' },
      { k: 'txt', n: 3, x: .06, y: .665, w: .29, h: .085, l: 'p · 16/1.5', from: [0, .04] },
      { k: 'btn', x: .06, y: .79, w: .115, h: .045, fill: '#e3263b', from: [0, .05] },
      { k: 'btn', x: .183, y: .79, w: .065, h: .045, from: [0, .05] },
      { k: 'circ', x: .53, y: .19, w: .344, h: .611, l: '<canvas> esfera', fill: 'radial-gradient(circle, rgba(227,38,59,.32), rgba(227,38,59,.05) 60%, rgba(227,38,59,0) 71%)' },
      { k: 'row', n: 2, x: .70, y: .835, w: .17, h: .06, from: [0, .05] },
    ],
    agents: [{ k: 'claude', path: [[.52, .97, .7], [.2, .45, 1.3], [.7, .5, 1.85], [.13, .815, 2.35], [.34, .9, 2.85]] }],
    chips: [{ txt: 'Aa · 96 / 1.0', a: 0, b: 1.3, to: 4 }, { txt: 'esfera · 2 400 puntos', a: 0, b: 1.85, to: 8 }, { txt: '#E3263B', sw: '#e3263b', a: 0, b: 2.35, to: 6 }],
    prompt: { k: 'claude', txt: 'monta el hero de Kuanta con su librería' }, snap: 2.2 });
  obra('s1', S, 'kuanta-portada', 0.15, b, 'Kuanta', 'kuanta');
  whip('s0', 's1', B(S), 1);
  orbita('s1', B(S) - 0.25, B(S + 5) + 0.25, -20, -6);
}
// ── 16 · HOME OF AMBROSE: Diseño compone el titular a la deriva sobre la foto
{
  const S = 16, b = build({ id: 'k5', W: BW, H: BH, s: 1.3, bg: '#9a7a55', ink: '255,246,232', t0: B(S), take: B(S + 3),
    boxes: [
      { k: 'img', x: 0, y: 0, w: 1, h: 1, l: 'foto · a sangre', fill: 'radial-gradient(ellipse at 40% 45%, #c39b6c, #7a5a3a 75%)' },
      { k: 'logo', x: .01, y: .022, w: .13, h: .026 },
      { k: 'row', n: 3, x: .8, y: .022, w: .18, h: .022 },
      { k: 'txt', n: 1, big: 1, x: .017, y: .11, w: .35, h: .19, l: 'h1 · a la deriva' },
      { k: 'txt', n: 1, big: 1, x: .45, y: .31, w: .28, h: .17 },
      { k: 'txt', n: 1, big: 1, x: .885, y: .31, w: .1, h: .17 },
      { k: 'txt', n: 1, big: 1, x: .26, y: .52, w: .17, h: .17 },
      { k: 'txt', n: 1, big: 1, x: .58, y: .81, w: .09, h: .16 },
      { k: 'txt', n: 3, x: .81, y: .92, w: .18, h: .05, from: [0, .04] },
    ],
    agents: [{ k: 'diseno', path: [[.5, .98, .6], [.2, .2, 1.3], [.55, .4, 1.75], [.35, .62, 2.2], [.7, .9, 2.85]] }],
    chips: [{ txt: 'Aa · titular a la deriva', a: 0, b: 1.3, to: 3 }, { txt: 'foto · luz de tarde', a: 0, b: 1.75, to: 0 }, { txt: 'h1 · 5 palabras sueltas', a: 0, b: 2.2, to: 6 }],
    prompt: { k: 'diseno', txt: 'compón el titular a la deriva sobre la foto' }, snap: 2.3 });
  obra('s2', S, 'home-of-ambrose-grande', 0.2, b, 'Home of Ambrose', 'homeofambrose');
  whip('fila1', 's2', B(S), 1);
  orbita('s2', B(S) - 0.25, B(S + 5) + 0.25, 18, 6);
}
// ── 21 · CUBBO: Codex monta el hero con el azul de la marca
{
  const S = 21, b = build({ id: 'k6', W: BW, H: BH, s: 1.3, bg: '#3150e6', ink: '255,255,255', t0: B(S), take: B(S + 3),
    boxes: [
      { k: 'logo', x: .02, y: .015, w: .06, h: .026 },
      { k: 'row', n: 6, x: .43, y: .018, w: .33, h: .022 },
      { k: 'btn', x: .81, y: .012, w: .1, h: .032, fill: '#ffffff' },
      { k: 'txt', n: 1, x: .08, y: .14, w: .15, h: .02 },
      { k: 'txt', n: 2, big: 1, x: .08, y: .18, w: .6, h: .22, l: 'h1 · 56/1.1' },
      { k: 'circ', x: .62, y: .25, w: .45, h: .8, l: 'ondas', fill: 'radial-gradient(circle, rgba(255,255,255,.14), rgba(255,255,255,0) 70%)' },
      { k: 'txt', n: 2, x: .08, y: .86, w: .42, h: .06, from: [0, .04] },
      { k: 'btn', x: .8, y: .885, w: .12, h: .05, fill: '#ffffff', from: [0, .05] },
    ],
    agents: [{ k: 'codex', path: [[.9, .95, .6], [.3, .28, 1.3], [.85, .5, 1.75], [.86, .9, 2.2], [.6, .95, 2.85]] }],
    chips: [{ txt: 'h1 · 2 líneas', a: 0, b: 1.3, to: 4 }, { txt: '<Ondas anillos={6} />', a: 0, b: 1.75, to: 5 }, { txt: '#3150E6', sw: '#3150e6', a: 0, b: 2.2, to: 7 }],
    prompt: { k: 'codex', txt: 'monta el hero con el azul de Cubbo' }, snap: 2.3 });
  obra('s3', S, 'cubbo-grande', 0.2, b, 'Cubbo', 'cubbo');
  whip('s2', 's3', B(S), 1);
  orbita('s3', B(S) - 0.25, B(S + 5) + 0.25, -18, -5);
}
// ── 30 · MONAD: Claude dibuja el pipeline de datos del hero
{
  const S = 30, b = build({ id: 'k7', W: BW, H: BH, s: 1.3, bg: '#f3f1ec', ink: '30,30,30', t0: B(S), take: B(S + 3),
    boxes: [
      { k: 'logo', x: .1, y: .04, w: .08, h: .03 },
      { k: 'row', n: 5, x: .2, y: .045, w: .4, h: .02 },
      { k: 'btn', x: .69, y: .038, w: .08, h: .04, fill: '#1d1d1d' },
      { k: 'btn', x: .78, y: .038, w: .11, h: .04, fill: '#3b5bff' },
      { k: 'txt', n: 2, c: 1, big: 1, x: .27, y: .2, w: .46, h: .18, l: 'h1 · 48/1.1' },
      { k: 'txt', n: 3, c: 1, x: .34, y: .42, w: .32, h: .1 },
      { k: 'btn', x: .37, y: .55, w: .08, h: .04, fill: '#1d1d1d' },
      { k: 'circ', x: .42, y: .62, w: .16, h: .3, l: 'pipeline', fill: 'radial-gradient(circle, rgba(120,230,140,.5), rgba(120,230,140,0) 70%)' },
      { k: 'row', n: 6, x: .12, y: .64, w: .12, h: .34, from: [-.05, 0] },
      { k: 'row', n: 5, x: .74, y: .64, w: .1, h: .3, from: [.05, 0] },
    ],
    agents: [{ k: 'claude', path: [[.5, .98, .6], [.5, .27, 1.3], [.5, .76, 1.75], [.8, .4, 2.2], [.6, .95, 2.85]] }],
    chips: [{ txt: 'h1 · serif 48', a: 0, b: 1.3, to: 4 }, { txt: '<Pipeline fuentes={7} />', a: 0, b: 1.75, to: 7 }, { txt: '#3B5BFF', sw: '#3b5bff', a: 0, b: 2.2, to: 3 }],
    prompt: { k: 'claude', txt: 'dibuja el pipeline de datos del hero' }, snap: 2.3 });
  obra('s6', S, 'monad-grande', 0.2, b, 'Monad', 'monad');
  whip('fila2', 's6', B(S), 1);
  orbita('s6', B(S) - 0.25, B(S + 5) + 0.25, 16, 5);
}
// ── FILAS DE DETALLE: tres animaciones de los casos en fila; la del centro se abre a pantalla completa (el mismo vídeo, recortado con clip-path)
const TW = 456, TH = 256.5, TG = 24, TX0 = 352, TY = 540 - TH / 2 - 20;
const fila = (id, S, items) => {
  const a = B(S) - 0.25, e = B(S + 4) + 0.3, tz = f30(B(S + 1.4)), zi = 1;
  let inner = `<div class="bg cacao"></div>${rieles}`;
  items.forEach(([clip, nombre, ms], i) => {
    const x = TX0 + i * (TW + TG);
    inner += `<div class="tile-d" id="${id}t${i}" style="left:${x}px;top:${TY}px;width:${TW}px;height:${TH}px">${vtag(clip, a, e, ms, 'full')}</div><p class="tile-l" id="${id}l${i}" style="left:${x}px;top:${TY + TH + 18}px">${nombre}</p>`;
    js += `tl.fromTo('#${id}t${i}', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out', immediateRender: false }, ${f30(B(S) + i * 0.09)});
tl.fromTo('#${id}l${i}', { opacity: 0 }, { opacity: 1, duration: .4, ease: 'power2.out', immediateRender: false }, ${f30(B(S) + 0.25 + i * 0.09)});
tl.to('#${id}l${i}', { opacity: 0, duration: .2 }, ${f30(tz + 0.06)});\n`;
    LIB.push({ t: f30(B(S) + i * 0.3), f: 5, k: 'savvia' });
  });
  const [clip, nombre, ms] = items[zi], x = TX0 + zi * (TW + TG);
  const r = (x0, y0) => `inset(${y0.toFixed(1)}px ${(1920 - x0 - TW).toFixed(1)}px ${(1080 - y0 - TH).toFixed(1)}px ${x0.toFixed(1)}px round 12px)`;
  inner += `<div class="zoom-d" id="${id}z">${vtag(clip, tz, e, f30(ms + (tz - a)), 'full')}</div>${rotulo(id, nombre, tz + 0.55)}`;
  js += `tl.set('#${id}z', { clipPath: '${r(x, TY)}' }, 0);
tl.to('#${id}z', { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: .75, ease: 'expo.inOut' }, ${tz});\n`;
  escena(id, a, e - 0.05, inner);
};
fila('fila1', 12, [['neety-x-feed', 'Neety · el feed de señales', 3.55], ['kuanta-x-esfera', 'Kuanta · la esfera que se comprime', 4.4], ['neety-x-dentro', 'Neety · por dentro', 2.0]]);
whip('s1', 'fila1', B(12), 1);
fila('fila2', 26, [['kuanta-x-tensor', 'Kuanta · el tensor', 0.3], ['cubbo-x-operacion', 'Cubbo · cómo conecta cada parte', 3.4], ['cubbo-x-capas', 'Cubbo · seis productos', 3.45]]);
whip('s3', 'fila2', B(26), 1);
// ── 35 · EL ROBLE de savvia pasando por las estaciones (las láminas del hero): cada una se descubre desde la base del tronco con el canto rasgado
{
  const a = B(35), EST = [['otono', '#3b231b'], ['invierno', '#f5f5f7'], ['primavera', '#3a2932'], ['verano', '#1b3125']];
  let inner = '';
  EST.forEach(([e, c], i) => { inner += `<div class="estacion${i ? ' rasgo' : ''}" id="est${i}" style="background:${c}"><img class="roble" src="assets/arbol-${e}.webp" alt="" /></div>`; });
  inner += `<div class="logo-wrap arriba" id="logoc"><img class="logo" src="assets/savvia-logo.svg" alt="savvia" /></div><p class="url" id="url">savvia agentic · savvia.studio</p>`;
  escena('s11', f30(a - 0.25), FIN + 0.1, inner, 'rasgo-ab');
  js += `tl.fromTo('#s11', { '--m': '0px' }, { '--m': '4600px', duration: 1.0, ease: 'expo.inOut', immediateRender: false }, ${f30(a - 0.25)});
tl.fromTo('#est0 .roble', { scale: .96, y: 30 }, { scale: 1, y: 0, duration: 1.4, ease: 'expo.out', immediateRender: false }, ${f30(a - 0.25)});\n`;
  [1, 2, 3].forEach((i) => { js += `tl.fromTo('#est${i}', { '--m': '0px' }, { '--m': '4600px', duration: 1.25, ease: 'power2.inOut', immediateRender: false }, ${B(35 + i * 2)});\n`; });
  js += `tl.set('#logoc', { clipPath: 'inset(-20% 100% -20% 0%)' }, 0);
tl.fromTo('#logoc', { clipPath: 'inset(-20% 100% -20% 0%)', filter: 'blur(14px)', y: 20 }, { clipPath: 'inset(-20% 0% -20% 0%)', filter: 'blur(0px)', y: 0, duration: 1.2, ease: 'expo.out', immediateRender: false }, ${B(41)});
tl.fromTo('#url', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .9, ease: 'expo.out', immediateRender: false }, ${B(42)});\n`;
}
// ── la LIBRERÍA a la izquierda, como la de Neety («neety / library»): cada ficha que suelta un agente enciende antes su apartado
const PROY = [[B(0), 'tu web'], [B(2), 'neety'], [B(7), 'kuanta'], [B(12), 'componentes'], [B(16), 'homeofambrose'], [B(21), 'cubbo'], [B(26), 'componentes'], [B(30), 'monad']];
const GRUPOS = [['Fundamentos', [0, 1, 2, 3, 4]], ['Componentes', [5]]];
const NOMBRES = ['Color', 'Tipografía', 'Voz', 'Espaciado', 'Radios y tokens', 'Componentes de la web'];
let BIB = `<div id="biblio"><div class="bi-bar"><i></i><i></i><i></i><div class="bi-p">${PROY.map(([, n], i) => `<span id="bp${i}">${n} / library</span>`).join('')}</div></div><div class="bi-cuerpo"><p class="bi-h">La librería</p>`;
const filas = NOMBRES.map(() => '');
LIB.sort((x, y) => x.t - y.t).forEach((ev, j) => { filas[ev.f] += `<b class="lz" id="lz${j}"></b><span class="bi-ag" id="ba${j}" style="background:${AGC[ev.k][1]}">${AGC[ev.k][0]}</span>`;
  js += `tl.fromTo('#lz${j}', { opacity: 0 }, { opacity: 1, duration: .12, immediateRender: false }, ${ev.t});
tl.to('#lz${j}', { opacity: 0, duration: .7, ease: 'power1.in' }, ${f30(ev.t + 0.45)});
tl.fromTo('#ba${j}', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: .22, ease: 'expo.out', immediateRender: false }, ${ev.t});
tl.to('#ba${j}', { opacity: 0, duration: .3 }, ${f30(ev.t + 0.7)});\n`; });
BIB += GRUPOS.map(([g, ids]) => `<p class="bi-g">${g}</p>` + ids.map((i) => `<div class="bi-r" id="bir${i}"><i></i><span>${NOMBRES[i]}</span>${filas[i]}</div>`).join('')).join('') + `</div></div>`;
PROY.forEach(([t], i) => { js += `tl.set('#bp${i}', { opacity: 1 }, ${f30(t)});${i ? ` tl.set('#bp${i - 1}', { opacity: 0 }, ${f30(t)});` : ''}\n`; });
js += `tl.set('#biblio', { opacity: 1, x: 799, scale: 1.55 }, ${f30(B(0) - 0.02)});
tl.fromTo('#biblio', { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', duration: .8, ease: 'expo.out', immediateRender: false }, ${B(0)});
tl.fromTo('#biblio .bi-r', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: .35, ease: 'expo.out', stagger: .07, immediateRender: false }, ${f30(B(0) + 0.3)});
tl.to('#biblio', { x: 0, scale: 1, duration: .85, ease: 'expo.inOut' }, ${f30(B(2) - 0.2)});
tl.to('#biblio', { opacity: 0, x: -30, duration: .5, ease: 'power2.in' }, ${f30(B(35) - 0.4)});\n`;
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
@font-face { font-family: 'Areal Mono'; src: url('assets/abc-areal-mono-regular.woff2') format('woff2'); font-weight: 400; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { background: #302018; overflow: hidden; }
#root { position: relative; width: 100%; height: 100%; overflow: hidden; background: #302018; }
.scene { position: absolute; inset: 0; opacity: 0; overflow: hidden; perspective: 2400px; }
.full { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.arriba { object-position: 50% 0; }
.cam { position: absolute; inset: 0; transform-origin: 50% 50%; }
.bg { position: absolute; inset: 0; }
.bg.cacao { background: #302018; } .bg.niebla { background: #eadde7; } .bg.salvia { background: #96bfe6; }
.mask0 { -webkit-mask: url(assets/rasgo-circulo.png) 50% 50% / 0% no-repeat; mask: url(assets/rasgo-circulo.png) 50% 50% / 0% no-repeat; }
/* rieles: las guías de la web, con sus cruces */
.rail { position: absolute; background: rgba(234, 221, 231, .13); }
.rail.v { top: 0; bottom: 0; width: 1px; } .rail.v.l { left: 96px; } .rail.v.r { left: 1824px; }
.rail.h { left: 0; right: 0; height: 1px; } .rail.h.t { top: 96px; } .rail.h.b { top: 984px; }
.cruz { position: absolute; width: 17px; height: 17px; margin: -8px 0 0 -8px; }
.cruz::before, .cruz::after { content: ''; position: absolute; background: rgba(234, 221, 231, .55); }
.cruz::before { left: 8px; top: 0; width: 1px; height: 17px; } .cruz::after { top: 8px; left: 0; height: 1px; width: 17px; }
/* navegador */
.stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transform-style: preserve-3d; }
.br { position: relative; width: 1320px; border-radius: 16px; overflow: hidden; background: #3e2b22; box-shadow: 0 0 0 1px rgba(234,221,231,.12), 0 70px 140px rgba(0,0,0,.5); }
.br.claro { background: #302018; box-shadow: 0 0 0 1px rgba(48,32,24,.2), 0 60px 120px rgba(48,32,24,.32); }
.bar { position: relative; height: 46px; display: flex; align-items: center; gap: 9px; padding: 0 20px; }
.bar i { width: 12px; height: 12px; border-radius: 50%; background: rgba(234, 221, 231, .28); display: block; }
.bar span { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 6px 22px; border-radius: 999px; background: rgba(234,221,231,.08);
  font: 400 15px/1 'Areal Mono', ui-monospace, monospace; color: rgba(234, 221, 231, .72); letter-spacing: .04em; }
.scr { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #fff; }
.scr video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; }
/* rótulo */
.pill { position: absolute; left: 96px; bottom: 72px; display: flex; align-items: center; gap: 14px; padding: 14px 24px 14px 20px; border-radius: 999px; opacity: 0;
  background: rgba(48, 32, 24, .82); font: 400 22px/1 'Areal Mono', ui-monospace, monospace; color: #eadde7; letter-spacing: .03em; z-index: 5; }
.pill i { width: 10px; height: 10px; border-radius: 50%; background: #ff616b; display: block; }
.pill.sm { font-size: 19px; padding: 12px 20px 12px 17px; }
.pill.oscura { background: #302018; }
/* titular */
.titular { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding-left: 240px; gap: 6px; transform-origin: 30% 50%; }
.titular h2 { font: 400 168px/1.02 'Family', Georgia, serif; letter-spacing: -0.025em; display: flex; gap: .24em; color: #eadde7; }
.titular h2.l2 { color: #ff616b; }
.titular h2 span { display: block; overflow: hidden; padding-bottom: .1em; }
.titular h2 b { display: block; font-weight: 400; }
/* tres dispositivos */
.splay .lado { position: absolute; top: 50%; width: 1000px; margin-top: -290px; transform-style: preserve-3d; }
.splay .lado .br { width: 1000px; }
.splay .izq { left: 120px; } .splay .der { right: 120px; }
.splay .movil { position: absolute; left: 50%; top: 50%; width: 392px; height: 846px; margin: -423px 0 0 -196px; z-index: 3; }
.splay .marco { position: absolute; inset: 0; border-radius: 58px; padding: 12px; background: #1c130e; box-shadow: 0 0 0 2px #4a3328, 0 60px 120px rgba(20,12,8,.45); }
.splay .marco video { position: relative; display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 46px; }
/* rejilla */
.rejilla { position: absolute; left: 50%; top: 50%; width: 1728px; height: 993px; margin: -496.5px 0 0 -864px; display: grid; grid-template-columns: repeat(3, 560px); grid-template-rows: repeat(3, 315px); gap: 24px; transform-origin: 50% 50%; }
.tile { position: relative; border-radius: 10px; overflow: hidden; background: #3e2b22; }
.tile.t4 { border-radius: 0; }
/* pantalla partida */
.mitad { position: absolute; top: 0; bottom: 0; width: 960px; overflow: hidden; }
.mitad.m1 { left: 0; } .mitad.m2 { left: 960px; }
.costura { position: absolute; left: 959px; top: 0; bottom: 0; width: 2px; background: #ff616b; transform-origin: 50% 0; }
/* mesa */
#mesa { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 0 0; }
#mesa .est { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
#mesa .e1, #mesa .e2, #mesa .e3 { -webkit-mask: url(assets/rasgo-circulo.png) 50% 47% / 0% no-repeat; mask: url(assets/rasgo-circulo.png) 50% 47% / 0% no-repeat; }
#mesa .pantalla { position: absolute; left: 39.12%; top: 37.03%; width: 21.61%; height: 20.92%; overflow: hidden; background: #fff; z-index: 2; }
.firma-mesa { position: absolute; left: 96px; bottom: 72px; font: 400 20px/1 'Areal Mono', ui-monospace, monospace; color: #eadde7; letter-spacing: .12em; text-transform: uppercase; opacity: 0;
  text-shadow: 0 1px 12px rgba(0,0,0,.45); }
/* gota de agua y cierre */
#caida { position: absolute; left: 50%; top: 50%; width: 0; height: 0; z-index: 50; }
#gota0 { position: absolute; left: -170px; top: -40px; width: 210px; height: 80px; transform-origin: 170px 40px; overflow: visible; }
.onda { position: absolute; left: -20px; top: -20px; width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(246, 228, 204, .6); opacity: 0; }
.corona { position: absolute; left: -22px; top: -6px; width: 44px; height: 12px; border-radius: 50%; border: 2px solid rgba(246, 228, 204, .7); opacity: 0; }
.sp { position: absolute; left: 0; top: 0; border-radius: 50%; background: rgba(246, 228, 204, .7); box-shadow: inset -1px -1px 0 rgba(255,243,228,.6); opacity: 0; }
.palabra-wrap { position: absolute; left: 50%; top: 50%; width: 900px; height: 274px; margin: -150px 0 0 -450px; }
.palabra { position: absolute; inset: 0; background: #eadde7; -webkit-mask: url(assets/savvia-palabra.svg) center / contain no-repeat; mask: url(assets/savvia-palabra.svg) center / contain no-repeat; clip-path: inset(-20% 100% -20% 0%); }
.url { position: absolute; left: 0; right: 0; top: 720px; text-align: center; font: 400 22px/1 'Areal Mono', ui-monospace, monospace; color: rgba(234, 221, 231, .72); letter-spacing: .14em; opacity: 0; }
#intro { position: absolute; inset: 0; background: #302018; z-index: 1; }
.hud { position: absolute; top: 52px; font: 400 18px/1 'Areal Mono', ui-monospace, monospace; color: rgba(234,221,231,.6); letter-spacing: .14em; text-transform: uppercase; }
/* pantallas */
.screen { position: absolute; left: 0; top: 0; overflow: hidden; }
.scr .bld, .scr .ghost, .scr .ags { position: absolute; }
.splay .lado { opacity: 0; }
.pscr { position: relative; width: 100%; height: 100%; border-radius: 46px; overflow: hidden; background: #fff; }
.pscr > video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
${CSS_BUILD}
/* ronda 234: la máscara rasgada centrada (960, 540) y la de agentic desde la librería acoplada (161, 540) */
.rasgo { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(540px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(540px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.rasgo2 { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(161px - var(--m) / 2) calc(540px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(161px - var(--m) / 2) calc(540px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.bg.niebla2 { background: #f6f3ee; }
.tile-d { position: absolute; border-radius: 12px; overflow: hidden; background: #3e2b22; box-shadow: 0 0 0 1px rgba(234,221,231,.12), 0 40px 80px rgba(0,0,0,.35); }
.tile-l { position: absolute; font: 400 16px/1 'Areal Mono', ui-monospace, monospace; color: rgba(234,221,231,.7); letter-spacing: .04em; }
.zoom-d { position: absolute; inset: 0; overflow: hidden; z-index: 4; }
.logo-wrap { position: absolute; left: 50%; top: 50%; width: 760px; margin: -170px 0 0 -380px; }
.logo { display: block; width: 100%; height: auto; }
#biblio { position: absolute; left: 36px; top: 50%; width: 262px; margin-top: -190px; z-index: 950; transform-origin: 131px 50%; opacity: 0; overflow: hidden;
  background: #f7f3ea; border-radius: 12px; box-shadow: 0 0 0 1px rgba(48,32,24,.12), 0 30px 70px rgba(0, 0, 0, .4); }
.bi-bar { position: relative; height: 34px; display: flex; align-items: center; gap: 6px; padding: 0 12px; border-bottom: 1px solid rgba(48,32,24,.1); background: #f1ece2; }
.bi-bar > i { width: 8px; height: 8px; border-radius: 50%; background: rgba(48,32,24,.2); }
.bi-p { position: absolute; left: 62px; right: 10px; top: 0; height: 34px; }
.bi-p span { position: absolute; left: 0; top: 11px; opacity: 0; font: 400 12px/1 'Areal Mono', ui-monospace, monospace; color: rgba(48,32,24,.75); white-space: nowrap; }
.bi-cuerpo { padding: 14px 14px 12px; }
.bi-h { font: 400 24px/1 'Family', Georgia, serif; color: #2a1712; letter-spacing: -.01em; margin-bottom: 10px; }
.bi-g { font: 400 10px/1 'Areal Mono', ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase; color: rgba(48,32,24,.72); margin: 10px 0 4px; }
.bi-r { position: relative; display: flex; align-items: center; gap: 9px; height: 28px; padding: 0 8px; margin: 0 -8px; border-radius: 7px; font: 420 14px/1 'Timeless Sans', sans-serif; color: #3a2a24; }
.bi-r > i { width: 5px; height: 5px; border-radius: 50%; background: rgba(48,32,24,.28); flex: none; }
.bi-r > span { position: relative; z-index: 1; }
.bi-r .lz { position: absolute; inset: 0; border-radius: 7px; background: rgba(91, 44, 78, .13); box-shadow: inset 2px 0 0 #f0532d; opacity: 0; }
.bi-r .lz ~ span:first-of-type { }
.bi-ag { position: absolute; right: 6px; top: 50%; margin-top: -10px; height: 20px; padding: 0 8px; border-radius: 999px; font: 400 12px/20px 'Areal Mono', ui-monospace, monospace; color: #302018; opacity: 0; z-index: 2; }
.estacion { position: absolute; inset: 0; }
.roble { position: absolute; left: 50%; bottom: 0; width: 1500px; margin-left: -750px; height: auto; transform-origin: 50% 100%; }
.logo-wrap.arriba { top: 120px; margin-top: 0; width: 520px; margin-left: -260px; z-index: 5; }
.rasgo-ab { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.estacion.rasgo { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
#grano { position: absolute; inset: 0; background: url(assets/grano.png); opacity: .75; pointer-events: none; z-index: 900; }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${FIN}" data-width="1920" data-height="1080">
<svg width="0" height="0" style="position:absolute"><defs>
<filter id="wbx" x="-20%" y="-5%" width="140%" height="110%"><feGaussianBlur id="wbxn" stdDeviation="0 0"/></filter>
<filter id="wby" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur id="wbyn" stdDeviation="0 0"/></filter>
</defs></svg>
<div id="intro">${rieles}</div>
${html}
${BIB}
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
<audio id="music" data-timeline-role="music" src="assets/distant-miles.mp3" data-start="0" data-duration="${FIN}" data-track-index="9" data-volume="1" data-media-start="${AUDIO_OFF}"></audio>
</div>
<script>
const tl = gsap.timeline({ paused: true });
tl.fromTo('#music', { volume: 0 }, { volume: 1, duration: .15, ease: 'none' }, 0);
const blurx = { v: 0 }, blury = { v: 0 };
const nx = document.getElementById('wbxn'), ny = document.getElementById('wbyn');
const wbx = () => nx.setAttribute('stdDeviation', blurx.v.toFixed(2) + ' 0');
const wby = () => ny.setAttribute('stdDeviation', '0 ' + blury.v.toFixed(2));
const REJ_ORDER = [4, 1, 3, 5, 7, 0, 2, 6, 8];
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
tl.fromTo('#s0', { '--m': '0px' }, { '--m': '4600px', duration: 1.05, ease: 'expo.inOut', immediateRender: false }, ${f30(B(2) - 0.1)});
tl.fromTo('#s0cam', { scale: 1.16 }, { scale: 1.0, duration: ${f30(B(7) - B(2))}, ease: 'power3.out', immediateRender: false }, ${f30(B(2) - 0.1)});
tl.set('#intro', { opacity: 0 }, ${f30(B(2) + 1.2)});
${js}
tl.fromTo('#music', { volume: 1 }, { volume: 0, duration: 2.2, ease: 'power1.in', immediateRender: false }, ${f30(FIN - 2.2)});
window.__timelines['main'] = tl;
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(HF, 'index.html'), out);
console.log('index.html · FIN', FIN, 's ·', vid, 'vídeos');
