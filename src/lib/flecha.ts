// RONDA 136 · LA FLECHA DE LA CASA, sutil (Andoni: «no me gustan las flechas, tiene que ser algo mucho más sutil»). Fuera las tres cabezas de la
// ronda 135: una «→» de buena tipografía, astil fino y punta pequeña y abierta, trazo fino sin escalar (global.css › .btn-flecha). 24 × 16.
// AL PASAR (cualquier <a> o <button> que la contenga): RONDA 137, se dibuja (ver abajo). Movimiento reducido: quieta.
// Uso: Astro → <Fragment set:html={flecha()} /> (o <Cta>); JS → el mismo string. Direcciones: 'der' · 'izq' · 'abajo' · 'arriba' · 'fuera' (diagonal, externo).
// RONDA 137 · Andoni: «la flecha se anima de alguna manera al hacer hover, se crea, se dibuja». Misma «→» fina, ahora en TRES trazos con
// pathLength="1" para dibujarla con stroke-dashoffset (global.css › .btn-flecha): al pasar, el ASTIL se traza de izquierda a derecha y después
// la PUNTA se abre desde el vértice hacia las dos alas (~0,5 s, ease-out); al salir se queda dibujada. Movimiento reducido: quieta.
// RONDA 144 · Andoni: «las flechas, como las que hay en la barra de cambiar de proyecto (vista sentado), en todos lados»: un CHEVRÓN («›»)
// de trazo 1,6 con puntas redondas, en 16 × 16. Al pasar se dibuja desde el vértice hacia las dos alas (las mismas clases de la ronda 137).
export const FLECHA_D = 'M6.25 3.5 10.75 8l-4.5 4.5';
const ALAS = ['M10.75 8 6.25 3.5', 'M10.75 8 6.25 12.5']; // del vértice hacia fuera: así «se abre»

export type DirFlecha = 'der' | 'izq' | 'abajo' | 'arriba' | 'fuera';

export function flecha(dir: DirFlecha = 'der', clase = ''): string {
  const cls = ['btn-flecha', dir === 'der' ? '' : dir, clase].filter(Boolean).join(' ');
  return `<svg class="${cls}" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><g class="fl"><path class="fl-ala" pathLength="1" d="${ALAS[0]}"/><path class="fl-ala" pathLength="1" d="${ALAS[1]}"/></g></svg>`;
}
