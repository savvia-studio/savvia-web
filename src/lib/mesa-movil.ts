// LA PANTALLA DEL MÓVIL DE LA MESA (la lámina `mesa-movil`, 1672 × 941): sus cuatro esquinas medidas en la foto (src/data/mesa-movil.json) y la homografía
// que lleva un rectángulo a ellas (`matrix3d`, con `--s` = ancho de la lámina / 1672, que pone el script). Es el cálculo de obra/PiezaCasa.astro › quad(),
// aparte para usarlo también en la carátula del caso (28/10).
import MESA_MOVIL from '../data/mesa-movil.json';

export const LAM = { w: 1672, h: 941 };

export function mesaMovil(espejo = false) {
  const MM = espejo ? MESA_MOVIL['movil-espejo'] : MESA_MOVIL.movil;
  const Q = MM.caja as [number, number][];
  const x0 = Math.min(Q[0][0], Q[3][0]), y0 = Math.min(Q[0][1], Q[1][1]), x1 = Math.max(Q[1][0], Q[2][0]), y1 = Math.max(Q[2][1], Q[3][1]);
  const W = x1 - x0, H = y1 - y0;
  const n = Q.map(([x, y]) => [(x - x0) / W, (y - y0) / H] as [number, number]);
  const [[a0, b0], [a1, b1], [a2, b2], [a3, b3]] = n;
  const dx1 = a1 - a2, dx2 = a3 - a2, dx3 = a0 - a1 + a2 - a3, dy1 = b1 - b2, dy2 = b3 - b2, dy3 = b0 - b1 + b2 - b3;
  const det = dx1 * dy2 - dx2 * dy1, g = (dx3 * dy2 - dx2 * dy3) / det, h = (dx1 * dy3 - dx3 * dy1) / det;
  const m = { a: a1 - a0 + g * a1, b: a3 - a0 + h * a3, c: a0, d: b1 - b0 + g * b1, e: b3 - b0 + h * b3, f: b0, g, h };
  const r = (v: number) => +v.toFixed(6);
  const matriz = `matrix3d(${r(m.a)}, ${r((m.d * H) / W)}, 0, calc(${r(m.g / W)} / var(--s)), ${r((m.b * W) / H)}, ${r(m.e)}, 0, calc(${r(m.h / H)} / var(--s)), 0, 0, 1, 0, calc(${r(m.c * W)} * var(--s)), calc(${r(m.f * H)} * var(--s)), 0, 1)`;
  const foto = espejo ? 'mesa-movil-espejo' : 'mesa-movil';
  // la caja (en % de la lámina), el vídeo dentro de ella ([x, y, ancho, alto] en %), el centro del móvil (fracción de la lámina) y las imágenes
  return {
    caja: { left: (x0 / LAM.w) * 100, top: (y0 / LAM.h) * 100, width: (W / LAM.w) * 100, height: (H / LAM.h) * 100 },
    video: MM.video as [number, number, number, number],
    cx: (x0 + x1) / 2 / LAM.w,
    cy: (y0 + y1) / 2 / LAM.h,
    matriz,
    foto,
    mascara: `/media/anteriores/${foto}-mascara.png?v=5`,
    cristal: `/media/anteriores/${foto}-cristal.png?v=5`,
  };
}
