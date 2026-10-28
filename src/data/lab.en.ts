// English version of lab.ts (same shape). RONDA 126 · EL LABORATORIO (/lab). RONDA 128–130: lienzo infinito con la card de cristal «savvia lab», raíces, distorsión por velocidad y fondo a elegir.
// RONDA 132 · Andoni: «en el lab quiero meter estas 3 cosas (gravitas-hq, apogee-invader y el artifact de Skale)… de momento en el lab solo quiero esas 3
// cosas y luego ya te iré diciendo qué más meter». Los 11 especímenes de la ronda 126 salen del lienzo (sus vídeos siguen en public/media/lab/).
// Cada experimento se ha grabado de su web real (Chrome, 1440 × 900, screencast → 1280 × 800, 30 fps, mudo): public/media/lab/<slug>.mp4 + .jpg.
//
// · `url`: dónde se abre (pestaña nueva). `dominio`: lo que se lee en la card.
// · `ar`: proporción del clip (ancho / alto).
// · `lienzo`: dónde cae cada COPIA en el mundo que se repite (px respecto al centro, esquina de arriba a la izquierda; w = ancho). Con solo tres
//   experimentos, cada uno aparece dos veces por vuelta del mundo para que el lienzo no tenga huecos. `m` = sitio en MÓVIL (< 900 px), en las mismas
//   unidades; allí todo se multiplica por k (0,62).

export interface Experimento {
  codigo: string;
  slug: string;
  nombre: string;
  que: string;
  url: string;
  dominio: string;
  ar: number;
  lienzo: { x: number; y: number; w: number; m: { x: number; y: number } }[];
}

export const lab = {
  titulo: 'savvia lab',
  sub: 'Our experiments.\nOpen them and play.', // 26.ª: en dos líneas
  ayuda: 'Scroll or drag to explore',
  ayudaTactil: 'Swipe to explore',
  abrir: 'Open on its site',
};

// el mundo de diseño (a escala 1): las copias se reparten en él
export const mundo = { w: 2600, h: 1640 }; // ronda 154: con Pulso son cuatro experimentos (ocho copias): el mundo crece para que respiren

export const experimentos: Experimento[] = [
  {
    codigo: 'EXP-001',
    slug: 'gravitas',
    nombre: 'Gravitas',
    // RONDA 307, 25.ª · Gravitas ha cambiado: ya no se descuelga la página, ahora es un laberinto de bola (vídeo regrabado: tools/r307-lab/grabar-gravitas.cjs)
    que: 'A company website where nothing moves without its approval. Except the ball: tilt the board with your mouse and guide it through the maze without dropping into a hole, against the clock.',
    url: 'https://gravitas-hq.vercel.app/',
    dominio: 'gravitas-hq.vercel.app',
    ar: 16 / 10,
    lienzo: [
      { x: -700, y: -370, w: 420, m: { x: -200, y: -555 } },
      { x: 980, y: 310, w: 480, m: { x: 600, y: -200 } },
    ],
  },
  {
    codigo: 'EXP-002',
    slug: 'apogee',
    nombre: 'Think Clearly',
    que: 'Mission control with AI for making decisions. As you scroll down, the rocket takes off, its trail opens the horizon and the site climbs with it.',
    url: 'https://apogee-invader.vercel.app/',
    dominio: 'apogee-invader.vercel.app',
    ar: 16 / 10,
    lienzo: [
      { x: 260, y: -360, w: 420, m: { x: 194, y: 274 } },
      { x: -480, y: 490, w: 480, m: { x: -900, y: -500 } },
    ],
  },
  {
    codigo: 'EXP-003',
    slug: 'skale',
    nombre: 'Skale',
    que: 'A television for a San Francisco launch video studio: switch it on and its films play, channel by channel.',
    url: 'https://claude.ai/code/artifact/ada71981-6e40-4649-bdd2-ee2bc3db900a',
    dominio: 'Made with Claude Design',
    ar: 16 / 10,
    lienzo: [
      { x: 300, y: 240, w: 460, m: { x: -532, y: 290 } },
      { x: 980, y: -250, w: 460, m: { x: -200, y: 800 } },
    ],
  },
  {
    // RONDA 154 · Andoni: «en el lab añade esto: savvia-pulso.vercel.app». Grabado con una canción puesta (tools/r154/grabar-pulso.cjs).
    codigo: 'EXP-004',
    slug: 'pulso',
    nombre: 'Pulso',
    que: 'Play a song and the savvia site moves with it: the background, the blocks and every section pulse to what you hear.',
    url: 'https://savvia-pulso.vercel.app/',
    dominio: 'savvia-pulso.vercel.app',
    ar: 16 / 10,
    lienzo: [
      { x: -1020, y: 160, w: 420, m: { x: 1055, y: 682 } },
      { x: -1300, y: -780, w: 440, m: { x: -929, y: 908 } },
    ],
  },
];
