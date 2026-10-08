// RONDA 136 · el LÍQUIDO de los CTA primarios (global.css › .btn-primary::before). Fija el punto donde nace la mancha (--gx/--gy, en % del botón):
// al ENTRAR el puntero, donde entra; al SALIR, donde sale (la mancha se recoge hacia allí); con teclado, el centro. Delegado: vale para botones
// que se creen después (set:html, JS).
const SEL = '.btn-primary, [data-liquido]'; // RONDA 137 · también las tarjetas anterior/siguiente del Handbook

function fijar(b: HTMLElement, x: number, y: number) {
  const r = b.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const px = Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100));
  const py = Math.min(100, Math.max(0, ((y - r.top) / r.height) * 100));
  b.style.setProperty('--gx', px.toFixed(1) + '%');
  b.style.setProperty('--gy', py.toFixed(1) + '%');
  // el diámetro justo para llegar a la esquina más lejana (+12 % por el canto irregular): así el líquido tarda lo mismo en llenar desde cualquier sitio
  const lx = Math.max(x - r.left, r.right - x), ly = Math.max(y - r.top, r.bottom - y);
  b.style.setProperty('--gd', (Math.hypot(lx, ly) * 2 * 1.12).toFixed(0) + 'px');
}

function boton(t: EventTarget | null): HTMLElement | null {
  return t instanceof Element ? (t.closest(SEL) as HTMLElement | null) : null;
}

document.addEventListener('pointerover', (e) => {
  const b = boton(e.target);
  if (!b || (e.relatedTarget instanceof Node && b.contains(e.relatedTarget))) return; // movimiento dentro del botón
  fijar(b, e.clientX, e.clientY);
}, { passive: true });

document.addEventListener('pointerout', (e) => {
  const b = boton(e.target);
  if (!b || (e.relatedTarget instanceof Node && b.contains(e.relatedTarget))) return;
  fijar(b, e.clientX, e.clientY);
}, { passive: true });

document.addEventListener('focusin', (e) => {
  const b = boton(e.target);
  if (b && b.matches(':focus-visible')) { const r = b.getBoundingClientRect(); fijar(b, r.left + r.width / 2, r.top + r.height / 2); }
});
