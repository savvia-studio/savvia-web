// RONDA 125 · traído de la rama musical (src/scripts/musica.ts) para los CLICS de la web y los sonidos de savvia agentic. Suena salvo que el visitante
// haya apagado el sonido (`savvia:son` = '0'); el ambiente de Proyectos sigue con su propia regla (sonido-estudio.ts: solo con '1').
// RONDA 83 · EL SONIDO DE LA MÚSICA: un piano pequeño sintetizado (Web Audio, sin archivos): cada nota son cuatro parciales con su caída, un golpe
// de macillo muy corto y una sala (reverberación generada).
// RONDA 85 · «poner sonido a la web y que tenga toques musicales a lo largo de ella; jugar mucho con el sonido»: el sonido es de TODA la web, ENCENDIDO por
// defecto (Andoni; revierte la regla de la ronda 76, «el sonido encendido al llegar»: aquí no suena nada hasta el primer gesto, que en la home es tocar el
// acorde de la carga). Se apaga con el altavoz de la barra y se recuerda (localStorage «savvia:son» = '0'). Quien lo cambia avisa con `savvia:son`.
// Instrumentos: `tocar` (piano) · `pizzicato` (violín pulsado) · `diapason` (la del diapasón, larga) · `arpegio` (arpa) · `papel` (el troquel al rasgarse).
let ctx: AudioContext | null = null, sala: ConvolverNode | null = null, salida: GainNode | null = null;

export const sonidoEncendido = () => { try { return localStorage.getItem('savvia:son') !== '0'; } catch { return true; } };
export function fijarSonido(on: boolean) {
  try { localStorage.setItem('savvia:son', on ? '1' : '0'); } catch {}
  if (on) audio();
  dispatchEvent(new CustomEvent('savvia:son', { detail: { on } }));
}

export const audio = () => {
  if (!ctx) {
    const A = window.AudioContext || (window as any).webkitAudioContext;
    if (!A) return null;
    ctx = new A() as AudioContext;
    salida = ctx.createGain(); salida.gain.value = 0.9; salida.connect(ctx.destination);
    // la SALA: ruido que se apaga en 2,4 s (una sala de conciertos pequeña), mezclado al 28 %
    // (30/10 · «menú, problemas de rendimiento al abrir y cerrar» en móvil: este ruido se calculaba entero en el primer clic, ~300 ms con la CPU de un móvil
    // medio, y el primer clic suele ser abrir el menú) se rellena a trozos fuera del clic; hasta tenerlo, la sala no suena
    const n = Math.round(ctx.sampleRate * 2.4), ir = ctx.createBuffer(2, n, ctx.sampleRate), d0 = ir.getChannelData(0), d1 = ir.getChannelData(1);
    sala = ctx.createConvolver();
    const conv = sala;
    let i = 0;
    const trozo = () => {
      const fin = Math.min(n, i + 16384);
      for (; i < fin; i++) { const e = Math.pow(1 - i / n, 3.2); d0[i] = (Math.random() * 2 - 1) * e; d1[i] = (Math.random() * 2 - 1) * e; }
      if (i < n) setTimeout(trozo, 16); else conv.buffer = ir;
    };
    setTimeout(trozo, 400);
    const mezcla = ctx.createGain(); mezcla.gain.value = 0.28; sala.connect(mezcla).connect(salida);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};
// el primer gesto del visitante despierta el audio (el navegador no deja sonar antes)
// RONDA 112 · «el sonido, que se active en el momento en que haces clic en el juego inicial»: Safari solo cuenta como gesto el clic, el soltar o la tecla
// (el pointerdown no): se escucha a todos y se reintenta hasta que el audio corre de verdad
const despertar = () => { if (!sonidoEncendido()) return; const c = audio(); if (c && c.state === 'running') ['pointerdown', 'pointerup', 'click', 'keydown', 'touchend'].forEach((ev) => removeEventListener(ev, despertar, true)); };
['pointerdown', 'pointerup', 'click', 'keydown', 'touchend'].forEach((ev) => addEventListener(ev, despertar, { capture: true, passive: true }));

// RONDA 86 · el PULSO de la web: cada nota que suena avisa (los puntos del hero, por ejemplo, lo recogen)
let ultimoGolpe = 0, fuerzaGolpe = 0;
export const golpe = () => { const t = performance.now(); return fuerzaGolpe * Math.exp(-(t - ultimoGolpe) / 380); };
const avisar = (vol: number) => { ultimoGolpe = performance.now(); fuerzaGolpe = Math.min(1, golpe() + vol * 5); };
// RONDA 97 · para el jazz de fondo (src/scripts/jazz.ts): la salida, la sala y el latido son los mismos que los del piano
export const latido = (vol: number) => avisar(vol);
export const bus = () => (ctx && salida && sala ? { ctx, salida, sala } : null);
export const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);
// ¿se puede sonar ahora? (encendido y con el audio ya despierto por un gesto)
const listo = (forzar = false) => { if (!forzar && !sonidoEncendido()) return null; const c = ctx ?? (forzar ? audio() : null); return c && c.state === 'running' ? c : forzar ? c : null; };

// una nota de piano: `vol` 0–1, `dur` en s, `cuando` = retraso en s. `forzar`: suena aunque el sonido esté apagado (solo la carga: la toca el visitante)
export function tocar(midi: number, { vol = 0.16, dur = 2.6, cuando = 0, forzar = false } = {}) {
  const c = listo(forzar);
  if (!c || !salida || !sala) return;
  const t = c.currentTime + 0.01 + cuando, f = hz(midi);
  setTimeout(() => avisar(vol), cuando * 1000);
  const nota = c.createGain();
  nota.gain.setValueAtTime(0, t);
  nota.gain.linearRampToValueAtTime(vol, t + 0.006);
  nota.gain.exponentialRampToValueAtTime(vol * 0.35, t + 0.35);
  nota.gain.exponentialRampToValueAtTime(0.0005, t + dur);
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 0.4;
  lp.frequency.setValueAtTime(Math.min(9000, f * 9), t); lp.frequency.exponentialRampToValueAtTime(Math.max(500, f * 2.2), t + dur * 0.7);
  nota.connect(lp); lp.connect(salida); lp.connect(sala);
  const PARCIALES: [number, number, number][] = [[1, 1, 1], [2, 0.38, 0.62], [3, 0.14, 0.45], [4.02, 0.06, 0.32]];
  for (const [m, g, d] of PARCIALES) {
    const o = c.createOscillator(), og = c.createGain();
    o.type = 'sine'; o.frequency.value = f * m; o.detune.value = (Math.random() - 0.5) * 4;
    og.gain.setValueAtTime(g, t); og.gain.exponentialRampToValueAtTime(0.0005, t + dur * d);
    o.connect(og).connect(nota); o.start(t); o.stop(t + dur + 0.05);
  }
  const n = Math.round(c.sampleRate * 0.02), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
  const s = c.createBufferSource(), bp = c.createBiquadFilter(), sg = c.createGain();
  s.buffer = b; bp.type = 'bandpass'; bp.frequency.value = Math.min(6000, f * 4); bp.Q.value = 0.8; sg.gain.value = vol * 0.5;
  s.connect(bp).connect(sg).connect(salida); s.start(t);
}

// VIOLÍN PULSADO (pizzicato): una cuerda corta con cuerpo de madera (paso banda) y caída rápida
export function pizzicato(midi: number, { vol = 0.12, cuando = 0 } = {}) {
  const c = listo(); if (!c || !salida || !sala) return;
  const t = c.currentTime + 0.01 + cuando, f = hz(midi);
  const o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), cuerpo = c.createBiquadFilter();
  o.type = 'triangle'; o.frequency.value = f; o2.type = 'sawtooth'; o2.frequency.value = f * 1.003;
  const g2 = c.createGain(); g2.gain.value = 0.18;
  cuerpo.type = 'bandpass'; cuerpo.frequency.value = Math.min(3200, f * 3); cuerpo.Q.value = 1.2;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0005, t + 0.55);
  o.connect(g); o2.connect(g2).connect(g); g.connect(cuerpo); cuerpo.connect(salida); cuerpo.connect(sala);
  o.start(t); o2.start(t); o.stop(t + 0.6); o2.stop(t + 0.6);
}

// EL DIAPASÓN: un la 440 casi puro, largo, con un batido mínimo (los dos brazos)
export function diapason({ vol = 0.08, dur = 3.2 } = {}) {
  const c = listo(); if (!c || !salida || !sala) return;
  const t = c.currentTime + 0.01, g = c.createGain();
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0005, t + dur);
  g.connect(salida); g.connect(sala);
  [440, 440.8, 880 * 2.76].forEach((f, i) => { const o = c.createOscillator(), og = c.createGain(); o.frequency.value = f; og.gain.value = i === 2 ? 0.04 : 0.5; og.gain.exponentialRampToValueAtTime(0.0005, t + (i === 2 ? 0.15 : dur)); o.connect(og).connect(g); o.start(t); o.stop(t + dur + 0.05); });
}

// ARPA: las notas una tras otra (hacia arriba o hacia abajo)
export function arpegio(notas: number[], { vol = 0.07, paso = 0.045, dur = 1.8 } = {}) {
  notas.forEach((m, i) => tocar(m, { vol, dur, cuando: i * paso }));
}

// EL PAPEL que se rasga (el troquel de la entrada): ruido filtrado, a tirones
export function papel({ vol = 0.12, dur = 0.42 } = {}) {
  const c = listo(); if (!c || !salida) return;
  const t = c.currentTime + 0.01, n = Math.round(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) { const tiron = Math.sin((i / n) * Math.PI * 9) > 0.1 ? 1 : 0.35; d[i] = (Math.random() * 2 - 1) * tiron * (1 - i / n); }
  const s = c.createBufferSource(), hp = c.createBiquadFilter(), g = c.createGain();
  s.buffer = b; hp.type = 'highpass'; hp.frequency.value = 1800; g.gain.value = vol;
  s.connect(hp).connect(g).connect(salida); s.start(t);
}

// una escala pentatónica (re mayor) para los toques sueltos: menú, CTA… nunca desafina con nada
export const PENTA = [62, 64, 66, 69, 71, 74, 76, 78, 81, 83];

// RONDA 98 · «el resto de sonidos al hacer hover, más de elementos de ordenador, estilo teclado, clic» (con el jazz de fondo, las notas sueltas sobraban).
// TECLA: una tecla mecánica (el chasquido del interruptor, el golpe sordo de la tecla al tocar fondo y, 60–90 ms después, la subida), cada una algo distinta.
// CLIC: el de un ratón (pulsar y soltar, secos y agudos).
const golpeRuido = (c: AudioContext, t: number, f: number, q: number, vol: number, dur: number, tipo: BiquadFilterType = 'bandpass') => {
  const n = Math.round(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
  const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  s.buffer = b; fl.type = tipo; fl.frequency.value = f; fl.Q.value = q; g.gain.value = vol;
  s.connect(fl).connect(g).connect(salida!); s.start(t);
};
export function tecla({ vol = 0.05, cuando = 0, fuerte = false } = {}) {
  const c = listo(); if (!c || !salida) return;
  const t = c.currentTime + 0.005 + cuando, v = vol * (0.75 + Math.random() * 0.5), f = 2600 + Math.random() * 1800;
  setTimeout(() => avisar(vol * 0.3), cuando * 1000);
  golpeRuido(c, t, f, 1.6, v * 0.9, 0.012); // el chasquido
  const o = c.createOscillator(), g = c.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(fuerte ? 150 : 210 + Math.random() * 60, t); o.frequency.exponentialRampToValueAtTime(90, t + 0.05);
  g.gain.setValueAtTime(v * (fuerte ? 0.9 : 0.6), t); g.gain.exponentialRampToValueAtTime(0.0004, t + 0.06); o.connect(g).connect(salida); o.start(t); o.stop(t + 0.07);
  golpeRuido(c, t, 900, 0.8, v * 0.5, 0.03, 'lowpass'); // el fondo de la tecla
  golpeRuido(c, t + 0.06 + Math.random() * 0.03, f * 1.15, 2, v * 0.35, 0.008); // la subida
}
export function clic({ vol = 0.045, cuando = 0 } = {}) {
  const c = listo(); if (!c || !salida) return;
  const t = c.currentTime + 0.005 + cuando;
  golpeRuido(c, t, 4200, 3, vol, 0.006, 'highpass');
  golpeRuido(c, t + 0.07, 5200, 3, vol * 0.55, 0.005, 'highpass');
}
// RONDA 109 · POSAR: una ficha que cae sobre la mesa (el golpe sordo del papel grueso), para las cartas de la partitura
export function posar({ vol = 0.04, cuando = 0 } = {}) {
  const c = listo(); if (!c || !salida) return;
  const t = c.currentTime + 0.005 + cuando, v = vol * (0.8 + Math.random() * 0.4);
  golpeRuido(c, t, 520 + Math.random() * 200, 0.9, v, 0.05, 'lowpass');
  golpeRuido(c, t + 0.004, 3200, 1.2, v * 0.35, 0.03);
}
// teclear: n teclas a ritmo de alguien que escribe (con alguna pausa)
export function teclear(n: number, { vol = 0.04, ritmo = 0.075 } = {}) {
  let t = 0; for (let i = 0; i < n; i++) { tecla({ vol, cuando: t, fuerte: i === n - 1 }); t += ritmo * (0.6 + Math.random() * 0.9) + (Math.random() < 0.12 ? 0.12 : 0); }
}

// RONDA 114 · EL PINCEL sobre el papel: un roce de cerdas (ruido en banda, sin golpe), más largo y más grave cuanto más cargado va
export function pincel({ vol = 0.03, dur = 0.5, mojado = 0.5 } = {}) {
  const c = listo(); if (!c || !salida) return;
  const t = c.currentTime + 0.01, n = Math.round(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (0.7 + 0.3 * Math.sin(i * 0.004 + Math.random() * 0.2));
  const s = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain();
  s.buffer = b; bp.type = 'bandpass'; bp.frequency.setValueAtTime(3400 - mojado * 1800, t); bp.frequency.linearRampToValueAtTime(2200 - mojado * 900, t + dur); bp.Q.value = 0.7;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + dur * 0.18); g.gain.linearRampToValueAtTime(vol * 0.6, t + dur * 0.7); g.gain.linearRampToValueAtTime(0, t + dur);
  s.connect(bp).connect(g).connect(salida); s.start(t); s.stop(t + dur + 0.02);
}
