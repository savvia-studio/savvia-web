// 29/10 · Eric (iPhone): «si el vídeo aún no se carga, que se vea el thumbnail»: en iOS el monitor del visor salía NEGRO mientras el vídeo cargaba
// (Safari deja de pintar el `poster` en cuanto empieza a pedir el vídeo y hasta que tiene el primer fotograma). Cada <video> con cartel lo lleva
// también de FONDO, con el mismo encaje que el vídeo (object-fit/position): el fotograma, cuando llega, lo tapa. Vale para todos los vídeos de la
// web (visor, mesa de escritorio y de móvil, piezas, reel…), también los que se insertan después o reciben el cartel tarde (un observador).
const ENCAJE: Record<string, string> = { cover: 'cover', contain: 'contain', fill: '100% 100%', none: 'auto', 'scale-down': 'contain' };

const vestir = (v: HTMLVideoElement) => {
  const p = v.getAttribute('poster');
  if (!p) { if (v.dataset.cartel) { v.style.backgroundImage = ''; delete v.dataset.cartel; } return; }
  if (v.dataset.cartel === p) return;
  v.dataset.cartel = p;
  const cs = getComputedStyle(v);
  v.style.backgroundImage = `url("${p}")`;
  v.style.backgroundSize = ENCAJE[cs.objectFit] ?? 'contain';
  v.style.backgroundPosition = cs.objectPosition;
  v.style.backgroundRepeat = 'no-repeat';
};

document.querySelectorAll('video').forEach(vestir);
new MutationObserver((ms) => {
  for (const m of ms) {
    if (m.type === 'attributes') { if (m.target instanceof HTMLVideoElement) vestir(m.target); continue; }
    m.addedNodes.forEach((n) => {
      if (n instanceof HTMLVideoElement) vestir(n);
      else if (n instanceof Element) n.querySelectorAll('video').forEach(vestir);
    });
  }
}).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['poster'] });
