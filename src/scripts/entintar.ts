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

// RONDA 209 (savvia agentic, home) · FRASE A FRASE, atado al scroll: cada <p> sale de opacidad 0 a 1 y SOLO ENTONCES se entinta letra a letra;
// luego la siguiente. Marcado: cada letra en un `.c` dentro de su <p>; el CSS de la página pone `html.anima p { opacity: 0 }` y `.c { opacity: 0.2 }`.
// Ronda 296: lo usa también el Manifiesto (la misma cortina que la home). `alPintar` recibe el avance del ENTINTADO de cada <p> (0 → 1, de
// su primera letra a la última): el Manifiesto dibuja con él la rúbrica de la firma a la vez que se entinta «Eric y Andoni». `data-lento="n"` en
// un <p> le da n veces su recorrido de scroll (la firma, tan corta, pasaba en un suspiro).
export function entintarFrases(texto: HTMLElement, alPintar?: (avance: number[]) => void) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ps = [...texto.querySelectorAll<HTMLElement>('p')];
  const grupos = ps.map((p) => [...p.querySelectorAll<HTMLElement>('.c')]);
  const FADE = 40, BLANDO = 10;
  const lentos = ps.map((p) => Number(p.dataset.lento) || 1);
  const pesos = grupos.map((g, i) => (FADE + g.length + BLANDO) * lentos[i]);
  const total = pesos.reduce((a, b) => a + b, 0);
  const ops = grupos.map((g) => new Float32Array(g.length).fill(0.2));
  const opP = ps.map(() => -1);
  let ini = 0, fin = 1, pedido = false;
  // Histéresis: al subir, el deshacer espera a que el texto haya bajado ~25 % de la pantalla (el avance se congela ese tramo).
  let off = 0, ult = scrollY;
  const alScroll = () => {
    const d = scrollY - ult; ult = scrollY;
    const gap = innerHeight * 0.03;
    off = d < 0 ? Math.min(gap, off - d) : Math.max(0, off - d * 0.5);
    pedir();
  };
  // se mide del primer párrafo al último, no la caja: el Manifiesto lleva un relleno enorme arriba (el hueco de las raíces)
  const medir = () => {
    if (!ps.length) return;
    const y = ps[0].getBoundingClientRect().top + scrollY, y2 = ps[ps.length - 1].getBoundingClientRect().bottom + scrollY;
    ini = y - innerHeight * 0.8;
    fin = y2 - innerHeight * 0.8;
  };
  const pintar = () => {
    pedido = false;
    const t = Math.min(1, Math.max(0, (scrollY + off - ini) / Math.max(1, fin - ini))) * total;
    let base = 0;
    const avance: number[] = [];
    grupos.forEach((g, i) => {
      const l = (t - base) / lentos[i];
      base += pesos[i];
      const u = Math.min(1, Math.max(0, l / FADE)), f = Math.round(u * u * u * (u * (6 * u - 15) + 10) * 1000) / 1000; // smootherstep
      if (f !== opP[i]) { opP[i] = f; ps[i].style.opacity = String(f); }
      const n = Math.max(0, l - FADE);
      avance.push(Math.min(1, n / (g.length + BLANDO)));
      for (let k = 0; k < g.length; k++) {
        const o = Math.round((0.2 + 0.8 * Math.min(1, Math.max(0, (n - k) / BLANDO))) * 50) / 50;
        if (o !== ops[i][k]) { ops[i][k] = o; g[k].style.opacity = String(o); }
      }
    });
    alPintar?.(avance);
  };
  const pedir = () => { if (!pedido) { pedido = true; requestAnimationFrame(pintar); } };
  const remedir = () => { medir(); pedir(); };
  addEventListener('scroll', alScroll, { passive: true });
  addEventListener('resize', remedir);
  document.fonts?.ready.then(remedir);
  new ResizeObserver(remedir).observe(document.body);
  remedir();
}
