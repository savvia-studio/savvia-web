// RONDA 83 · giro a la música: el ambiente de cada estación es ahora su MOVIMIENTO de Las cuatro estaciones de Vivaldi (John Harrison con los Wichita State
// University Chamber Players, CC BY-SA 4.0, Wikimedia Commons; ver tools/fuentes-sonido.md): primavera I Allegro · verano III Presto · otoño I Allegro ·
// invierno I Allegro non molto. Entero y en bucle, desde el principio; fundido cruzado al cambiar de estación. Lo de abajo (cristal, cascos, efectos) sigue.
// Sonido del estudio. RONDA 59 («los sonidos de ambiente del mockup, de internet: sonidos muy naturales»): el ambiente de cada estación es una
// GRABACIÓN de campo (Pixabay, uso libre; ver tools/fuentes-sonido.md) en bucle de 45 s, oída a través del cristal (un paso bajo suave); al cambiar
// de estación, fundido cruzado de 2,5 s. Se carga solo la que suena, y solo con el sonido encendido. Los efectos de interfaz siguen sintetizados.
// · Apagado por defecto. Nace con un gesto (el botón «Sonido») y se recuerda en localStorage.
// · Un AMBIENTE por estación, oído desde dentro, a través del cristal (todo filtrado en grave):
//     primavera = bosque por la mañana, pájaros · verano = prado con grillos · otoño = viento en los árboles · invierno = rachas de viento.
// · Efectos de interfaz: cambio de proyecto (doble clic de «encajado», ~45 ms), sentarse (peso), levantarse.
// Regla (skill web-audio-sfx): solo la CONSTRUCCIÓN de fuentes depende del interruptor;
// el fundido a 0 y la limpieza de temporizadores corren siempre.

import { sonidoEncendido, fijarSonido } from './musica';
type Estacion = 'primavera' | 'verano' | 'otono' | 'invierno';
const CLAVE = 'savvia:son'; void CLAVE; // ronda 76: clave nueva: el sonido arranca APAGADO para todos, también para quien lo encendió antes (Eric)
// RONDA 46 · «cuando te sientas, el sonido muy de fondo, como si estuvieses en modo focus con unos cascos puestos: los escuchas, pero más de fondo»:
// sentado, el ambiente pasa por unos CASCOS: paso bajo que cierra de 18 kHz a 480 Hz (se va el aire, quedan el cuerpo y el grave), un pico suave en
// 180 Hz (la presión de la almohadilla) y la mitad de volumen. Entra y sale en el tiempo del viaje de cámara (~1,5 s). Los efectos de interfaz no
// pasan por aquí: siguen nítidos, «dentro» de los cascos.
const CASCOS = { abierto: 18000, cerrado: 480, nivel: 0.42, t: 0.45 };
const NIVEL = 0.14; // ronda 85: «la canción de Vivaldi, más de fondo» (antes 0,3 ≈ −33 LUFS; ahora ≈ −40). Ronda 83: música a −23 LUFS × 0,3 ≈ −33 LUFS: de fondo, pero se reconoce la obra. Antes (ambiente de campo) 0,09.
const NIVEL_CAMPO = 0.09; // ronda 59: las grabaciones van a −23 LUFS; × 0,09 ≈ −44 LUFS, muy de fondo (Andoni: «que se escuchen menos, más sutiles»; antes 0,2)

export function crearSonido() {
  let ctx: AudioContext | null = null;
  let salida: GainNode, amb: GainNode, viento: BiquadFilterNode, racha: GainNode, cascosLp: BiquadFilterNode, cascosPico: BiquadFilterNode, cascosG: GainNode;
  let enfocado = false;
  // RONDA 86 · la MÚSICA (Vivaldi) se apaga aparte, en los altavoces de la mesa (el resto de la web sigue sonando); se recuerda
  // RONDA 99 · «quitamos la música de Vivaldi y dejamos la de la web para esa parte»: Vivaldi ya no suena (ni se descarga)
  let musica = false;
  // RONDA 89 · «que puedas controlar el volumen con algo como el vídeo que te paso» (la rueda): VOLUMEN de 0 a 1 (0,75 = el nivel de siempre); 0 = apagada
  let vol = 0.75; try { const v = parseFloat(localStorage.getItem('savvia:vivaldi-vol') ?? ''); if (v >= 0 && v <= 1) vol = v; } catch {}
  if (vol < 0.02) musica = false; // (ronda 99: Vivaldi apagado de serie)
  const factor = () => Math.pow(vol / 0.75, 2);
  let analizador: AnalyserNode | null = null, muestras: Uint8Array | null = null;
  let on = false, visible = false, est: Estacion = 'primavera', n = 0;
  const relojes = new Set<number>();
  let girando = false;
  // RONDA 85 · el sonido es de toda la web y va ENCENDIDO por defecto (src/scripts/musica.ts); el (+) y el altavoz de la barra comparten el interruptor
  on = sonidoEncendido();
  addEventListener('savvia:son', (e) => { on = (e as CustomEvent).detail.on; if (on) asegurar(); tick(); api.pintar?.(); });
  // Recordado «On», pero sin gesto todavía: el contexto se crea en el primer gesto del visitante.
  if (on) addEventListener('pointerdown', () => on && (asegurar(), tick()), { once: true });

  const limpiar = () => { relojes.forEach(clearTimeout); relojes.clear(); };

  function ruido(seg = 2) {
    const b = ctx!.createBuffer(1, ctx!.sampleRate * seg, ctx!.sampleRate), d = b.getChannelData(0);
    let l = 0;
    for (let i = 0; i < d.length; i++) { l = 0.97 * l + 0.03 * (Math.random() * 2 - 1); d[i] = l * 6; } // ruido pardo: viento, no siseo
    return b;
  }
  function asegurar() {
    if (ctx) { ctx.state === 'suspended' && ctx.resume(); return; }
    ctx = new AudioContext();
    salida = ctx.createGain(); salida.gain.value = 0; salida.connect(ctx.destination);
    // RONDA 85 · el ANALIZADOR: los altavoces de la mesa vibran con lo que de verdad suena
    analizador = ctx.createAnalyser(); analizador.fftSize = 512; salida.connect(analizador); muestras = new Uint8Array(analizador.fftSize);
    amb = ctx.createGain(); amb.gain.value = 1;
    cascosLp = ctx.createBiquadFilter(); cascosLp.type = 'lowpass'; cascosLp.Q.value = 0.5; cascosLp.frequency.value = enfocado ? CASCOS.cerrado : CASCOS.abierto;
    cascosPico = ctx.createBiquadFilter(); cascosPico.type = 'peaking'; cascosPico.frequency.value = 180; cascosPico.Q.value = 0.9; cascosPico.gain.value = enfocado ? 3 : 0;
    cascosG = ctx.createGain(); cascosG.gain.value = enfocado ? CASCOS.nivel : 1;
    amb.connect(cascosLp).connect(cascosPico).connect(cascosG).connect(salida);
    // el CRISTAL: un paso bajo suave (se oye desde dentro, sin perder naturalidad)
    viento = ctx.createBiquadFilter(); viento.type = 'lowpass'; viento.frequency.value = 11000; // ronda 83: la música, casi sin cristal viento.Q.value = 0.3;
    racha = ctx.createGain(); racha.gain.value = 1;
    viento.connect(racha).connect(amb);
  }

  // — el ambiente grabado —
  const NIVELES: Record<Estacion, number> = { primavera: 1, verano: 0.9, otono: 1, invierno: 0.85 };
  const buffers = new Map<Estacion, Promise<AudioBuffer | null>>();
  const buffer = (e: Estacion) => {
    if (!buffers.has(e)) buffers.set(e, fetch(`/media/sonido/vivaldi/${e}.mp3`).then((r) => r.arrayBuffer()).then((a) => ctx!.decodeAudioData(a)).catch(() => null));
    return buffers.get(e)!;
  };
  let pista: { e: Estacion; f: AudioBufferSourceNode; g: GainNode } | null = null, pedida: Estacion | null = null;
  function sonarEstacion() {
    if (!ctx || (pista && pista.e === est) || pedida === est) return;
    const e = (pedida = est);
    buffer(e).then((b) => {
      if (!b || !ctx || est !== e || pedida !== e) return;
      pedida = null;
      const t = ctx.currentTime, g = ctx.createGain(), f = ctx.createBufferSource();
      f.buffer = b; f.loop = true;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(NIVELES[e], t + 2.5);
      f.connect(g).connect(viento); f.start(t); // ronda 83: el movimiento desde el principio (se reconoce la obra)
      if (pista) { const v = pista; v.g.gain.cancelScheduledValues(t); v.g.gain.setValueAtTime(v.g.gain.value, t); v.g.gain.linearRampToValueAtTime(0, t + 2.5); v.f.stop(t + 2.6); }
      pista = { e, f, g };
    });
  }

  let avisado = false;
  function tick() {
    limpiar(); // siempre
    if (!ctx) return;
    const sonando = on && visible && musica;
    if (sonando !== avisado) { avisado = sonando; dispatchEvent(new CustomEvent('savvia:vivaldi', { detail: { sonando } })); } // ronda 98: el jazz de fondo calla mientras suena Vivaldi
    salida.gain.setTargetAtTime(sonando ? NIVEL * factor() : 0, ctx.currentTime, sonando ? (girando ? 0.06 : 1.2) : 0.5); // el fundido a 0 corre SIEMPRE
    if (on && musica) sonarEstacion(); // solo esto va detrás del interruptor
  }

  // — efectos de interfaz —
  function clic(t: number, f: number, v: number) {
    const s = ctx!.createBufferSource(); s.buffer = ruido(0.05);
    const bp = ctx!.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 2.2;
    const g = ctx!.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0006, t + 0.03);
    s.connect(bp).connect(g).connect(ctx!.destination); s.start(t); s.stop(t + 0.05);
  }
  function peso(t: number, f0: number, f1: number, v: number, ataque: number) {
    const o = ctx!.createOscillator(), g = ctx!.createGain(), lp = ctx!.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 260;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + 0.22);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + ataque); g.gain.exponentialRampToValueAtTime(0.0006, t + 0.4);
    o.connect(lp).connect(g).connect(ctx!.destination); o.start(t); o.stop(t + 0.45);
  }
  function fx(tipo: 'cambio' | 'sentarse' | 'levantarse') {
    if (!on || !ctx) return;
    const t = ctx.currentTime;
    n++;
    if (tipo === 'cambio') { clic(t, 1900, 0.012); clic(t + 0.045, 1350, 0.009); } // «encajado» = doble clic (ronda 38: a la mitad; ronda 59: otra mitad)
    if (tipo === 'sentarse') { peso(t, 120, 62, 0.028, 0.05); clic(t + 0.16, 900, 0.005); }
    if (tipo === 'levantarse') peso(t, 70, 110, 0.015, 0.08);
  }

  const api = {
    activo: () => on,
    // el nivel de lo que suena (RMS, 0–1 aprox.), para los altavoces de la mesa
    nivel() { if (!analizador || !muestras || !on) return 0; analizador.getByteTimeDomainData(muestras as any); let s2 = 0; for (let i = 0; i < muestras.length; i++) { const v = (muestras[i] - 128) / 128; s2 += v * v; } return Math.sqrt(s2 / muestras.length); },
    alternar() { fijarSonido(!on); },
    musica: () => musica,
    volumen: () => (musica ? vol : 0),
    // la rueda: fijar el volumen (0 apaga, subir desde 0 enciende); `girando` = respuesta inmediata mientras se gira
    fijarVolumen(v: number) {
      vol = Math.max(0, Math.min(1, v));
      try { localStorage.setItem('savvia:vivaldi-vol', vol.toFixed(3)); } catch {}
      const quiere = vol >= 0.02;
      if (quiere && !on) fijarSonido(true);
      if (quiere !== musica) { musica = quiere; try { localStorage.setItem('savvia:vivaldi', musica ? '1' : '0'); } catch {} }
      if (musica) asegurar();
      girando = true; tick(); girando = false;
    },
    alternarMusica() {
      if (!on) { musica = true; fijarSonido(true); } // con toda la web muda, encender los altavoces enciende el sonido
      else musica = !musica;
      if (musica && vol < 0.02) vol = 0.75;
      try { localStorage.setItem('savvia:vivaldi', musica ? '1' : '0'); } catch {}
      if (musica) asegurar();
      tick();
    }, // avisa con savvia:son (arriba): enciende o apaga aquí y en toda la web
    pintar: undefined as undefined | (() => void),
    estacion(e: string) { est = e as Estacion; tick(); },
    visible(v: boolean) { visible = v; tick(); },
    // sentado = con los cascos puestos (curva exponencial: el filtro cierra deprisa al principio, como al ajustarse los cascos)
    foco(si: boolean) {
      enfocado = si;
      if (!ctx) return;
      const t = ctx.currentTime;
      cascosLp.frequency.cancelScheduledValues(t); cascosLp.frequency.setTargetAtTime(si ? CASCOS.cerrado : CASCOS.abierto, t, si ? CASCOS.t : CASCOS.t * 0.8);
      cascosPico.gain.cancelScheduledValues(t); cascosPico.gain.setTargetAtTime(si ? 3 : 0, t, CASCOS.t);
      cascosG.gain.cancelScheduledValues(t); cascosG.gain.setTargetAtTime(si ? CASCOS.nivel : 1, t, CASCOS.t);
    },
    fx,
  };
  // Sondas para verificar en pruebas.
  (window as any).__sfxCount = () => n;
  (window as any).__sonido = () => ({ on, visible, est, ctx: ctx?.state ?? null, ganancia: ctx ? salida.gain.value : 0, cascos: ctx ? { corte: Math.round(cascosLp.frequency.value), nivel: +cascosG.gain.value.toFixed(3) } : enfocado });
  return api;
}
