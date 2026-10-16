// Texto que se ENTINTA letra a letra con el scroll (ronda 186, el manifiesto de Problemas; ronda 190, la historia del Estudio).
// El marcado: cada letra en un `.c` (arranca al 20 % de tinta desde el CSS con `html.anima`). Empieza cuando el texto asoma al 80 % de la
// pantalla y acaba cuando su final llega al 62 %; una franja blanda de 14 letras.
export function entintar(sec: HTMLElement, texto: HTMLElement, desde = 0.8) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cs = [...texto.querySelectorAll<HTMLElement>('.c')];
  const N = cs.length, BLANDO = 14;
  const ops = new Float32Array(N).fill(0.2);
  let ini = 0, fin = 1;
  const medir = () => {
    const r = texto.getBoundingClientRect(), y = r.top + scrollY;
    ini = y - innerHeight * desde;
    fin = y + r.height - innerHeight * 0.62;
  };
  let pedido = false;
  const pintar = () => {
    pedido = false;
    const p = Math.min(1, Math.max(0, (scrollY - ini) / Math.max(1, fin - ini)));
    const n = p * (N + BLANDO);
    for (let i = 0; i < N; i++) {
      const k = Math.min(1, Math.max(0, (n - i) / BLANDO));
      const o = Math.round((0.2 + 0.8 * k) * 50) / 50;
      if (o !== ops[i]) { ops[i] = o; cs[i].style.opacity = String(o); }
    }
  };
  const pedir = () => { if (!pedido) { pedido = true; requestAnimationFrame(pintar); } };
  const io = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { addEventListener('scroll', pedir, { passive: true }); pedir(); }
    else { removeEventListener('scroll', pedir); pedir(); }
  }, { rootMargin: '20% 0px' });
  const remedir = () => { medir(); pedir(); };
  medir(); io.observe(sec);
  addEventListener('resize', remedir);
  document.fonts?.ready.then(remedir);
  new ResizeObserver(remedir).observe(document.body);
}
