// MOVIMIENTO EN ABSTRACTO (casos de estudio). Andoni: «los detalles de motion como una abstracción, como hace Dropbox» (brand.dropbox.com/motion › Motion
// Principles: cartas de color plano con dos o tres formas que repiten un gesto) y después «tres en una fila, que no se repitan tanto entre case studies».
// Cada detalle del mosaico se clasifica por lo que cuenta (en castellano) y el reparto se hace con TODOS los casos a la vez: cada caso se queda con los tres
// gestos menos usados hasta entonces que le cuadran (si un detalle no encaja en ninguno, uno de los gestos de reserva). Determinista: mismo orden, mismo reparto.
import { proyectos } from '../data/proyectos';

export type Gesto =
  | 'bucle' | 'pestanas' | 'cuenta' | 'cae' | 'atraca' | 'comprime' | 'traza' | 'gira' | 'filtra' | 'releva'
  | 'escribe' | 'ola' | 'orbita' | 'onda';

const REGLAS: [RegExp, Gesto][] = [
  [/atraca/i, 'atraca'],
  [/pestaña|se pulsan|al pulsarl|pasos que se pulsan|por canal/i, 'pestanas'],
  [/en bucle|rota|carrusel/i, 'bucle'],
  [/cuentan|cuenta |cifras/i, 'cuenta'],
  [/gravedad|caen|apiladas|pila/i, 'cae'],
  [/comprime|pierde dos tercios|esfera/i, 'comprime'],
  [/traza|contorno|entinta|raíl|se rehace|dibuj/i, 'traza'],
  [/se escribe|una línea cada|teclea|terminal/i, 'escribe'],
  [/en ola|sube en arco|sigue/i, 'ola'],
  [/giran|3d|cubos/i, 'gira'],
  [/filtra|rejilla|mapa|países|industrias/i, 'filtra'],
  [/se fija|crece|se relevan|al bajar|sube y/i, 'releva'],
  [/globo|alrededor|conecta|sincroniz/i, 'orbita'],
];
const RESERVA: Gesto[] = ['onda', 'orbita', 'ola', 'releva'];

export type Eleccion = { i: number; g: Gesto };
const uso = new Map<Gesto, number>();
const reparto = new Map<string, Eleccion[]>();
for (const p of proyectos) {
  const piezas = (p.mosaico ?? []).flatMap((f) => f.p);
  const cand = piezas.flatMap((z, i) => {
    const gs = REGLAS.filter(([r]) => r.test(`${z.titulo} ${z.pie}`)).map(([, g]) => g);
    return (gs.length ? gs.map((g) => ({ i, g, reserva: false })) : RESERVA.map((g) => ({ i, g, reserva: true })));
  });
  const elegidas: Eleccion[] = [];
  while (elegidas.length < 3) {
    const libres = cand.filter((c) => !elegidas.some((e) => e.i === c.i || e.g === c.g));
    if (!libres.length) break;
    // menos usado en toda la web; luego, uno que cuente su detalle (no de reserva)
    libres.sort((a, b) => (uso.get(a.g) ?? 0) - (uso.get(b.g) ?? 0) || +a.reserva - +b.reserva || a.i - b.i);
    const c = libres[0];
    elegidas.push({ i: c.i, g: c.g });
    uso.set(c.g, (uso.get(c.g) ?? 0) + 1);
  }
  reparto.set(p.slug, elegidas.sort((a, b) => a.i - b.i));
}
export const gestosDe = (slug: string) => reparto.get(slug) ?? [];
