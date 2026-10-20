// RONDA 266 · Eric (iPhone 13): el MODO DE BAJO CONSUMO de iOS veta el autoplay aunque el vídeo vaya mudo y `playsinline`: `play()` se rechaza con
// NotAllowedError y el vídeo se quedaba parado para siempre. `jugar(v)` lo intenta y, si se lo niegan, lo deja pendiente: el primer toque, clic o tecla en
// la página (un gesto sí lo permite) lo arranca, si sigue a la vista y quieto. Un solo juego de oyentes para todos los vídeos de la web.
const pendientes = new Map<HTMLVideoElement, () => boolean>();

const aVista = (v: HTMLVideoElement) => {
  const r = v.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(v).visibility !== 'hidden';
};

const gesto = () => {
  const lista = [...pendientes]; console.log('EVT gesto lista=' + lista.map(([v, q]) => v.paused + '/' + q() + '/' + v.isConnected).join());
  pendientes.clear();
  ['touchend', 'click', 'keydown'].forEach((e) => removeEventListener(e, gesto));
  lista.forEach(([v, quiere]) => { if (v.isConnected && v.paused && quiere()) v.play().catch(() => {}); });
};

export function jugar(v: HTMLVideoElement, quiere: () => boolean = () => aVista(v)) {
  const p = v.play();
  if (!p) return;
  p.catch((err) => {
    console.log('EVT rechazo ' + err?.name); if (err?.name !== 'NotAllowedError') return;
    if (!pendientes.size) ['touchend', 'click', 'keydown'].forEach((e) => addEventListener(e, gesto, { passive: true }));
    pendientes.set(v, quiere);
  });
}
