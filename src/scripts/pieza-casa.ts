// La pieza de la home en el portfolio (components/obra/PiezaCasa.astro): la forma que le toca, cargar solo lo que se ve, la ENTRADA al asomar (y otra vez al
// filtrar), el navegador que se pone recto y entero al pasar y el vídeo de la forma visible. Lo de Anteriores.astro (rondas 19, 206 y 290), para piezas que
// cambian de sitio.
import { jugar } from './jugar';

export type Forma = 'navegador' | 'escena' | 'movil' | 'tel';
const FORMAS: Forma[] = ['navegador', 'escena', 'movil', 'tel'];
const sel: Record<Forma, string> = { navegador: '.f-nav', escena: '.f-escena', movil: '.f-movil', tel: '.f-tel' };
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches, conRaton = matchMedia('(hover: hover)').matches;

const formaDe = (pz: HTMLElement) => (FORMAS.find((f) => pz.classList.contains(f)) ?? 'navegador') as Forma;
const visible = (pz: HTMLElement) => pz.querySelector<HTMLElement>(sel[formaDe(pz)])!;

// la forma: sin captura en móvil, nunca en teléfono (va en navegador en el mismo sitio)
export function formar(pz: HTMLElement, forma: Forma) {
  if ((forma === 'movil' || forma === 'tel') && !pz.hasAttribute('data-con-movil')) forma = 'navegador';
  if (formaDe(pz) === forma && pz.dataset.formada) return;
  parar(pz);
  FORMAS.forEach((f) => pz.classList.toggle(f, f === forma));
  pz.classList.remove('interactivo', 'centra');
  pz.dataset.formada = '1';
  cerca.unobserve(pz); cerca.observe(pz);
}
// 27/10 · Eric: «a veces se carga como skeleton: tarjetas de colores con su mockup vacío». Desde que /proyectos va sin páginas se forman las 45 piezas a la
// vez, y cargarlas todas de golpe dejaba en cola las que se ven. Cada pieza descarga lo suyo al acercarse (pantalla y media antes de asomar)
const cerca = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { cerca.unobserve(e.target); cargar(e.target as HTMLElement); } }), { rootMargin: '150% 0px' });

// solo se descargan las imágenes de la forma visible (y, en la mesa, la lámina de la estación de la web)
function cargar(pz: HTMLElement) {
  const v = visible(pz);
  if (!v) return;
  pz.dataset.cargada = '1';
  const est = document.documentElement.dataset.estacion || 'otono';
  v.querySelectorAll<HTMLImageElement>('img[data-img]').forEach((im) => { if (!im.src && (!im.dataset.e || im.dataset.e === est)) im.src = im.dataset.img!; });
  v.querySelectorAll<HTMLVideoElement>('video[data-poster]').forEach((vd) => { if (!vd.poster) vd.poster = vd.dataset.poster!; });
  const quad = v.matches('[data-mesa-quad]') ? v : null;
  if (quad) { quad.style.setProperty('--s', String(quad.offsetWidth / 1672)); ro.observe(quad); }
}
// 29/10 · Eric: «cambio de una estación a otra y se me van a blanco las imágenes»: la lámina de la estación nueva no se había pedido nunca
addEventListener('savvia:estacion', () => document.querySelectorAll<HTMLElement>('[data-pieza-casa][data-cargada]').forEach(cargar));
const ro = new ResizeObserver((es) => es.forEach((e) => (e.target as HTMLElement).style.setProperty('--s', String(e.contentRect.width / 1672))));

// la ENTRADA: al asomar, `.visto` (el CSS descubre la lámina y sube su contenido); `entrar(pz, true)` la repite (al filtrar)
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
export function entrar(pz: HTMLElement, otraVez = false) {
  if (otraVez) { pz.classList.remove('visto'); void pz.offsetWidth; }
  if (!pz.classList.contains('visto')) io.observe(pz);
}

// el VÍDEO de la forma visible: al pasar o enfocar; vuelve al primer fotograma al salir (load(): el póster)
function videoDe(pz: HTMLElement) { return visible(pz)?.querySelector<HTMLVideoElement>('video') ?? null; }
function parar(pz: HTMLElement) {
  pz.querySelectorAll<HTMLVideoElement>('video').forEach((v) => { if (!v.paused || v.currentTime > 0) { v.pause(); v.load(); } });
  pz.classList.remove('suena');
}
function tocar(pz: HTMLElement) {
  const v = videoDe(pz);
  if (!v || reducido) return;
  v.addEventListener('playing', () => pz.classList.add('suena'), { once: true });
  jugar(v);
}

// el NAVEGADOR, al pasar: centrado, recto y entero (la escala que lo lleva al 88 % del ancho de la pieza y el desplazamiento de su esquina)
function centrar(pz: HTMLElement) {
  if (formaDe(pz) !== 'navegador' || reducido) return;
  const mk = pz.querySelector<HTMLElement>('.f-nav')!, lam = pz.querySelector<HTMLElement>('.lamina')!;
  pz.classList.add('interactivo');
  const W = lam.clientWidth, H = lam.clientHeight, s = (W * 0.88) / mk.offsetWidth;
  mk.style.setProperty('--hs', String(s));
  mk.style.setProperty('--hx', ((W - mk.offsetWidth * s) / 2 - mk.offsetLeft).toFixed(1) + 'px');
  mk.style.setProperty('--hy', ((H - mk.offsetHeight * s) / 2 - mk.offsetTop).toFixed(1) + 'px');
  requestAnimationFrame(() => pz.classList.add('centra'));
}
const soltar = (pz: HTMLElement) => { pz.classList.remove('centra'); parar(pz); };

export function preparar(pz: HTMLElement) {
  if (pz.dataset.preparada) return;
  pz.dataset.preparada = '1';
  if (conRaton) {
    pz.addEventListener('pointerenter', () => { centrar(pz); tocar(pz); });
    pz.addEventListener('pointerleave', () => soltar(pz));
    pz.addEventListener('focusin', () => { if (pz.matches(':focus-visible')) { centrar(pz); tocar(pz); } });
    pz.addEventListener('focusout', () => soltar(pz));
    new IntersectionObserver((e) => { if (!e[0].isIntersecting) soltar(pz); }, { threshold: 0 }).observe(pz);
  } else {
    // táctil: el vídeo suena mientras la pieza está a la vista
    new IntersectionObserver((e) => (e[0].isIntersecting ? tocar(pz) : parar(pz)), { threshold: 0.55 }).observe(pz);
  }
}
// si se pierde un pointerleave (scroll con el cursor encima, cambio de pestaña), la pieza vuelve a su sitio igualmente
if (conRaton) setInterval(() => document.querySelectorAll<HTMLElement>('[data-pieza-casa].centra, [data-pieza-casa].suena').forEach((pz) => { if (!pz.matches(':hover, :focus-visible')) soltar(pz); }), 300);
