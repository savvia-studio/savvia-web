// REEL (ronda 60) · genera tools/reel/hf/index.html (HyperFrames) desde la lista de planos. Música: «Distant Miles» (JonasBlakewood, Pixabay),
// 92 BPM: un pulso cada 0,65 s; los cortes caen en sus pulsos (medidos con librosa). node tools/reel/montar.cjs
const fs = require('fs'), path = require('path');
const HF = path.join(__dirname, 'hf');
// pulsos medidos (s)
const P = [1.02, 1.7, 2.32, 3.0, 3.62, 4.27, 4.88, 5.57, 6.2, 6.85, 7.48, 8.13, 8.75, 9.4, 10.05, 10.68, 11.35, 12.0, 12.63, 13.31, 13.93, 14.61, 15.21, 15.86,
  16.51, 17.18, 17.79, 18.46, 19.09, 19.76, 20.39, 21.01, 21.66, 22.31, 22.94, 23.61, 24.24, 24.92, 25.52, 26.19, 26.84];
const FIN = 26.8;
const NOMBRES = {
  multiverse: 'Multiverse Computing', zernio: 'Amarra', playground: 'Playground IEP', neety: 'Neety', invopop: 'Invopop', isotrol: 'Isotrol', remerge: 'Remerge',
};
// plano: [clip, desde, hasta, inicio en el clip, rótulo?, empuje?]
// v2 («repetimos demasiadas veces las mismas animaciones»): cada web sale 2-3 veces con momentos DISTINTOS de sus secciones (tools/reel/momentos.cjs),
// intercaladas; ninguna animación se repite. El rótulo, solo la primera vez que sale cada web.
const PLANOS = [
  ['zernio-vivo', 1.7, 3.62, 5.7, true, 'entra'],
  ['zernio-m02', 3.62, 4.88, 1.3],
  ['playground-vivo', 4.88, 6.85, 3.0, true],
  ['neety-m00', 6.85, 8.13, 1.0, true],
  ['isotrol-m02', 8.13, 8.75, 0.9, true],
  ['invopop-m02', 8.75, 9.4, 1.1, true],
  ['multiverse-m00', 9.4, 10.05, 1.4],
  ['multiverse-vivo', 12.0, 15.21, 0.9, true, 'golpe'],
  ['playground-m01', 15.21, 15.86, 2.1],
  ['zernio-m01', 15.86, 16.51, 2.0],
  ['neety-m01', 16.51, 17.18, 1.8],
  ['multiverse-m04', 17.18, 17.79, 1.0],
  ['invopop-m04', 17.79, 18.46, 0.5],
  ['playground-m06', 18.46, 19.09, 2.2],
];
const MOVIL = ['remerge-m04', 11.35, 12.0, 0.8];
const MESA = ['isotrol-vivo', 19.09, 22.31, 4.6];

const v = (id, clip, a, b, ini, extra = '') =>
  `<video id="${id}" class="plano" src="assets/${clip}.mp4" data-start="${a}" data-duration="${(b - a).toFixed(2)}" data-media-start="${ini}" data-track-index="1" muted playsinline ${extra}></video>`;

let html = '', js = '';
PLANOS.forEach(([clip, a, b, ini, rot, emp], i) => {
  const id = 'p' + i, slug = clip.split('-')[0];
  html += `<div class="cam" id="${id}-cam">${v(id, clip, a, b, ini)}</div>\n`;
  if (rot) html += `<div class="rotulo clip" id="${id}-rot" data-start="${a}" data-duration="${(b - a).toFixed(2)}" data-track-index="3"><i></i><span>${NOMBRES[slug]}</span></div>\n`;
  // cámara: un empuje lento en cada plano (en el golpe, más marcado)
  const s0 = emp === 'golpe' ? 1.1 : 1.0, s1 = emp === 'golpe' ? 1.0 : 1.045;
  js += `tl.fromTo('#${id}-cam', { scale: ${s0} }, { scale: ${s1}, duration: ${(b - a).toFixed(2)}, ease: "none", immediateRender: false }, ${a});\n`;
  if (rot) js += `tl.fromTo('#${id}-rot', { opacity: 0 }, { opacity: 1, duration: .3, ease: "none", immediateRender: false }, ${a + (i === 0 ? 0.9 : 0.12)});\n`;
  if (rot) js += `tl.fromTo('#${id}-rot span, #${id}-rot i', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'expo.out', stagger: .05 }, ${a + (i === 0 ? 0.9 : 0.12)});\n`;
});

const CFG = { P, FIN, MESA };
const out = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
@font-face { font-family: 'Family'; src: url('assets/family-TRIAL-vf-roman.woff2') format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'Areal Mono'; src: url('assets/abc-areal-mono-regular.woff2') format('woff2'); font-weight: 400; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1920px; height: 1080px; overflow: hidden; background: #302018; }
#root { position: relative; width: 100%; height: 100%; overflow: hidden; background: #302018; }
.cam { position: absolute; inset: 0; transform-origin: 50% 50%; }
.plano { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
/* la primera web se abre con el papel rasgado de la web, desde donde cae la gota */
#p0-cam { -webkit-mask: url(assets/rasgo-circulo.png) 50% 50% / 0% no-repeat; mask: url(assets/rasgo-circulo.png) 50% 50% / 0% no-repeat; }
.rotulo { opacity: 0; }
.rotulo { position: absolute; left: 56px; bottom: 52px; display: flex; align-items: center; gap: 14px; padding: 14px 22px 14px 18px; border-radius: 999px;
  background: rgba(48, 32, 24, .78); font: 400 22px/1 'Areal Mono', ui-monospace, monospace; color: #eadde7; letter-spacing: .02em; overflow: hidden; }
.rotulo i { width: 10px; height: 10px; border-radius: 50%; background: #f65340; display: block; }
.rotulo span { display: block; }
/* gota */
#gota { position: absolute; left: 960px; top: 0; width: 34px; height: 46px; margin-left: -17px; }
#onda { position: absolute; left: 960px; top: 540px; width: 40px; height: 40px; margin: -20px 0 0 -20px; border-radius: 50%; border: 2px solid #f65340; opacity: 0; }
/* titular */
.carta { position: absolute; inset: 0; display: grid; place-items: center; background: #302018; }
.carta h2 { font: 400 150px/1 'Family', Georgia, serif; color: #eadde7; letter-spacing: -0.02em; display: flex; gap: .26em; }
.carta h2 span { display: block; overflow: hidden; padding-bottom: .12em; }
.carta h2 b { display: block; font-weight: 400; }
/* móvil */
#movil { position: absolute; inset: 0; background: #302018; display: grid; place-items: center; }
#movil .marco { position: relative; width: 402px; height: 870px; border-radius: 56px; padding: 12px; background: #1a110c; box-shadow: 0 0 0 2px #4a3328; }
#movil video { position: relative; width: 100%; height: 100%; object-fit: cover; border-radius: 44px; display: block; }
/* la mesa del estudio: la web dentro del monitor y la cámara que se aleja */
#mesa { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 0 0; }
#mesa img { position: absolute; inset: 0; width: 100%; height: 100%; }
#mesa .pantalla { position: absolute; left: 39.12%; top: 37.03%; width: 21.61%; height: 20.92%; overflow: hidden; background: #fff; }
#mesa .pantalla video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; }
/* cierre */
#cierre { position: absolute; inset: 0; background: #302018; display: grid; place-items: center; }
#cierre .logo { width: 760px; aspect-ratio: 1118 / 348; background: #eadde7; -webkit-mask: url(assets/savvia-logo.svg) center / contain no-repeat; mask: url(assets/savvia-logo.svg) center / contain no-repeat; }
#cierre .tapa { position: absolute; width: 760px; aspect-ratio: 1118 / 348; left: 50%; top: 50%; margin: -118px 0 0 -380px; background: linear-gradient(90deg, rgba(48,32,24,0) 0, #302018 60px); transform-origin: 0 50%; }
#cierre p { position: absolute; left: 0; right: 0; top: 700px; text-align: center; font: 400 22px/1 'Areal Mono', ui-monospace, monospace; color: rgba(234, 221, 231, .6); letter-spacing: .08em; }
#grano { position: absolute; inset: 0; background: url(assets/grano.png); opacity: .9; pointer-events: none; }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${FIN}" data-width="1920" data-height="1080">
<div id="intro" class="clip" data-start="0" data-duration="2.6" data-track-index="2">
  <svg id="gota" viewBox="0 0 34 46"><path d="M17 0 C17 0 34 22 34 29 A17 17 0 0 1 0 29 C0 22 17 0 17 0Z" fill="#f65340"/></svg>
  <div id="onda"></div>
</div>
${html}
<div id="titular" class="carta clip" data-start="10.05" data-duration="1.30" data-track-index="2"><h2><span><b>Webs</b></span><span><b>a</b></span><span><b>medida.</b></span></h2></div>
<div id="movil"><div class="marco" id="movil-marco">
  <video id="movil-v" src="assets/${MOVIL[0]}.mp4" data-start="${MOVIL[1]}" data-duration="${(MOVIL[2] - MOVIL[1]).toFixed(2)}" data-media-start="${MOVIL[3]}" data-track-index="4" muted playsinline></video></div></div>
<div id="mesa-clip" style="position:absolute;inset:0;overflow:hidden">
  <div id="mesa"><img src="assets/otono-xl.webp" alt="" /><div class="pantalla">
    <video id="mesa-v" src="assets/${MESA[0]}.mp4" data-start="${MESA[1]}" data-duration="${(MESA[2] - MESA[1]).toFixed(2)}" data-media-start="${MESA[3]}" data-track-index="4" muted playsinline></video></div></div>
</div>
<div id="cierre" class="clip" data-start="22.31" data-duration="${(FIN - 22.31).toFixed(2)}" data-track-index="2">
  <div class="logo"></div><div class="tapa" id="tapa"></div><p id="firma">savvia.studio · reel 2026</p>
</div>
<div id="grano"></div>
<audio id="musica" src="assets/distant-miles.mp3" data-start="0" data-duration="${FIN}" data-track-index="9" data-volume="1"></audio>
</div>
<script>
const tl = gsap.timeline({ paused: true });
// capas sin tiempo propio (llevan vídeo dentro): se encienden y apagan aquí
tl.set(["#movil", "#mesa-clip"], { opacity: 0 }, 0);
tl.set("#movil", { opacity: 1 }, ${MOVIL[1]}); tl.set("#movil", { opacity: 0 }, ${MOVIL[2]});
tl.set("#mesa-clip", { opacity: 1 }, ${MESA[1]}); tl.set("#mesa-clip", { opacity: 0 }, ${MESA[2]});
// — la gota cae y la primera web se abre desde el impacto —
tl.fromTo('#gota', { y: -80, scaleY: 1.5, scaleX: .8 }, { y: 517, scaleY: 1.25, scaleX: .85, duration: 1.12, ease: 'power2.in' }, 0.5);
tl.to('#gota', { scaleX: 1.9, scaleY: .15, opacity: 0, duration: .12, ease: 'power2.out' }, 1.62);
tl.fromTo('#onda', { scale: .3, opacity: .9 }, { scale: 9, opacity: 0, duration: .9, ease: 'expo.out' }, 1.64);
tl.fromTo('#p0-cam', { webkitMaskSize: '0%', maskSize: '0%' }, { webkitMaskSize: '420%', maskSize: '420%', duration: 1.0, ease: 'expo.inOut' }, 1.62);
${js}
// — titular —
tl.fromTo('#titular b', { yPercent: 105 }, { yPercent: 0, duration: .6, ease: 'expo.out', stagger: .08 }, 10.08);
// — el móvil —
tl.fromTo('#movil-marco', { y: 80, rotation: -3 }, { y: 0, rotation: 0, duration: .65, ease: 'expo.out' }, ${MOVIL[1]});
// — la mesa: de la pantalla llena a la mesa entera (la cámara se aleja, anclada al centro de la pantalla) —
(() => { const W = 1920, H = 1080, sx = .3912 * W, sy = .3703 * H, sw = .2161 * W, sh = .2092 * H, k = Math.max(W / sw, H / sh);
  const cx = sx + sw / 2, cy = sy + sh / 2;
  const est = (z) => ({ scale: z, x: W / 2 - cx * z, y: H / 2 - cy * z });
  tl.fromTo('#mesa', est(k), { ...est(1.02), duration: 2.3, ease: 'expo.inOut' }, ${MESA[1]} + .35);
})();
// — cierre: el logotipo se descubre de izquierda a derecha —
tl.fromTo('#tapa', { scaleX: 1, x: 0 }, { x: 800, duration: 1.3, ease: 'power2.inOut' }, 22.5);
tl.fromTo('#firma', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8, ease: 'expo.out' }, 23.6);
tl.to('#musica', { volume: 0, duration: 1.9, ease: 'none' }, ${FIN} - 1.9);
window.__timelines['main'] = tl;
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(HF, 'index.html'), out);
console.log('index.html', PLANOS.length, 'planos');
