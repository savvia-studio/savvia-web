// LA ESTACIÓN DE LA WEB (ronda 39). Andoni: «que el color oscuro de fondo cambie con las estaciones para que quede más integrado» y «en el hero
// las raíces se sincronizan con cada estación del año». Una sola estación para toda la página: la de hoy (la fija el <head> en
// html[data-estacion]) y la que se elija después (clic en el árbol del hero o botones de estación de Proyectos). Quien la cambia avisa con
// `savvia:estacion`; el árbol, las raíces y el fondo (CSS: --noche) la siguen.
export const EST = ['otono', 'invierno', 'primavera', 'verano'] as const;
export const NOMBRE = ['otoño', 'invierno', 'primavera', 'verano'];
// RONDA 40 · la paleta de Andoni: el fondo oscuro y el color del árbol de cada estación (los mismos de global.css › --noche y --arbol)
// RONDA 132 · «el invierno, en versión clara (la nieve)»: el fondo de invierno es la NIEVE (#ECEFF3); el motor del árbol se funde hacia ella (tinta sobre nieve)
export const NOCHE: [number, number, number][] = [[59, 35, 27], [245, 245, 247], [58, 41, 50], [27, 49, 37]]; // ronda 152: las noches de la paleta nueva
export const ARBOL: [number, number, number][] = [[198, 92, 45], [110, 123, 145], [199, 107, 131], [103, 131, 77]];
const HEX = ['#3b231b', '#f5f5f7', '#3a2932', '#1b3125']; // ronda 152: paletas propias
// la estación de HOY por meses (ronda 40): primavera mar–may · verano jun–ago · otoño sep–nov · invierno dic–feb
export function estacionDeHoy(d = new Date()): number { const m = d.getMonth() + 1; return m >= 3 && m <= 5 ? 2 : m >= 6 && m <= 8 ? 3 : m >= 9 && m <= 11 ? 0 : 1; }

export function estacionActual(): number {
  const i = EST.indexOf(document.documentElement.dataset.estacion as any);
  return i < 0 ? 0 : i;
}
export function fijarEstacion(n: number, origen: string) {
  const i = ((n % 4) + 4) % 4;
  if (EST[i] === document.documentElement.dataset.estacion) return;
  document.documentElement.dataset.estacion = EST[i];
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', HEX[i]);
  dispatchEvent(new CustomEvent('savvia:estacion', { detail: { n: i, origen } }));
}
