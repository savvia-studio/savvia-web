// RONDA 66 · la GOTA de los CTA (.btn-primary, global.css): al entrar el puntero, la gota cae donde está (--gx/--gy, en % del botón) y lo llena; al salir
// se recoge hacia donde sale. Con teclado, desde el centro. Delegado en el documento: vale para cualquier botón, también los que se crean después.
import { clic } from './musica';
// RONDA 85 · al mojarse, el CTA da una nota (una quinta arriba de la anterior, en la pentatónica): la web entera tiene toques musicales
// RONDA 98 · «el resto de sonidos, más de elementos de ordenador, estilo teclado, clic» (el jazz ya pone la música): 
// al mojarse, el CTA hace clic
const sonar = () => clic({ vol: 0.04 });
const punto = (b: HTMLElement, e: PointerEvent) => {
  const r = b.getBoundingClientRect();
  b.style.setProperty('--gx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
  b.style.setProperty('--gy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
};
const boton = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>('.btn-primary') : null);
document.addEventListener('pointerover', (e) => { const b = boton(e.target); if (!b || e.pointerType !== 'mouse' || b.contains(e.relatedTarget as Node)) return; punto(b, e); b.classList.add('mojado'); sonar(); });
document.addEventListener('pointerout', (e) => { const b = boton(e.target); if (!b || e.pointerType !== 'mouse' || b.contains(e.relatedTarget as Node)) return; punto(b, e); b.classList.remove('mojado'); });
document.addEventListener('focusin', (e) => { const b = boton(e.target); if (b && b.matches(':focus-visible')) { b.style.setProperty('--gx', '50%'); b.style.setProperty('--gy', '50%'); b.classList.add('mojado'); } });
document.addEventListener('focusout', (e) => { boton(e.target)?.classList.remove('mojado'); });
