// RONDA 83 · el DIRECTOR provisional del hero (hasta que llegue la imagen de Andoni): de espaldas, cortado por la cintura (el visitante está en
// el patio de butacas), brazos en alto y batuta. Aguada de tinta en SVG (bordes con turbulencia, luz de foco desde arriba a la derecha) → sharp
// → public/media/hero/director.webp (1260×583, alfa), la lámina que pinta el motor (estela.ts), como antes el roble.
const sharp = require('sharp');
const W = 1260, H = 583; // el dibujo; la lámina se recorta a la figura (x 280–1080): 1200 × 874, proporción 800/583
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="874" viewBox="280 0 800 583">
<defs>
  <filter id="agua" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.25" result="ga"/>
    <feComposite in="d" in2="ga" operator="in"/>
  </filter>
  <filter id="blando"><feGaussianBlur stdDeviation="6"/></filter>
  <linearGradient id="frac" x1="0.75" y1="0" x2="0.3" y2="1">
    <stop offset="0" stop-color="#6b4c3f"/><stop offset=".35" stop-color="#3a2620"/><stop offset="1" stop-color="#1e1411"/>
  </linearGradient>
  <linearGradient id="pelo" x1="0.8" y1="0" x2="0.2" y2="1">
    <stop offset="0" stop-color="#8d6b58"/><stop offset=".45" stop-color="#3e2a21"/><stop offset="1" stop-color="#1a110e"/>
  </linearGradient>
  <linearGradient id="piel" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2b79a"/><stop offset="1" stop-color="#8a5d48"/></linearGradient>
</defs>
<g filter="url(#agua)">
  <!-- brazos: mangas del frac como trazos gruesos (hombro → codo → muñeca), más anchos arriba -->
  <path d="M540 352 C488 318 452 282 424 244 C398 208 372 172 350 138" stroke="#150e0c" stroke-width="58" stroke-linecap="round" fill="none"/>
  <path d="M540 352 C500 326 470 296 444 262" stroke="#150e0c" stroke-width="74" stroke-linecap="round" fill="none"/>
  <path d="M742 352 C792 318 830 280 856 238 C880 198 898 162 912 128" stroke="#150e0c" stroke-width="58" stroke-linecap="round" fill="none"/>
  <path d="M742 352 C782 326 812 296 836 260" stroke="#150e0c" stroke-width="74" stroke-linecap="round" fill="none"/>
  <!-- puños de la camisa -->
  <path d="M332 140 L360 116 L374 130 L346 154 Z" fill="#e9ddd2"/>
  <path d="M898 126 L922 106 L936 124 L912 142 Z" fill="#e9ddd2"/>
  <!-- manos: la izquierda abierta; la derecha cerrada sobre la batuta -->
  <path d="M338 142 C318 126 306 104 310 86 C312 78 320 80 320 88 L324 108 L320 74 C320 64 330 64 331 74 L336 102 L338 66 C339 56 349 57 348 67 L348 102 L356 76 C359 67 368 70 366 79 L358 116 C356 130 350 140 338 142 Z" fill="url(#piel)"/>
  <path d="M916 112 C908 96 912 80 926 74 C940 70 952 80 950 96 C948 108 938 116 926 118 Z" fill="url(#piel)"/>
  <path d="M932 84 L1064 20 L1066 25 L936 92 Z" fill="#f4ece4"/>
  <!-- espalda del frac: hombros anchos y caídos, cintura, faldones que salen por abajo -->
  <path d="M478 583 C484 530 492 486 502 448 C510 412 506 382 516 362 C540 336 588 322 640 320 C692 322 740 336 764 362 C774 382 770 412 778 448 C788 486 796 530 802 583 Z" fill="#150e0c"/>
  <path d="M640 334 C641 400 640 470 638 583" stroke="#060404" stroke-width="4" fill="none" opacity=".7"/>
  <path d="M614 583 L638 508 L662 583 Z" fill="#060404" opacity=".7"/>
  <!-- cuello de la camisa y nuca -->
  <path d="M600 322 C614 310 666 310 680 322 L676 338 C660 330 620 330 604 338 Z" fill="#e9ddd2"/>
  <path d="M608 318 C604 302 606 292 612 284 L668 284 C674 294 676 304 672 318 Z" fill="url(#piel)"/>
  <!-- pelo: una masa oscura, algo más ancha que la cabeza y ondulada por detrás (sin pinchos) -->
  <path d="M586 272 C572 244 578 210 600 192 C624 172 664 170 690 186 C712 202 718 236 708 266 C704 282 696 292 686 296 C660 304 620 304 598 294 C592 288 588 280 586 272 Z" fill="url(#pelo)"/>
  <path d="M600 294 C604 284 612 280 620 286 C626 278 638 278 644 288 C650 278 664 278 670 288 C676 280 688 282 690 294 C670 304 620 304 600 294 Z" fill="#2c1d17"/>
</g>
<!-- la luz del foco (arriba a la derecha): filo cálido en hombro, pelo y brazo de la batuta -->
<g filter="url(#blando)" opacity=".7">
  <path d="M652 322 C700 324 740 338 762 362" stroke="#f3d9c2" stroke-width="6" fill="none"/>
  <path d="M662 180 C690 184 704 206 704 230" stroke="#f7e3cf" stroke-width="7" fill="none"/>
  <path d="M770 330 C816 300 850 262 872 222 C890 188 902 160 912 134" stroke="#f3d9c2" stroke-width="7" fill="none"/>
  <path d="M470 300 C450 280 436 262 424 244" stroke="#f3d9c2" stroke-width="4" fill="none" opacity=".5"/>
</g>
</svg>`;
(async () => {
  await sharp(Buffer.from(svg)).webp({ quality: 92, alphaQuality: 100 }).toFile('public/media/hero/director.webp');
  await sharp(Buffer.from(svg)).flatten({ background: '#3b231b' }).png().toFile(process.env.PREVIEW || '/tmp/director-prev.png');
  console.log('ok');
})();
