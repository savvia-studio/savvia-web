// RONDA 64 · LA TRANSICIÓN ENTRE PÁGINAS, «más notable y más savvia».
// RONDA 68 · «algo más orgánico»: una mancha líquida con gotitas.
// RONDA 71 · una cortina con borde en campana. RONDA 73: sin logotipo.
// RONDA 74 · tres capas de ola (Coral, Nogal, Cacao).
// RONDA 75 · «demasiado larga y no me gusta: dejamos algo como la transición entre secciones y listo». Es la GOTA de `data-sube` (entradas.ts): una sola capa
//   de Cacao con grano asoma por el centro de abajo con el perfil de campana 1/(1+t²)^1,5, se ensancha y lo cubre (0,5 s); en la página nueva, la página asoma
//   igual —una gota desde el centro de abajo que se ensancha— y la Cacao se retira (0,55 s). `clip-path: polygon()` por fotograma.
//   No se intercepta: otra web, anclas, nueva pestaña, modificadores, movimiento reducido.
const SALE = 500, LLEGA = 550;
const esLibro = (p: string) => /^\/metodo(\/[^/]+)?\/?$/.test(p);
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const campana = (t: number) => 1 / Math.pow(1 + t * t, 1.5);
const curva = (k: number) => (k <= 0 ? 0 : k >= 1 ? 1 : k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

function capa() {
  const d = document.createElement('div');
  d.className = 'vt-savia'; d.setAttribute('aria-hidden', 'true'); d.style.clipPath = 'inset(100% 0 0 0)';
  document.body.append(d);
  return d;
}
// la gota en el progreso e (0 → 1): cima que sube desde el pie de la pantalla y se ensancha hasta cubrirla; `dentro` = lo que queda bajo la campana
function gota(e: number, dentro: boolean) {
  const W = innerWidth, H = innerHeight, N = 56, P = e * H * 1.7, w = W * (0.06 + 0.94 * e * e), pts: string[] = [];
  for (let i = 0; i <= N; i++) { const x = (i / N) * W; pts.push(`${x.toFixed(1)}px ${(H + 2 - P * campana((x - W / 2) / w)).toFixed(1)}px`); }
  return dentro ? `polygon(0px ${H + 4}px, ${pts.join(',')}, ${W}px ${H + 4}px)` : `polygon(0px -4px, ${W}px -4px, ${pts.reverse().join(',')})`;
}

// SALE: la gota de Cacao cubre la pantalla
function inundar(ir: () => void) {
  const d = capa(), t0 = performance.now();
  const paso = (ahora: number) => {
    const k = Math.min(1, (ahora - t0) / SALE);
    d.style.clipPath = gota(curva(k), true);
    if (k < 1) requestAnimationFrame(paso);
    else { d.style.clipPath = 'none'; setTimeout(ir, 40); }
  };
  requestAnimationFrame(paso);
}

// LLEGA: la página nueva nace cubierta (html.vt-llega) y asoma como una gota que se ensancha
function escurrir() {
  const raiz = document.documentElement;
  if (!raiz.classList.contains('vt-llega')) return;
  const d = capa();
  d.style.clipPath = 'none';
  raiz.classList.remove('vt-llega');
  if (reducido()) { d.remove(); return; }
  const t0 = performance.now();
  const paso = (ahora: number) => {
    const k = Math.min(1, Math.max(0, (ahora - t0 - 60) / LLEGA));
    d.style.clipPath = gota(curva(k), false);
    if (k < 1) requestAnimationFrame(paso);
    else d.remove();
  };
  requestAnimationFrame(paso);
}
if (document.readyState === 'loading') addEventListener('DOMContentLoaded', escurrir); else escurrir();

addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname && url.search === location.search) return; // anclas y la misma página
  if (reducido()) return;
  // RONDA 133 · dentro del handbook se PASA PÁGINA (transición nativa entre documentos: components/handbook/PasarPagina.astro); sin soporte, la gota
  if (esLibro(location.pathname) && esLibro(url.pathname) && 'CSSViewTransitionRule' in window) return;
  e.preventDefault();
  try { sessionStorage.setItem('savvia:vt', String(Date.now())); } catch {}
  dispatchEvent(new CustomEvent('savvia:salir', { detail: { ms: SALE } })); // la radio se funde mientras la gota cubre (Radio.astro)
  inundar(() => location.assign(url.href));
});

// volver con «atrás» a una página que el navegador guardó entera (bfcache): la capa de savia seguiría puesta
addEventListener('pageshow', (e) => { if ((e as PageTransitionEvent).persisted) document.querySelectorAll('.vt-savia').forEach((d) => d.remove()); });

export {};
