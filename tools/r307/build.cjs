// RONDA 307 · REEL «secciones con tu librería» con «Laundry on the wire» (80 BPM). Parte del reel de la web (ronda 238): su inicio hasta «Pide… y listo.»
// se retoma al nuevo tempo; los proyectos se sustituyen por secciones reales de Quantus, Neety y Patchbay construidas a mano; y antes del cierre, lo que tu
// equipo puede hacer con la librería. Generado por tools/r307/ensambla.py (no editar a mano: editar gestos.txt / nuevo.txt). node build.cjs → hf/index.html
// (de la ronda 238:) Andoni: «podemos probar algo de este estilo» (Linearity AI, x.com/linearityhq/status/2110362970119454745: tipografía
// cinética, palabra a palabra y desenfocada, con la INTERFAZ dentro de la frase —«edit [anuncio] text»—, manchas de degradado cálido de respiro, centro en
// claro, apertura y cierre en negro). Aquí: savvia agentic contado con su librería, sus agentes y las webs. Cortes al pulso de «Distant Miles».
// node tools/r238-cinetico/build.cjs → hf/index.html
const fs = require('fs'), path = require('path');
const MURO = fs.readdirSync(path.join(__dirname, 'hf', 'assets', 'muro')).filter((f) => f !== 'zoom.jpg').sort();
const T = 0.75, f30 = (x) => Math.round(x * 30) / 30;
let OFF = 0; // desplazamiento en pulsos del bloque que se está escribiendo (ronda 247: entran el túnel, el muro y las parejas)
const B = (n) => f30(0.785 + (n + OFF) * T);
let FIN = 0, FUENTES_EXTRA = '';
const PB = 39.1; // ronda 252: arranque de las parejas (el clic en Kuanta vuela directo a la primera)
let html = '', js = '', z = 10, vid = 0;
const escena = (id, a, b, fondo, inner) => {
  html += `<div class="esc" id="${id}" style="z-index:${z++};background:${fondo}">${inner}</div>\n`;
  js += `tl.set('#${id}', { opacity: 1 }, ${f30(a)}); tl.set('#${id}', { opacity: 0 }, ${f30(b)});\n`;
};
const video = (src, a, b, ms, cls = 'full') => `<video id="v${++vid}" class="${cls}" src="assets/${src}.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="${ms}" data-track-index="${1 + (vid % 3)}" muted playsinline></video>`;
// una palabra que entra desenfocada y sube; sale desenfocándose hacia arriba
const entra = (sel, t, d = 0.55) => { js += `(() => { [...document.querySelectorAll('${sel}')].forEach((el) => { if (el.querySelector('img, svg, div, .card') || !el.textContent.trim()) { tl.fromTo(el, { opacity: 0, filter: 'blur(22px)', y: 34 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: ${d}, ease: 'expo.out', immediateRender: false }, ${f30(t)}); return; } const sp = SplitText.create(el, { type: 'words,chars' }); tl.set(el, { opacity: 1 }, 0); tl.set(sp.chars, { opacity: 0 }, 0); tl.fromTo(sp.chars, { opacity: 0, yPercent: 65, filter: 'blur(12px)', rotationX: -50 }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', rotationX: 0, duration: ${f30(d + 0.2)}, ease: 'expo.out', stagger: .022, immediateRender: false }, ${f30(t)}); }); })();\n`; };
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
  escena('e1', a, b, '#3b231b', `<div class="centro"><p class="lin" id="l1"><span id="w1">La IA es la base.</span></p><p class="lin tenue2" id="l2"><span id="w2">El criterio sigue siendo nuestro.</span></p></div>`);
  entra('#w1', B(0) + 0.15); entra('#w2', B(1.3)); sale('#l1', B(3.7)); sale('#l2', B(3.75));
}
// ── 2 · «savvia agentic: tu web conectada con la IA.»
{
  // ronda 247 (Bolt): el texto, en medio de un TÚNEL de webs (techo y suelo en perspectiva) que avanza hacia la cámara
  const a = B(4), b = B(9.2);
  const rej = (k) => `<div class="rejilla" id="rj${k}">${Array.from({ length: 24 }, (_, i) => `<img src="assets/muro/${MURO[(i * 7 + k * 13) % MURO.length]}" alt="" />`).join('')}</div>`;
  escena('e2', a, b, '#3b231b', `<div class="tunel"><div class="plano techo">${rej(0)}</div><div class="plano suelo">${rej(1)}</div></div><i class="velo-tunel"></i><div class="centro"><p class="lin" id="a1"><span>savvia agentic:</span></p><p class="lin tenue2" id="a2"><span>tu web conectada con la IA.</span></p></div>`);
  js += `tl.fromTo('.plano', { opacity: 0 }, { opacity: .34, duration: .9, ease: 'power2.out', immediateRender: false }, ${f30(a + 0.1)});
tl.fromTo('#rj0', { y: 0 }, { y: -900, duration: ${f30(b - a)}, ease: 'none', immediateRender: false }, ${f30(a)});
tl.fromTo('#rj1', { y: 0 }, { y: 900, duration: ${f30(b - a)}, ease: 'none', immediateRender: false }, ${f30(a)});\n`;
  entra('#a1 span', B(4.6)); entra('#a2 span', B(5.6)); sale('#a1', B(8.5)); sale('#a2', B(8.55));
}
OFF = 1.6;
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
  escena('e3b', a, b, '#f6f3ee', `<p class="cabeza" id="cab3b">La web, su receta y los agentes que la mantienen al día.</p><div class="pelicula" id="peli"><video id="v${++vid}" class="full" src="assets/agentic.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="0.6" data-playback-rate="${RATE}" data-track-index="2" muted playsinline></video></div><p class="pie-obra visible" id="pie3b">Claude, Codex, tu equipo y savvia</p>`);
  js += `tl.fromTo('#peli', { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .8, ease: 'expo.out', immediateRender: false }, ${f30(a + 0.05)});
tl.to('#peli', { opacity: 0, filter: 'blur(12px)', duration: .35, ease: 'power2.in' }, ${f30(B(18.3))});\n`;
  entra('#cab3b', B(12.15)); entra('#pie3b', B(13)); sale('#cab3b', B(18.25)); sale('#pie3b', B(18.25));
}
// ── 4 · «Así tú y tu equipo podréis cambiar lo que queráis» + la petición que se escribe justo debajo
{
  const a = B(18.6), b = B(23.2), PEDIDO = 'Crea «De ruido a señal» con el antes y el después de Neety';
  const caja = `<div class="pide"><p class="pide-x"><span id="tecla">${PEDIDO}</span><i class="cursor"></i></p><p class="pide-m"><span class="mas"><svg viewBox="0 0 16 16"><path d="M8 3.5v9M3.5 8h9"/></svg></span><span class="modelo"><b><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"></path></svg></b>Opus 5.5<svg class="baja" viewBox="0 0 16 16"><path d="M5 6.5 8 9.5l3-3"/></svg></span><em>+ librería de Neety</em></p><span class="enviar" id="enviar"><svg viewBox="0 0 16 16"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5"/></svg></span></div>`;
  escena('e4', a, b, '#f6f3ee', frase('f4', 'Pide', 'y listo.', 800, 170, caja, B(19.3), B(30)));
  entra('#f4 .izq', B(18.75)); entra('#f4 .der', B(19.8));
  js += `tl.set('#tecla', { clipPath: 'inset(0 100% 0 0)' }, 0); tl.fromTo('#tecla', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'steps(${PEDIDO.length})', immediateRender: false }, ${f30(B(19.8))});
tl.fromTo('#enviar', { scale: 1 }, { scale: .86, duration: .12, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, ${f30(B(21.3))});\n`;
  js += `tl.to('#f4 .izq', { x: -420, opacity: 0, filter: 'blur(14px)', duration: .6, ease: 'expo.in' }, ${f30(B(21.45))});
tl.to('#f4 .der', { x: 420, opacity: 0, filter: 'blur(14px)', duration: .6, ease: 'expo.in' }, ${f30(B(21.45))});
tl.to('#f4 .hueco', { scale: 1.12, duration: .6, ease: 'power2.inOut' }, ${f30(B(21.45))});
tl.set('#f4 .hueco', { overflow: 'visible' }, ${f30(B(22.05))});
tl.to('#f4 .card', { x: () => { const r = document.querySelector('#f4 .pide').getBoundingClientRect(); return '+=' + (370 - r.left) / 1.12; }, y: () => { const r = document.querySelector('#f4 .pide').getBoundingClientRect(); return '+=' + (30 - r.top) / 1.12; }, duration: .7, ease: 'expo.inOut' }, ${f30(B(22.1))});
tl.to('#f4 .pide', { width: 1053.6, height: 117.9, borderRadius: 25, duration: .7, ease: 'expo.inOut' }, ${f30(B(22.1))});\n`;
}
// el gesto propio de cada sección (sobre su sombra: window.__SEC[id].r); t = golpe de inicio de la sección, d = pulso (0,75 s). Ronda 307, 2.ª: «más
// énfasis en las animaciones, con la calidad de la web, y la música acorde»: cada gesto cae en los pulsos y recrea lo que hace la sección en su web.
const GESTOS = {
  // Quantus · «Built for whoever pays the compute bill.»: las cuatro isométricas se montan a la vez que llegan sus tarjetas: la placa se asienta y las
  iso: (id, t, d) => `(() => { const R = window.__SEC['${id}'].r, F = [...R.querySelectorAll('.isoframe')], ST = [...R.querySelectorAll('.dstep')], cap = R.querySelector('#glCap');
const caras = (f) => [...f.querySelectorAll('polygon, path, ellipse, rect, circle')];
const NOM = ['Cloud API', 'Data center', 'Edge and on-prem', 'On device'];
F.forEach((f, i) => tl.set(f, { autoAlpha: i ? 0 : 1, attr: { class: i ? 'isoframe' : 'isoframe on' } }, 0)); // la web deja los demás con visibility:hidden en línea ST.forEach((s, i) => tl.set(s, { attr: { class: i ? 'dstep' : 'dstep on' } }, 0));
tl.fromTo(caras(F[0]), { fillOpacity: 0, strokeOpacity: 1 }, { fillOpacity: 1, duration: .45, ease: 'power2.out', stagger: { amount: ${f30(1.2 * d)}, from: 'end' }, immediateRender: false }, ${f30(t + 2.6 * d)});
tl.fromTo(F[0], { y: 40, scale: .94 }, { y: 0, scale: 1, duration: 1.1, ease: 'expo.out', immediateRender: false }, ${f30(t + 2.4 * d)});
[1, 2, 3].forEach((i) => { const T = ${t} + (3.9 + i * 1.0) * ${d}, a = F[i - 1], b = F[i]; if (!b) return;
  tl.to(caras(a), { fillOpacity: 0, duration: .22, ease: 'power2.in', stagger: { amount: .12 } }, T);
  tl.set(a, { autoAlpha: 0, attr: { class: 'isoframe' } }, T + .3); tl.set(b, { autoAlpha: 1, attr: { class: 'isoframe on' } }, T + .3);
  tl.fromTo(caras(b), { fillOpacity: 0 }, { fillOpacity: 1, duration: .4, ease: 'power2.out', stagger: { amount: ${f30(0.5 * d)}, from: 'end' }, immediateRender: false }, T + .3);
  tl.fromTo(b, { y: 18, scale: .97 }, { y: 0, scale: 1, duration: .6, ease: 'expo.out', immediateRender: false }, T + .3);
  if (ST[i]) { tl.set(ST[i - 1], { attr: { class: 'dstep' } }, T + .3); tl.set(ST[i], { attr: { class: 'dstep on' } }, T + .3); tl.fromTo([...ST[i].children], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .45, ease: 'expo.out', stagger: .06, immediateRender: false }, T + .3); }
  if (cap) tl.set(cap, { innerHTML: '<b>0' + (i + 1) + '</b> ' + NOM[i] }, T + .3); });
})();\n`,
  // Quantus · Forge: sus cuatro pasos, uno por pulso (catálogo → dónde corre → despliegue con su registro → 30 días), y el gráfico que se dibuja
  forge: (id, t, d) => `(() => { const R = window.__SEC['${id}'].r, P = [...R.querySelectorAll('.fp')], RL = [...R.querySelectorAll('#fdryRail li')];
P.forEach((p, j) => tl.set(p, { attr: { class: j ? 'fp' : 'fp is-on' } }, 0));
[3.6, 4.6, 5.6, 6.6].forEach((x, i) => { const tt = ${t} + x * ${d};
  P.forEach((p, j) => tl.set(p, { attr: { class: j === i ? 'fp is-on' : 'fp' } }, tt));
  RL.forEach((li, j) => tl.set(li, { opacity: j === i ? 1 : .35 }, tt));
  tl.fromTo([...P[i].children], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .4, ease: 'expo.out', stagger: .07, immediateRender: false }, tt); });
const lg = [...R.querySelectorAll('#fp-3 .log li')]; tl.fromTo(lg, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, stagger: ${f30(d / 5)}, immediateRender: false }, ${t} + 5.7 * ${d});
const pth = [...R.querySelectorAll('#fdSvg path, #fdSvg polyline')]; pth.forEach((p) => { const L = p.getTotalLength ? p.getTotalLength() : 0; if (!L) return;
  tl.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: ${f30(1.2 * d)}, ease: 'power2.inOut', immediateRender: false }, ${t} + 6.7 * ${d}); });
})();\n`,
  // ── ronda 307, 6.ª: los cursores MONTAN cada sección con su gesto ──
  // Quantus · «Built for whoever pays the compute bill.»: la vista ya está en las cards; un cursor abre cada card en su sitio y, encima de su dibujo,
  // va SOLTANDO las piezas de la isométrica, que caen con rebote (la placa primero)
  cuatro: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, host = document.getElementById('${id}'), AG = ${AGC}, SG = [...R.querySelectorAll('.seg')], seg = R.querySelector('.segments');
const caja = (e) => { const r = e.getBoundingClientRect(), s = document.getElementById('eN1').getBoundingClientRect(); return [r.left - s.left, r.top - s.top, r.width, r.height]; };
tl.set(seg, { opacity: 0 }, 0); tl.fromTo(seg, { opacity: 0 }, { opacity: 1, duration: .5, immediateRender: false }, ${t} + 3.8 * ${d});
const usado = [0, 0, 0];
SG.forEach((c, j) => { const a = j % 3, [A, col] = AG[a], T = ${t} + (4.1 + a * 0.35 + (j >= 3 ? 3.4 : 0)) * ${d};
  const txt = [...c.children].filter((x) => !x.classList.contains('art') && x.tagName !== 'I'), sv = c.querySelector('svg.iso-seg');
  const base = sv ? [...sv.querySelectorAll(':scope > polygon')] : [], pz = sv ? [...sv.children].filter((x) => !base.includes(x)) : [];
  const ch = [0, 1, 2, 3].map((m) => pz.filter((_, q) => Math.floor(q * 4 / pz.length) === m));
  tl.set([c, ...base, ...pz], { opacity: 0 }, 0);
  const sobre = (dx) => () => { const b = caja(sv || c); return [b[0] + b[2] * (0.5 + dx), b[1] + b[3] * 0.1]; };
  if (!usado[a]) { usado[a] = 1; tl.set(A, { x: () => caja(c)[0] + 40, y: () => caja(c)[1] + 30 }, T - 0.36); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, T - 0.35); }
  else tl.to(A, { x: () => caja(c)[0] + 40, y: () => caja(c)[1] + 30, duration: .45, ease: 'expo.inOut' }, T - 0.5);
  tl.to(A + ' .ag-f', { scale: .76, duration: .08, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, T - 0.05);
  tl.fromTo(c, { opacity: 0, clipPath: 'inset(0% 100% 100% 0%)', outline: '2px solid ' + col, outlineOffset: '-2px' }, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: .55, ease: 'expo.out', immediateRender: false }, T);
  tl.to(c, { outlineColor: 'rgba(0,0,0,0)', duration: .5 }, T + .5); tl.set(c, { outline: 'none' }, T + 1.05);
  tl.fromTo(txt, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: 'expo.out', stagger: .06, immediateRender: false }, T + .15);
  // al dibujo: la placa se asienta y el cursor suelta las piezas desde arriba, una tanda por golpe
  tl.to(A, { x: () => sobre(0)()[0], y: () => sobre(0)()[1], duration: .4, ease: 'expo.inOut' }, T + .3);
  tl.fromTo(base, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .45, ease: 'back.out(2)', stagger: .03, immediateRender: false }, T + .6);
  ch.forEach((grp, m) => { if (!grp.length) return; const Tm = T + .85 + m * .32, dx = [-0.12, 0.08, -0.04, 0.12][m];
    tl.to(A, { x: () => sobre(dx)()[0], y: () => sobre(dx)()[1], duration: .2, ease: 'power2.out' }, Tm - .2);
    tl.to(A + ' .ag-f', { scale: .76, duration: .07, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, Tm - .02);
    tl.fromTo(grp, { opacity: 0, y: -150 }, { opacity: 1, y: 0, duration: .75, ease: 'bounce.out', stagger: .025, immediateRender: false }, Tm); });
  if (j >= 3 || j + 3 >= SG.length) tl.to(A, { y: '-=90', opacity: 0, duration: .4, ease: 'power2.in' }, T + 2.3);
  const rojo = sv ? [...sv.querySelectorAll('.glow, .led, .mk')] : []; if (rojo.length) tl.fromTo(rojo, { opacity: .35 }, { opacity: 1, duration: .16, yoyo: true, repeat: 3, ease: 'power1.inOut', immediateRender: false }, T + 2.4); });
})();\n`,
  // Quantus · el apilado: los cursores llegan arriba de cada hueco con su bloque y lo SUELTAN; cae con rebote. Luego la ola roja y un bloque «pisado»
  apila: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, host = document.getElementById('${id}'), AG = ${AGC}, K = parseFloat((host.style.transform.match(/scale\\(([\\d.]+)/) || [, 1])[1]);
const B = [...R.querySelectorAll('.blk')].sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left || a.getBoundingClientRect().top - b.getBoundingClientRect().top);
const L = [...R.querySelectorAll('.blk:not(.fill) .lit')], D = [...R.querySelectorAll('.dia')], ALTO = 300;
tl.set([...B, ...D], { opacity: 0 }, 0);
const c = (e) => { const p = window.__pos(e, host, true); return [p[0], p[1] - gsap.getProperty(host, 'y')]; };
B.forEach((e, i) => { const [A] = AG[i % 3], T = ${t} + (2.7 + i * 0.26) * ${d}, n = Math.floor(i / 3);
  if (n === 0) { tl.set(A, { x: () => c(e)[0], y: () => c(e)[1] - ALTO * K - 10 }, T - .45); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, T - .44); }
  else tl.to(A, { x: () => c(e)[0], y: () => c(e)[1] - ALTO * K - 10, duration: .25, ease: 'power3.out' }, T - .3);
  tl.fromTo(e, { opacity: 0, y: -ALTO, rotation: i % 2 ? 4 : -4 }, { opacity: 1, duration: .1, immediateRender: false }, T - .2);
  tl.to(A + ' .ag-f', { scale: .76, duration: .07, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, T - .03);
  tl.to(e, { y: 0, rotation: 0, duration: .8, ease: 'bounce.out' }, T);
  if (i + 3 >= B.length) tl.to(A, { y: '-=80', opacity: 0, duration: .35, ease: 'power2.in' }, T + .3); });
const fin = ${t} + (2.7 + B.length * 0.26) * ${d} + .6;
tl.fromTo(D, { opacity: 0 }, { opacity: 1, duration: .6, immediateRender: false }, fin);
// HOVER, como en su web: el cursor pasa por encima de tres bloques; la cara se desplaza hacia él, se enciende su rojo y crece la sombra (el de «turn» gira 14°)
const [H] = AG[0], pasa = [...R.querySelectorAll('.blk.prod')].slice(0, 2).concat([...R.querySelectorAll('.blk.turn')]).filter(Boolean);
tl.set(H, { x: () => c(pasa[0])[0] + 200, y: () => c(pasa[0])[1] + 140 }, fin - .05); tl.fromTo(H, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, fin);
pasa.forEach((e, i) => { const T = fin + .25 + i * .75, f = e.querySelector('.face'), l = e.querySelector('.lit'), gira = e.classList.contains('turn');
  tl.to(H, { x: () => c(e)[0] + 30, y: () => c(e)[1] - 10, duration: .35, ease: 'power3.inOut' }, T);
  tl.to(f, gira ? { rotation: 14, boxShadow: 'rgba(0,0,0,.5) 10px 12px 30px', duration: .45, ease: 'expo.out' } : { x: 12, y: -12, boxShadow: '14px -14px 34px rgba(0,0,0,.55)', duration: .45, ease: 'expo.out' }, T + .25);
  if (l) tl.to(l, { opacity: 1, duration: .3 }, T + .25);
  tl.to(f, { x: 0, y: 0, rotation: 0, boxShadow: '0px 0px 0px rgba(0,0,0,0)', duration: .5, ease: 'expo.out' }, T + .72);
  if (l) tl.to(l, { opacity: 0, duration: .3 }, T + .72); });
tl.to(H, { opacity: 0, y: '+=60', duration: .35 }, fin + .3 + pasa.length * .75);
})();\n`,
  // Neety · de ruido a señal: el PUENTE del medio como en su web (la banda, los chips y los píxeles que brotan, la pieza que late y su marca que se balancea),
  // una señal que cruza de «antes» a «después», y un cursor que marca las comprobaciones una a una (como los checks de los servicios de la home)
  checks: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, host = document.getElementById('${id}'), AG = ${AGC}, sig = R.querySelector('[data-signal]'); if (!sig) return;
const band = sig.children[1], chips = [...sig.querySelectorAll('.neety-chip')], pix = [...sig.querySelectorAll('.neety-pix')], tile = sig.querySelector('.neety-tile'), mark = sig.querySelector('.neety-mark'), tw = [...sig.querySelectorAll('.neety-twinkle')];
const T0 = ${t} + 4.0 * ${d}, x = (e) => parseFloat(e.style.left) || 0, cx = 115;
tl.set([tile, mark, ...chips, ...pix, ...tw], { opacity: 0 }, 0); if (band) tl.set(band, { scaleX: 0, transformOrigin: '50% 50%' }, 0);
// 1 · la banda se abre desde el centro · 2 · la pieza aparece con su marca (rebote y balanceo, como neetyTileOnce / neetyMarkOnce)
if (band) tl.fromTo(band, { scaleX: 0, transformOrigin: '50% 50%' }, { scaleX: 1, duration: .8, ease: 'expo.out', immediateRender: false }, T0);
tl.fromTo(tile, { opacity: 0, scale: .55 }, { opacity: 1, scale: 1, duration: .7, ease: 'back.out(2.2)', immediateRender: false }, T0 + .1);
tl.fromTo(mark, { opacity: 0, scale: .7, rotation: -8 }, { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, .55)', immediateRender: false }, T0 + .2);
// 3 · los chips y los píxeles brotan del centro hacia fuera, a los dos lados (la escalera de píxeles)
tl.fromTo(chips, { opacity: 0 }, { opacity: 1, duration: .35, immediateRender: false }, T0 + .35);
pix.forEach((p) => tl.fromTo(p, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(3)', immediateRender: false }, T0 + .4 + Math.abs(x(p) - cx) / 115 * .55));
// 4 · la señal: una ola de luz recorre los píxeles de «antes» a «después» (dos veces) y la pieza late al pasar
const orden = pix.slice().sort((a, b) => x(a) - x(b));
[0, 1].forEach((v) => { const Tv = T0 + 1.3 + v * .95;
  orden.forEach((p) => tl.to(p, { scale: 1.45, duration: .12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, Tv + x(p) / 230 * .55));
  tl.to(tile, { scale: 1.07, duration: .16, yoyo: true, repeat: 1, ease: 'sine.inOut' }, Tv + .26); });
// 5 · los destellos, suaves, cuando ya está todo
tw.forEach((p, i) => tl.fromTo(p, { opacity: 0, scale: .4 }, { opacity: .9, scale: 1, duration: .7, ease: 'sine.inOut', yoyo: true, repeat: 3, immediateRender: false }, T0 + 1.2 + (i % 7) * .18));
const ck = [...R.querySelectorAll('span.bg-plum > svg')].map((s) => s.parentElement), [A] = AG[0]; // (los checks, tras el puente)
tl.set(ck, { scale: 0 }, 0);
const c = (e) => { const p = window.__pos(e, host, false); return [p[0], p[1]]; };
ck.forEach((e, i) => { const T = ${t} + (5.4 + i * 0.42) * ${d};
  if (!i) { tl.set(A, { x: () => c(e)[0] + 60, y: () => c(e)[1] + 40 }, T - .4); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, T - .4); }
  tl.to(A, { x: () => c(e)[0] - 2, y: () => c(e)[1] - 2, duration: .22, ease: 'power3.inOut' }, T - .24);
  tl.to(A + ' .ag-f', { scale: .76, duration: .07, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, T - .02);
  tl.fromTo(e, { scale: 0 }, { scale: 1, duration: .4, ease: 'back.out(3)', immediateRender: false }, T + .04);
  tl.fromTo(e.firstElementChild, { opacity: 0, scale: .4 }, { opacity: 1, scale: 1, duration: .3, ease: 'expo.out', immediateRender: false }, T + .12); });
if (ck.length) tl.to(A, { x: '+=160', y: '+=120', opacity: 0, duration: .4, ease: 'power2.in' }, ${t} + (5.4 + ck.length * 0.42) * ${d} + .1);
})();\n`,
  // Neety · integraciones: cada línea la TIRA un cursor desde su fuente hasta el panel (el cursor va en la punta del trazo)
  lineas: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, AG = ${AGC}, esc = document.getElementById('eN1'), pth = [...R.querySelectorAll('svg path, svg line, svg polyline')].filter((p) => (p.getTotalLength ? p.getTotalLength() : 0) > 20);
const fin = [0, 0, 0];
pth.forEach((p, i) => { const L = p.getTotalLength(), T = ${t} + (5.0 + (i % 6) * 0.45) * ${d}, dur = ${f30(1.0 * d)};
  tl.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: dur, ease: 'power2.inOut', immediateRender: false }, T);
  if (i >= 6) return; const a = i % 3, [A] = AG[a], pr = { v: 0 };
  const at = (v) => { const pt = p.getPointAtLength(v * L), sv = p.ownerSVGElement, r = sv.getBoundingClientRect(), s = esc.getBoundingClientRect(), vb = sv.viewBox && sv.viewBox.baseVal && sv.viewBox.baseVal.width ? sv.viewBox.baseVal : { x: 0, y: 0, width: sv.clientWidth || r.width, height: sv.clientHeight || r.height }, k = Math.min(r.width / vb.width, r.height / vb.height), ox = (r.width - vb.width * k) / 2, oy = (r.height - vb.height * k) / 2; return [r.left + ox + (pt.x - vb.x) * k - s.left, r.top + oy + (pt.y - vb.y) * k - s.top]; };
  const ok = (q) => isFinite(q[0]) && isFinite(q[1]) && q[0] > 120 && q[0] < 1800 && q[1] > 150 && q[1] < 1060;
  const q0 = () => { const q = at(0); return ok(q) ? q : [-400, 600]; };
  if (i < 3) tl.set(A, { x: () => q0()[0], y: () => q0()[1] }, T - .16);
  if (i < 3) tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, T - .15);
  tl.fromTo(pr, { v: 0 }, { v: 1, duration: dur, ease: 'power2.inOut', immediateRender: false, onUpdate: () => { const q = at(pr.v); if (ok(q)) gsap.set(A, { x: q[0], y: q[1] }); else gsap.set(A, { x: -400 }); } }, T);
  fin[a] = Math.max(fin[a], T + dur); });
fin.forEach((f, a) => { if (f) tl.to(AG[a][0], { opacity: 0, duration: .3 }, f + .1); });
})();\n`,
  // ── ronda 307, 12.ª: Playground ──
  // «What it does for your district.»: los cursores traen las tres cards vacías (su degradado) y cada una se llena: el icono salta, entra el texto y el «+»;
  // al final un cursor pasa por encima de la del medio (sube y el «+» gira, su hover)
  pgcards: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, host = document.getElementById('${id}'), AG = ${AGC}, B = [...R.querySelectorAll('.o6_box')];
const dentro = (c) => [...c.querySelectorAll('img, .o6_k, .o6_t, .o6_s, .o6_plus')];
tl.set(B.flatMap(dentro), { opacity: 0 }, 0);
B.forEach((c, j) => { const T = ${t} + (3.5 + j * 0.4) * ${d}, img = c.querySelector('img'), tx = [...c.querySelectorAll('.o6_k, .o6_t, .o6_s')], pl = c.querySelector('.o6_plus');
  tl.fromTo(img, { opacity: 0, scale: 0, rotation: -25 }, { opacity: 1, scale: 1, rotation: 0, duration: .6, ease: 'back.out(2.6)', immediateRender: false }, T);
  tl.fromTo(tx, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: 'expo.out', stagger: .07, immediateRender: false }, T + .15);
  tl.fromTo(pl, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(3)', immediateRender: false }, T + .45); });
const c = (e) => window.__pos(e, host, false), [H] = AG[1], M = B[1]; if (M) { const T = ${t} + 5.9 * ${d};
  tl.set(H, { x: () => c(M)[0] + 260, y: () => c(M)[1] + 200 }, T - .25); tl.fromTo(H, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, T - .25);
  tl.to(H, { x: () => c(M)[0] + 40, y: () => c(M)[1] + 30, duration: .45, ease: 'expo.inOut' }, T);
  tl.to(M, { y: -12, scale: 1.025, boxShadow: '0 30px 60px -20px rgba(31,40,90,.35)', duration: .5, ease: 'expo.out' }, T + .4);
  tl.to(M.querySelector('.o6_plus'), { rotation: 90, duration: .5, ease: 'expo.out' }, T + .4);
  tl.to(M, { y: 0, scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: .5, ease: 'expo.out' }, T + 1.5);
  tl.to(M.querySelector('.o6_plus'), { rotation: 0, duration: .5, ease: 'expo.out' }, T + 1.5);
  tl.to(H, { x: '+=200', y: '+=160', opacity: 0, duration: .4, ease: 'power2.in' }, T + 1.6); }
})();\n`,
  // «Student data is never sold»: se dibujan las pistas del circuito, entran las piezas, el chip se enciende y el candado se CIERRA; los datos viajan por las
  // pistas; tras bajar la vista, un cursor marca una a una las promesas («We will always» y «We will never»)
  privacidad: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, host = document.getElementById('${id}'), AG = ${AGC}, art = R.querySelector('.p6_art'), cols = R.querySelector('.p6_cols');
if (!art) return; const T0 = ${t} + 3.0 * ${d};
const tr = [...art.querySelectorAll('.pz_tr')], parts = [...art.querySelectorAll('.pz_part')], halo = art.querySelector('.pz_halo'), tile = art.querySelector('.pz_tile.is-glow'), sh = art.querySelector('.pz_shackle'), lbl = [...art.querySelectorAll('.pz_lbl, text')], pk = [...art.querySelectorAll('.pz_pk circle')];
tl.set(art, { opacity: 0 }, 0); tl.set([...parts, ...lbl, ...pk], { opacity: 0 }, 0); if (halo) tl.set(halo, { opacity: 0 }, 0);
tl.fromTo(art, { opacity: 0 }, { opacity: 1, duration: .3, immediateRender: false }, T0);
tl.fromTo(tr, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .9, ease: 'power2.inOut', stagger: .05, immediateRender: false }, T0);
tl.fromTo(parts, { opacity: 0, scale: .7, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .15, immediateRender: false }, T0 + .4);
tl.fromTo(lbl, { opacity: 0 }, { opacity: 1, duration: .4, stagger: .05, immediateRender: false }, T0 + .9);
if (halo) tl.fromTo(halo, { opacity: 0, scale: .6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .9, ease: 'expo.out', immediateRender: false }, T0 + 1.0);
if (tile) tl.fromTo(tile, { opacity: .4 }, { opacity: 1, duration: .25, yoyo: true, repeat: 3, immediateRender: false }, T0 + 1.0);
if (sh) tl.fromTo(sh, { y: -14 }, { y: 0, duration: .5, ease: 'bounce.out', immediateRender: false }, T0 + 1.3);
pk.forEach((p, i) => { const ref = p.querySelector('mpath'), ruta = ref ? art.querySelector(ref.getAttribute('href')) : null; if (!ruta) return; const L = ruta.getTotalLength(), q = { v: 0 };
  tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, T0 + 1.5 + (i % 3) * .28);
  tl.fromTo(q, { v: 0 }, { v: 1, duration: 1.4, ease: 'none', repeat: 3, immediateRender: false, onUpdate: () => { const pt = ruta.getPointAtLength(q.v * L); p.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')'); } }, T0 + 1.5 + (i % 3) * .28); });
if (!cols) return; const h3 = [...cols.querySelectorAll('h3')], li = [...cols.querySelectorAll('li')], [A] = AG[0], T1 = ${t} + 7.9 * ${d};
tl.set([...h3, ...li], { opacity: 0 }, 0);
tl.fromTo(h3, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .45, ease: 'expo.out', stagger: .1, immediateRender: false }, T1 - .3);
const c = (e) => { const r = e.getBoundingClientRect(), s = document.getElementById('eN1').getBoundingClientRect(); return [r.left - s.left + 10, r.top + r.height / 2 - s.top]; };
tl.set(A, { x: () => c(li[0])[0] + 120, y: () => c(li[0])[1] + 80 }, T1 - .2); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, T1 - .2);
li.forEach((e, i) => { const T = T1 + i * .2;
  tl.to(A, { x: () => c(e)[0], y: () => c(e)[1], duration: .16, ease: 'power3.out' }, T - .16);
  tl.to(A + ' .ag-f', { scale: .8, duration: .05, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, T - .02);
  tl.fromTo(e, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: .3, ease: 'expo.out', immediateRender: false }, T); });
tl.to(A, { x: '+=200', y: '+=120', opacity: 0, duration: .4, ease: 'power2.in' }, T1 + li.length * .2 + .2);
})();\n`,
  // ── ronda 307, 13.ª: Playground, features y testimonios ──
  // Features: los cursores traen el titular, el menú y la primera tarjeta; luego, como al hacer scroll en su web, cada tarjeta SUBE y se posa sobre la anterior
  // (escalón de 14 px para ver la pila) y el cohete del menú vuela a la herramienta activa
  pila: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, AG = ${AGC}, C = [...R.querySelectorAll('.fs6_card')], L = [...R.querySelectorAll('.fs6_nav a')], rk = R.querySelector('.fs6_rk');
if (C.length < 2) return; const nat = (e) => e.offsetTop, top0 = nat(C[0]);
const pon = (i) => { L.forEach((a, j) => a.setAttribute('aria-current', j === i ? 'true' : 'false')); };
tl.call(() => pon(0), null, 0.01);
C.slice(1).forEach((c, j) => { const i = j + 1, T = ${t} + (4.2 + j * 1.25) * ${d}, fin = top0 + 14 * i - nat(c);
  tl.fromTo(c, { y: fin + 900 }, { y: fin, duration: .95, ease: 'expo.out', immediateRender: false }, T);
  tl.set(c, { opacity: 1 }, T);
  C.slice(0, i).forEach((p, q) => tl.to(p, { scale: 1 - (i - q) * 0.012, transformOrigin: '50% 0%', duration: .9, ease: 'expo.out' }, T));
  tl.call(() => pon(i), null, T + .25); tl.call(() => pon(i - 1), null, T + .24);
  if (rk && L[i]) { const yA = L[i - 1].offsetTop + L[i - 1].offsetHeight / 2, yB = L[i].offsetTop + L[i].offsetHeight / 2;
    tl.to(rk, { '--ry': yB + 'px', duration: .45, ease: 'back.out(1.6)' }, T + .25);
    // ronda 307, 16.ª («el cohete deja una estela al pasar por el menú, como en producción»): su trazo de cera, discontinuo y en el color de la herramienta,
    // que crece en la dirección del cohete y se apaga (fs6trail: 0,7 s); y el cohete se ladea 28° al volar y se endereza al llegar
    const tr = document.createElement('i'); tr.className = 'fs6_trail'; tr.setAttribute('aria-hidden', 'true'); tr.style.top = Math.min(yA, yB) + 'px'; tr.style.height = Math.abs(yB - yA) + 'px'; tr.style.setProperty('--c', L[i].style.getPropertyValue('--c')); tr.style.opacity = '0'; rk.parentElement.appendChild(tr);
    tl.fromTo(tr, { scaleY: 0, opacity: .9, transformOrigin: '50% 0%' }, { scaleY: 1, duration: .32, ease: 'power2.out', immediateRender: false }, T + .25);
    tl.to(tr, { opacity: 0, duration: .38, ease: 'power1.in' }, T + .57);
    tl.fromTo(rk, { '--rt': '0deg' }, { '--rt': '28deg', duration: .12, ease: 'power2.out', immediateRender: false }, T + .25);
    tl.to(rk, { '--rt': '0deg', duration: .3, ease: 'back.out(2)' }, T + .49); } });
tl.set(C.slice(1), { y: 2000 }, 0);
})();\n`,
  // Testimonios: la RUEDA de su web (avatares en un arco de radio 873 px, 30° entre ellos): un cursor pulsa «siguiente», la rueda gira una ranura, el color de
  // la tarjeta vira al de esa persona y la cita y el nombre se relevan
  rueda6: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, AG = ${AGC}, W = R.querySelector('.tw6_wheel'), card = R.querySelector('.tw6_card'), q = R.querySelector('[data-tw6q]'), nm = R.querySelector('[data-tw6n]'), nx = R.querySelector('[data-tw6next]');
if (!W) return; const F = [...W.children], RAD = 872.96, CX = 704, CY = 80;
const s0 = F.map((f) => { const m = /translate\\(([-\\d.]+)px, ([-\\d.]+)px\\)/.exec(f.style.transform || ''); if (!m) return 0; return Math.atan2(parseFloat(m[1]) - CX, CY + RAD - parseFloat(m[2])) * 180 / Math.PI / 30; });
const P = { s: 0 }, pon = () => F.forEach((f, i) => { const s = s0[i] - P.s, a = s * 30 * Math.PI / 180, c = Math.max(0, 1 - Math.abs(s));
  f.style.transform = 'translate(' + (CX + RAD * Math.sin(a)).toFixed(1) + 'px, ' + (CY + RAD * (1 - Math.cos(a))).toFixed(1) + 'px) scale(' + (1 + .32 * c).toFixed(3) + ')'; f.style.zIndex = String(Math.round(100 - Math.abs(s) * 30)); });
tl.fromTo(F, { opacity: 0 }, { opacity: 1, duration: .5, stagger: { each: .03, from: 'center' }, immediateRender: false }, ${t} + 1.9 * ${d});
const V = [['“PlaygroundIEP has revolutionized the way I create and manage individualized education programs.”', 'Michael W.', 'Assistant Principal, Hyde Park Middle School', '#d6f5fb'], ['“It’s heaven. It’s beautiful.”', 'Lance P.', '5th Grade Teacher', '#dcfbe8'], ['“Playground kept us organized and compliant.”', 'Tiffany S.', 'Case Manager', '#fff1c9']];
const c = (e) => window.__pos(e, document.getElementById('${id}'), false), [A] = AG[2];
V.forEach(([cita, quien, rol, col], j) => { const T = ${t} + (3.4 + j * 2.4) * ${d};
  if (!j) { tl.set(A, { x: () => c(nx)[0] + 160, y: () => c(nx)[1] + 120 }, T - .45); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, T - .45); }
  tl.to(A, { x: () => c(nx)[0] - 2, y: () => c(nx)[1] - 2, duration: .3, ease: 'power3.inOut' }, T - .32);
  tl.to(A + ' .ag-f', { scale: .76, duration: .08, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, T - .03);
  tl.fromTo(P, { s: j }, { s: j + 1, duration: .9, ease: 'power3.inOut', onUpdate: pon, immediateRender: false }, T);
  tl.to(card, { '--tc': col, duration: .9, ease: 'power2.inOut' }, T);
  tl.to([q, nm], { opacity: 0, y: -10, duration: .25, ease: 'power2.in' }, T);
  tl.call(() => { q.textContent = cita; nm.innerHTML = '<b>' + quien + '</b><span>' + rol + '</span>'; }, null, T + .27);
  tl.fromTo([q, nm], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .45, ease: 'expo.out', stagger: .08, immediateRender: false }, T + .3); });
tl.to(A, { x: '+=200', y: '+=140', opacity: 0, duration: .4, ease: 'power2.in' }, ${t} + 10.2 * ${d});
})();\n`,
  // Patchbay · agentes: las fichas de canales suben y, como en su web, la ruleta avanza un puesto por pulso y la del centro atraca en el carril
  ruleta: (id, t, d, AGC) => `(() => { const R = window.__SEC['${id}'].r, cont = R.querySelector('[data-dc-tpl="399"]'); if (!cont) return; const F = [...cont.children];
// ronda 307, 5.ª («la ruleta hace mal la animación»): en su web es una RUEDA: cada icono vive en una ranura de un arco de radio 715 px alrededor de un
// centro oculto bajo el hueco; a cada paso todos avanzan una ranura (la del centro, sin girar y a tamaño entero, es la que se acopla a la API)
const PASO = 15.67, RAD = 715, s0 = F.map((f) => { const m = /rotate\\((-?[\\d.]+)deg\\)/.exec(f.style.transform || ''); return m ? parseFloat(m[1]) / PASO : 0; }), P = { s: 0 };
const pon = () => F.forEach((f, i) => { const s = s0[i] - P.s, a = s * PASO * Math.PI / 180, c = Math.max(0, 1 - Math.abs(s)); f.style.transition = 'none';
  f.style.transform = 'translate(' + (RAD * Math.sin(a)).toFixed(1) + 'px, ' + (RAD * (1 - Math.cos(a))).toFixed(1) + 'px) rotate(' + (s * PASO).toFixed(2) + 'deg) scale(' + (0.79 + 0.21 * c).toFixed(3) + ')'; });
[3, 4, 5, 6, 7].forEach((k, j) => { tl.fromTo(P, { s: j }, { s: j + 1, duration: ${f30(0.8 * d)}, ease: 'power3.inOut', onUpdate: pon, immediateRender: false }, ${t} + k * ${d}); });
// un cursor EMPUJA la rueda: agarra el icono que llega y lo arrastra por el arco hasta el hueco de la API
const AG = ${AGC}, [A] = AG[2], host = document.getElementById('${id}'), esc = document.getElementById('eN1'), Kh = parseFloat((host.style.transform.match(/scale\\(([\\d.]+)/) || [, 1])[1]);
const ranura = (s) => { const r = cont.getBoundingClientRect(), e = esc.getBoundingClientRect(), a = s * PASO * Math.PI / 180; return [r.left + r.width / 2 - e.left + RAD * Math.sin(a) * Kh, r.top - e.top + (152 + RAD * (1 - Math.cos(a))) * Kh]; };
[5, 6, 7].forEach((k, j) => { const T = ${t} + k * ${d}, q = { v: 0 };
  if (!j) { tl.set(A, { x: () => ranura(1)[0], y: () => ranura(1)[1] }, T - .3); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, T - .3); }
  else tl.to(A, { x: () => ranura(1)[0], y: () => ranura(1)[1], duration: .2, ease: 'power2.out' }, T - .22);
  tl.to(A + ' .ag-f', { scale: .8, duration: .08, transformOrigin: '4px 4px' }, T - .05);
  tl.fromTo(q, { v: 0 }, { v: 1, duration: ${f30(0.8 * d)}, ease: 'power3.inOut', immediateRender: false, onUpdate: () => { const p = ranura(1 - q.v); gsap.set(A, { x: p[0], y: p[1] }); } }, T);
  tl.to(A + ' .ag-f', { scale: 1, duration: .1, transformOrigin: '4px 4px' }, T + ${f30(0.8 * d)}); });
tl.to(A, { opacity: 0, duration: .3 }, ${t} + 8 * ${d});
})();\n`,
  // Patchbay · la capa oscura: «THE SHIFT» letra a letra y las piezas de cada tarjeta encendiéndose en ola a cuarto de pulso
  oscura: (id, t, d) => `(() => { const R = window.__SEC['${id}'].r, h = R.querySelector('h2'), ey = h ? h.previousElementSibling : null;
if (ey && ey.children.length > 4) tl.fromTo([...ey.children], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .3, stagger: ${f30(d / 6)}, immediateRender: false }, ${f30(t + 2.0 * d)});
const pz = [...R.querySelectorAll('span')].filter((s) => !s.children.length && !s.textContent.trim() && s.offsetWidth > 6 && s.offsetWidth < 90);
tl.fromTo(pz, { scale: .2, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: .45, ease: 'back.out(2.4)', stagger: { amount: ${f30(2.4 * d)}, from: 'start' }, immediateRender: false }, ${f30(t + 4.4 * d)});
})();\n`,
};

// ══ RONDA 307 · LO NUEVO (Andoni: «proyectos destacados cambiarlo por cómo vas pidiendo a la IA que te cree secciones, y coger las mejores secciones de
// las webs que tenemos; como son proyectos nuestros, recréalas tal cual, así quedará mejor que el vídeo» · «no quiero poner los heros: secciones chulas de
// cada web, para que veas que puedes crear cosas cuidadas con nuestra librería» · «todo hecho a mano como la animación de savvia agentic» · «antes del
// cierre, mencionar todo lo que puedes hacer con la librería, lo que sale en la animación de savvia agentic»).
// Cada sección es su HTML y su CSS REALES (tools/r301/web-dom.cjs y neety-dom.cjs), dentro de una sombra para que su CSS no toque el del reel, y se
// MONTA a mano: primero las tarjetas, luego lo que llevan dentro, y cada una con su gesto propio (los bloques del apilado caen, Forge recorre sus pasos y
// dibuja el gráfico, se trazan las líneas de integración, la ruleta de canales gira…). Todo al pulso de «Laundry on the wire» (80 BPM, 0,75 s).
const IAS = [...fs.readFileSync(path.join(__dirname, '../../src/data/ias.ts'), 'utf8').matchAll(/\{ id: "([a-z]+)", n: "([^"]+)", svg: "((?:[^"\\]|\\.)*)" \}/g)].map((m) => ({ id: m[1], svg: JSON.parse(`"${m[3]}"`) }));
const ico = (k) => k === 'fav' ? '<i class="fav"></i>' : `<svg viewBox="0 0 24 24" fill="currentColor">${IAS.find((a) => a.id === k).svg}</svg>`;
const agHtml = (n, id) => { const a = { Claude: ['#ff616b', '#ff616b', 'claude'], Codex: ['#af4a4b', '#af4a4b', 'chatgpt'], savvia: ['#3b231b', '#94413f', 'fav'] }[n];
  return `<div class="ag" id="${id}"><svg class="ag-f" viewBox="0 0 16 16"><path d="M2 1.5 L14 7 L8.4 8.4 L6.2 14 Z" style="fill:${a[1]}"/></svg><span class="ag-n" style="background:${a[0]}"><b class="ag-ic">${ico(a[2])}</b>${n}</span></div>`; };
const PULSO = 0.75, pulso = (k) => f30(0.785 - 4.5 + k * PULSO), TN = pulso(23), b = (k) => f30(TN + k * PULSO); // el título en el compás del pulso 31; las secciones desde el 35
// los tres sitios: su CSS (una vez) y su cuerpo
const SITIO = {};
for (const [k, dir, cssF] of [['quantus', 'dom-quantus', 'web.css'], ['patchbay', 'dom-patchbay', 'web.css'], ['neety', 'neety-dom', 'neety-shadow.css'], ['playground', 'dom-playground', 'web.css']]) {
  const J = JSON.parse(fs.readFileSync(path.join(__dirname, 'hf', 'assets', dir, k === 'neety' && process.env.IDIOMA === 'en' ? 'secciones-en.json' : 'secciones.json'), 'utf8')); // 28/10: en inglés, la web de Neety en inglés (neety.treseiscero.app/en/home, tools/r308-neety-en)
  SITIO[k] = { J, css: fs.readFileSync(path.join(__dirname, 'hf', 'assets', dir, cssF), 'utf8'), fuentes: `assets/${dir}/fuentes.css` };
}
FUENTES_EXTRA = Object.values(SITIO).map((s) => `<link rel="stylesheet" href="${s.fuentes}" />`).join('\n');
html += `<script>window.__CSS=${JSON.stringify(Object.fromEntries(Object.entries(SITIO).map(([k, s]) => [k, s.css + ':host{display:block}*{animation:none!important;transition:none!important}'])))};window.__SEC={};
window.__piezas=(root)=>{const all=[...root.querySelectorAll('*')].filter((e)=>e.offsetWidth>2&&e.offsetHeight>2);const cs=(e)=>getComputedStyle(e);
const esTarjeta=(e)=>{const s=cs(e);const bg=s.backgroundColor;const vis=bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent';return (vis||s.backgroundImage!=='none'||parseFloat(s.borderTopWidth)>0)&&parseFloat(s.borderRadius)>0&&e.offsetWidth<1300;};
const esHoja=(e)=>['IMG','SVG','VIDEO','PICTURE','INPUT','BUTTON'].includes(e.tagName.toUpperCase())||[...e.childNodes].some((n)=>n.nodeType===3&&n.textContent.trim());
const tarjetas=all.filter(esTarjeta).filter((e,i,a)=>!a.some((o)=>o!==e&&o.contains(e)));
const hojas=all.filter((e)=>esHoja(e)&&!e.closest('svg')||e.tagName.toLowerCase()==='svg').filter((e,i,a)=>!a.some((o)=>o!==e&&o.contains(e)));
const fuera=hojas.filter((h)=>!tarjetas.some((t)=>t.contains(h))),dentro=hojas.filter((h)=>tarjetas.some((t)=>t.contains(h)));
const ord=(l)=>l.sort((a,b)=>{const r=a.getBoundingClientRect(),s=b.getBoundingClientRect();return (r.top-s.top)||(r.left-s.left);});return {tarjetas:ord(tarjetas),fuera:ord(fuera),dentro:ord(dentro)};};</script>`;
// una sección en su sombra, escalada para caber en el marco
const FW = 1600, FH = 870;
const seccion = (id, sitio, i, alto, extra = '', css = '', zoom = 1) => {
  const S = SITIO[sitio], J = S.J, s = { ...J.secs[i], html: J.secs[i].html.replace(/<animateMotion[^>]*>(<\/animateMotion>)?/g, '').replace(/<dialog[\s\S]*?<\/dialog>/g, '').replace(/<script[\s\S]*?<\/script>/g, '') }, h = alto || s.h, k = FW / 1440 * zoom, cuerpoCls = sitio === 'neety' ? J.bodyCls : 'wb-body ' + J.bodyCls;
  const cuerpo = `<div class="${J.htmlCls}"><div class="${cuerpoCls}" style="background:${J.bodyBg};${J.bodyColor ? 'color:' + J.bodyColor + ';' : ''}font-family:${J.bodyFont.replace(/"/g, "'")}"><div style="height:${h}px;overflow:hidden;position:relative">${s.html}</div></div></div>`;
  return { k, pan: Math.max(0, h * k - FH), fondo: J.bodyBg, html: `<div class="host" id="${id}" style="width:1440px;height:${h}px;left:${((FW - 1440 * k) / 2).toFixed(1)}px;top:${Math.max(0, (FH - h * k) / 2).toFixed(1)}px;transform:scale(${k.toFixed(4)})"></div><script>(function(){const sh=document.getElementById('${id}').attachShadow({mode:'open'});sh.innerHTML='<style>'+window.__CSS['${sitio}']+${JSON.stringify(css)}+'</style>'+${JSON.stringify(cuerpo)};const P=window.__piezas(sh);window.__SEC['${id}']=Object.assign({r:sh},P);${extra}})();</script>` };
};
// ── LAS SEIS: [sitio, índice, alto útil, petición, gesto]
const DEP_CSS = `#deploy .close, #deploy .side.lede { display: none !important; }
#deploy .deploy3d { position: relative !important; display: grid !important; grid-template-columns: 1.15fr .85fr !important; gap: 64px !important; align-items: center !important; height: auto !important; }
#deploy .stage3d { position: relative !important; top: auto !important; height: 560px !important; }
#deploy .dsteps { position: relative !important; height: 300px !important; } #deploy .dstep { position: absolute !important; inset: 0 !important; opacity: 0; } #deploy .dstep.on { opacity: 1; }
#deploy .isoframe { opacity: 0; } #deploy .isoframe.on { opacity: 1; }`;
// [sitio, índice, alto útil, marca, petición, gesto, css, qué llevan los cursores, lo que monta el gesto (fuera del montaje genérico), pulsos]
// ronda 307, 6.ª («quitamos forge» · «montar las cards de las isométricas en la vista de las cards» · «las piezas que caen con físicas, que los cursores las
// dejen caer desde arriba; y cosas chulas con los cursores en el resto» · «el puente del medio de Neety» · «transiciones chulas entre las secciones»)
const SEIS = [
  ['neety', 4, 766, 'Neety', 'Crea «De ruido a señal» con el antes y el después de Neety', 'checks', '', null, ['[data-signal]'], 8],
  ['neety', 7, 1100, 'Neety', 'Añade sus integraciones: CRM, LinkedIn y email llegando al panel', 'lineas', '', null, null, 8],
  ['playground', 2, 1100, 'Playground', 'Las features de Playground: seis tarjetas que se apilan al hacer scroll', 'pila', '.ft6_vid { display: none !important; }', ['.fs6_hd', '.fs6_nav', '#fs6-copilot'], ['.fs6_card:not(#fs6-copilot)'], 12, 0.74],
  ['playground', 3, 891, 'Playground', 'Y sus testimonios: la rueda de caras y el color de cada docente', 'rueda6', '#proof { transform: translateY(-160px); }', ['.hd6', '.tw6_q', '.tw6_ctl'], ['.tw6_wheel'], 12, 0.758],
  ['quantus', 6, 1086, 'Quantus', 'Una sección de Quantus: cuatro clientes, cada uno con su isométrico', 'cuatro', '', ['.head', '.side.lede'], ['.segments'], 12],
  ['patchbay', 1, 1060, 'Patchbay', 'La sección de agentes de Patchbay: todos los canales entrando en una API', 'ruleta', '', null, null, 8],
];
// ronda 307, 9.ª («más variedad en las animaciones de escribir en el chat, y alguna animación intermedia para que no sea monótono»): cada petición de una forma
// distinta, y un INTERLUDIO de marca (4 pulsos) cuando se cambia de web
const MODO = ['', 'zoom', 'barra', 'sugerencia', 'barra', 'barra']; // ronda 307, 12.ª: nuevo orden (Neety › Playground › Quantus › Patchbay)
const INTER = { 2: ['Playground', '#3a1fc7', 'assets/dom-playground/pg-logo.png', '#fff'], 4: ['Quantus', '#15181c', 'assets/quantus-mark.svg', '#f01438'], 5: ['Patchbay', '#eb3514', 'assets/mark.b6d24ca3.svg', '#fff'] };
const INI = []; let TOT = 0; SEIS.forEach((x, k) => { if (INTER[k]) TOT += 4; INI.push(8 + TOT); TOT += x[9]; }); // pulso de inicio de cada sección
let inner = `<div class="pz7" id="pz7"><p class="pz7-m"><span class="mas"><svg viewBox="0 0 16 16"><path d="M8 3.5v9M3.5 8h9"/></svg></span><span class="modelo"><b style="color:#d97757">${ico('claude')}</b>Opus 5.5<svg class="baja" viewBox="0 0 16 16"><path d="M5 6.5 8 9.5l3-3"/></svg></span><em id="pz7c">+ librería</em></p>${SEIS.map((x, k) => `<p class="pz7-t" id="pzt${k}">${MODO[k] === 'dictado' ? x[4].split(' ').map((w) => `<span class="pw">${w} </span>`).join('') : x[4]}<i class="pz7-cur"></i></p>`).join('')}<p class="pz7-ph" id="pzph">Pide una sección o un cambio…<i class="pz7-cur"></i></p><span class="pz7-voz" id="pzv"><b class="rec"></b>${'<i></i>'.repeat(16)}</span><div class="pz7-sug" id="pzs"><span>Una sección de precios</span><span class="ok">${SEIS[MODO.indexOf('sugerencia')][4]}</span><span>Un footer con su estilo</span></div><span class="pz7-e" id="pz7e"><svg viewBox="0 0 16 16"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5"/></svg></span></div><div class="marco7" id="marco7">`;
const animes = [];
SEIS.forEach(([sitio, i, alto, nom, , gesto, css, , , , zoom], k) => {
  const S = seccion(`sx${k}`, sitio, i, alto, '', css || '', zoom || 1);
  inner += `<div class="capa7" id="cp${k}" style="background:${S.fondo}">${S.html}</div>`;
  animes.push([k, S, sitio, nom, gesto]);
});
inner += `</div><p class="pz7-sitio" id="pz7s"></p>` + Object.entries(INTER).map(([k, [nom, col, logo, lc]]) => `<div class="inter" id="in${k}" style="background:${col}"><i class="inter-l" style="background:${lc};-webkit-mask-image:url(${logo});mask-image:url(${logo})"></i><p class="inter-t"><span>Ahora,</span> <span>${nom}.</span></p><p class="inter-s">El mismo chat, otra librería.</p></div>`).join('') + agHtml('Claude', 'ag70') + agHtml('savvia', 'ag71') + agHtml('Codex', 'ag72');
escena('eN1', b(7.8), b(8 + TOT), '#f6f3ee', inner);
js += `tl.set('#pz7', { opacity: 1 }, ${b(7.8)});
tl.fromTo('#marco7', { opacity: 0, y: 220, scale: .96, filter: 'blur(10px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: .9, ease: 'expo.out', immediateRender: false }, ${b(7.8)});\n`;
// utilidades en la página: dónde cae algo en la escena (sin sus propios desplazamientos ni el del marco), y los tres cursores con su color
html += `<script>window.__pos = (e, host, propio) => { const r = e.getBoundingClientRect(), s = document.getElementById('eN1').getBoundingClientRect(), K = host ? parseFloat((host.style.transform.match(/scale\\(([\\d.]+)/) || [, 1])[1]) : 1;
  return [r.left + r.width / 2 - s.left - (propio ? gsap.getProperty(e, 'x') * K : 0), r.top + r.height / 2 - s.top - (propio ? gsap.getProperty(e, 'y') * K : 0)]; };</script>`;
const AGC = "[['#ag70', '#ff616b'], ['#ag71', '#c27a5a'], ['#ag72', '#af4a4b']]";
// ronda 307, 8.ª («las transiciones de escribir en el chat no hacerlo siempre; entre medias, lo del zoom de antes, que clicabas, para que no sea monótono»):
// cada petición nueva, de una de tres maneras: en la barra (sin más), el chat que baja al CENTRO, o el ZOOM en perspectiva en el que un cursor pulsa «enviar»
const PIDE = SEIS.map((x, k) => {
  const t = b(INI[k]), d = PULSO, m = MODO[k] || 'barra';
  const dim = `tl.fromTo('#marco7', { scale: 1, filter: 'blur(0px)', opacity: 1 }, { scale: .92, filter: 'blur(9px)', opacity: .4, duration: .6, ease: 'expo.inOut', immediateRender: false }, ${f30(t - 0.2)});
tl.fromTo('#marco7', { scale: .92, filter: 'blur(9px)', opacity: .4 }, { scale: 1, filter: 'blur(0px)', opacity: 1, duration: .7, ease: 'expo.out', immediateRender: false }, ${f30(t + 1.66 * d)});`;

  const sube = `tl.fromTo('#pz7', { y: 0, scale: 1 }, { y: 400, scale: 1.32, duration: .6, ease: 'expo.inOut', immediateRender: false }, ${f30(t - 0.2)});
tl.fromTo('#pz7', { y: 400, scale: 1.32 }, { y: 0, scale: 1, duration: .6, ease: 'expo.inOut', immediateRender: false }, ${f30(t + 1.66 * d)});`;
  let pre = '';
  if (INTER[k]) { const Ti = b(INI[k] - 4), Tf = t - 0.25, id = `#in${k}`;
    pre = `tl.set('${id}', { opacity: 0 }, 0); tl.set('${id}', { opacity: 1 }, ${f30(Ti)});
tl.fromTo('${id}', { clipPath: 'circle(0% at 84% 6%)' }, { clipPath: 'circle(150% at 84% 6%)', duration: 1.15, ease: 'power3.inOut', immediateRender: false }, ${f30(Ti - 0.1)});
tl.fromTo('${id} .inter-l', { scale: .82, opacity: 0, filter: 'blur(10px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out', immediateRender: false }, ${f30(Ti + 0.4)});
tl.fromTo('${id} .inter-t', { opacity: 0, y: 26, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', immediateRender: false }, ${f30(Ti + 0.6)});
tl.fromTo('${id} .inter-s', { opacity: 0, y: 10 }, { opacity: .75, y: 0, duration: .7, ease: 'power3.out', immediateRender: false }, ${f30(Ti + 1.0)});
tl.set('#marco7', { opacity: 0 }, ${f30(Ti + 1.0)}); tl.set('#pz7c', { textContent: '+ librería de ${INTER[k][0]}' }, ${f30(Ti + 1.2)}); tl.set('#pz7', { zIndex: 45 }, ${f30(Ti + 1.2)});
tl.fromTo('${id} .inter-l, ${id} .inter-t', { y: 0, scale: 1 }, { y: -250, scale: .8, duration: 1.1, ease: 'power3.inOut', immediateRender: false }, ${f30(Ti + 1.6)});
tl.fromTo('${id} .inter-s', { opacity: .75 }, { opacity: 0, duration: .4, ease: 'power2.out', immediateRender: false }, ${f30(Ti + 1.75)});
tl.fromTo('#pz7', { y: 0, scale: 1 }, { y: 400, scale: 1.32, duration: 1.0, ease: 'power3.inOut', immediateRender: false }, ${f30(Ti + 1.6)});
tl.set('#pzph', { opacity: 0 }, 0); tl.fromTo('#pzph', { opacity: 0 }, { opacity: 1, duration: .25, immediateRender: false }, ${f30(Ti + 1.25)});
tl.fromTo('#pzph .pz7-cur', { opacity: 1 }, { opacity: 0, duration: .22, ease: 'steps(1)', yoyo: true, repeat: 3, immediateRender: false }, ${f30(Ti + 1.4)});
tl.set('#pzph', { opacity: 0 }, ${f30(Ti + 2.4)});
tl.fromTo('${id}', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: .85, ease: 'power3.inOut', immediateRender: false }, ${f30(t + 1.62 * d)});
tl.fromTo('#pz7', { y: 400, scale: 1.32 }, { y: 0, scale: 1, duration: .85, ease: 'power3.inOut', immediateRender: false }, ${f30(t + 1.62 * d)});
tl.fromTo('#marco7', { y: 220, opacity: 0, scale: .96, filter: 'blur(10px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: .9, ease: 'expo.out', immediateRender: false }, ${f30(t + 1.72 * d)});
tl.set('${id}', { opacity: 0 }, ${f30(t + 1.62 * d + 0.9)}); tl.set('#pz7', { zIndex: 5 }, ${f30(t + 1.62 * d + 0.9)});\n`; }
  if (m === 'barra') return pre;
  if (m === 'dictado') return pre + `tl.set('#pzv', { opacity: 0 }, 0);
tl.fromTo('#pzv', { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2)', immediateRender: false }, ${f30(t)});
${Array.from({ length: 16 }, (_, i) => `tl.fromTo('#pzv i:nth-of-type(${i + 1})', { scaleY: .15 }, { scaleY: ${(0.35 + 0.65 * Math.abs(Math.sin(i * 1.7 + 0.4))).toFixed(2)}, duration: ${(0.11 + 0.05 * ((i * 7) % 3)).toFixed(2)}, ease: 'sine.inOut', yoyo: true, repeat: 7, immediateRender: false }, ${f30(t + 0.05 + i * 0.02)});`).join('\n')}
tl.fromTo('#pzv .rec', { opacity: 1 }, { opacity: .25, duration: .3, yoyo: true, repeat: 3, immediateRender: false }, ${f30(t)});
tl.fromTo('#pzt${k} .pw', { opacity: 0, y: 8, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .35, ease: 'expo.out', stagger: ${f30(1.2 * d / SEIS[k][4].split(' ').length)}, immediateRender: false }, ${f30(t + 0.15)});
tl.to('#pzv', { opacity: 0, scale: .8, duration: .25 }, ${f30(t + 1.45 * d)});
${INTER[k] ? '' : dim}`;
  if (m === 'sugerencia') return pre + `${sube}
${dim}
tl.set('#pzs', { opacity: 0 }, 0); tl.set('#pzt${k}', { clipPath: 'inset(0 100% 0 0)' }, 0);
tl.fromTo('#pzs', { opacity: 0 }, { opacity: 1, duration: .1, immediateRender: false }, ${f30(t + 0.3)});
tl.fromTo('#pzs span', { opacity: 0, y: 16, scale: .94 }, { opacity: 1, y: 0, scale: 1, duration: .45, ease: 'back.out(2)', stagger: .09, immediateRender: false }, ${f30(t + 0.3)});
(() => { const A = '#ag71', ok = () => { const r = document.querySelector('#pzs .ok').getBoundingClientRect(), s = document.getElementById('eN1').getBoundingClientRect(); return [r.left + r.width * .5 - s.left, r.top + r.height * .55 - s.top]; };
tl.set(A, { x: 1640, y: 940 }, ${f30(t + 0.3)}); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, ${f30(t + 0.3)});
tl.to(A, { x: () => ok()[0], y: () => ok()[1], duration: .4, ease: 'expo.inOut' }, ${f30(t + 0.38)});
tl.to(A + ' .ag-f', { scale: .76, duration: .08, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, ${f30(t + 0.8)});
tl.to('#pzs .ok', { scale: .95, backgroundColor: '#2a1712', color: '#fbfaf8', duration: .12, yoyo: true, repeat: 1 }, ${f30(t + 0.8)});
tl.to('#pzs span:not(.ok)', { opacity: 0, y: 10, duration: .25 }, ${f30(t + 0.86)});
tl.to('#pzs .ok', { y: -70, opacity: 0, scale: .9, duration: .3, ease: 'expo.in' }, ${f30(t + 0.92)});
tl.fromTo('#pzt${k}', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .3, ease: 'expo.out', immediateRender: false }, ${f30(t + 1.0)});
tl.to(A, { x: '+=160', y: '+=180', opacity: 0, duration: .45, ease: 'power2.in' }, ${f30(t + 1.05)}); })();`;
  if (m === 'centro') return pre + `${sube}
${dim}`;
  if (m === 'zoom') return pre + `tl.fromTo('#pz7', { y: 0, scale: 1, rotationX: 0, rotationY: 0 }, { y: 400, scale: 1.18, rotationX: 13, rotationY: -12, transformPerspective: 1600, duration: .75, ease: 'expo.inOut', immediateRender: false }, ${f30(t - 0.25)});
tl.fromTo('#pz7', { scale: 1.18, rotationX: 13, rotationY: -12 }, { scale: 1.3, rotationX: 6, rotationY: -4, transformPerspective: 1600, duration: ${f30(1.0 * d)}, ease: 'sine.inOut', immediateRender: false }, ${f30(t + 0.5)});
tl.fromTo('#pz7', { y: 400, scale: 1.3, rotationX: 6, rotationY: -4 }, { y: 0, scale: 1, rotationX: 0, rotationY: 0, transformPerspective: 1600, duration: .65, ease: 'expo.inOut', immediateRender: false }, ${f30(t + 1.66 * d)});
${dim}
(() => { const A = '#ag71', bt = () => { const r = document.getElementById('pz7e').getBoundingClientRect(), s = document.getElementById('eN1').getBoundingClientRect(); return [r.left + r.width / 2 - s.left, r.top + r.height / 2 - s.top]; };
tl.set(A, { x: 1500, y: 980 }, ${f30(t + 0.9 * d)}); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, ${f30(t + 0.9 * d)});
tl.to(A, { x: () => bt()[0] - 4, y: () => bt()[1] - 4, duration: ${f30(0.55 * d)}, ease: 'expo.inOut' }, ${f30(t + 1.0 * d)});
tl.to(A + ' .ag-f', { scale: .76, duration: .08, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, ${f30(t + 1.58 * d)});
tl.to(A, { x: '+=180', y: '+=200', opacity: 0, duration: .45, ease: 'power2.in' }, ${f30(t + 1.75 * d)}); })();`;
  return '';
});
// TRANSICIONES entre secciones: cada cambio, una distinta
const TRANS = ['empuje', 'circulo', 'giro', 'zoom', 'barrido'];
animes.forEach(([k, S, sitio, nom, gesto]) => {
  const t = b(INI[k]), d = PULSO, id = `sx${k}`, txt = SEIS[k][4], L = SEIS[k][9], PAN = gesto === 'cuatro' ? 2.9 : gesto === 'apila' ? 1.5 : 5.5;
  const tIn = f30(t + (k ? 1.7 : -0.2) * d), tOut = k === SEIS.length - 1 ? f30(t + L * d) : f30(b(INI[k + 1]) + 1.7 * d + 0.9);
  js += `tl.set('#pzt${k}', { display: 'none' }, 0); tl.set('#pzt${k}', { display: 'block' }, ${INTER[k] ? f30(b(INI[k] - 4) + 2.4) : k ? t : f30(b(7.8))}); tl.set('#pzt${k}', { display: 'none' }, ${f30(t + L * d)});
${k && !['dictado', 'sugerencia'].includes(MODO[k]) ? `tl.set('#pzt${k}', { clipPath: 'inset(0 100% 0 0)' }, 0); tl.fromTo('#pzt${k}', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: ${INTER[k] ? 1.5 : f30(1.3 * d)}, ease: 'steps(${txt.length})', immediateRender: false }, ${INTER[k] ? f30(b(INI[k] - 4) + 2.4) : f30(t + 0.1)});` : ''}
tl.set('#pz7c', { textContent: '+ librería de ${nom}' }, ${k ? t : 0});
${k ? `tl.fromTo('#pz7e', { scale: 1 }, { scale: .84, duration: .1, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, ${f30(t + 1.6 * d)});
tl.fromTo('#pz7e', { boxShadow: '0 0 0 0 rgba(217,119,87,.55)' }, { boxShadow: '0 0 0 30px rgba(217,119,87,0)', duration: .6, ease: 'power2.out', immediateRender: false }, ${f30(t + 1.6 * d)});
${PIDE[k]}` : ''}
tl.set('#cp${k}', { opacity: 0 }, 0); tl.set('#cp${k}', { opacity: 1, zIndex: ${k + 1} }, ${INTER[k] ? f30(t + 1.62 * d) : tIn}); tl.set('#cp${k}', { opacity: 0 }, ${tOut});\n`;
  if (!k || INTER[k]) js += `tl.fromTo('#cp${k}', { clipPath: 'inset(100% 0% 0% 0% round 16px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: .55, ease: 'expo.inOut', immediateRender: false }, ${INTER[k] ? f30(t + 1.62 * d) : tIn});\n`;
  else {
    const tr = TRANS[(k - 1) % TRANS.length], P0 = `#cp${k - 1}`, P1 = `#cp${k}`, D = 0.85;
    if (tr === 'empuje') js += `tl.fromTo('${P0}', { yPercent: 0, scale: 1, filter: 'blur(0px)', opacity: 1 }, { yPercent: -18, scale: .88, filter: 'blur(10px)', opacity: .2, duration: ${D}, ease: 'expo.inOut', immediateRender: false }, ${tIn});
tl.fromTo('${P1}', { yPercent: 100, borderRadius: 40 }, { yPercent: 0, borderRadius: 16, duration: ${D}, ease: 'expo.inOut', immediateRender: false }, ${tIn});\n`;
    if (tr === 'circulo') js += `tl.fromTo('${P1}', { clipPath: 'circle(0% at 84% -6%)' }, { clipPath: 'circle(150% at 84% -6%)', duration: ${D + 0.15}, ease: 'expo.inOut', immediateRender: false }, ${tIn});
tl.fromTo('${P0}', { scale: 1 }, { scale: 1.06, duration: ${D}, ease: 'power2.inOut', immediateRender: false }, ${tIn});\n`;
    if (tr === 'giro') js += `tl.fromTo('${P0}', { rotationY: 0, xPercent: 0, opacity: 1 }, { rotationY: 38, xPercent: -40, opacity: 0, duration: ${D}, ease: 'expo.inOut', transformPerspective: 1400, transformOrigin: '0% 50%', immediateRender: false }, ${tIn});
tl.fromTo('${P1}', { rotationY: -38, xPercent: 40, opacity: 0 }, { rotationY: 0, xPercent: 0, opacity: 1, duration: ${D}, ease: 'expo.inOut', transformPerspective: 1400, transformOrigin: '100% 50%', immediateRender: false }, ${tIn});\n`;
    if (tr === 'zoom') js += `tl.fromTo('${P0}', { scale: 1, opacity: 1, filter: 'blur(0px)' }, { scale: 1.35, opacity: 0, filter: 'blur(14px)', duration: ${D}, ease: 'power2.in', immediateRender: false }, ${tIn});
tl.fromTo('${P1}', { scale: .7, opacity: 0, filter: 'blur(14px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: ${D}, ease: 'expo.out', immediateRender: false }, ${f30(tIn + 0.08)});\n`;
    if (tr === 'barrido') js += `tl.fromTo('${P1}', { clipPath: 'polygon(100% 0%, 100% 0%, 130% 100%, 130% 100%)' }, { clipPath: 'polygon(-30% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: ${D + 0.1}, ease: 'expo.inOut', immediateRender: false }, ${tIn});
tl.fromTo('${P0}', { xPercent: 0, filter: 'blur(0px)' }, { xPercent: -12, filter: 'blur(8px)', duration: ${D + 0.1}, ease: 'expo.inOut', immediateRender: false }, ${tIn});\n`;
  }
  // el montaje con cursores, como en la librería de savvia agentic: cada agente coge una pieza, la lleva a su sitio con su aro de color y la suelta
  js += `(() => { const P = window.__SEC['${id}'], R = P.r, host = document.getElementById('${id}'), esc = document.getElementById('eN1'), K = ${S.k};
const SEL = ${JSON.stringify(SEIS[k][7] || null)}, SALTA = ${JSON.stringify(SEIS[k][8] || [])}.flatMap((q) => [...R.querySelectorAll(q)]);
const fuera = (e) => SALTA.some((s) => s === e || s.contains(e) || e.contains(s));
const vis = (e) => { const r = e.getBoundingClientRect(), h = host.getBoundingClientRect(); return r.top - h.top < ${FH - 60} && r.width > 40 && r.height > 14; };
let lleva = SEL ? SEL.flatMap((q) => [...R.querySelectorAll(q)]) : [...P.fuera.filter((e) => vis(e) && !fuera(e)).slice(0, 3), ...P.tarjetas.filter((e) => vis(e) && !fuera(e)).slice(0, 6)];
const OP = new Map(), op = (e) => { if (!OP.has(e)) OP.set(e, parseFloat(getComputedStyle(e).opacity)); return OP.get(e); };
lleva = lleva.filter((e) => op(e) > 0.05).filter((e, i, a) => !a.some((o) => o !== e && o.contains(e))).slice(0, 9);
const resto = [...P.tarjetas, ...P.fuera, ...P.dentro].filter((e) => op(e) > 0.05 && !fuera(e) && !lleva.some((o) => o === e || o.contains(e)));
tl.set([...lleva, ...resto], { opacity: 0 }, 0);
const centro = (e) => { const c = window.__pos(e, host, true); return [c[0], c[1] - gsap.getProperty(host, 'y')]; };
const AG = ${AGC}, T0 = ${f30(t + 1.9 * d)}, SLOT = ${f30(0.95 * d)}, VIA = ${f30(0.62 * d)};
lleva.forEach((e, i) => { const [A, col] = AG[i % 3], n = Math.floor(i / 3), T = T0 + n * (SLOT + 0.06) + (i % 3) * 0.16, izq = i % 3 === 1;
  const ini = () => { const c = centro(e); return [izq ? 230 : 1690, Math.min(980, c[1] + 120)]; };
  if (n === 0) { tl.set(A, { x: () => ini()[0], y: () => ini()[1] }, T - 0.26); tl.fromTo(A, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, T - 0.25); }
  tl.fromTo(A, { x: () => ini()[0], y: () => ini()[1] }, { x: () => centro(e)[0], y: () => centro(e)[1], duration: VIA, ease: 'expo.inOut', immediateRender: false }, T);
  tl.set(e, { opacity: op(e), outline: '2px solid ' + col, outlineOffset: '8px' }, T);
  tl.fromTo(e, { x: () => (ini()[0] - centro(e)[0]) / K, y: () => (ini()[1] - centro(e)[1]) / K, scale: .9, rotation: izq ? -2.5 : 2.5 }, { x: 0, y: 0, scale: 1, rotation: 0, duration: VIA, ease: 'expo.inOut', immediateRender: false }, T);
  tl.to(A + ' .ag-f', { scale: .76, duration: .08, yoyo: true, repeat: 1, transformOrigin: '4px 4px' }, T + VIA - 0.06);
  tl.fromTo(e, { outlineColor: col }, { outlineColor: 'rgba(0,0,0,0)', duration: .45, ease: 'power2.out', immediateRender: false }, T + VIA + 0.05);
  tl.set(e, { outline: 'none' }, T + VIA + 0.55);
  const ult = i + 3 >= lleva.length; if (ult) tl.to(A, { x: '+=' + (izq ? -260 : 260), y: '+=120', opacity: 0, duration: .45, ease: 'power2.in' }, T + VIA + 0.12); });
const fin = T0 + Math.ceil(lleva.length / 3) * (SLOT + 0.06);
tl.fromTo(resto, { opacity: 0, y: 18, filter: 'blur(6px)' }, { opacity: (i, e) => op(e), y: 0, filter: 'blur(0px)', duration: .5, ease: 'expo.out', stagger: { amount: ${f30(1.0 * d)} }, immediateRender: false }, fin); })();\n`;
  js += GESTOS[gesto](id, t, d, AGC);
  if (S.pan > 4) js += `tl.fromTo('#${id}', { y: 0 }, { y: ${(-S.pan).toFixed(0)}, duration: ${f30((gesto === 'cuatro' || gesto === 'apila' ? 1.1 : 2.2) * d)}, ease: 'power2.inOut', immediateRender: false }, ${f30(t + PAN * d)});\n`;
});
js += `tl.to('#pz7, #marco7', { opacity: 0, y: -50, filter: 'blur(10px)', duration: .5, ease: 'power2.in', stagger: .05 }, ${f30(b(8 + TOT) - 0.5)});\n`;
// ── LO QUE TU EQUIPO PUEDE HACER CON LA LIBRERÍA (home.ts › partitura.sale, lo que sale en la animación de savvia agentic)
const SALE = ['Cambios de copy', 'Editar ilustraciones', 'Crear landings para Ads', 'Subir blog al CMS', 'Añadir idiomas', 'Publicar un caso de cliente', 'Actualizar precios', 'Ajustar SEO y metadatos', 'Hacer tests A/B', 'Revisar accesibilidad'];
const TL0 = b(8 + TOT), TL1 = b(8 + TOT + 9);
escena('eL', TL0, TL1, '#f6f3ee', `<p class="ls-t" id="lsT">Con savvia agent tu equipo puede…</p><div class="ls">${SALE.map((s, i) => `<p class="ls-i" id="ls${i}"><svg class="ck" viewBox="0 0 20 20"><circle class="onda" cx="10" cy="10" r="9"/><circle class="aro" cx="10" cy="10" r="8.25"/><circle class="rel" cx="10" cy="10" r="0"/><path class="v" d="M6 10.4 8.7 13 14 7.2" pathLength="1"/></svg>${s}</p>`).join('')}</div><svg class="ls-cur" id="lsCur" viewBox="0 0 20 24"><path d="M1.5 1.5v17.2l4.4-4.1 2.9 6.6 3-1.3-2.9-6.5h6.1z"/></svg>`);
entra('#lsT', f30(TL0 + 0.1));
js += `tl.fromTo('.ls-i', { opacity: 0, y: 24, filter: 'blur(8px)' }, { opacity: .4, y: 0, filter: 'blur(0px)', duration: .5, ease: 'expo.out', stagger: .06, immediateRender: false }, ${f30(TL0 + PULSO * 1.0)});\n`;
// los checks como los servicios de la home: un cursor los va marcando; la tinta llena el aro desde el centro, sale una onda y se dibuja la marca
const ckXY = (i) => [260 + Math.floor(i / 5) * 760 + 23, 330 + (i % 5) * 86 + 30];
js += `gsap.set('#lsCur', { x: 1700, y: 120, opacity: 0 }); tl.fromTo('#lsCur', { opacity: 0 }, { opacity: 1, duration: .25, immediateRender: false }, ${f30(TL0 + PULSO * 1.9)});\n`;
SALE.forEach((_, i) => { const t = f30(TL0 + PULSO * (2.4 + i * 0.5)); const [x, y] = ckXY(i);
  const [px, py] = i ? ckXY(i - 1) : [1702, 122];
  js += `tl.fromTo('#lsCur', { x: ${px - 2}, y: ${py - 2} }, { x: ${x - 2}, y: ${y - 2}, duration: ${i % 5 ? .2 : .3}, ease: 'power3.inOut', immediateRender: false }, ${f30(t - (i % 5 ? .22 : .32))});
tl.fromTo('#lsCur', { scale: 1 }, { scale: .8, duration: .07, yoyo: true, repeat: 1, ease: 'power1.out', immediateRender: false }, ${t});
tl.to('#ls${i}', { opacity: 1, duration: .35 }, ${f30(t + 0.07)});
tl.set('#ls${i} .aro', { opacity: 1 }, ${f30(t + 0.07)});
tl.fromTo('#ls${i} .rel', { attr: { r: 0 } }, { attr: { r: 8.25 }, duration: .36, ease: 'back.out(2.2)', immediateRender: false }, ${f30(t + 0.07)});
tl.fromTo('#ls${i} .onda', { attr: { r: 5.4 }, opacity: .55 }, { attr: { r: 17 }, opacity: 0, duration: .6, ease: 'expo.out', immediateRender: false }, ${f30(t + 0.07)});
tl.fromTo('#ls${i} .v', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .4, ease: 'expo.out', immediateRender: false }, ${f30(t + 0.21)});\n`; });
js += `tl.fromTo('#lsCur', { opacity: 1 }, { opacity: 0, duration: .3, immediateRender: false }, ${f30(TL0 + PULSO * (2.4 + SALE.length * 0.5) + 0.3)});\n`;
js += `tl.to('#lsT, .ls-i', { opacity: 0, y: -30, filter: 'blur(12px)', duration: .45, ease: 'power2.in', stagger: .02 }, ${f30(TL1 - 0.6)});\n`;
// el cierre (la sección 8 de la web) empieza al acabar la lista
OFF = (TL1 - 0.2 - 0.785) / T - 47;
CSS_EXTRA += `
/* ronda 307 · las secciones con tu librería */
.pide { padding: 0 !important; border-radius: 25px !important; background: #fff !important; box-shadow: 0 0 0 1px rgba(31,30,29,.1), 0 4px 20px -6px rgba(31,30,29,.12), 0 30px 60px -36px rgba(36,28,25,.4) !important; overflow: hidden; }
.pide-x { position: absolute !important; left: 23.2px; top: 19.6px; right: 98px; margin: 0 !important; display: block !important; font: 420 23.2px/1.3 'Timeless Sans', sans-serif !important; color: #1f1e1d !important; white-space: nowrap; }
.pide-x .cursor { width: 1.8px !important; height: 26.8px !important; margin-left: 1.8px !important; vertical-align: -5.4px; background: #1f1e1d !important; }
.pide-m { position: absolute; left: 17.86px; bottom: 14.29px; display: flex; align-items: center; gap: 8.93px; font: 420 16.07px/1 'Timeless Sans', sans-serif; color: rgba(31,30,29,.6); }
.pide-m .mas { display: grid; place-items: center; width: 35.7px; height: 35.7px; border-radius: 10.7px; box-shadow: inset 0 0 0 1px rgba(31,30,29,.14); }
.pide-m svg { width: 16.07px; height: 16.07px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.pide-m .modelo { display: flex; align-items: center; gap: 7.1px; padding: 0 5.36px; height: 35.7px; }
.pide-m .modelo b { display: grid; width: 16.07px; height: 16.07px; color: #d97757; }
.pide-m .modelo b svg { fill: currentColor; stroke: none; width: 100%; height: 100%; }
.pide-m .baja { width: 13.4px !important; height: 13.4px !important; }
.pide-m em { font-style: normal; font-size: 14.29px; padding: 8.04px 12.5px; border-radius: 10.7px; background: #f5f2ee; color: rgba(31,30,29,.75); box-shadow: inset 0 0 0 1px rgba(31,30,29,.08); }
#f4 .enviar { position: absolute !important; width: 39.3px !important; height: 39.3px !important; border-radius: 11.6px !important; background: #d97757 !important; display: grid !important; place-items: center; right: 16.07px !important; bottom: 14.29px !important; top: auto !important; }
#f4 .enviar svg { width: 19.6px; height: 19.6px; fill: none; stroke: #fff; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.lin.oscura { color: #2a1712; } .tenue3 { opacity: .55; }
.inter { position: absolute; inset: 0; z-index: 40; opacity: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; background-image: url(assets/grano.png) !important; background-blend-mode: soft-light; }
.inter-l { width: 150px; height: 150px; background: #fff; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center; }
.inter-t { font: 400 112px/1 'Family', Georgia, serif; letter-spacing: -.03em; color: #fff; overflow: hidden; padding-bottom: 12px; }
.inter-t span { display: inline-block; }
.inter-s { font: 420 26px/1 'Areal Mono', monospace; letter-spacing: .04em; color: #fff; opacity: 0; }
.pz7-ph { position: absolute; left: 26px; top: 22px; font: 420 26px/1.2 'Timeless Sans', sans-serif; color: rgba(42,23,18,.35); white-space: nowrap; opacity: 0; }
.pz7-voz { position: absolute; right: 104px; top: 50%; height: 40px; margin-top: -20px; display: flex; align-items: center; gap: 4px; opacity: 0; }
.pz7-voz i { width: 4px; height: 36px; border-radius: 4px; background: #2a1712; transform: scaleY(.15); }
.pz7-voz .rec { width: 12px; height: 12px; border-radius: 50%; background: #ff616b; margin-right: 10px; }
.pz7-sug { position: absolute; left: 0; right: 0; top: 152px; display: flex; justify-content: center; gap: 12px; opacity: 0; }
.pz7-sug span { padding: 12px 20px; border-radius: 999px; background: #fff; box-shadow: 0 0 0 1px rgba(42,23,18,.08), 0 10px 26px rgba(42,23,18,.12); font: 420 18px/1 'Timeless Sans', sans-serif; color: #2a1712; white-space: nowrap; }
.pz7-sug .ok { box-shadow: 0 0 0 1.5px #ff616b, 0 10px 26px rgba(42,23,18,.14); }
.pz7 { position: absolute; left: 50%; top: 30px; width: 1180px; margin-left: -590px; height: 132px; border-radius: 28px; background: #fff; box-shadow: 0 0 0 1px rgba(31,30,29,.1), 0 4px 20px -6px rgba(31,30,29,.12), 0 30px 60px -36px rgba(36,28,25,.4); opacity: 0; z-index: 5; color: #1f1e1d; }
.pz7-m { position: absolute; left: 20px; bottom: 16px; display: flex; align-items: center; gap: 10px; font: 420 18px/1 'Timeless Sans', sans-serif; color: rgba(31,30,29,.6); }
.pz7-m .mas { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; box-shadow: inset 0 0 0 1px rgba(31,30,29,.14); }
.pz7-m svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.pz7-m .modelo { display: flex; align-items: center; gap: 8px; padding: 0 6px; height: 40px; }
.pz7-m .modelo b { display: grid; width: 18px; height: 18px; }
.pz7-m .modelo b svg { width: 100%; height: 100%; fill: currentColor; stroke: none; }
.pz7-m .modelo .baja { width: 15px; height: 15px; }
.pz7-m em { font-style: normal; font-size: 16px; padding: 9px 14px; border-radius: 12px; background: #f5f2ee; color: rgba(31,30,29,.75); box-shadow: inset 0 0 0 1px rgba(31,30,29,.08); }
.pz7-t { position: absolute; left: 26px; top: 22px; right: 110px; font: 420 26px/1.3 'Timeless Sans', sans-serif; color: #1f1e1d; white-space: nowrap; display: none; }
.pz7-cur { display: inline-block; width: 2px; height: 30px; margin-left: 2px; vertical-align: -6px; background: #1f1e1d; }
.pz7-e { position: absolute; right: 18px; bottom: 16px; width: 44px; height: 44px; border-radius: 13px; background: #d97757; display: grid; place-items: center; }
.pz7-e svg { width: 22px; height: 22px; fill: none; stroke: #fff; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.marco7 { position: absolute; left: 160px; top: 180px; width: ${FW}px; height: ${FH}px; border-radius: 18px; overflow: hidden; background: #ece6dc; box-shadow: 0 0 0 1px rgba(42,23,18,.08), 0 40px 90px rgba(42,23,18,.22); opacity: 0; }
.capa7 { position: absolute; inset: 0; opacity: 0; }
.host { position: absolute; transform-origin: 0 0; }
.ag { position: absolute; left: 0; top: 0; opacity: 0; z-index: 30; }
.ag-f { position: relative; display: block; width: 40px; height: 40px; stroke: #fff; stroke-width: 1.4px; stroke-linejoin: round; paint-order: stroke; filter: drop-shadow(0 2px 3px rgba(0,0,0,.22)); overflow: visible; }
.ag-n { position: absolute; left: 31px; top: 35px; display: inline-flex; align-items: center; gap: 10px; padding: 7px 18px 7px 13px; border-radius: 999px; color: #fff; font: 420 27px/1.25 'Timeless Sans', sans-serif; white-space: nowrap; }
.ag-ic { display: inline-flex; width: 26px; height: 26px; } .ag-ic svg { width: 26px; height: 26px; }
.ag-ic .fav { width: 28px; height: 28px; border-radius: 6px; background: url(assets/fav-savvia.png) center / cover; display: block; }
.ls-t { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font: 400 64px/1.1 'Family', Georgia, serif; letter-spacing: -.02em; color: #2a1712; opacity: 0; }
.ls { position: absolute; left: 260px; top: 330px; display: grid; grid-template-columns: 640px 640px; grid-template-rows: repeat(5, 60px); grid-auto-flow: column; gap: 26px 120px; }
.ck { width: 46px; height: 46px; flex-shrink: 0; overflow: visible; }
.ck circle, .ck .v { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.ck .aro { stroke: #2a1712; stroke-width: 1.1; opacity: .4; }
.ck .rel { fill: #2a1712; }
.ck .onda { stroke: #2a1712; stroke-width: 1; opacity: 0; }
.ck .v { stroke: #eadde7; stroke-width: 1.4; stroke-dasharray: 1; stroke-dashoffset: 1; }
.ls-cur { position: absolute; left: 0; top: 0; width: 34px; height: 41px; fill: #2a1712; stroke: #fff; stroke-width: 1.3; stroke-linejoin: round; transform-origin: 2px 2px; filter: drop-shadow(0 3px 5px rgba(0,0,0,.22)); overflow: visible; opacity: 0; z-index: 3; }
.ls-i { display: flex; align-items: center; gap: 22px; font: 400 54px/1.1 'Family', Georgia, serif; letter-spacing: -.02em; color: #2a1712; opacity: 0; white-space: nowrap; }
.chg { position: absolute; left: 50%; top: 50%; width: 1240px; height: 196px; margin: -98px 0 0 -620px; border-radius: 40px; background: #fff; box-shadow: 0 0 0 1px rgba(42,23,18,.06), 0 40px 90px rgba(42,23,18,.2), 0 0 0 2px rgba(255,97,107,.18); opacity: 0; transform-style: preserve-3d; transform-origin: 50% 50%; }
.chg-m { position: absolute; left: 40px; top: 30px; display: flex; align-items: center; gap: 12px; font: 420 22px/1 'Areal Mono', monospace; color: rgba(42,23,18,.75); }
.chg-m em { font-style: normal; margin-left: 6px; padding: 6px 13px; border-radius: 999px; background: #2a1712; color: #fbfaf8; font-size: 17px; }
.chg-t { position: absolute; left: 40px; top: 90px; right: 150px; font: 420 46px/1.2 'Timeless Sans', sans-serif; color: #2a1712; white-space: nowrap; }
.chg-e { position: absolute; right: 34px; top: 50%; width: 96px; height: 96px; margin-top: -48px; border-radius: 50%; background: #2a1712; display: grid; place-items: center; }
.chg-e svg { width: 42px; height: 42px; fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
`;

// ── 8 · EL HERO de savvia con su titular, pasando por las cuatro estaciones; y un final redondo: el titular se recoge y, en ondas desde la base del
//    roble, queda «savvia agentic.» con la dirección
{
  // ronda 307, 13.ª («el final, que el árbol salga con la gota como en el hero original: que empiece el fondo plano y el resto se genera»): Cacao liso; cae una
  // gota de agua, salpica en la base del tronco y desde ahí el roble se pinta con el canto rasgado; luego entra la luz y el titular
  const a = B(47); FIN = B(57.2);
  // ronda 307, 17.ª («la gota final que sea como la del inicio y acabamos con fondo light»): la MISMA gota de agua del gancho (cuelga, cae estirándose con su estela
  // desenfocada y salpica: corona, gotitas y onda), en tinta para leerse sobre claro; el fondo es el claro del reel y el roble se pinta desde el impacto
  const IX = 960, IY = 1070, SP = Array.from({ length: 11 }, (_, i) => { const h = (x) => { const v = Math.sin(x * 91.7 + 13.1) * 43758.5453; return v - Math.floor(v); };
    const ang = Math.PI * (0.08 + 0.84 * (i + h(i) * 0.6) / 11), v = 140 + 190 * h(i + 7); return [-Math.cos(ang) * v * 1.5, Math.sin(ang) * v, 4 + 6 * h(i + 3), 0.55 + 0.25 * h(i + 11)]; });
  // ronda 307, 19.ª («que el árbol final se vea tal y como está en el hero de savvia, con el mismo efecto y colores»): el roble es una GRABACIÓN del hero real
  // (tools/r307/arbol/grabar-arbol.cjs: estela.ts, dibujo → pintura rasgada desde la base, semitono, hervor, halo y luz), desde el impacto de la gota
  const t0 = a + 1.1, ti = t0 + 1.25;
  escena('e8r', a, FIN + 0.1, 'transparent', `<div class="plano-fin" id="pf"><video class="arbol-fin" id="af" src="assets/arbol-hero-otono.mp4" data-start="${f30(ti)}" data-duration="${f30(FIN + 0.1 - ti)}" data-media-start="0" data-track-index="5" muted playsinline></video><div class="hero-fin"><p class="h1-fin" id="ht9">Elevamos tu web con IA.</p><p class="h2-fin" id="uf">Especialistas en orquestar el desarrollo agéntico.</p></div>
<div id="caida1" style="left:${IX}px;top:${IY}px"><div class="onda1" id="onda1"></div><i class="corona1" id="corona1"></i>${SP.map(([, , r], i) => `<i class="sp1" id="sq${i}" style="width:${r.toFixed(1)}px;height:${r.toFixed(1)}px;margin:${(-r / 2).toFixed(1)}px 0 0 ${(-r / 2).toFixed(1)}px"></i>`).join('')}
<svg id="gota1" viewBox="-34 -8 42 16"><defs><filter id="gb-mb" filterUnits="userSpaceOnUse" x="-160" y="-60" width="220" height="120"><feGaussianBlur id="gb-mbn" stdDeviation="0 0"/></filter>
<radialGradient id="gb-agua" cx="0" cy="0" r="6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3dcc0" stop-opacity=".10"/><stop offset=".62" stop-color="#e9c9a3" stop-opacity=".18"/><stop offset=".86" stop-color="#f6e4cc" stop-opacity=".5"/><stop offset="1" stop-color="#fff3e4" stop-opacity=".85"/></radialGradient>
<radialGradient id="gb-trans" cx="0" cy="3.4" r="4.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd9a8" stop-opacity=".62"/><stop offset="1" stop-color="#ffd9a8" stop-opacity="0"/></radialGradient></defs>
<path id="estela1" filter="url(#gb-mb)" d="M0 -2.4C-22 -1.8 -70 -0.6 -110 0C-70 0.6 -22 1.8 0 2.4Z" fill="rgba(246,228,204,.3)" transform="scale(0 1)" opacity="0"/>
<circle r="6" fill="url(#gb-agua)"/><g transform="rotate(-90)"><circle r="4.6" fill="url(#gb-trans)" transform="translate(0 .4)"/><ellipse cx="-2.1" cy="-2.6" rx="1.7" ry="1.05" transform="rotate(-35 -2.1 -2.6)" fill="#fff" fill-opacity=".95"/><circle cx="2.4" cy="-1.2" r=".45" fill="#fff" fill-opacity=".7"/></g></svg></div></div>`);
  js += `tl.set('#e8r', { '--m': '4800px' }, 0); 
tl.set('#gota1', { rotation: 90, y: -860, scale: 0 }, 0);
(() => { const mb = document.getElementById('gb-mbn'), gv = { v: 0 }, gmb = () => mb.setAttribute('stdDeviation', gv.v.toFixed(2) + ' 0');
tl.to('#gota1', { scale: 1, duration: .34, ease: 'back.out(1.6)' }, ${f30(t0)});
tl.to('#gota1', { scaleX: 1.14, scaleY: .9, duration: .12, ease: 'sine.inOut', yoyo: true, repeat: 1 }, ${f30(t0 + 0.23)});
tl.to('#gota1', { y: 0, duration: ${f30(ti - t0 - 0.48)}, ease: 'power2.in' }, ${f30(t0 + 0.48)});
tl.to('#gota1', { scaleX: 1.42, scaleY: .8, duration: ${f30(ti - t0 - 0.48)}, ease: 'power2.in' }, ${f30(t0 + 0.48)});
tl.fromTo('#estela1', { attr: { transform: 'scale(0 1)' }, opacity: 0 }, { attr: { transform: 'scale(.42 1)' }, opacity: .7, duration: ${f30(ti - t0 - 0.6)}, ease: 'power2.in', immediateRender: false }, ${f30(t0 + 0.6)});
tl.fromTo(gv, { v: 0 }, { v: 3.2, duration: ${f30(ti - t0 - 0.6)}, ease: 'power2.in', onUpdate: gmb, immediateRender: false }, ${f30(t0 + 0.6)});
tl.to('#gota1', { scaleX: .18, scaleY: 2.1, opacity: 0, duration: .1, ease: 'power2.out' }, ${f30(ti)}); })();
tl.fromTo('#corona1', { scale: .3, opacity: .9 }, { scale: 7, opacity: 0, duration: .7, ease: 'expo.out', immediateRender: false }, ${f30(ti)});
tl.fromTo('#onda1', { scale: .3, opacity: .7 }, { scale: 16, opacity: 0, duration: 1.0, ease: 'expo.out', immediateRender: false }, ${f30(ti)});
${SP.map(([dx, up, , dd], i) => { const du = f30(dd * 0.45); return `tl.fromTo('#sq${i}', { x: 0, opacity: .85 }, { x: ${dx.toFixed(0)}, duration: ${dd.toFixed(2)}, ease: 'none', immediateRender: false }, ${f30(ti)});
tl.fromTo('#sq${i}', { y: 0 }, { y: ${(-up).toFixed(0)}, duration: ${du}, ease: 'power2.out', immediateRender: false }, ${f30(ti)});
tl.to('#sq${i}', { y: ${(up * 0.35).toFixed(0)}, opacity: 0, duration: ${f30(dd * 0.55)}, ease: 'power2.in' }, ${f30(ti + du + 1 / 30)});`; }).join('\n')}
tl.fromTo('#ht9', { opacity: 0, filter: 'blur(20px)', y: 22 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.1, ease: 'power3.out', immediateRender: false }, ${f30(ti + 1.3)});
tl.fromTo('#uf', { opacity: 0, y: 12 }, { opacity: .6, y: 0, duration: .8, ease: 'power3.out', immediateRender: false }, ${f30(ti + 1.9)});\n`;
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
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/SplitText.min.js"></script>
${FUENTES_EXTRA}
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
.nombre { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 400 210px/1 'Family', Georgia, serif; letter-spacing: -.035em; color: #2a1712; opacity: 0; white-space: nowrap; }
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
.plano-fin { position: absolute; inset: 0; background: #3b231b; overflow: hidden; }
#caida1 { position: absolute; width: 0; height: 0; z-index: 6; }
#gota1 { position: absolute; left: -170px; top: -40px; width: 210px; height: 80px; transform-origin: 170px 40px; overflow: visible; }
.onda1 { position: absolute; left: -20px; top: -20px; width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(246, 228, 204, .6); opacity: 0; }
.corona1 { position: absolute; left: -22px; top: -6px; width: 44px; height: 12px; border-radius: 50%; border: 2px solid rgba(246, 228, 204, .7); opacity: 0; }
.sp1 { position: absolute; left: 0; top: 0; border-radius: 50%; background: rgba(246, 228, 204, .7); box-shadow: inset -1px -1px 0 rgba(255,243,228,.6); opacity: 0; }
.guia-v { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(234,221,231,.13); transform-origin: 50% 0; }
.guia-h { position: absolute; left: 0; right: 0; height: 1px; background: rgba(234,221,231,.13); transform-origin: 0 50%; }
.cruz { position: absolute; width: 15px; height: 15px; margin: -7px 0 0 -7px; }
.cruz::before, .cruz::after { content: ''; position: absolute; background: rgba(234,221,231,.5); }
.cruz::before { left: 7px; top: 0; width: 1px; height: 15px; }
.cruz::after { top: 7px; left: 0; height: 1px; width: 15px; }
.luz-fin { position: absolute; inset: 0; overflow: hidden; opacity: 0; -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 55%, rgb(0 0 0 / .45) 100%); mask-image: linear-gradient(to bottom, #000 0%, #000 55%, rgb(0 0 0 / .45) 100%); }
.haz-fin { position: absolute; top: -20%; bottom: -20%; width: 34%; left: 40%; transform: skewX(-18deg); background: linear-gradient(90deg, transparent, rgba(234,221,231,.035) 30%, rgba(234,221,231,.09) 50%, rgba(234,221,231,.035) 70%, transparent); }
.hero-fin { position: absolute; left: 0; right: 0; top: 230px; text-align: center; }
.h1-fin { font: 400 104px/1.05 'Family', Georgia, serif; letter-spacing: -.03em; color: #f5f0ea; opacity: 0; }
.h2-fin { margin-top: 26px; font: 420 28px/1.3 'Timeless Sans', sans-serif; color: #f5f0ea; opacity: 0; }
.arbol-fin { position: absolute; left: 50%; bottom: -80px; width: 1340px; height: 706px; margin-left: -670px; object-fit: fill; -webkit-mask-image: linear-gradient(to right, transparent, #000 70px, #000 calc(100% - 70px), transparent), linear-gradient(to bottom, transparent, #000 70px); mask-image: linear-gradient(to right, transparent, #000 70px, #000 calc(100% - 70px), transparent), linear-gradient(to bottom, transparent, #000 70px); -webkit-mask-composite: source-in; mask-composite: intersect; }
.gota-fin { position: absolute; left: 942px; top: 0; width: 38px; height: 52px; border-radius: 50% 50% 50% 50% / 62% 62% 38% 38%; background: radial-gradient(circle at 36% 30%, #fff 0 10%, rgba(245,236,232,.85) 22%, rgba(234,221,231,.45) 58%, rgba(234,221,231,.7) 100%); box-shadow: inset 0 -5px 9px rgba(255,255,255,.45), 0 0 22px 4px rgba(234,221,231,.35); transform-origin: 50% 100%; opacity: 0; }
.onda-g { position: absolute; left: 961px; top: 1050px; width: 80px; height: 22px; margin: -11px 0 0 -40px; border-radius: 50%; border: 2px solid rgba(234,221,231,.75); opacity: 0; }
.lib-caja { position: absolute; left: 50%; top: 50%; transform-origin: 50% 50%; display: block; }
#lib3 { margin: -220px 0 0 -180px; } #pide4 { margin: -40px 0 0 -360px; }
.obra.montada { top: 50%; width: 1100px; margin: -300px 0 0 -550px; }
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
.vista .rob.neety-v { object-position: 0% 0%; }
.rasgo-v { --m: 0px; -webkit-mask: url(assets/rasgo-circulo.png) calc(260px - var(--m) / 2) calc(418px - var(--m) / 2) / var(--m) var(--m) no-repeat; mask: url(assets/rasgo-circulo.png) calc(260px - var(--m) / 2) calc(418px - var(--m) / 2) / var(--m) var(--m) no-repeat; }
.bloques { position: absolute; inset: 0; background: #ece6dd; }
.blq { position: absolute; left: 120px; width: 280px; object-fit: fill; border-radius: 6px; box-shadow: 0 6px 16px rgba(48,32,24,.12); transform-origin: 50% 50%; }
.tunel { position: absolute; inset: 0; perspective: 1100px; perspective-origin: 50% 50%; }
.plano { position: absolute; left: 50%; width: 500px; height: 3600px; margin-left: -250px; overflow: hidden; opacity: 0; }
.techo { -webkit-mask-image: linear-gradient(to top, transparent 0%, #000 30%, #000 45%, transparent 85%); mask-image: linear-gradient(to top, transparent 0%, #000 30%, #000 45%, transparent 85%); bottom: 50%; margin-bottom: 130px; transform-origin: 50% 100%; transform: rotateX(-72deg); }
.suelo { -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 30%, #000 45%, transparent 85%); mask-image: linear-gradient(to bottom, transparent 0%, #000 30%, #000 45%, transparent 85%); top: 50%; margin-top: 130px; transform-origin: 50% 0%; transform: rotateX(72deg); }
.rejilla { position: absolute; left: 0; right: 0; display: grid; grid-template-columns: 1fr; gap: 26px; padding: 0; }
.techo .rejilla { top: 0; } .suelo .rejilla { bottom: 0; }
.rejilla img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 12px; box-shadow: 0 0 0 1px rgba(245,240,234,.08); }
.velo-tunel { position: absolute; inset: 0; background: linear-gradient(rgba(59,35,27,0) 0%, rgba(59,35,27,.2) 30%, #3b231b 42%, #3b231b 58%, rgba(59,35,27,.2) 70%, rgba(59,35,27,0) 100%); }
.muro { position: absolute; left: 0; top: 0; width: 1200px; height: 940px; transform-origin: 0 0; }
.muro img { position: absolute; }
#vivo6 video { object-position: 50% 0%; }
.vivo { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; opacity: 0; background: #fff; overflow: hidden; transform-origin: 0 0; }
.par-card { position: absolute; top: 50%; width: 960px; height: 540px; margin-top: -270px; border-radius: 18px; overflow: hidden; background: #2a1712; box-shadow: 0 0 0 1px rgba(48,32,24,.12), 0 50px 110px rgba(48,32,24,.25); opacity: 0; }
.par-card.izq { left: 150px; } .par-card.alto { width: 760px; height: 570px; margin-top: -285px; left: 250px; } .par-card.der { right: 150px; }
.par-t { position: absolute; top: 0; bottom: 0; width: 600px; display: flex; flex-direction: column; justify-content: center; }
.par-t.der { left: 1190px; } .par-t.izq { left: 150px; text-align: right; width: 580px; }
.par-t p { font: 400 76px/1.06 'Family', Georgia, serif; letter-spacing: -.025em; color: #2a1712; opacity: 0; }
.par-t p.acento { color: #2a1712; }
.fondo-p { position: absolute; inset: 0; background: #f6f3ee; opacity: 0; }
.tit-muro { transform-origin: 50% 50%; }
.giro { position: absolute; left: 600px; top: 470px; width: 0; height: 0; transform-style: preserve-3d; }
.muro { perspective: 1600px; perspective-origin: 600px 470px; }
.tit-muro span { opacity: 1 !important; }
.cursor-f { position: absolute; left: 0; top: 0; width: 34px; height: 42px; opacity: 0; z-index: 4; transform-origin: 4px 4px; overflow: visible; filter: drop-shadow(0 4px 10px rgba(48,32,24,.3)); }
.cursor-f path { fill: #2a1712; stroke: #f5f0ea; stroke-width: 1.6; stroke-linejoin: round; }
.muro img { transform-origin: 50% 50%; }
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
<audio id="music" data-timeline-role="music" src="assets/laundry-on-the-wire.mp3" data-start="0" data-duration="${FIN}" data-track-index="9" data-media-start="4.5"
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
const EST = process.env.EST || 'otono', IDIOMA = process.env.IDIOMA || 'es';
const NOCHE = { otono: '#3b231b', primavera: '#3a2932', verano: '#1b3125', invierno: '#f5f5f7' }[EST], RGB = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(',');
let html2 = out;
if (EST === 'invierno') { // nieve: lo que iba en claro sobre el oscuro pasa a Pizarra, y la gota de agua se dibuja en tinta
  for (const [a, b] of [['#f5f0ea', '#22303e'], ['#f3dcc0', '#22303e'], ['#e9c9a3', '#22303e'], ['#f6e4cc', '#22303e'], ['#fff3e4', '#1a2531'], ['#ffd9a8', '#7d8ba3'], ['rgba(246, 228, 204,', 'rgba(34, 48, 62,'], ['rgba(246,228,204,', 'rgba(34,48,62,'], ['rgba(255,243,228,', 'rgba(255,255,255,'], ['rgba(245,240,234,', 'rgba(34,48,62,']]) html2 = html2.split(a).join(b); }
html2 = html2.split('#3b231b').join(NOCHE).split('rgba(59,35,27,').join('rgba(' + RGB(NOCHE) + ',').split('assets/arbol-otono.webp').join('assets/arbol-' + EST + '.webp').split('assets/arbol-hero-otono.mp4').join('assets/arbol-hero-' + EST + '.mp4').split('assets/agentic.mp4').join('assets/agentic-' + EST + '-' + IDIOMA + '.mp4');
if (IDIOMA === 'en') {
  const T = [['Crea «De ruido a señal» con el antes y el después de Neety', 'Build “From noise to signal” with Neety’s before and after'], ['Añade sus integraciones: CRM, LinkedIn y email llegando al panel', 'Add its integrations: CRM, LinkedIn and email flowing into the panel'], ['Las features de Playground: seis tarjetas que se apilan al hacer scroll', 'Playground’s features: six cards that stack as you scroll'], ['Y sus testimonios: la rueda de caras y el color de cada docente', 'And its testimonials: the wheel of faces, each teacher’s colour'], ['Una sección de Quantus: cuatro clientes, cada uno con su isométrico', 'A Quantus section: four customers, each with its own isometric'], ['La sección de agentes de Patchbay: todos los canales entrando en una API', 'Patchbay’s agents section: every channel docking into one API'],
    ['La IA es la base.', 'AI is the foundation.'], ['El criterio sigue siendo nuestro.', 'The judgement is still ours.'], ['tu web conectada con la IA.', 'your website, connected to AI.'], ['izq">Tu web,<', 'izq">Your website,<'], ['en una librería.', 'in a library.'], ['La librería</p>', 'The library</p>'], ['>Fundamentos<', '>Foundations<'], ['Componentes de la web', 'Website components'], ['>Componentes</p>', '>Components</p>'], ['<i></i>Tipografía', '<i></i>Typography'], ['<i></i>Voz', '<i></i>Voice'], ['<i></i>Espaciado', '<i></i>Spacing'], ['Radios y tokens', 'Radii and tokens'],
    ['La web, su receta y los agentes que la mantienen al día.', 'The website, its recipe and the agents that keep it up to date.'], ['Claude, Codex, tu equipo y savvia', 'Claude, Codex, your team and savvia'], ['izq">Pide<', 'izq">Ask<'], ['der">y listo.<', 'der">and done.<'], ['Pide una sección o un cambio…', 'Ask for a section or a change…'], ['<span>Ahora,</span>', '<span>Now,</span>'], ['El mismo chat, otra librería.', 'Same chat, another library.'], ['Una sección de precios', 'A pricing section'], ['Un footer con su estilo', 'A footer in its style'], ['Con savvia agent tu equipo puede…', 'With savvia agent your team can…'],
    ['Cambios de copy', 'Copy changes'], ['Editar ilustraciones', 'Editing illustrations'], ['Crear landings para Ads', 'Landing pages for Ads'], ['Subir blog al CMS', 'Blog posts to the CMS'], ['Añadir idiomas', 'Adding languages'], ['Publicar un caso de cliente', 'Publishing a client case'], ['Actualizar precios', 'Updating prices'], ['Ajustar SEO y metadatos', 'Tweaking SEO and metadata'], ['Hacer tests A/B', 'Running A/B tests'], ['Revisar accesibilidad', 'Reviewing accessibility'],
    ['Elevamos tu web con IA.', 'We elevate your website with AI.'], ['Especialistas en orquestar el desarrollo agéntico.', 'Specialists in orchestrating agentic development.']];
  for (const [a, b] of T) { if (!html2.includes(a)) console.log('EN · no encuentro:', a); html2 = html2.split(a).join(b); }
  html2 = html2.replace(/\+ librería de ([A-Za-z]+)/g, '+ $1 library').split('+ librería<').join('+ library<');
}
fs.writeFileSync(path.join(__dirname, 'hf', 'index.html'), html2);
console.log('variante', EST, IDIOMA);
console.log('index.html · FIN', FIN, 's ·', vid, 'vídeos');
