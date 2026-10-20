// RONDA 266 · Eric (iPhone 13): el MODO DE BAJO CONSUMO de iOS veta el autoplay aunque el vídeo vaya mudo y `playsinline`: `play()` se rechaza con
// NotAllowedError y el vídeo se quedaba parado para siempre. `jugar(v)` lo intenta y, si se lo niegan, lo deja pendiente: el primer toque, clic o tecla en
// la página (un gesto sí lo permite) lo arranca, si sigue a la vista y quieto. Un solo juego de oyentes para todos los vídeos de la web.
const pendientes = new Map<HTMLVideoElement, () => boolean>();

const aVista = (v: HTMLVideoElement) => {
  const r = v.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(v).visibility !== 'hidden';
};

// el botón de play propio (`.jugar-btn`, global.css): sobre los vídeos de tamaño de pieza; los diminutos (el mini del menú) solo esperan el toque
const botones = new Map<HTMLVideoElement, HTMLButtonElement>();
const quitarBoton = (v: HTMLVideoElement) => { botones.get(v)?.remove(); botones.delete(v); };
const ponerBoton = (v: HTMLVideoElement) => {
  const host = v.parentElement;
  if (!host || botones.has(v) || v.getBoundingClientRect().width < 160) return;
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'jugar-btn';
  b.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Play video' : 'Reproducir vídeo');
  b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.8v16.4a1 1 0 0 0 1.5.86l13.6-8.2a1 1 0 0 0 0-1.72L7.5 2.94A1 1 0 0 0 6 3.8Z"/></svg>';
  b.addEventListener('click', (e) => { e.stopPropagation(); v.play().catch(() => {}); });
  v.addEventListener('playing', () => quitarBoton(v), { once: true });
  host.append(b); botones.set(v, b);
};

const gesto = () => {
  const lista = [...pendientes];
  pendientes.clear();
  ['touchend', 'click', 'keydown'].forEach((e) => removeEventListener(e, gesto));
  lista.forEach(([v, quiere]) => { if (v.isConnected && v.paused && quiere()) v.play().catch(() => {}); });
};

export function jugar(v: HTMLVideoElement, quiere: () => boolean = () => aVista(v)) {
  const p = v.play();
  if (!p) return;
  p.catch((err) => {
    if (err?.name !== 'NotAllowedError') return;
    if (!pendientes.size) ['touchend', 'click', 'keydown'].forEach((e) => addEventListener(e, gesto, { passive: true }));
    pendientes.set(v, quiere);
    ponerBoton(v);
  });
}
