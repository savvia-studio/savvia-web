// RONDA 126 · EL LABORATORIO (/lab). RONDA 128–130: lienzo infinito con la card de cristal «savvia lab», raíces, distorsión por velocidad y fondo a elegir.
// RONDA 132 · Andoni: «en el lab quiero meter estas 3 cosas (gravitas-hq, apogee-invader y el artifact de Skale)… de momento en el lab solo quiero esas 3
// cosas y luego ya te iré diciendo qué más meter». Los 11 especímenes de la ronda 126 salen del lienzo (sus vídeos siguen en public/media/lab/).
// Cada experimento se ha grabado de su web real (Chrome, 1440 × 900, screencast → 1280 × 800, 30 fps, mudo): public/media/lab/<slug>.mp4 + .jpg.
//
// · `url`: dónde se abre (pestaña nueva). `dominio`: lo que se lee en la card.
// · `ar`: proporción del clip (ancho / alto).
// · `lienzo`: dónde cae cada COPIA en el mundo que se repite (px respecto al centro, esquina de arriba a la izquierda; w = ancho). Con solo tres
//   experimentos, cada uno aparece dos veces por vuelta del mundo para que el lienzo no tenga huecos. `m` = sitio en MÓVIL (< 900 px), en px de móvil
//   (tarjetas a 0,62), en el mundo `mundoMovil`. 29/10: rejilla de 3 columnas al tresbolillo (360 × 420) en un mundo FIJO; antes el mundo encogía con
//   el alto de la pantalla y en el iPhone mini las copias se pisaban. La celda del centro queda libre para la card «savvia lab».

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
  sub: 'Nuestros experimentos.\nÁbrelos y juega con ellos.', // 26.ª: en dos líneas
  ayuda: 'Desliza o arrastra para explorar',
  ayudaTactil: 'Desliza o pellizca para explorar', // 29/10: se puede alejar con dos dedos
  abrir: 'Ir a la web', // 28/10 · Andoni: «que sea Ir a la web»
};

// el mundo de diseño (a escala 1): las copias se reparten en él
export const mundo = { w: 2600, h: 1640 }; // ronda 154: con Pulso son cuatro experimentos (ocho copias): el mundo crece para que respiren
export const mundoMovil = { w: 1080, h: 1680 }; // 29/10: el de móvil, fijo (3 × 4 celdas de 360 × 420)

export const experimentos: Experimento[] = [
  {
    codigo: 'EXP-001',
    slug: 'gravitas',
    nombre: 'Gravitas',
    // RONDA 307, 25.ª · Gravitas ha cambiado: ya no se descuelga la página, ahora es un laberinto de bola (vídeo regrabado: tools/r307-lab/grabar-gravitas.cjs)
    que: 'La web de una empresa donde nada se mueve sin su aprobación. Salvo la bola: inclinas el tablero con el ratón y la llevas por el laberinto sin que caiga en un agujero, contra el reloj.',
    url: 'https://gravitas-hq.vercel.app/',
    dominio: 'gravitas-hq.vercel.app',
    ar: 16 / 10,
    lienzo: [
      { x: -700, y: -370, w: 420, m: { x: -310, y: -395 } },
      { x: 980, y: 310, w: 480, m: { x: 31, y: 235 } },
    ],
  },
  {
    codigo: 'EXP-002',
    slug: 'apogee',
    nombre: 'Apogee',
    que: 'Control de misión con IA para tomar decisiones. Al bajar, el cohete despega, su estela abre el horizonte y la web sube con él.',
    url: 'https://apogee-invader.vercel.app/',
    dominio: 'apogee-invader.vercel.app',
    ar: 16 / 10,
    lienzo: [
      { x: 260, y: -360, w: 420, m: { x: -310, y: 25 } },
      { x: -480, y: 490, w: 480, m: { x: 391, y: -925 } },
    ],
  },
  {
    codigo: 'EXP-003',
    slug: 'skale',
    nombre: 'Skale',
    que: 'Un televisor para un estudio de vídeos de lanzamiento de San Francisco: lo enciendes y van pasando sus películas, canal a canal.',
    url: 'https://claude.ai/code/artifact/ada71981-6e40-4649-bdd2-ee2bc3db900a',
    dominio: 'Hecho con Claude Design',
    ar: 16 / 10,
    lienzo: [
      { x: 300, y: 240, w: 460, m: { x: 37, y: -185 } },
      { x: 980, y: -250, w: 460, m: { x: 397, y: 335 } },
    ],
  },
  {
    // RONDA 154 · Andoni: «en el lab añade esto: savvia-pulso.vercel.app». Grabado con una canción puesta (tools/r154/grabar-pulso.cjs).
    codigo: 'EXP-004',
    slug: 'pulso',
    nombre: 'Pulso',
    que: 'Pon una canción y la web de savvia suena con ella: el fondo, los bloques y cada sección laten al ritmo de lo que escuchas.',
    url: 'https://savvia-pulso.vercel.app/',
    dominio: 'savvia-pulso.vercel.app',
    ar: 16 / 10,
    lienzo: [
      { x: -1020, y: 160, w: 420, m: { x: 410, y: -85 } },
      { x: -1300, y: -780, w: 440, m: { x: -316, y: -815 } },
    ],
  },
];
