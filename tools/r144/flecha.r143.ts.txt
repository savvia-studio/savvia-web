// RONDA 136 · LA FLECHA DE LA CASA, sutil (Andoni: «no me gustan las flechas, tiene que ser algo mucho más sutil»). Fuera las tres cabezas de la
// ronda 135: una «→» de buena tipografía, astil fino y punta pequeña y abierta, trazo fino sin escalar (global.css › .btn-flecha). 24 × 16.
// AL PASAR (cualquier <a> o <button> que la contenga): RONDA 137, se dibuja (ver abajo). Movimiento reducido: quieta.
// Uso: Astro → <Fragment set:html={flecha()} /> (o <Cta>); JS → el mismo string. Direcciones: 'der' · 'izq' · 'abajo' · 'arriba' · 'fuera' (diagonal, externo).
// RONDA 137 · Andoni: «la flecha se anima de alguna manera al hacer hover, se crea, se dibuja». Misma «→» fina, ahora en TRES trazos con
// pathLength="1" para dibujarla con stroke-dashoffset (global.css › .btn-flecha): al pasar, el ASTIL se traza de izquierda a derecha y después
// la PUNTA se abre desde el vértice hacia las dos alas (~0,5 s, ease-out); al salir se queda dibujada. Movimiento reducido: quieta.
export const FLECHA_D =
  'M3.5 8H19.75' + // el astil
  'M15.75 4.25 19.75 8l-4 3.75'; // la punta, pequeña y abierta (la forma de siempre, para quien la pinte en un lienzo)
const ASTIL = 'M3.5 8H19.75';
const ALAS = ['M19.75 8 15.75 4.25', 'M19.75 8 15.75 11.75']; // del vértice hacia fuera: así «se abre»

export type DirFlecha = 'der' | 'izq' | 'abajo' | 'arriba' | 'fuera';

export function flecha(dir: DirFlecha = 'der', clase = ''): string {
  const cls = ['btn-flecha', dir === 'der' ? '' : dir, clase].filter(Boolean).join(' ');
  const cuerpo = `<g class="fl"><path class="fl-astil" pathLength="1" d="${ASTIL}"/><path class="fl-ala" pathLength="1" d="${ALAS[0]}"/><path class="fl-ala" pathLength="1" d="${ALAS[1]}"/></g>`;
  if (dir === 'abajo' || dir === 'arriba') return `<svg class="${cls}" viewBox="0 0 16 24" aria-hidden="true" focusable="false"><g transform="translate(16 0) rotate(90)">${cuerpo}</g></svg>`;
  return `<svg class="${cls}" viewBox="0 0 24 16" aria-hidden="true" focusable="false">${cuerpo}</svg>`;
}
