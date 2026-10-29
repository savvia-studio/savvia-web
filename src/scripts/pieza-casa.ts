// La pieza de la home en el portfolio (components/obra/PiezaCasa.astro): la forma que le toca, cargar solo lo que se ve, la ENTRADA al asomar (y otra vez al
// filtrar), el navegador que se pone recto y entero al pasar y el vídeo de la forma visible. Lo de Anteriores.astro (rondas 19, 206 y 290), para piezas que
// cambian de sitio.
import { jugar } from './jugar';
import { rasgarCopia, estaVisible, mascaraPedida } from './revelar';
mascaraPedida(); // la máscara del barrido, lista antes del primer cambio de estación

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
// (30/10 · Andoni: «la página de portfolio tarda mucho en cargar», medido en móvil con 4G lenta: la primera pieza a los 5,6 s) las que se VEN al abrir se
// piden primero y con prioridad; las de más abajo esperan al `load` de la página para no quitarles ancho de banda
let paginaLista = document.readyState === 'complete';
const enEspera: HTMLElement[] = [];
addEventListener('load', () => { paginaLista = true; enEspera.splice(0).forEach((pz) => cargar(pz)); }, { once: true });
const cerca = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const pz = e.target as HTMLElement;
  cerca.unobserve(pz);
  const r = e.boundingClientRect, seVe = r.top < innerHeight && r.bottom > 0;
  if (paginaLista || seVe) cargar(pz, seVe && !paginaLista); else enEspera.push(pz);
}), { rootMargin: '150% 0px' });
// en pantallas estrechas, las láminas de la mesa a 1600 px y más comprimidas (`-m`: de 150–180 KB a 85–95)
const ligera = (u: string) => (innerWidth < 768 && /\/media\/(estudio\/|anteriores\/mesa-movil)/.test(u) && !u.endsWith('-m.webp') ? u.replace(/\.webp$/, '-m.webp') : u);

// solo se descargan las imágenes de la forma visible (y, en la mesa, la lámina de la estación de la web)
function cargar(pz: HTMLElement, prisa = false) {
  const v = visible(pz);
  if (!v) return;
  pz.dataset.cargada = '1';
  const est = document.documentElement.dataset.estacion || 'otono';
  v.querySelectorAll<HTMLImageElement>('img[data-img]').forEach((im) => {
    if (im.src || (im.dataset.e && im.dataset.e !== est)) return;
    if (prisa) im.fetchPriority = 'high';
    // la mesa enseña su pantalla cuando ya está su foto (si no, se veía un móvil o un monitor negros sobre el degradado)
    if (im.dataset.e) im.addEventListener('load', () => v.classList.add('lista'), { once: true });
    im.src = ligera(im.dataset.img!);
  });
  // (30/10) el cartel en WebP (la mitad que el JPG: 8,4 → 3,8 MB en las 122 grabaciones)
  v.querySelectorAll<HTMLVideoElement>('video[data-poster]').forEach((vd) => { if (!vd.poster) vd.poster = vd.dataset.poster!.replace(/\.jpg$/, '.webp'); });
  const quad = v.matches('[data-mesa-quad]') ? v : null;
  if (quad) { quad.style.setProperty('--s', String(quad.offsetWidth / 1672)); ro.observe(quad); }
}
// 29/10 · Eric: «cambio de una estación a otra y se me van a blanco las imágenes»: la lámina de la estación nueva no se había pedido nunca
// 29/10 · Eric: «la foto se puede cambiar como un barrido como en la home, con el mockup fijo?»: lo de Anteriores.astro, la foto VIEJA encima de la
// nueva (y bajo la pantalla, z 2) se rasga desde abajo hasta que no queda nada; al acabar vuelve a su sitio y el CSS la esconde
let estPrev = document.documentElement.dataset.estacion || 'otono';
addEventListener('savvia:estacion', () => {
  const viejo = estPrev; estPrev = document.documentElement.dataset.estacion || 'otono';
  document.querySelectorAll<HTMLElement>('[data-pieza-casa][data-cargada]').forEach((pz) => cargar(pz));
  if (viejo === estPrev) return;
  document.querySelectorAll<HTMLElement>('[data-pieza-casa] .mesa').forEach((m) => {
    const img = m.querySelector<HTMLImageElement>(`.foto-e[data-e="${viejo}"]`);
    if (!img?.src || !m.offsetParent || !estaVisible(m)) return;
    img.style.cssText = 'display:block;position:absolute;inset:0;z-index:1;pointer-events:none';
    // la vieja tapa mientras llega la nueva (si no, se rasgaba hacia un hueco en blanco)
    const nueva = m.querySelector<HTMLImageElement>(`.foto-e[data-e="${estPrev}"]`), ir = () => rasgarCopia(img, { ox: 0.5, oy: 1, ref: m.closest<HTMLElement>('.lamina') ?? undefined, fin: () => { img.style.cssText = ''; } });
    Promise.all([nueva?.src ? nueva.decode().catch(() => {}) : null, mascaraPedida()]).then(ir, ir);
  });
});
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
    // táctil: ver más abajo (`centrada`), un solo vídeo a la vez
    enPantalla.observe(pz);
  }
}

// 30/10 · Andoni: «en portfolio tiene que cargar más rápido; los vídeos no tienen por qué cargar todos: imagen de placeholder y luego ya se activa el
// vídeo». En móvil sonaba el vídeo de cada pieza que pasaba por la pantalla (al bajar el portfolio entero, 19 vídeos y 3,3 MB con 4G lenta, y 400 KB
// antes de tocar nada). Ahora se ve el cartel y solo suena UNO: el de la pieza más centrada, cuando el scroll se ha parado 0,9 s y después del `load`;
// las demás vuelven al cartel y su descarga se corta (`parar` → load()).
const visibles = new Set<HTMLElement>();
const enPantalla = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? visibles.add(e.target as HTMLElement) : (visibles.delete(e.target as HTMLElement), parar(e.target as HTMLElement), sonando === e.target && (sonando = null)))); elegir(); }, { threshold: [0, 0.6] });
let sonando: HTMLElement | null = null, reloj = 0;
function centrada() {
  let mejor: HTMLElement | null = null, d = Infinity;
  visibles.forEach((pz) => {
    const r = pz.getBoundingClientRect(), vis = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
    if (vis < Math.min(r.height, innerHeight) * 0.6) return;
    const dd = Math.abs(r.top + r.height / 2 - innerHeight / 2);
    if (dd < d) { d = dd; mejor = pz; }
  });
  return mejor as HTMLElement | null;
}
function elegir() {
  clearTimeout(reloj);
  reloj = window.setTimeout(() => {
    if (!paginaLista) { addEventListener('load', elegir, { once: true }); return; }
    const pz = centrada();
    if (pz === sonando) return;
    if (sonando) parar(sonando);
    sonando = pz;
    if (pz) tocar(pz);
  }, 900);
}
if (!conRaton) addEventListener('scroll', () => { if (visibles.size) elegir(); }, { passive: true });
// si se pierde un pointerleave (scroll con el cursor encima, cambio de pestaña), la pieza vuelve a su sitio igualmente
if (conRaton) setInterval(() => document.querySelectorAll<HTMLElement>('[data-pieza-casa].centra, [data-pieza-casa].suena').forEach((pz) => { if (!pz.matches(':hover, :focus-visible')) soltar(pz); }), 300);
