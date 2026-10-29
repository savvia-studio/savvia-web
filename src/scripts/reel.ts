// RONDA 307 (18.ª) · Andoni: «un vídeo por cada estación, y en castellano e inglés; cada vez que cambia de estación se cambia, y por idioma».
// El reel de la web: /media/reel/reel-<estación>-<idioma>.mp4 (su miniatura en bucle, reel-mini-…; y los pósters .jpg, su primer fotograma).
const estacion = () => document.documentElement.dataset.estacion || 'otono';
const idioma = () => (document.documentElement.lang || 'es').startsWith('en') ? 'en' : 'es';
export type TipoReel = 'reel' | 'reel-mini';
export const reelArchivo = (tipo: TipoReel, ext = 'mp4') => `/media/reel/${tipo}-${estacion()}-${idioma()}.${ext}`;
// al cambiar de estación, el vídeo que ya estaba cargado pasa al de la nueva estación en el mismo punto (y sigue sonando si sonaba)
export const seguirEstacion = (v: HTMLVideoElement, tipo: TipoReel) => {
  v.poster = reelArchivo(tipo, 'jpg');
  addEventListener('savvia:estacion', () => {
    v.poster = reelArchivo(tipo, 'jpg');
    if (!v.getAttribute('src')) return;
    const t = v.currentTime, sonaba = !v.paused;
    // 30/10 · Andoni: «el vídeo de Neety parpadea al cambiar de estación, en el móvil (Safari y Chrome); en la web no». Si está parado (el del menú, cerrado),
    // ya no se recarga en el acto: en el móvil cargar otro vídeo le quita un instante el descodificador al que suena. Se le quita el archivo y quien lo
    // vuelva a poner en marcha (el menú, la escena) pide el de la estación nueva
    if (!sonaba) { v.removeAttribute('src'); return; }
    v.src = reelArchivo(tipo);
    v.addEventListener('loadedmetadata', () => { v.currentTime = t % (v.duration || 1e9); }, { once: true });
    // con preload="none", Chrome no carga el nuevo hasta que se le pide: si sonaba, se le pide ya (y así llega a loadedmetadata)
    v.play().catch(() => {});
  });
};
