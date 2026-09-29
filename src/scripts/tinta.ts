// RONDA 61 · los colores que usan los scripts (líneas del dibujo, la gota, el filo de savia del shader) se LEEN de los tokens de la página en el
// momento de usarlos: así siguen a la paleta activa (html[data-paleta]) sin repetir valores. nombre = 'coral' | 'niebla' | 'cacao' | …
export function rgbDe(nombre: string): [number, number, number] {
  const el = document.createElement('i');
  el.style.color = `var(--color-${nombre})`;
  el.style.display = 'none';
  document.body.append(el);
  const m = getComputedStyle(el).color.match(/[\d.]+/g) || ['0', '0', '0'];
  el.remove();
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}
export function tinta(nombre: string, alfa = 1): string {
  const [r, g, b] = rgbDe(nombre);
  return alfa >= 1 ? `rgb(${r} ${g} ${b})` : `rgb(${r} ${g} ${b} / ${alfa})`;
}
