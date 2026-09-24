// Sonido del estudio. Todo sintetizado (Web Audio): cero archivos.
// · Apagado por defecto. Nace con un gesto (el botón «Sonido») y se recuerda en localStorage.
// · Un AMBIENTE por estación, oído desde dentro, a través del cristal (todo filtrado en grave):
//     primavera = brisa + pájaros · verano = aire cálido + chicharra lejana · otoño = rachas + hojas · invierno = viento sordo.
// · Efectos de interfaz: cambio de proyecto (doble clic de «encajado», ~45 ms), sentarse (peso), levantarse.
// Regla (skill web-audio-sfx): solo la CONSTRUCCIÓN de fuentes depende del interruptor;
// el fundido a 0 y la limpieza de temporizadores corren siempre.

type Estacion = 'primavera' | 'verano' | 'otono' | 'invierno';
const CLAVE = 'savvia:sonido';
// RONDA 46 · «cuando te sientas, el sonido muy de fondo, como si estuvieses en modo focus con unos cascos puestos: los escuchas, pero más de fondo»:
// sentado, el ambiente pasa por unos CASCOS: paso bajo que cierra de 18 kHz a 480 Hz (se va el aire, quedan el cuerpo y el grave), un pico suave en
// 180 Hz (la presión de la almohadilla) y la mitad de volumen. Entra y sale en el tiempo del viaje de cámara (~1,5 s). Los efectos de interfaz no
// pasan por aquí: siguen nítidos, «dentro» de los cascos.
const CASCOS = { abierto: 18000, cerrado: 480, nivel: 0.42, t: 0.45 };
const NIVEL = 0.018; // pico del ambiente: deliberadamente bajo (ronda 38: «se escucha demasiado», 0,05 → 0,018)

export function crearSonido() {
  let ctx: AudioContext | null = null;
  let salida: GainNode, amb: GainNode, viento: BiquadFilterNode, racha: GainNode, cascosLp: BiquadFilterNode, cascosPico: BiquadFilterNode, cascosG: GainNode;
  let enfocado = false;
  let on = false, visible = false, est: Estacion = 'primavera', n = 0;
  const relojes = new Set<number>();
  try { on = localStorage.getItem(CLAVE) === '1'; } catch {}
  // Recordado «On», pero sin gesto todavía: el contexto se crea en el primer gesto del visitante.
  if (on) addEventListener('pointerdown', () => on && (asegurar(), tick()), { once: true });

  const espera = (ms: number, f: () => void) => { const id = window.setTimeout(() => { relojes.delete(id); f(); }, ms); relojes.add(id); };
  const limpiar = () => { relojes.forEach(clearTimeout); relojes.clear(); };
  const azar = (a: number, b: number) => a + Math.random() * (b - a);

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
    // Viento: ruido pardo en bucle → paso bajo (el cristal) → ganancia con rachas lentas.
    const src = ctx.createBufferSource(); src.buffer = ruido(3); src.loop = true;
    viento = ctx.createBiquadFilter(); viento.type = 'lowpass'; viento.frequency.value = 600; viento.Q.value = 0.4;
    racha = ctx.createGain(); racha.gain.value = 0.6;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lfoG = ctx.createGain(); lfoG.gain.value = 0.25;
    lfo.connect(lfoG).connect(racha.gain); lfo.start();
    src.connect(viento).connect(racha).connect(amb); src.start();
  }

  // — voces del ambiente —
  function pajaro() {
    const t = ctx!.currentTime, f0 = azar(2600, 4200), notas = Math.round(azar(2, 5));
    for (let i = 0; i < notas; i++) {
      const o = ctx!.createOscillator(), g = ctx!.createGain(), lp = ctx!.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 3800; // a través del cristal
      const t0 = t + i * azar(0.09, 0.16);
      o.frequency.setValueAtTime(f0 * azar(0.9, 1.15), t0);
      o.frequency.exponentialRampToValueAtTime(f0 * azar(1.1, 1.5), t0 + 0.06);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(azar(0.05, 0.11), t0 + 0.015); g.gain.exponentialRampToValueAtTime(0.0008, t0 + 0.09);
      o.connect(lp).connect(g).connect(amb); o.start(t0); o.stop(t0 + 0.12);
    }
  }
  function chicharra() {
    const t = ctx!.currentTime, dur = azar(1.6, 3.2);
    const s = ctx!.createBufferSource(); s.buffer = ruido(1); s.loop = true;
    const bp = ctx!.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = azar(4200, 5200); bp.Q.value = 9;
    const am = ctx!.createGain(), lfo = ctx!.createOscillator(), lg = ctx!.createGain(), g = ctx!.createGain();
    lfo.type = 'square'; lfo.frequency.value = azar(38, 52); lg.gain.value = 0.5; am.gain.value = 0.5;
    lfo.connect(lg).connect(am.gain);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + 0.5); g.gain.linearRampToValueAtTime(0, t + dur);
    s.connect(bp).connect(am).connect(g).connect(amb); s.start(t); lfo.start(t); s.stop(t + dur); lfo.stop(t + dur);
  }
  function hojas() {
    const t = ctx!.currentTime, dur = azar(0.5, 1.1);
    const s = ctx!.createBufferSource(); s.buffer = ruido(1);
    const hp = ctx!.createBiquadFilter(); hp.type = 'bandpass'; hp.frequency.value = azar(1800, 2800); hp.Q.value = 0.8;
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.09, t + dur * 0.4); g.gain.linearRampToValueAtTime(0, t + dur);
    s.connect(hp).connect(g).connect(amb); s.start(t); s.stop(t + dur);
  }
  const RECETA: Record<Estacion, { corte: number; nivel: number; voz?: () => void; cada: [number, number] }> = {
    primavera: { corte: 620, nivel: 0.55, voz: pajaro, cada: [1800, 5200] },
    verano: { corte: 480, nivel: 0.45, voz: () => (Math.random() < 0.7 ? chicharra() : pajaro()), cada: [2600, 6000] },
    otono: { corte: 900, nivel: 0.9, voz: hojas, cada: [1400, 3600] },
    invierno: { corte: 300, nivel: 1.1, cada: [0, 0] },
  };
  function programarVoz() {
    const r = RECETA[est];
    if (!r.voz) return;
    espera(azar(r.cada[0], r.cada[1]), () => { if (on && visible && ctx) { r.voz!(); n++; } programarVoz(); });
  }

  function tick() {
    limpiar(); // siempre
    if (!ctx) return;
    const sonando = on && visible;
    const r = RECETA[est], t = ctx.currentTime;
    salida.gain.setTargetAtTime(sonando ? NIVEL : 0, t, sonando ? 1.2 : 0.5); // el fundido a 0 corre SIEMPRE
    viento.frequency.setTargetAtTime(r.corte, t, 1.5);
    amb.gain.setTargetAtTime(r.nivel, t, 1.5);
    if (sonando) programarVoz(); // solo esto va detrás del interruptor
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
    if (tipo === 'cambio') { clic(t, 1900, 0.025); clic(t + 0.045, 1350, 0.018); } // «encajado» = doble clic (ronda 38: a la mitad)
    if (tipo === 'sentarse') { peso(t, 120, 62, 0.055, 0.05); clic(t + 0.16, 900, 0.01); }
    if (tipo === 'levantarse') peso(t, 70, 110, 0.03, 0.08);
  }

  const api = {
    activo: () => on,
    alternar() {
      on = !on;
      try { localStorage.setItem(CLAVE, on ? '1' : '0'); } catch {}
      if (on) asegurar();
      tick();
    },
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
