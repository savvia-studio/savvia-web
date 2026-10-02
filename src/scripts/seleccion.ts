// RONDA 89 · «para toda la web: cuando seleccionas con el ratón un texto y lo destacas, que pase algo musical».
// Seleccionar es PASAR EL DEDO POR LAS CUERDAS: mientras la selección crece o mengua, cada pocas letras suena una cuerda pulsada (pizzicato) que sube por la
// escala pentatónica con lo que llevas seleccionado (y baja si deshaces). Al SOLTAR, del final de la selección suben unas notas (♪ ♫) que se desvanecen,
// y la selección se tiñe de savia (::selection en global.css). El sonido, solo con el interruptor encendido (musica.ts). Movimiento reducido: sin notas que suben.
import { tecla, PENTA } from './musica';

const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
let largoPrev = 0, ultNota = 0, arrastrando = false;
// sube por la escala y, al llegar arriba, baja (ida y vuelta)
const nota = (n: number) => { const L = PENTA.length, k = Math.floor(n / 6) % (2 * L - 2); return PENTA[k < L ? k : 2 * L - 2 - k]; };

document.addEventListener('selectionchange', () => {
  const s = getSelection();
  const largo = s && !s.isCollapsed ? s.toString().length : 0;
  if (!largo) { largoPrev = 0; return; }
  // una cuerda cada 6 letras de diferencia, como mucho cada 55 ms
  const ahora = performance.now();
  if (Math.abs(Math.floor(largo / 6) - Math.floor(largoPrev / 6)) >= 1 && ahora - ultNota > 55) { tecla({ vol: 0.03 }); ultNota = ahora; } // ronda 98: una tecla (antes, una cuerda)
  largoPrev = largo;
});

// RONDA 90 · «al destacar textos con el cursor, que generen ONDAS»: mientras arrastras, cada cuerda que suena abre un anillo pequeño bajo el puntero; al soltar,
// del final de la selección se abren tres ondas grandes (como las de los atriles del hero, que además la reciben si estás encima). Sustituye a las notas
// que subían (ronda 89).
let px = 0, py = 0;
addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
const ondas = (x: number, y: number, grande: boolean) => {
  if (reducido) return;
  const o = document.createElement('div'); o.className = `ondas-seleccion${grande ? ' grande' : ''}`; o.setAttribute('aria-hidden', 'true');
  o.style.left = `${x}px`; o.style.top = `${y}px`; o.innerHTML = grande ? '<i></i><i></i><i></i>' : '<i></i>';
  document.body.appendChild(o); setTimeout(() => o.remove(), grande ? 2600 : 1200);
  if (grande) dispatchEvent(new CustomEvent('savvia:onda', { detail: { x, y, f: 0.8 } }));
};
document.addEventListener('selectionchange', () => { if (arrastrando && getSelection()?.toString().length && performance.now() - ultNota < 20) ondas(px, py, false); });
addEventListener('pointerdown', () => { arrastrando = true; }, { passive: true });
addEventListener('pointerup', (e) => {
  if (!arrastrando) return;
  arrastrando = false;
  requestAnimationFrame(() => {
    const s = getSelection();
    if (!s || s.isCollapsed || s.toString().trim().length < 2) return;
    const rs = s.getRangeAt(0).getClientRects(), r = rs[rs.length - 1];
    const x = r ? (e.clientX > r.left - 40 && e.clientX < r.right + 40 ? e.clientX : r.right) : e.clientX, y = r ? r.top + r.height / 2 : e.clientY;
    ondas(x, y, true);
  });
}, { passive: true });
