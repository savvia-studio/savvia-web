// RONDA 125 · «en savvia.studio añadir los sonidos de clics» (los de la rama musical, ronda 98): al pasar el ratón por un enlace o un botón, una tecla
// mecánica muy suave; al pulsar, el clic de un ratón. Delegado en el documento (vale para lo que se cree después) y solo con ratón (en táctil, el toque
// ya es el clic). No suena antes del primer gesto (el navegador no deja) ni con el sonido apagado (`savvia:son` = '0').
import { tecla, clic } from './sonidos';
const SEL = 'a[href], button, summary, [role="button"], label[for], input[type="checkbox"], input[type="radio"], select';
let ultimo: Element | null = null, tUlt = 0;
const raton = matchMedia('(hover: hover) and (pointer: fine)');
document.addEventListener('pointerover', (e) => {
  if (e.pointerType !== 'mouse' || !raton.matches) return;
  const el = (e.target as Element | null)?.closest?.(SEL);
  if (!el || el === ultimo) return;
  ultimo = el;
  const t = performance.now(); if (t - tUlt < 70) return; tUlt = t; // al barrer una lista, no una ráfaga
  tecla({ vol: 0.022 });
}, { passive: true });
document.addEventListener('pointerout', (e) => { const el = (e.target as Element | null)?.closest?.(SEL); if (el && el === ultimo && !el.contains(e.relatedTarget as Node | null)) ultimo = null; }, { passive: true });
document.addEventListener('click', (e) => { if ((e.target as Element | null)?.closest?.(SEL)) clic({ vol: 0.045 }); }, { passive: true, capture: true });
