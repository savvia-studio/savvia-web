// Sonido del estudio. RONDA 59 («los sonidos de ambiente del mockup, de internet: sonidos muy naturales»): el ambiente de cada estación es una
// GRABACIÓN de campo (Pixabay, uso libre; ver tools/fuentes-sonido.md) en bucle de 45 s, oída a través del cristal (un paso bajo suave); al cambiar
// de estación, fundido cruzado de 2,5 s. Se carga solo la que suena, y solo con el sonido encendido. Los efectos de interfaz siguen sintetizados.
// · Apagado por defecto. Nace con un gesto (el botón «Sonido») y se recuerda en localStorage.
// · Un AMBIENTE por estación, oído desde dentro, a través del cristal (todo filtrado en grave):
//     primavera = bosque por la mañana, pájaros · verano = prado con grillos · otoño = viento en los árboles · invierno = rachas de viento.
// · Efectos de interfaz: cambio de proyecto (doble clic de «encajado», ~45 ms), sentarse (peso), levantarse.
// Regla (skill web-audio-sfx): solo la CONSTRUCCIÓN de fuentes depende del interruptor;
// el fundido a 0 y la limpieza de temporizadores corren siempre.

type Estacion = 'primavera' | 'verano' | 'otono' | 'invierno';
const CLAVE = 'savvia:son'; // ronda 76: clave nueva: el sonido arranca APAGADO para todos, también para quien lo encendió antes (Eric)
// RONDA 46 · «cuando te sientas, el sonido muy de fondo, como si estuvieses en modo focus con unos cascos puestos: los escuchas, pero más de fondo»:
// sentado, el ambiente pasa por unos CASCOS: paso bajo que cierra de 18 kHz a 480 Hz (se va el aire, quedan el cuerpo y el grave), un pico suave en
// 180 Hz (la presión de la almohadilla) y la mitad de volumen. Entra y sale en el tiempo del viaje de cámara (~1,5 s). Los efectos de interfaz no
// pasan por aquí: siguen nítidos, «dentro» de los cascos.
const CASCOS = { abierto: 18000, cerrado: 480, nivel: 0.42, t: 0.45 };
const NIVEL = 0.035; // ronda 144 · «el sonido de ambiente bastante más bajo por defecto» (antes 0,09)
// // ronda 59: las grabaciones van a −23 LUFS; × 0,09 ≈ −44 LUFS, muy de fondo (Andoni: «que se escuchen menos, más sutiles»; antes 0,2)

export function crearSonido() {
  let ctx: AudioContext | null = null;
  let salida: GainNode, amb: GainNode, viento: BiquadFilterNode, racha: GainNode, cascosLp: BiquadFilterNode, cascosPico: BiquadFilterNode, cascosG: GainNode;
  let enfocado = false;
  let on = false, visible = false, est: Estacion = 'primavera', n = 0;
  const relojes = new Set<number>();
  // RONDA 153 · un solo interruptor para toda la web (el (+) flotante): el ambiente suena salvo que el visitante lo haya apagado ('0'), como los clics
  try { on = localStorage.getItem(CLAVE) !== '0'; } catch {}
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
    amb = ctx.createGain(); amb.gain.value = 1;
    cascosLp = ctx.createBiquadFilter(); cascosLp.type = 'lowpass'; cascosLp.Q.value = 0.5; cascosLp.frequency.value = enfocado ? CASCOS.cerrado : CASCOS.abierto;
    cascosPico = ctx.createBiquadFilter(); cascosPico.type = 'peaking'; cascosPico.frequency.value = 180; cascosPico.Q.value = 0.9; cascosPico.gain.value = enfocado ? 3 : 0;
    cascosG = ctx.createGain(); cascosG.gain.value = enfocado ? CASCOS.nivel : 1;
    amb.connect(cascosLp).connect(cascosPico).connect(cascosG).connect(salida);
    // el CRISTAL: un paso bajo suave (se oye desde dentro, sin perder naturalidad)
    viento = ctx.createBiquadFilter(); viento.type = 'lowpass'; viento.frequency.value = 7000; viento.Q.value = 0.3;
    racha = ctx.createGain(); racha.gain.value = 1;
    viento.connect(racha).connect(amb);
  }

  // — el ambiente grabado —
  const NIVELES: Record<Estacion, number> = { primavera: 1, verano: 0.9, otono: 1, invierno: 0.85 };
  const buffers = new Map<Estacion, Promise<AudioBuffer | null>>();
  const buffer = (e: Estacion) => {
    if (!buffers.has(e)) buffers.set(e, fetch(`/media/sonido/ambiente-${e}.mp3`).then((r) => r.arrayBuffer()).then((a) => ctx!.decodeAudioData(a)).catch(() => null));
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
      f.connect(g).connect(viento); f.start(t, Math.random() * b.duration);
      if (pista) { const v = pista; v.g.gain.cancelScheduledValues(t); v.g.gain.setValueAtTime(v.g.gain.value, t); v.g.gain.linearRampToValueAtTime(0, t + 2.5); v.f.stop(t + 2.6); }
      pista = { e, f, g };
    });
  }

  // RONDA 156 · LA MESA MANDA sobre la RADIO (Radio.astro). Eric: «el sonido del mockup de naturaleza, cuando hagas scroll ahí, tiene que respetarse:
  // se quita la música y empieza el sonido de naturaleza». Cuando el ambiente suena (a la vista y permitido) se avisa con `savvia:mesa` y la radio se
  // funde a 0; al salir, la radio vuelve. (La 1.ª versión hacía lo contrario: callaba la mesa mientras sonaba la radio.)
  let mesa = false;
  const avisarMesa = (si: boolean) => { if (si !== mesa) { mesa = si; dispatchEvent(new CustomEvent('savvia:mesa', { detail: { on: si } })); } };
  // RONDA 175 (Eric: «quitaría los sonidos de naturaleza y dejaría en esa parte la música, y cuando te sientas se baja»): el ambiente grabado ya no
  // suena; la mesa deja sonar la radio y, sentado, se lo dice con `savvia:foco` para que la música baje (Radio.astro). El código del ambiente queda
  // dormido por si vuelve.
  const AMBIENTE = false;
  function tick() {
    limpiar(); // siempre
    if (!AMBIENTE) return;
    avisarMesa(on && visible);
    if (!ctx) return;
    const sonando = on && visible;
    salida.gain.setTargetAtTime(sonando ? NIVEL : 0, ctx.currentTime, sonando ? 1.2 : 0.5); // el fundido a 0 corre SIEMPRE
    if (on) sonarEstacion(); // solo esto va detrás del interruptor
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
  // 29/10 · Eric: «en desktop el sonido de fuuum cuando te sientas no está, ¿no? Podemos incorporarlo»: el peso (120 → 62 Hz, muy bajo) no lo reproducen
  // los altavoces de un portátil. El FUUM es el viaje de la cámara: ruido blanco por un paso banda que sube y vuelve a bajar (el aire que pasa), con la
  // ganancia que hincha y se apaga, en el tiempo del dolly (1,5 s); el peso y el clic quedan al final, cuando la cámara se posa. Al levantarse, al revés y más corto.
  function blanco(seg: number) {
    const b = ctx!.createBuffer(1, Math.ceil(ctx!.sampleRate * seg), ctx!.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  function fuum(t: number, dur: number, f0: number, f1: number, f2: number, v: number, cima = 0.4) {
    const s = ctx!.createBufferSource(); s.buffer = blanco(dur + 0.1);
    const bp = ctx!.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + dur * cima); bp.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = ctx!.createGain(); g.gain.setValueAtTime(0.0006, t); g.gain.exponentialRampToValueAtTime(v, t + dur * cima); g.gain.exponentialRampToValueAtTime(0.0006, t + dur);
    s.connect(bp).connect(g).connect(ctx!.destination); s.start(t); s.stop(t + dur + 0.1);
  }
  function fx(tipo: 'cambio' | 'sentarse' | 'levantarse') {
    if (!on || !ctx) return;
    const t = ctx.currentTime;
    n++;
    if (tipo === 'cambio') { clic(t, 1900, 0.012); clic(t + 0.045, 1350, 0.009); } // «encajado» = doble clic (ronda 38: a la mitad; ronda 59: otra mitad)
    if (tipo === 'sentarse') { fuum(t, 1.3, 160, 1500, 220, 0.22); peso(t + 1.0, 120, 62, 0.028, 0.05); clic(t + 1.16, 900, 0.005); }
    if (tipo === 'levantarse') { fuum(t, 0.9, 700, 1100, 140, 0.12, 0.25); peso(t + 0.5, 70, 110, 0.015, 0.08); }
  }

  // RONDA 152 · el altavoz de la barra manda sobre todo el sonido: el ambiente lo sigue
  addEventListener('savvia:son', (e) => {
    const d = (e as CustomEvent).detail as { on: boolean; origen?: string };
    if (d.origen === 'estudio' || d.on === on) return;
    on = d.on; if (on) asegurar(); tick();
    dispatchEvent(new CustomEvent('savvia:son-estudio', { detail: { on } }));
  });
  const api = {
    activo: () => on,
    alternar() {
      on = !on;
      try { localStorage.setItem(CLAVE, on ? '1' : '0'); } catch {}
      if (on) asegurar();
      tick();
      dispatchEvent(new CustomEvent('savvia:son', { detail: { on, origen: 'estudio' } })); // ronda 152: el altavoz de la barra lo refleja
    },
    estacion(e: string) { est = e as Estacion; tick(); },
    visible(v: boolean) { visible = v; tick(); },
    // sentado = con los cascos puestos (curva exponencial: el filtro cierra deprisa al principio, como al ajustarse los cascos)
    foco(si: boolean) {
      enfocado = si;
      dispatchEvent(new CustomEvent('savvia:foco', { detail: { on: si } })); // ronda 175: sentado, la radio baja
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
