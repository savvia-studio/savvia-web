// RONDA 238 · REEL CINÉTICO (prueba). Andoni: «podemos probar algo de este estilo» (Linearity AI, x.com/linearityhq/status/2110362970119454745: tipografía
// cinética, palabra a palabra y desenfocada, con la INTERFAZ dentro de la frase —«edit [anuncio] text»—, manchas de degradado cálido de respiro, centro en
// claro, apertura y cierre en negro). Aquí: savvia agentic contado con su librería, sus agentes y las webs. Cortes al pulso de «Distant Miles».
// node tools/r238-cinetico/build.cjs → hf/index.html
const fs = require('fs'), path = require('path');
const MURO = fs.readdirSync(path.join(__dirname, 'hf', 'assets', 'muro')).filter((f) => f !== 'zoom.jpg').sort();
const T = 0.6455, f30 = (x) => Math.round(x * 30) / 30;
let OFF = 0; // desplazamiento en pulsos del bloque que se está escribiendo (ronda 247: entran el túnel, el muro y las parejas)
const B = (n) => f30(1.02 + (n + OFF) * T);
const FIN = B(72);
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
  js += `tl.set('#${id} .hueco', { width: 0 }, 0); tl.set('#${id} .card', { opacity: 0 }, 0);
tl.to('#${id} .hueco', { width: ${W + 72}, duration: .7, ease: 'expo.inOut' }, ${f30(tAbre)});
tl.fromTo('#${id} .card', { opacity: 0 }, { opacity: 1, duration: .3, ease: 'power1.out', immediateRender: false }, ${f30(tAbre + 0.05)});\n`;
  if (tCierra) js += `tl.to('#${id} .card', { opacity: 0, filter: 'blur(10px)', duration: .35, ease: 'power2.in' }, ${f30(tCierra)});\n`;
  return `<div class="frase${id === 'f3' ? ' compacta' : ''}" id="${id}"><span class="w izq">${izq}</span><span class="hueco" style="height:${H + 60}px"><span class="card" style="width:${W}px;height:${H}px;margin:${-H / 2}px 0 0 ${-W / 2}px">${card}</span></span><span class="w der">${der}</span></div>`;
};

let CSS_EXTRA = '';
// ── 1 · NEGRO: la GOTA de agua de la carga cae al centro y, del impacto, nace el manifiesto de la web (home.ts › problemas)
{
  const a = 0, b = B(4.2);
  escena('e1', a, b, '#3b231b', `<div class="centro"><p class="lin" id="l1"><span id="w1">La IA es la base;</span></p><p class="lin tenue2" id="l2"><span id="w2">el criterio sigue siendo nuestro.</span></p></div>`);
  entra('#w1', B(0) + 0.15); entra('#w2', B(1.3)); sale('#l1', B(3.7)); sale('#l2', B(3.75));
}
// ── 2 · «savvia agentic: tu web conectada con la IA.»
{
  // ronda 247 (Bolt): el texto, en medio de un TÚNEL de webs (techo y suelo en perspectiva) que avanza hacia la cámara
  const a = B(4), b = B(9.6);
  const rej = (k) => `<div class="rejilla" id="rj${k}">${Array.from({ length: 112 }, (_, i) => `<img src="assets/muro/${MURO[(i * 7 + k * 13) % MURO.length]}" alt="" />`).join('')}</div>`;
  escena('e2', a, b, '#3b231b', `<div class="tunel"><div class="plano techo">${rej(0)}</div><div class="plano suelo">${rej(1)}</div></div><i class="velo-tunel"></i><div class="centro"><p class="lin" id="a1"><span>savvia agentic:</span></p><p class="lin tenue2" id="a2"><span>tu web conectada con la IA.</span></p></div>`);
  js += `tl.fromTo('.plano', { opacity: 0 }, { opacity: .42, duration: .9, ease: 'power2.out', immediateRender: false }, ${f30(a + 0.1)});
tl.fromTo('#rj0', { y: 0 }, { y: -900, duration: ${f30(b - a)}, ease: 'none', immediateRender: false }, ${f30(a)});
tl.fromTo('#rj1', { y: 0 }, { y: 900, duration: ${f30(b - a)}, ease: 'none', immediateRender: false }, ${f30(a)});\n`;
  entra('#a1 span', B(4.8)); entra('#a2 span', B(5.8)); sale('#a1', B(9.0)); sale('#a2', B(9.05));
}
OFF = 2;
{
}
// ── 3 · CLARO: «Los fundamentos de diseño y desarrollo de tu web, [la librería] en una librería que cualquier IA sabe leer.»
const FILAS = ['Color', 'Tipografía', 'Voz', 'Espaciado', 'Radios y tokens', 'Componentes de la web'];
const libreria = (pref) => `<div class="lib"><div class="lib-bar"><i></i><i></i><i></i><span>neety / library</span></div><div class="lib-c"><p class="lib-h">La librería</p><p class="lib-g">Fundamentos</p>${FILAS.slice(0, 5).map((f, i) => `<div class="lib-r" id="${pref}r${i}"><i></i>${f}</div>`).join('')}<p class="lib-g">Componentes</p><div class="lib-r" id="${pref}r5"><i></i>${FILAS[5]}</div></div></div>`;
{
  const a = B(7.5), b = B(12.1);
  escena('e3', a, b, '#f6f3ee', frase('f3', 'Tu web,', 'en una librería.', 360, 440, libreria('l3'), B(8.5), B(11.45)));
  js += `tl.fromTo('#e3', { opacity: 0 }, { opacity: 1, duration: .35, immediateRender: false }, ${f30(a)});\n`;
  entra('#f3 .izq', B(7.7)); entra('#f3 .der', B(9.1));
  FILAS.forEach((_, i) => { js += `tl.fromTo('#l3r${i}', { backgroundColor: 'rgba(91,44,78,0)' }, { backgroundColor: 'rgba(91,44,78,.14)', duration: .12, immediateRender: false }, ${f30(B(9.7) + i * 0.16)});
tl.to('#l3r${i}', { backgroundColor: 'rgba(91,44,78,0)', duration: .45 }, ${f30(B(9.7) + i * 0.16 + 0.32)});\n`; });
  sale('#f3 .izq', B(11.5)); sale('#f3 .der', B(11.55));
}
// ── 3b · LA LIBRERÍA, de verdad: «La web, su receta y los agentes que la mantienen al día.» + la escena de savvia agentic (quieta: la cámara ya va dentro del vídeo)
{
  const a = B(12), b = B(18.8), RATE = 1.45;
  escena('e3b', a, b, '#f6f3ee', `<p class="cabeza" id="cab3b">La web, su receta y los agentes que la mantienen al día.</p><div class="pelicula" id="peli"><video id="v${++vid}" class="full" src="assets/agentic.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="0.6" data-playback-rate="${RATE}" data-track-index="2" muted playsinline></video></div><p class="pie-obra visible" id="pie3b">Claude · Codex · tu equipo · savvia</p>`);
  js += `tl.fromTo('#peli', { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .8, ease: 'expo.out', immediateRender: false }, ${f30(a + 0.05)});
tl.to('#peli', { opacity: 0, filter: 'blur(12px)', duration: .35, ease: 'power2.in' }, ${f30(B(18.3))});\n`;
  entra('#cab3b', B(12.15)); entra('#pie3b', B(13)); sale('#cab3b', B(18.25)); sale('#pie3b', B(18.25));
}
// ── 4 · «Así tú y tu equipo podréis cambiar lo que queráis» + la petición que se escribe justo debajo
{
  const a = B(18.6), b = B(22.2), PEDIDO = 'Pon el hero de Neety con su librería';
  const caja = `<div class="pide"><p class="pide-t"><span class="chispa"></span>savvia agentic</p><p class="pide-x"><span id="tecla">${PEDIDO}</span><i class="cursor"></i></p><span class="enviar" id="enviar">↑</span></div>`;
  escena('e4', a, b, '#f6f3ee', frase('f4', 'Pide', 'y listo.', 640, 170, caja, B(19.3), B(21.75)));
  entra('#f4 .izq', B(18.75)); entra('#f4 .der', B(19.8));
  js += `tl.fromTo('#tecla', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'steps(${PEDIDO.length})', immediateRender: false }, ${f30(B(19.8))});
tl.fromTo('#enviar', { scale: 1 }, { scale: .86, duration: .12, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, ${f30(B(21.3))});\n`;
  sale('#f4 .izq', B(21.75)); sale('#f4 .der', B(21.8));
}
// ── 5 · tres cambios REALES, tres pulsos cada uno: «edita [Neety: el titular] textos» · «cambia [savvia.studio por las estaciones] colores» ·
//    «mueve [tres secciones reales de neety.com] secciones»
{
  const a = B(22), b = B(31.1), N0 = 22, CW = 720, CH = 452;
  const nav = (dom, dentro) => `<div class="nav-mini"><div class="bar"><i></i><i></i><i></i><span>${dom}</span></div><div class="scr-mini">${dentro}</div></div>`;
  const edita = nav('neety.com', `${video('neety-vivo', B(N0), B(N0 + 3.2), 3.6, 'full')}<i class="sel" id="sel"></i><i class="cur" id="cur"></i>`);
  const PAL = [['Otoño', '#3b231b', '#ff616b', '#c65c2d'], ['Invierno', '#f5f5f7', '#4f8ad6', '#7d8ba3'], ['Primavera', '#3a2932', '#ff8fb8', '#d98aa5'], ['Verano', '#1b3125', '#b9e26c', '#6f9a4e']];
  const cambia = nav('savvia.studio', `<div class="paleta"><p class="pal-h">Color</p><p class="pal-g">savvia / librería</p>${PAL.map(([n, ...c], i) => `<div class="pal-r" id="pr${i}"><span class="pal-s">${c.map((x) => `<i style="background:${x}"></i>`).join('')}</span><span class="pal-n">${n}<b>${c[0].toUpperCase()}</b></span></div>`).join('')}<i class="cur cur-p" id="curp"></i></div><div class="vista">${['otono', 'invierno', 'primavera', 'verano'].map((e, i) => `<img class="rob${i ? ' rasgo-v' : ''}" id="rob${i}" src="assets/hero-${e}.jpg" alt="" />`).join('')}</div>`);
  const BLQ = [[12, 158], [180, 188], [378, 149]]; // y y alto de cada sección entera a 280 de ancho (900×509 · 900×606 · 900×479)
  const mueve = nav('neety.com', `<div class="bloques">${BLQ.map(([y, h], i) => `<img class="blq" id="sec${i}" src="assets/neety-blq${i}.jpg" alt="" style="top:${y}px;height:${h}px" />`).join('')}</div>`);
  escena('e5', a, b, '#f6f3ee', frase('f5a', 'edita', 'textos', CW, CH, edita, B(N0 + 0.3), B(N0 + 2.6)) + frase('f5b', 'cambia', 'colores', CW, CH, cambia, B(N0 + 3.3), B(N0 + 5.6)) + frase('f5c', 'mueve', 'secciones', 520, 560, mueve, B(N0 + 6.3), B(N0 + 8.6)));
  [['f5a', N0], ['f5b', N0 + 3], ['f5c', N0 + 6]].forEach(([id, n]) => { entra(`#${id} .izq`, B(n + 0.05)); entra(`#${id} .der`, B(n + 0.6)); sale(`#${id} .izq`, B(n + 2.6)); sale(`#${id} .der`, B(n + 2.6)); });
  js += `tl.fromTo('#sel', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: .45, ease: 'expo.out', immediateRender: false }, ${f30(B(N0 + 1.2))});
tl.fromTo('#cur', { x: 160, y: 110, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .6, ease: 'expo.out', immediateRender: false }, ${f30(B(N0 + 0.8))});\n`;
  // el cursor elige cada estación en la librería y la web se repinta con ella (el canto rasgado del hero)
  const RY = (i) => 76 + i * 64;
  js += `tl.fromTo('#curp', { x: 150, y: 330, opacity: 0 }, { x: 150, y: ${RY(0) + 18}, opacity: 1, duration: .5, ease: 'expo.out', immediateRender: false }, ${f30(B(N0 + 3.45))});
tl.set('#pr0', { backgroundColor: 'rgba(59,35,27,.08)' }, ${f30(B(N0 + 3.45))});\n`;
  [1, 2, 3].forEach((i) => { const t = f30(B(N0 + 3.8) + (i - 1) * 0.6);
    js += `tl.to('#curp', { y: ${RY(i) + 18}, duration: .28, ease: 'power3.inOut' }, ${f30(t - 0.3)});
tl.to('#curp', { scale: .8, duration: .07, yoyo: true, repeat: 1 }, ${f30(t - 0.04)});
tl.set('#pr${i - 1}', { backgroundColor: 'rgba(59,35,27,0)' }, ${t}); tl.set('#pr${i}', { backgroundColor: 'rgba(59,35,27,.08)' }, ${t});
tl.fromTo('#rob${i}', { '--m': '0px' }, { '--m': '1400px', duration: .8, ease: 'power2.inOut', immediateRender: false }, ${t});\n`; });
  // las secciones se reordenan: la de arriba (el hero) baja al final y las otras suben, con su sombra al despegarse
  js += `tl.to('#sec0', { y: 357, scale: 1.03, boxShadow: '0 20px 40px rgba(48,32,24,.25)', duration: .7, ease: 'expo.inOut' }, ${f30(B(N0 + 7.1))});
tl.to(['#sec1', '#sec2'], { y: -168, duration: .7, ease: 'expo.inOut' }, ${f30(B(N0 + 7.1))});
tl.to('#sec0', { scale: 1, boxShadow: '0 6px 16px rgba(48,32,24,.12)', duration: .3, ease: 'power2.out' }, ${f30(B(N0 + 7.1) + 0.7)});\n`;
}
// ── 6 · «Proyectos destacados con desarrollo agéntico.» (sola) y las webs: el NOMBRE asoma por detrás y la web se MONTA delante
const { build, CSS: CSS_BUILD } = require('./build-obra.cjs');
{
  const a = B(31), b = B(33.2);
  escena('e6t', a, b, '#f6f3ee', `<div class="centro"><p class="lin oscura" id="pd1"><span>Proyectos destacados</span></p><p class="lin oscura tenue3" id="pd2"><span>con desarrollo agéntico.</span></p></div>`);
  entra('#pd1 span', B(31.1)); entra('#pd2 span', B(31.6)); sale('#pd1', B(32.7)); sale('#pd2', B(32.75));
}
// ── 6b · EL MURO (Bolt): todas las webs en una pared que se recorre; la cámara entra en Kuanta y Kuanta cobra vida a pantalla completa
OFF = 0;
{
  const a = B(35), b = B(45.6), C = 8, CW2 = 420, CH2 = 236, G = 28, ZC = 3, ZR = 2;
  const celdas = Array.from({ length: C * 5 }, (_, i) => i === ZR * C + ZC ? 'zoom.jpg' : MURO[(i * 11 + 3) % MURO.length]);
  const cx = ZC * (CW2 + G) + CW2 / 2, cy = ZR * (CH2 + G) + CH2 / 2, SZ = 1920 / CW2;
  const camM = (x, y, S) => `{ x: ${f30(960 - S * x)}, y: ${f30(540 - S * y)}, scale: ${S} }`;
  escena('e6m', a, b, '#f6f3ee', `<div class="muro" id="muro">${celdas.map((f, i) => `<img src="assets/muro/${f}" alt="" style="left:${(i % C) * (CW2 + G)}px;top:${Math.floor(i / C) * (CH2 + G)}px" />`).join('')}</div><div class="vivo" id="vivo6">${video('arkdev-x-muelle', B(40.4), b + 0.1, 1.2)}</div>`);
  const WX = 8 * 448 / 2, WY = 5 * 264 / 2;
  js += `tl.fromTo('#muro img', { opacity: 0, scale: .55, y: 70, rotationX: -55, transformPerspective: 900, filter: 'blur(14px)' }, { opacity: 1, scale: 1, y: 0, rotationX: 0, filter: 'blur(0px)', duration: .9, ease: 'expo.out', stagger: { grid: [5, ${C}], from: [${ZR}, ${ZC}], amount: 1.1 }, immediateRender: false }, ${f30(a + 0.05)});
tl.fromTo('#muro', ${camM(cx, cy, 1.25)}, { ...${camM(WX, WY, .6)}, duration: ${f30(B(37.2) - a)}, ease: 'power3.inOut', immediateRender: false }, ${f30(a)});
tl.to('#muro', { ...${camM(cx + 240, cy - 40, .68)}, duration: ${f30(B(38.6) - B(37.2))}, ease: 'sine.inOut' }, ${f30(B(37.2))});
tl.to('#muro', { ...${camM(cx, cy, SZ)}, duration: ${f30(B(40.5) - B(38.6))}, ease: 'expo.inOut' }, ${f30(B(38.6))});
tl.fromTo('#vivo6', { opacity: 0 }, { opacity: 1, duration: .25, immediateRender: false }, ${f30(B(40.4))});
tl.set('#muro', { opacity: 0 }, ${f30(B(42))});
tl.to('#vivo6', { x: 150, y: 270, scale: .5, borderRadius: 36, boxShadow: '0 0 0 2px rgba(48,32,24,.12), 0 100px 220px rgba(48,32,24,.25)', duration: .9, ease: 'expo.inOut' }, ${f30(B(42))});
tl.to('#vivo6', { opacity: 0, filter: 'blur(10px)', duration: .3, ease: 'power2.in' }, ${f30(B(45.5) - 0.32)});\n`;
}
// ── 6c · LAS PAREJAS (Bolt «Fully interactive»): una animación en detalle a un lado y el texto de la web al otro
{
  const PAR = [['arkdev-x-muelle', 'Como un traje', 'a medida.', 1.2], ['playground-x-notas', 'Mano a mano', 'contigo.', 1], ['isotrol-x-mapa', 'De principio', 'a fin.', 0.3]];
  const a = B(42), b = B(52.7), P2 = 3.5;
  let inner = '';
  PAR.forEach(([clip, l1, l2, ms], i) => {
    const t0 = B(42 + i * P2), t1 = B(42 + (i + 1) * P2), izq = i % 2 === 0;
    inner += `${i ? `<div class="par-card ${izq ? 'izq' : 'der'}" id="pc${i}">${video(clip, t0, t1 + 0.1, ms)}</div>` : ''}<div class="par-t ${izq ? 'der' : 'izq'}" id="pt${i}"><p>${l1}</p><p class="acento">${l2}</p></div>`;
    if (i) js += `tl.fromTo('#pc${i}', { opacity: 0, y: 120, clipPath: 'inset(100% 0% 0% 0% round 18px)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: .8, ease: 'expo.out', immediateRender: false }, ${f30(i ? t0 : t0 + 0.05)});
tl.to(['#pc${i}', '#pt${i}'], { opacity: 0, y: -30, filter: 'blur(10px)', duration: .3, ease: 'power2.in' }, ${f30(t1 - 0.32)});\n`;
    else js += `tl.to('#pt0', { opacity: 0, y: -30, filter: 'blur(10px)', duration: .3, ease: 'power2.in' }, ${f30(t1 - 0.32)});\n`;
    entra(`#pt${i} p:first-child`, t0 + (i ? 0.25 : 0.7)); entra(`#pt${i} p.acento`, t0 + (i ? 0.55 : 1.0));
  });
  escena('e6p', a, b, 'transparent', `<i class="fondo-p" id="fp"></i>${inner}`);
  js += `tl.set('#fp', { opacity: 1 }, ${B(45.5)});\n`;
}
OFF = 16;
{
  const a = B(36.5), b = B(49), BW = 1100, BH = 619, P = 3.5; // dura hasta que el hero (rasgado desde la base) cubre la pantalla
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
    ['monad-grande', 'Monad', 0.2, { bg: '#f3f1ec', ink: '30,30,30', boxes: [
      { k: 'logo', x: .1, y: .04, w: .08, h: .03 }, { k: 'row', n: 5, x: .2, y: .045, w: .4, h: .02 },
      { k: 'btn', x: .69, y: .038, w: .08, h: .04, fill: '#1d1d1d' }, { k: 'btn', x: .78, y: .038, w: .11, h: .04, fill: '#3b5bff' },
      { k: 'txt', n: 2, c: 1, big: 1, x: .27, y: .2, w: .46, h: .18, l: 'h1 · 48/1.1' }, { k: 'txt', n: 3, c: 1, x: .34, y: .42, w: .32, h: .1 },
      { k: 'circ', x: .42, y: .62, w: .16, h: .3, l: 'pipeline', fill: 'radial-gradient(circle, rgba(120,230,140,.5), rgba(120,230,140,0) 70%)' },
      { k: 'row', n: 6, x: .12, y: .64, w: .12, h: .34, from: [-.05, 0] }, { k: 'row', n: 5, x: .74, y: .64, w: .1, h: .3, from: [.05, 0] }],
      agents: [{ k: 'claude', path: [[.5, .98, .6], [.5, .27, 1.3], [.5, .76, 1.75], [.8, .4, 2.2], [.6, .95, 2.85]] }],
      chips: [{ txt: 'h1 · serif 48', a: 0, b: 1.3, to: 4 }, { txt: '<Pipeline fuentes={7} />', a: 0, b: 1.75, to: 6 }, { txt: '#3B5BFF', sw: '#3b5bff', a: 0, b: 2.2, to: 3 }],
      prompt: { k: 'claude', txt: 'dibuja el pipeline de datos del hero' }, snap: 2.3 }],
  ];
  let inner = '';
  OBRAS.forEach(([clip, nombre, ms, o], i) => {
    if (i === 0) return; // Kuanta ya ha salido en el muro
    const t0 = B(33 + i * P), tb = B(33 + i * P + 0.3), take = B(33 + i * P + 2.3), t1 = B(33 + (i + 1) * P);
    const bb = build({ id: 'k' + i, W: BW, H: BH, s: 1.1, t0: tb, take, ...o });
    inner += `<p class="nombre" id="n6${i}">${nombre}</p><div class="obra montada" id="o6${i}"><div class="bar"><i></i><i></i><i></i><span>${nombre.toLowerCase().replace(/ /g, '')}</span></div><div class="scr">${video(clip, take - 0.1, t1 + 0.1, ms)}${bb.html}</div></div>`;
    js += bb.js;
    // el nombre sale primero, asomando; la web sube delante y le tapa la parte de abajo; al irse, los dos se van a la vez
    js += `tl.fromTo('#n6${i}', { opacity: 0, y: 40, filter: 'blur(18px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .7, ease: 'expo.out', immediateRender: false }, ${f30(t0)});
tl.set('#o6${i}', { opacity: 1 }, ${f30(t0 + 0.12)});
tl.fromTo('#o6${i}', { y: 160, clipPath: 'inset(100% 0% 0% 0% round 16px)' }, { y: 0, clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: .85, ease: 'expo.out', immediateRender: false }, ${f30(t0 + 0.12)});
tl.to(['#o6${i}', '#n6${i}'], { opacity: 0, y: -30, filter: 'blur(10px)', duration: .3, ease: 'power2.in' }, ${f30(t1 - 0.32)});\n`;
  });
  escena('e6', a, b, '#f6f3ee', inner);
  CSS_EXTRA = CSS_BUILD;
}
// ── 8 · EL HERO de savvia con su titular, pasando por las cuatro estaciones; y un final redondo: el titular se recoge y, en ondas desde la base del
//    roble, queda «savvia agentic.» con la dirección
{
  const a = B(47), b = FIN + 0.1, EST = ['otono', 'invierno', 'primavera', 'verano'];
  escena('e8r', a, b, 'transparent', EST.map((e, i) => `<img class="hero-est${i ? ' rasgo-h' : ''}" id="h8${i}" src="assets/hero-${e}.jpg" alt="" />`).join('')
    + `<div class="hero-t" id="ht8"><p class="hero-h1">Elevamos tu web con IA.</p><p class="hero-sub">Especialistas en orquestar el desarrollo agéntico.</p></div>`
    + `<i class="onda-fin" id="of0"></i><i class="onda-fin" id="of1"></i><i class="onda-fin" id="of2"></i>`
    + `<div class="hero-t" id="ht9"><p class="hero-h1">savvia agentic.</p><p class="hero-sub url-fin">savvia.studio</p></div>`);
  js += `tl.fromTo('#e8r', { '--m': '0px' }, { '--m': '4800px', duration: 1.2, ease: 'power2.inOut', immediateRender: false }, ${f30(a)});
tl.fromTo('#ht8', { opacity: 0, filter: 'blur(20px)', y: 18 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .9, ease: 'expo.out', immediateRender: false }, ${B(47.4)});\n`;
  [1, 2, 3].forEach((i) => { js += `tl.fromTo('#h8${i}', { '--m': '0px' }, { '--m': '4800px', duration: 1.4, ease: 'power2.inOut', immediateRender: false }, ${B(47.4 + i * 1.5)});\n`; });
  js += `tl.to('#ht8', { color: '#22303e', duration: .6 }, ${f30(B(48.9) + 0.45)}); tl.to('#ht8', { color: '#f5f5f7', duration: .6 }, ${f30(B(50.4) + 0.45)});
tl.to('#ht8', { opacity: 0, filter: 'blur(16px)', y: -14, duration: .45, ease: 'power2.in' }, ${B(52.4)});\n`;
  [0, 1, 2].forEach((k) => { js += `tl.fromTo('#of${k}', { scale: .2, opacity: .7 }, { scale: 9, opacity: 0, duration: 1.6, ease: 'expo.out', immediateRender: false }, ${f30(B(52.8) + k * 0.22)});\n`; });
  js += `tl.fromTo('#ht9', { opacity: 0, filter: 'blur(20px)', y: 18 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.0, ease: 'expo.out', immediateRender: false }, ${B(53.1)});\n`;
}
OFF = 0;
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
html, body { width: 1920px; height: 1080px; overflow: hidden; background: #3b231b; }
#root { position: relative; width: 100%; height: 100%; overflow: hidden; background: #3b231b; }
.esc { position: absolute; inset: 0; opacity: 0; overflow: hidden; perspective: 2200px; }
.full { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; }
.centro { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.lin { font: 400 96px/1.08 'Family', Georgia, serif; letter-spacing: -.025em; color: #f5f0ea; text-align: center; white-space: nowrap; }
.lin span { display: inline-block; opacity: 0; }
.lin.claro { opacity: 0; } .lin.tenue { color: #f5f0ea; }
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
.w.der { color: #2a1712; }
.frase.compacta .w { font-size: 80px; }
.hueco { position: relative; display: block; width: 0; overflow: hidden; }
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
.sel { position: absolute; left: 56px; top: 86px; width: 282px; height: 94px; border: 2px solid #f0532d; border-radius: 4px; transform-origin: 0 50%; opacity: 0; }
.cur { position: absolute; left: 330px; top: 170px; width: 18px; height: 22px; background: #2a1712; clip-path: polygon(0 0, 0 100%, 30% 72%, 52% 100%, 66% 92%, 45% 66%, 100% 64%); opacity: 0; }
.arbol .rob { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: 50% 100%; }
.rasgo { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(360px - var(--m) / 2) calc(418px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(360px - var(--m) / 2) calc(418px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
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
.nombre { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 400 210px/1 'Family', Georgia, serif; letter-spacing: -.035em; color: #2a1712; opacity: 0; white-space: nowrap; }
.roble-fin { position: absolute; left: 50%; bottom: 0; width: 1180px; margin-left: -590px; opacity: 1; }
.rasgo-fin { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(590px - var(--m) / 2) calc(546px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(590px - var(--m) / 2) calc(546px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.url { position: absolute; left: 0; right: 0; top: 300px; text-align: center; font: 400 22px/1 'Areal Mono', monospace; letter-spacing: .14em; color: rgba(245,240,234,.72); opacity: 0; }
.nombre-p { color: #fff3ea; }
.cabeza { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font: 400 60px/1.1 'Family', Georgia, serif; letter-spacing: -.02em; color: #2a1712; opacity: 0; }
.pelicula { position: absolute; left: 50%; top: 170px; width: 1440px; height: 810px; margin-left: -720px; border-radius: 18px; overflow: hidden; background: #f6f3ee; box-shadow: 0 0 0 1px rgba(48,32,24,.1), 0 40px 90px rgba(48,32,24,.18); opacity: 0; transform-origin: 50% 40%; }
.pelicula video { object-position: 50% 50%; }
.pie-obra.visible { bottom: 34px; }
.hero-est { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
#e8r { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(960px - var(--m) / 2) calc(1080px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
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
.lin.tenue2 { color: #f5f0ea; }
.linea { position: absolute; left: 0; right: 0; text-align: center; font: 400 64px/1.1 'Family', Georgia, serif; letter-spacing: -.02em; color: #2a1712; opacity: 0; }
.linea.arriba { top: 150px; } .linea.abajo { bottom: 150px; } .linea.medio { top: 360px; }
.lin.oscura { color: #2a1712; } .lin.tenue3 { color: #2a1712; }
.nav-mini { position: absolute; inset: 0; border-radius: 14px; overflow: hidden; background: #2a1712; box-shadow: 0 0 0 1px rgba(48,32,24,.14), 0 30px 70px rgba(48,32,24,.2); }
.nav-mini .bar { height: 34px; display: flex; align-items: center; gap: 7px; padding: 0 14px; position: relative; }
.nav-mini .bar i { width: 9px; height: 9px; border-radius: 50%; background: rgba(245,240,234,.28); }
.nav-mini .bar span { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font: 400 12px/1 'Areal Mono', monospace; color: rgba(245,240,234,.72); }
.scr-mini { position: absolute; left: 0; right: 0; top: 34px; bottom: 0; overflow: hidden; background: #fff; }
.scr-mini .rob { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 60%; }
.scr-mini .sec { position: absolute; left: 0; width: 100%; height: 134px; object-fit: cover; object-position: 50% 0; transform-origin: 50% 50%; }
.onda-fin { position: absolute; left: 50%; top: 100%; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 50%; border: 1.5px solid rgba(245,240,234,.55); opacity: 0; }
#ht9 { opacity: 0; } .url-fin { font-family: 'Areal Mono', monospace; letter-spacing: .14em; font-size: 18px; }
.lib-caja { position: absolute; left: 50%; top: 50%; transform-origin: 50% 50%; display: block; }
#lib3 { margin: -220px 0 0 -180px; } #pide4 { margin: -40px 0 0 -360px; }
.obra.montada { top: 60%; width: 1100px; margin: -330px 0 0 -550px; }
.nombre-obra { position: absolute; left: 0; right: 0; bottom: 52px; text-align: center; font: 400 22px/1 'Areal Mono', monospace; letter-spacing: .08em; color: rgba(42,23,18,.75); opacity: 0; }
.paleta { position: absolute; left: 0; top: 0; bottom: 0; width: 200px; background: #fbf8f1; border-right: 1px solid rgba(48,32,24,.1); padding: 18px 14px; }
.pal-h { font: 400 26px/1 'Family', Georgia, serif; color: #2a1712; }
.pal-g { margin-top: 8px; font: 400 10px/1 'Areal Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: rgba(48,32,24,.6); }
.pal-r { position: absolute; left: 8px; right: 8px; height: 54px; display: flex; align-items: center; gap: 10px; padding: 0 8px; border-radius: 8px; }
${[0,1,2,3].map((i) => `#pr${i} { top: ${76 + i * 64}px; }`).join(' ')}
.pal-s { display: flex; } .pal-s i { width: 18px; height: 34px; border-radius: 4px; margin-right: 2px; box-shadow: inset 0 0 0 1px rgba(48,32,24,.12); }
.pal-n { display: flex; flex-direction: column; gap: 4px; font: 420 15px/1 'Timeless Sans', sans-serif; color: #2a1712; } .pal-n b { font: 400 10px/1 'Areal Mono', monospace; color: rgba(48,32,24,.6); }
.cur-p { left: 0; top: 0; opacity: 0; z-index: 3; }
.vista { position: absolute; left: 200px; right: 0; top: 0; bottom: 0; overflow: hidden; }
.vista .rob { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 60%; }
.rasgo-v { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(260px - var(--m) / 2) calc(418px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(260px - var(--m) / 2) calc(418px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.bloques { position: absolute; inset: 0; background: #ece6dd; }
.blq { position: absolute; left: 120px; width: 280px; object-fit: fill; border-radius: 6px; box-shadow: 0 6px 16px rgba(48,32,24,.12); transform-origin: 50% 50%; }
.tunel { position: absolute; inset: 0; perspective: 1100px; perspective-origin: 50% 50%; }
.plano { position: absolute; left: 50%; width: 3400px; height: 3600px; margin-left: -1700px; overflow: hidden; opacity: 0; }
.techo { -webkit-mask-image: linear-gradient(to top, transparent 0%, #000 30%, #000 45%, transparent 85%); mask-image: linear-gradient(to top, transparent 0%, #000 30%, #000 45%, transparent 85%); bottom: 50%; margin-bottom: 130px; transform-origin: 50% 100%; transform: rotateX(-72deg); }
.suelo { -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 30%, #000 45%, transparent 85%); mask-image: linear-gradient(to bottom, transparent 0%, #000 30%, #000 45%, transparent 85%); top: 50%; margin-top: 130px; transform-origin: 50% 0%; transform: rotateX(72deg); }
.rejilla { position: absolute; left: 0; right: 0; display: grid; grid-template-columns: repeat(7, 1fr); gap: 34px; padding: 0 34px; }
.techo .rejilla { top: 0; } .suelo .rejilla { bottom: 0; }
.rejilla img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 10px; }
.velo-tunel { position: absolute; inset: 0; background: linear-gradient(rgba(59,35,27,0) 0%, rgba(59,35,27,.2) 30%, #3b231b 42%, #3b231b 58%, rgba(59,35,27,.2) 70%, rgba(59,35,27,0) 100%); }
.muro { position: absolute; left: 0; top: 0; width: ${8 * 448}px; height: ${5 * 264}px; transform-origin: 0 0; }
.muro img { position: absolute; width: 420px; height: 236px; object-fit: cover; border-radius: 8px; box-shadow: 0 0 0 1px rgba(48,32,24,.08), 0 10px 26px rgba(48,32,24,.12); }
#vivo6 video { object-position: 50% 50%; }
.vivo { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; opacity: 0; background: #fff; overflow: hidden; transform-origin: 0 0; }
.par-card { position: absolute; top: 50%; width: 960px; height: 540px; margin-top: -270px; border-radius: 18px; overflow: hidden; background: #2a1712; box-shadow: 0 0 0 1px rgba(48,32,24,.12), 0 50px 110px rgba(48,32,24,.25); opacity: 0; }
.par-card.izq { left: 150px; } .par-card.der { right: 150px; }
.par-t { position: absolute; top: 0; bottom: 0; width: 600px; display: flex; flex-direction: column; justify-content: center; }
.par-t.der { left: 1190px; } .par-t.izq { left: 150px; text-align: right; width: 580px; }
.par-t p { font: 400 76px/1.06 'Family', Georgia, serif; letter-spacing: -.025em; color: #2a1712; opacity: 0; }
.par-t p.acento { color: #2a1712; }
.fondo-p { position: absolute; inset: 0; background: #f6f3ee; opacity: 0; }
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
