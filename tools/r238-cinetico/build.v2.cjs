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

// ── 1 · NEGRO: «Tu web merece / algo más que una plantilla.» (tachada en coral)
{
  const a = 0, b = B(5.6);
  escena('e1', a, b, '#140d0a', `<div class="centro"><p class="lin" id="l1"><span id="w1">Tu web</span> <span id="w2">merece</span></p><p class="lin" id="l2"><span id="w3">algo más que</span> <span id="w4" class="tach">una plantilla.<i></i></span></p></div>`);
  entra('#w1', B(0)); entra('#w2', B(1)); entra('#w3', B(2)); entra('#w4', B(3));
  js += `tl.fromTo('#w4 i', { scaleX: 0 }, { scaleX: 1, duration: .55, ease: 'expo.inOut', immediateRender: false }, ${B(4.2)});\n`;
  sale('#l1', B(5.1)); sale('#l2', B(5.15));
}
// ── 2 · DEGRADADO: «Conoce» → «savvia agentic» (escrito, en Family)
{
  const a = B(5.3), b = B(8.2);
  escena('e2', a, b, '#2a120d', `<i class="mancha m1"></i><i class="mancha m2"></i><i class="mancha m3"></i><p class="grande" id="conoce">Conoce</p><p class="grande nombre-p" id="marca">savvia agentic</p>`);
  js += `tl.fromTo('#e2 .m1', { x: -260, y: 120, scale: .8 }, { x: 160, y: -60, scale: 1.15, duration: ${f30(b - a)}, ease: 'sine.inOut', immediateRender: false }, ${f30(a)});
tl.fromTo('#e2 .m2', { x: 300, y: -140 }, { x: -120, y: 100, duration: ${f30(b - a)}, ease: 'sine.inOut', immediateRender: false }, ${f30(a)});
tl.fromTo('#e2 .m3', { x: 0, y: 260, scale: .7 }, { x: -40, y: 40, scale: 1.2, duration: ${f30(b - a)}, ease: 'sine.inOut', immediateRender: false }, ${f30(a)});
tl.fromTo('#e2', { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, ${f30(a)});
tl.fromTo('#conoce', { opacity: 0, filter: 'blur(30px)', scale: 1.08 }, { opacity: .9, filter: 'blur(4px)', scale: 1, duration: .8, ease: 'expo.out', immediateRender: false }, ${B(5.5)});\n`;
  sale('#conoce', B(6.6));
  js += `tl.fromTo('#marca', { opacity: 0, filter: 'blur(24px)', scale: .96 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: .9, ease: 'expo.out', immediateRender: false }, ${B(6.8)});\n`;
}
// ── 3 · CLARO: «Tu marca, [la librería] en una librería.»
const FILAS = ['Color', 'Tipografía', 'Voz', 'Espaciado', 'Radios y tokens', 'Componentes de la web'];
const libreria = (pref) => `<div class="lib"><div class="lib-bar"><i></i><i></i><i></i><span>neety / library</span></div><div class="lib-c"><p class="lib-h">La librería</p><p class="lib-g">Fundamentos</p>${FILAS.slice(0, 5).map((f, i) => `<div class="lib-r" id="${pref}r${i}"><i></i>${f}</div>`).join('')}<p class="lib-g">Componentes</p><div class="lib-r" id="${pref}r5"><i></i>${FILAS[5]}</div></div></div>`;
{
  const a = B(8.1), b = B(12.3);
  escena('e3', a, b, '#f6f3ee', frase('f3', 'Tu marca,', 'en una librería.', 360, 440, libreria('l3'), B(8.9), B(11.8)));
  js += `tl.fromTo('#e3', { opacity: 0 }, { opacity: 1, duration: .35, immediateRender: false }, ${f30(a)});\n`;
  entra('#f3 .izq', B(8.3)); entra('#f3 .der', B(9.4));
  FILAS.forEach((_, i) => { js += `tl.fromTo('#l3r${i}', { backgroundColor: 'rgba(91,44,78,0)' }, { backgroundColor: 'rgba(91,44,78,.14)', duration: .12, immediateRender: false }, ${f30(B(10) + i * 0.14)});
tl.to('#l3r${i}', { backgroundColor: 'rgba(91,44,78,0)', duration: .4 }, ${f30(B(10) + i * 0.14 + 0.3)});\n`; });
  sale('#f3 .izq', B(11.8)); sale('#f3 .der', B(11.85));
}
// ── 3b · LA LIBRERÍA, de verdad: la escena de savvia agentic (los agentes cogen piezas de la librería de Neety y montan su home)
{
  const a = B(12), b = B(18.2), RATE = 1.6;
  escena('e3b', a, b, '#f6f3ee', `<p class="cabeza" id="cab3b">Los agentes leen tu librería</p><div class="pelicula" id="peli"><video id="v${++vid}" class="full" src="assets/agentic.mp4" data-start="${f30(a)}" data-duration="${f30(b - a)}" data-media-start="1.0" data-playback-rate="${RATE}" data-track-index="2" muted playsinline></video></div><p class="pie-obra visible" id="pie3b">Claude · Codex · tu equipo · savvia</p>`);
  js += `tl.fromTo('#peli', { opacity: 0, y: 80, scale: .94 }, { opacity: 1, y: 0, scale: 1, duration: .9, ease: 'expo.out', immediateRender: false }, ${f30(a)});
tl.fromTo('#peli', { scale: 1 }, { scale: 1.06, duration: ${f30(b - a - 1)}, ease: 'none', immediateRender: false }, ${f30(a + 0.9)});\n`;
  entra('#cab3b', B(12.2)); entra('#pie3b', B(13));
  sale('#cab3b', B(17.6)); sale('#pie3b', B(17.6));
  js += `tl.to('#peli', { opacity: 0, filter: 'blur(12px)', duration: .35, ease: 'power2.in' }, ${f30(B(17.7))});\n`;
}
// ── 4 · «Pide [la petición] y listo.»
{
  const a = B(18), b = B(21.7), PEDIDO = 'Haz la home de Neety con su librería';
  const caja = `<div class="pide"><p class="pide-t"><span class="chispa"></span>savvia agentic</p><p class="pide-x"><span id="tecla">${PEDIDO}</span><i class="cursor"></i></p><span class="enviar" id="enviar">↑</span></div>`;
  escena('e4', a, b, '#f6f3ee', frase('f4', 'Pide', 'y listo.', 560, 160, caja, B(18.7), B(21.2)));
  entra('#f4 .izq', B(18.2)); entra('#f4 .der', B(19.2));
  js += `tl.fromTo('#tecla', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'steps(${PEDIDO.length})', immediateRender: false }, ${f30(B(19))});
tl.fromTo('#enviar', { scale: 1 }, { scale: .82, duration: .12, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, ${f30(B(20.8))});\n`;
  sale('#f4 .izq', B(21.2)); sale('#f4 .der', B(21.25));
}
// ── 5 · «edita [texto] textos» · «cambia [el roble vira] colores» · «mueve [secciones] secciones»
{
  const a = B(21.5), b = B(27.6), N0 = 21.5;
  const edita = `<div class="mini">${video('neety-vivo', B(N0), B(N0 + 2.2), 3.6, 'full')}<i class="sel" id="sel"></i><i class="cur" id="cur"></i></div>`;
  const cambia = `<div class="mini arbol">${['otono', 'invierno', 'primavera', 'verano'].map((e, i) => `<img class="rob${i ? ' rasgo' : ''}" id="rob${i}" src="assets/arbol-${e}.webp" alt="" style="background:${['#3b231b', '#f5f5f7', '#3a2932', '#1b3125'][i]}" />`).join('')}</div>`;
  const mueve = `<div class="mini secs">${['#bcd3f5', '#f6a46b', '#5b2c4e'].map((c, i) => `<i class="sec" id="sec${i}" style="background:${c};top:${22 + i * 98}px"></i>`).join('')}</div>`;
  escena('e5', a, b, '#f6f3ee', frase('f5a', 'edita', 'textos', 560, 315, edita, B(N0 + 0.3), B(N0 + 1.9)) + frase('f5b', 'cambia', 'colores', 560, 315, cambia, B(N0 + 2.3), B(N0 + 3.9)) + frase('f5c', 'mueve', 'secciones', 560, 315, mueve, B(N0 + 4.3), B(N0 + 5.8)));
  [['f5a', N0], ['f5b', N0 + 2], ['f5c', N0 + 4]].forEach(([id, n]) => { entra(`#${id} .izq`, B(n + 0.05)); entra(`#${id} .der`, B(n + 0.55)); sale(`#${id} .izq`, B(n + 1.9)); sale(`#${id} .der`, B(n + 1.92)); });
  js += `tl.fromTo('#sel', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: .45, ease: 'expo.out', immediateRender: false }, ${f30(B(N0 + 0.9))});
tl.fromTo('#cur', { x: 200, y: 140, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .5, ease: 'expo.out', immediateRender: false }, ${f30(B(N0 + 0.6))});\n`;
  [1, 2, 3].forEach((i) => { js += `tl.fromTo('#rob${i}', { '--m': '0px' }, { '--m': '1400px', duration: .7, ease: 'power2.inOut', immediateRender: false }, ${f30(B(N0 + 2.5) + (i - 1) * 0.42)});\n`; });
  js += `tl.to('#sec0', { y: 196, duration: .5, ease: 'expo.inOut' }, ${f30(B(N0 + 4.8))}); tl.to('#sec2', { y: -196, duration: .5, ease: 'expo.inOut' }, ${f30(B(N0 + 4.8))});
tl.to('#sec1', { scaleX: .9, duration: .25, yoyo: true, repeat: 1, ease: 'power2.inOut' }, ${f30(B(N0 + 4.8))});\n`;
}
// ── 6 · LAS WEBS: el nombre detrás y la web ladeada delante (1,5 pulsos cada una)
{
  const a = B(27.4), b = B(33.6), WEBS = [['kuanta-portada', 'Kuanta', 0.15], ['cubbo-grande', 'Cubbo', 0.2], ['home-of-ambrose-grande', 'Home of Ambrose', 0.2], ['monad-grande', 'Monad', 0.2]];
  let inner = '';
  WEBS.forEach(([clip, nombre, ms], i) => {
    const t0 = B(27.5 + i * 1.5), t1 = B(29 + i * 1.5);
    inner += `<p class="nombre" id="n6${i}">${nombre}</p><div class="obra ladeada" id="o6${i}"><div class="bar"><i></i><i></i><i></i><span>${nombre.toLowerCase().replace(/ /g, '')}</span></div><div class="scr">${video(clip, t0, t1 + 0.1, ms)}</div></div>`;
    js += `tl.fromTo('#n6${i}', { opacity: 0, filter: 'blur(26px)', scale: 1.06 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: .5, ease: 'expo.out', immediateRender: false }, ${f30(t0)});
tl.set('#n6${i}', { opacity: 0 }, ${f30(t1)});
tl.fromTo('#o6${i}', { opacity: 0, y: 420, rotationX: 28, rotationY: ${i % 2 ? 16 : -16}, rotationZ: ${i % 2 ? 3 : -3} }, { opacity: 1, y: 60, rotationX: 12, rotationY: ${i % 2 ? 8 : -8}, rotationZ: ${i % 2 ? 1.5 : -1.5}, duration: .75, ease: 'expo.out', immediateRender: false }, ${f30(t0 + 0.05)});
tl.set('#o6${i}', { opacity: 0 }, ${f30(t1)});\n`;
  });
  escena('e6', a, b, '#f6f3ee', inner);
}
// ── 7 · DEGRADADO OSCURO: «Cambios en horas, / no en presupuestos.»
{
  const a = B(33.4), b = B(36.2);
  escena('e7', a, b, '#2a120d', `<i class="mancha m1"></i><i class="mancha m3"></i><div class="centro"><p class="lin claro" id="c1">Cambios en horas,</p><p class="lin claro tenue" id="c2">no en presupuestos.</p></div>`);
  js += `tl.fromTo('#e7 .m1', { x: 200, y: -80 }, { x: -200, y: 80, duration: ${f30(b - a)}, ease: 'sine.inOut', immediateRender: false }, ${f30(a)});
tl.fromTo('#e7 .m3', { x: -100, y: 200 }, { x: 120, y: -60, duration: ${f30(b - a)}, ease: 'sine.inOut', immediateRender: false }, ${f30(a)});\n`;
  entra('#c1', B(33.5)); entra('#c2', B(34.4)); sale('#c1', B(35.7)); sale('#c2', B(35.75));
}
// ── 8 · EL HERO de savvia, como en la web: guías, haz, el roble pintado y las cuatro estaciones (capturas del hero real, hero-est.cjs);
//    cada estación se descubre desde la base del tronco con el canto rasgado, como en la web. Encima, «savvia agentic.» en la tipografía de titulares.
{
  const a = B(36), b = FIN + 0.1, EST = ['otono', 'invierno', 'primavera', 'verano'];
  escena('e8', a, b, '#3b231b', EST.map((e, i) => `<img class="hero-est${i ? ' rasgo-h' : ''}" id="h8${i}" src="assets/hero-${e}.jpg" alt="" />`).join('') + `<div class="hero-t" id="ht8"><p class="hero-h1">savvia agentic.</p><p class="hero-sub">Tu web, en una librería que cualquier IA sabe leer.</p></div>`);
  js += `tl.fromTo('#e8', { opacity: 0 }, { opacity: 1, duration: .5, immediateRender: false }, ${f30(a)});
tl.fromTo('#h80', { scale: 1.04 }, { scale: 1, duration: 1.6, ease: 'expo.out', immediateRender: false }, ${f30(a)});
tl.fromTo('#ht8', { opacity: 0, filter: 'blur(20px)', y: 18 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .9, ease: 'expo.out', immediateRender: false }, ${B(36.4)});\n`;
  [1, 2, 3].forEach((i) => { js += `tl.fromTo('#h8${i}', { '--m': '0px' }, { '--m': '4800px', duration: 1.3, ease: 'power2.inOut', immediateRender: false }, ${B(36.2 + i * 1.8)});\n`; });
  // la tinta del título sigue a la estación: en invierno (nieve) es oscura
  js += `tl.to('#ht8', { color: '#22303e', duration: .6 }, ${f30(B(38) + 0.4)}); tl.to('#ht8', { color: '#f5f5f7', duration: .6 }, ${f30(B(39.8) + 0.4)});\n`;
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
#grano { position: absolute; inset: 0; background: url(assets/grano.png); opacity: .55; pointer-events: none; z-index: 900; }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${FIN}" data-width="1920" data-height="1080">
${html}
<div id="grano" data-layout-allow-occlusion></div>
<audio id="music" data-timeline-role="music" src="assets/distant-miles.mp3" data-start="0" data-duration="${FIN}" data-track-index="9" data-media-start="0"
  data-automation='{"version":1,"lanes":[{"target":"volume","points":[{"t":0,"v":0.9},{"t":${f30(FIN - 2.2)},"v":0.9},{"t":${FIN},"v":0}]}]}'></audio>
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
console.log('index.html · FIN', FIN, 's ·', vid, 'vídeos');
