// RONDA 97 · EL JAZZ DE FONDO. Andoni: «que tengamos una música de fondo estilo jazz calmada y que el ASCII reaccione a ella con pulsos».
// Sintetizado aquí (Web Audio, sin archivos: sin licencias y sabiendo exactamente cuándo cae cada pulso): un trío de balada a 68 BPM con swing.
// · PIANO ELÉCTRICO (FM: portadora + moduladora 1:1 con el índice cayendo, un trémolo lento) que acompaña con acordes de cuatro voces.
// · CONTRABAJO que camina (fundamental, nota del acorde, otra, y una de paso cromática hacia el acorde siguiente).
// · ESCOBILLAS: el plato con el ritmo de swing («ding, ding-ga, ding, ding-ga») y el barrido en el 2 y el 4.
// · La armonía es la de «When the Saints Go Marching In» (tradicional, dominio público), rearmonizada en balada, la misma canción que toca el visitante en la
//   carga; cada dos vueltas el piano cita su melodía, arriba y suave (la mente la hila).
// LOS PULSOS: un solo reloj (performance.now) programa el audio con antelación y avisa a la web en cada tiempo (`savvia:pulso`), suene o no (con el sonido
// apagado, la web sigue latiendo a compás). `nivel()` da lo que suena de verdad (analizador) o, en silencio, la envolvente del tiempo.
// Se calla cuando la escena de Proyectos (Vivaldi) está a la vista, con el altavoz de la barra y con la pestaña oculta.
// RONDA 98 · «me gusta bastante el estilo del vídeo» (ascii.fm, «focus: lo-fi beat, 72–75 bpm»): el trío se acerca al LO-FI: 74 BPM con menos swing, un
// bombo y una caja apagada, el crepitar de un vinilo y todo pasado por un paso bajo cálido. Y da BANDAS (`bandas()`): cinco envolventes, una por voz (bajo ·
// acorde grave · acorde agudo · melodía · platos), hechas de los propios golpes programados (suene o no): con ellas se encienden los colores del ASCII.
// «Cuando suenan las cuatro estaciones, el jazz a 0»: calla mientras Vivaldi suena de verdad (`savvia:vivaldi`).
// RONDA 99 · «quitamos Vivaldi y dejamos la de la web para esa parte» (sonido-estudio ya no carga Vivaldi; su ecualizador da el volumen de ESTE jazz) ·
// «en la partitura, la música de la web se para y esa partitura genera una canción del estilo pero diferente; cuando sigues, vuelve la de la web»: dos TEMAS.
// `web` (The Saints, 74 BPM) y `partitura` (en fa, 92 BPM: el tempo de la propia partitura, con su reloj alineado al de su bucle) que SE MONTA por capas
// mientras la partitura se escribe: platos y bombo → bajo → acordes → la melodía, que se genera (pentatónica de fa, la misma en cada vuelta del bucle).
// Y la carga toca con este mismo piano eléctrico (`rhodesSuelto`), a su tempo y en su tono: lo que tocas es el principio de lo que suena después.
// RONDA 100 · «la música, más de fondo, que no tape los clics» (VOL 0,32 → 0,18) · «al llegar a las cuatro estaciones, que la música cambie, una por estación,
// según su mood» (`temaEstacion`): primavera en sol, ligera y luminosa (86 BPM) · verano, bossa en re, recta y cálida (98) · otoño, el lo-fi de la web (The Saints,
// 74) · invierno, en la menor, lenta y desnuda (60, sin batería, el bajo en redondas) · «en la partitura me gustaba que los efectos generasen su propia
// partitura; al estilo de ahora; muteamos la música de fondo y luego se recupera»: el jazz calla mientras la partitura está a la vista y sus efectos suenan con
// estos mismos instrumentos (`rhodesSuelto`, `bajoSuelto`, `platoSuelto`, `bomboSuelto`). La ronda 99 (el tema que se montaba solo), en tools/retirados/jazz.r99.ts.txt.
// RONDA 107 · «el estilo de música lo-fi (ascii.fm) me gusta mucho; necesitamos algo parecido». ascii.fm suena con pistas grabadas (focus.mp3: suyas, no se
// copian); aquí el tema de la web pasa de trío de jazz a LO-FI HIP HOP sintetizado: batería boom-bap (bombo en el 1 y en el «y» del 2, caja perezosa en 2 y 4,
// charles a corcheas con swing), acordes de novena en piano eléctrico con el VAIVÉN de una cinta (wow & flutter), el bombo que HUNDE los acordes (sidechain),
// bajo redondo con anticipaciones, saturación de cinta y el vinilo un poco más presente. Sigue en do y a 74 BPM (la carga toca su principio) y una vuelta de
// cada dos cita The Saints. La ronda 106, en tools/retirados/jazz.r106.ts.txt.
import { bus, sonidoEncendido, latido, hz, audio } from './musica';

let BPM = 74, BEAT = 60 / BPM, SWING = 0.58;
type Acorde = { r: number; v: number[] };
const A: Record<string, Acorde> = {
  C69: { r: 36, v: [52, 57, 62, 67] }, Cmaj7: { r: 36, v: [52, 55, 59, 62] }, CE: { r: 40, v: [55, 59, 62, 64] },
  Em7: { r: 40, v: [55, 59, 62, 64] }, A7: { r: 45, v: [55, 61, 64, 66] }, Dm7: { r: 38, v: [53, 57, 60, 64] },
  G7: { r: 43, v: [53, 57, 59, 64] }, C7: { r: 36, v: [52, 57, 58, 62] }, F6: { r: 41, v: [57, 60, 62, 65] }, Fm6: { r: 41, v: [56, 60, 62, 65] },
  Fmaj7: { r: 41, v: [57, 60, 64, 67] }, Gm7: { r: 43, v: [53, 57, 58, 62] }, Am7: { r: 45, v: [55, 60, 64, 67] }, D7: { r: 38, v: [54, 57, 60, 64] },
  Gmaj7: { r: 43, v: [54, 59, 62, 64] }, Bm7: { r: 47, v: [54, 57, 62, 64] }, E7: { r: 40, v: [56, 59, 62, 64] }, Dmaj7: { r: 38, v: [54, 57, 61, 64] }, Bm7b5: { r: 47, v: [57, 60, 62, 65] },
  Cmaj9: { r: 36, v: [52, 55, 59, 62] }, Am9: { r: 45, v: [55, 59, 60, 64] }, Dm9: { r: 38, v: [53, 57, 60, 64] }, G13: { r: 43, v: [53, 57, 59, 64] },
  Fmaj9: { r: 41, v: [57, 60, 64, 67] }, Fm9: { r: 41, v: [56, 60, 63, 67] }, Bb13: { r: 46, v: [56, 62, 65, 67] },
};
// doce compases; cada uno, uno o dos acordes
const FORMA_WEB: string[][] = [['C69'], ['C69'], ['Cmaj7'], ['Em7', 'A7'], ['Dm7'], ['G7'], ['C69'], ['C7'], ['F6'], ['Fm6'], ['CE', 'A7'], ['Dm7', 'G7']];
// ronda 107 · la vuelta lo-fi: ocho compases en do (el préstamo de fa menor al final, el color del género)
const FORMA_LOFI: string[][] = [['Cmaj9'], ['Am9'], ['Dm9'], ['G13'], ['Cmaj9'], ['Am9'], ['Fmaj9'], ['Fm9', 'Bb13']];
// la melodía de «The Saints» (compás, tiempo, nota, tiempos)
const SANTOS: [number, number, number, number][] = [[0, 1, 72, 1], [0, 2, 76, 1], [0, 3, 77, 1], [1, 0, 79, 3.5], [2, 1, 72, 1], [2, 2, 76, 1], [2, 3, 77, 1], [3, 0, 79, 3.5], [4, 1, 72, 1], [4, 2, 76, 1], [4, 3, 77, 1], [5, 0, 79, 1], [5, 1, 76, 1], [5, 2, 72, 1], [5, 3, 76, 1], [6, 0, 74, 3.5]];

let teclas: GainNode | null = null, wow: GainNode | null = null;
let g: GainNode | null = null, crep: AudioBufferSourceNode | null = null, an: AnalyserNode | null = null, datos: Uint8Array | null = null, ruidoB: AudioBuffer | null = null;
// las melodías de las estaciones: generadas (semilla fija: la misma frase en cada vuelta) en su escala, más o menos tupidas
const generar = (sem: number, escala: number[], prob: number, compases: number): [number, number, number, number][] => { let h = sem; const az = () => ((h = (h * 16807) % 2147483647) / 2147483647); const out: [number, number, number, number][] = []; let i = 3; for (let bar = 0; bar < compases; bar++) for (let k = 0; k < 4; k++) { if (az() > prob) continue; i = Math.max(0, Math.min(escala.length - 1, i + Math.round((az() - 0.5) * 3))); out.push([bar, k, escala[i], az() < 0.3 ? 2 : 1]); } return out; };
type Tema = { bpm: number; swing: number; forma: string[][]; mel: [number, number, number, number][]; alterna: boolean; bajo: 'camina' | 'bossa' | 'redonda' | 'lofi'; bat: 'lofi' | 'boombap' | 'suave' | 'bossa' | 'nada'; comp: number };
type NombreTema = 'web' | 'primavera' | 'verano' | 'otono' | 'invierno';
const TEMAS: Record<NombreTema, Tema> = {
  web: { bpm: 74, swing: 0.58, forma: FORMA_LOFI, mel: SANTOS, alterna: true, bajo: 'lofi', bat: 'boombap', comp: 0.45 },
  otono: { bpm: 74, swing: 0.58, forma: FORMA_LOFI, mel: SANTOS, alterna: true, bajo: 'lofi', bat: 'boombap', comp: 0.45 },
  primavera: { bpm: 86, swing: 0.6, forma: [['Gmaj7'], ['Em7'], ['Am7'], ['D7'], ['Gmaj7'], ['Bm7', 'E7'], ['Am7'], ['D7']], mel: generar(17, [67, 69, 71, 74, 76, 79, 81], 0.55, 8), alterna: false, bajo: 'camina', bat: 'suave', comp: 0.5 },
  verano: { bpm: 98, swing: 0.5, forma: [['Dmaj7'], ['Dmaj7'], ['Em7'], ['A7'], ['Dmaj7'], ['Bm7'], ['Em7'], ['A7']], mel: generar(29, [66, 69, 71, 74, 76, 78, 81], 0.5, 8), alterna: false, bajo: 'bossa', bat: 'bossa', comp: 0.6 },
  invierno: { bpm: 60, swing: 0.62, forma: [['Am7'], ['Dm7'], ['Bm7b5', 'E7'], ['Am7'], ['Fmaj7'], ['Dm7'], ['Bm7b5', 'E7'], ['Am7']], mel: generar(41, [64, 67, 69, 72, 74, 76, 79], 0.3, 8), alterna: false, bajo: 'redonda', bat: 'nada', comp: 0 },
};
let T: Tema = TEMAS.web, FORMA = FORMA_LOFI, tema: NombreTema = 'web', mutePart = false;
let t0 = 0, siguiente = 0, reloj = 0, arrancado = false, callado = false, oculto = false, ultimoPulso = 0, fuerzaPulso = 0;
const VOL = 0.18; // ronda 100: «más de fondo» (antes 0,32)
// el volumen que elige el visitante (el ecualizador de Proyectos): 0,75 = el de siempre
let usuario = 0.75; try { const v = parseFloat(localStorage.getItem('savvia:jazz-vol') ?? ''); if (v >= 0 && v <= 1) usuario = v; } catch {}
// RONDA 103 · «al sentarse en proyectos, se baja la música»: sentado, el jazz al 35 % (como con los cascos del ambiente; vuelve al levantarse)
let sentado = false;
export const sentarJazz = (si: boolean) => { sentado = si; volumen(); };
const volObjetivo = () => (audible() ? VOL * Math.pow(usuario / 0.75, 1.5) * (sentado ? 0.35 : 1) : 0);

const acordeEn = (b: number) => { const bar = FORMA[Math.floor(b / 4) % FORMA.length]; return A[bar.length > 1 && b % 4 >= 2 ? bar[1] : bar[0]]; };
const audible = () => !callado && !mutePart && !oculto && sonidoEncendido();
const nodos = () => {
  const B = bus(); if (!B || B.ctx.state !== 'running') return null;
  if (!g) {
    g = B.ctx.createGain(); g.gain.value = 0;
    an = B.ctx.createAnalyser(); an.fftSize = 512; datos = new Uint8Array(an.fftSize);
    // el paso bajo cálido del lo-fi: todo lo que suena pasa por él
    const calido = B.ctx.createBiquadFilter(); calido.type = 'lowpass'; calido.frequency.value = 3600; calido.Q.value = 0.6;
    // ronda 107 · la CINTA: una saturación suave antes del paso bajo; los acordes van por su propio bus, que el bombo hunde; y el vaivén (dos LFO lentos) a su afinación
    const cinta = B.ctx.createWaveShaper(), cv = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = (i / 1023) * 2 - 1; cv[i] = Math.tanh(x * 1.8) / Math.tanh(1.8); } cinta.curve = cv;
    g.connect(cinta).connect(calido);
    teclas = B.ctx.createGain(); teclas.connect(g);
    wow = B.ctx.createGain(); wow.gain.value = 1; const l1 = B.ctx.createOscillator(), l1g = B.ctx.createGain(), l2 = B.ctx.createOscillator(), l2g = B.ctx.createGain();
    l1.frequency.value = 0.55; l1g.gain.value = 7; l2.frequency.value = 0.13; l2g.gain.value = 11; l1.connect(l1g).connect(wow); l2.connect(l2g).connect(wow); l1.start(); l2.start(); calido.connect(B.salida); calido.connect(an);
    const send = B.ctx.createGain(); send.gain.value = 0.4; calido.connect(send).connect(B.sala);
    const n = B.ctx.sampleRate; ruidoB = B.ctx.createBuffer(1, n, n); const d = ruidoB.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    g.gain.setTargetAtTime(volObjetivo(), B.ctx.currentTime, 0.3); // ronda 112: entra YA, con el primer clic del juego (antes τ 1,2: tardaba ~4 s)
    // el VINILO: dos segundos de chasquidos sueltos y soplo, en bucle, muy bajo
    const nv = B.ctx.sampleRate * 2, vb = B.ctx.createBuffer(1, nv, B.ctx.sampleRate), vd = vb.getChannelData(0);
    for (let i = 0; i < nv; i++) vd[i] = (Math.random() * 2 - 1) * 0.04 + (Math.random() < 0.0009 ? (Math.random() * 2 - 1) * 0.9 : 0);
    crep = B.ctx.createBufferSource(); crep.buffer = vb; crep.loop = true;
    const vh = B.ctx.createBiquadFilter(); vh.type = 'highpass'; vh.frequency.value = 1400; const vg = B.ctx.createGain(); vg.gain.value = 0.085; // ronda 107: el vinilo, más presente
    crep.connect(vh).connect(vg).connect(g); crep.start();
  }
  return B;
};
// RONDA 101 · «los cambios de música, mucho más fluidos»: se apaga despacio (τ 0,6 s) y sube más despacio aún (τ 1,3 s, unos 4 s hasta su nivel)
let fundido = false;
const volumen = () => { const B = nodos(); if (!B || !g || fundido) return; const v = volObjetivo(); g.gain.cancelScheduledValues(B.ctx.currentTime); g.gain.setTargetAtTime(v, B.ctx.currentTime, v > 0.001 ? 1.3 : 0.6); };

// — los instrumentos (t en tiempo de audio) —
function rhodes(c: AudioContext, t: number, midi: number, vel: number, dur: number) {
  const f = hz(midi), o = c.createOscillator(), m = c.createOscillator(), mg = c.createGain(), env = c.createGain(), lp = c.createBiquadFilter();
  o.frequency.value = f; m.frequency.value = f; mg.gain.setValueAtTime(f * 1.4, t); mg.gain.exponentialRampToValueAtTime(f * 0.08, t + 0.9);
  m.connect(mg).connect(o.frequency);
  lp.type = 'lowpass'; lp.frequency.value = 2600;
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(vel, t + 0.008); env.gain.exponentialRampToValueAtTime(vel * 0.35, t + 1.2); env.gain.exponentialRampToValueAtTime(0.0004, t + dur + 0.6);
  o.connect(lp).connect(env).connect(teclas ?? g!);
  if (wow) { const w = wow; w.connect(o.detune); w.connect(m.detune); o.onended = () => { try { w.disconnect(o.detune); w.disconnect(m.detune); } catch {} }; }
  o.start(t); m.start(t); o.stop(t + dur + 0.7); m.stop(t + dur + 0.7);
}
function bajo(c: AudioContext, t: number, midi: number, vel: number, dur = BEAT * 1.05, d: AudioNode = g!) {
  const f = hz(midi), o = c.createOscillator(), o2 = c.createOscillator(), env = c.createGain(), lp = c.createBiquadFilter();
  o.type = 'triangle'; o.frequency.value = f; o2.frequency.value = f * 2; const g2 = c.createGain(); g2.gain.value = 0.25;
  lp.type = 'lowpass'; lp.frequency.setValueAtTime(900, t); lp.frequency.exponentialRampToValueAtTime(320, t + 0.4);
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(vel, t + 0.012); env.gain.exponentialRampToValueAtTime(vel * 0.4, t + 0.25); env.gain.exponentialRampToValueAtTime(0.0004, t + dur);
  o.connect(lp); o2.connect(g2).connect(lp); lp.connect(env).connect(d);
  o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
}
function escobilla(c: AudioContext, t: number, vel: number, dur: number, f: number, q: number, d: AudioNode = g!) {
  const s = c.createBufferSource(), bp = c.createBiquadFilter(), env = c.createGain();
  s.buffer = ruidoB; bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = q;
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(vel, t + dur * 0.3); env.gain.exponentialRampToValueAtTime(0.0004, t + dur);
  s.connect(bp).connect(env).connect(d); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
}

function bombo(c: AudioContext, t: number, vel: number, d: AudioNode = g!) {
  const o = c.createOscillator(), e = c.createGain(); o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.12);
  e.gain.setValueAtTime(vel, t); e.gain.exponentialRampToValueAtTime(0.0004, t + 0.32); o.connect(e).connect(d); o.start(t); o.stop(t + 0.34);
  // ronda 107 · el bombo HUNDE los acordes (sidechain): bajan y vuelven en un cuarto de segundo
  if (teclas && d === g) { teclas.gain.cancelScheduledValues(t); teclas.gain.setValueAtTime(0.55, t); teclas.gain.setTargetAtTime(1, t + 0.02, 0.09); }
}
function caja(c: AudioContext, t: number, vel: number) {
  escobilla(c, t, vel, 0.16, 1700, 0.9);
  const o = c.createOscillator(), e = c.createGain(); o.type = 'triangle'; o.frequency.value = 185;
  e.gain.setValueAtTime(vel * 0.6, t); e.gain.exponentialRampToValueAtTime(0.0004, t + 0.09); o.connect(e).connect(g!); o.start(t); o.stop(t + 0.1);
}
// — LAS BANDAS: cada golpe programado deja su huella en su banda (cuándo, cuánto); `bandas()` las suma con ataque suave y caída lenta (calma) —
const NB = 5, CAIDA = [0.7, 1.1, 1.1, 0.9, 0.45];
const huellas: { b: number; t: number; f: number }[] = [];
const marcar = (b: number, t: number, f: number) => { huellas.push({ b, t, f }); if (huellas.length > 220) huellas.splice(0, huellas.length - 220); };
const salidaB = new Float32Array(NB);
export function bandas() {
  const ahora = performance.now(); salidaB.fill(0);
  for (const h of huellas) { const e = (ahora - h.t) / 1000; if (e < 0 || e > 4) continue; const at = Math.min(1, e / 0.07); salidaB[h.b] += h.f * at * Math.exp(-e / CAIDA[h.b]); }
  for (let i = 0; i < NB; i++) salidaB[i] = Math.min(1, salidaB[i]);
  return salidaB;
}

// — el reloj: programa ~0,15 s por delante y avisa en cada tiempo —
const tiempo = (b: number) => t0 + b * BEAT * 1000;
function programar() {
  const ahora = performance.now();
  while (tiempo(siguiente) < ahora + 160) {
    const b = siguiente, tb = tiempo(b), k = b % 4, bar = Math.floor(b / 4), vuelta = Math.floor(bar / FORMA.length), barF = bar % FORMA.length;
    const ac = acordeEn(b), cambio = k === 0 || (FORMA[barF].length > 1 && k === 2);
    const fuerte = k === 0 ? 1 : k === 2 ? 0.7 : 0.45;
    // el aviso a la web, en su tiempo
    window.setTimeout(() => { ultimoPulso = performance.now(); fuerzaPulso = fuerte * (cambio ? 1 : 0.8); dispatchEvent(new CustomEvent('savvia:pulso', { detail: { k, bar, fuerza: fuerzaPulso, cambio } })); }, Math.max(0, tb - ahora));
    const B = audible() ? nodos() : null, c = B && g ? B.ctx : null, ta = c ? c.currentTime + Math.max(0.01, (tb - ahora) / 1000) : 0, sw = BEAT * SWING, swMs = sw * 1000;
    // EL BAJO: camina (fundamental · quinta · tercera · de paso hacia el siguiente), bossa (fundamental en el 1, quinta en el 3) o redondas (invierno)
    const dos = FORMA[barF].length > 1, pos = dos ? k % 2 : k, sig = acordeEn(dos ? (k < 2 ? b - k + 2 : b - k + 4) : b - k + 4);
    const r = ac.r, paso = sig.r + (Math.random() < 0.5 ? -1 : 1);
    if (T.bajo === 'lofi') {
      // ronda 107 · bajo redondo: la fundamental larga en el 1, la quinta corta en el «y» del 2 y, a veces, la siguiente fundamental anticipada en el «y» del 4
      if (k === 0) { if (c) bajo(c, ta, r, 0.24, BEAT * 1.6); marcar(0, tb, 0.8); }
      if (k === 1) { if (c) bajo(c, ta + sw, r + 7, 0.14, BEAT * 0.4); marcar(0, tb + swMs, 0.4); }
      if (k === 3 && Math.random() < 0.55) { const nx = acordeEn(b + 1).r; if (c) bajo(c, ta + sw, nx, 0.15, BEAT * 0.45); marcar(0, tb + swMs, 0.4); }
    }
    const nota = T.bajo === 'lofi' ? -1 : T.bajo === 'camina' ? (dos ? [r, paso][pos] : [r, r + 7, r + 4, paso][pos]) : T.bajo === 'bossa' ? (k === 0 ? r : k === 2 ? r + 7 : -1) : (k === 0 ? r : -1);
    if (nota > 0) { if (c) bajo(c, ta, nota, 0.22, T.bajo === 'redonda' ? BEAT * 3.6 : BEAT * 1.05); marcar(0, tb, 0.55 + (k === 0 ? 0.25 : 0)); }
    // LA BATERÍA según el tema
    if (T.bat === 'boombap') {
      // ronda 107 · BOOM-BAP: bombo en el 1 y en el «y» del 2 (a veces también en el 3), caja perezosa (20 ms tarde) en 2 y 4, charles a corcheas con swing
      if (c) {
        if (k === 0) bombo(c, ta, 0.36); if (k === 1) bombo(c, ta + sw, 0.26); if (k === 2 && Math.random() < 0.45) bombo(c, ta, 0.2);
        if (k % 2 === 1) caja(c, ta + 0.022, 0.085);
        escobilla(c, ta, 0.014, 0.05, 8400, 1.6); escobilla(c, ta + sw, 0.009, 0.045, 8800, 1.6);
        if (k === 3 && Math.random() < 0.3) escobilla(c, ta + sw, 0.012, 0.22, 7200, 1.2);
      }
      marcar(4, tb, k % 2 === 1 ? 0.6 : 0.3); marcar(4, tb + swMs, 0.22); if (k === 0) marcar(0, tb, 0.35); if (k === 1) marcar(0, tb + swMs, 0.3);
    } else if (T.bat === 'lofi') {
      if (c) { if (k === 0) bombo(c, ta, 0.32); if (k === 2) bombo(c, ta + sw, 0.22); if (k % 2 === 1) caja(c, ta, 0.05); escobilla(c, ta, 0.016, 0.09, 7800, 1.4); if (k % 2 === 1) escobilla(c, ta + sw, 0.011, 0.08, 8200, 1.4); }
      marcar(4, tb, k % 2 === 1 ? 0.5 : 0.28); if (k % 2 === 1) marcar(4, tb + swMs, 0.22); if (k === 0) marcar(0, tb, 0.3); if (k === 2) marcar(0, tb + swMs, 0.25);
    } else if (T.bat === 'suave') {
      if (c) { if (k === 0) bombo(c, ta, 0.18); escobilla(c, ta, 0.012, 0.09, 7800, 1.4); if (k % 2 === 1) escobilla(c, ta - 0.03, 0.025, 0.34, 3200, 0.7); }
      marcar(4, tb, k % 2 === 1 ? 0.42 : 0.22);
    } else if (T.bat === 'bossa') {
      if (c) { if (k === 0 || k === 2) bombo(c, ta, 0.2); if (k === 1 || k === 3) escobilla(c, ta + (k === 1 ? sw : 0), 0.03, 0.05, 2600, 3); escobilla(c, ta, 0.012, 0.06, 8000, 1.4); escobilla(c, ta + sw, 0.01, 0.06, 8000, 1.4); }
      marcar(4, tb, 0.35); marcar(4, tb + swMs, 0.25); if (k === 0 || k === 2) marcar(0, tb, 0.3);
    } else if (k === 0) { if (c) escobilla(c, ta, 0.02, 0.7, 3000, 0.6); marcar(4, tb, 0.3); }
    // EL PIANO: el acorde en el cambio y, según el tema, la anticipación (en verano, el comping de bossa también en el «y» del 3)
    if (cambio) { if (c) ac.v.forEach((m, i) => rhodes(c, ta + i * (T.bat === 'boombap' ? 0.028 : 0.012), m, 0.045, BEAT * (T.bajo === 'redonda' ? 3.5 : 1.8))); marcar(1, tb, 0.7); marcar(2, tb + 12, 0.55); }
    else if (k === 1 && Math.random() < T.comp) { if (c) acordeEn(b + 1).v.forEach((m) => rhodes(c, ta + sw, m, 0.03, BEAT * 0.9)); marcar(1, tb + swMs, 0.4); marcar(2, tb + swMs, 0.35); }
    if (T.bat === 'bossa' && k === 2 && Math.random() < 0.6) { if (c) ac.v.forEach((m) => rhodes(c, ta + sw, m, 0.026, BEAT * 0.7)); marcar(2, tb + swMs, 0.3); }
    // LA MELODÍA: la de The Saints una vuelta sí y otra no (web, otoño); la generada de cada estación, siempre
    const MEL = T.alterna ? (vuelta % 2 === 1 ? T.mel : []) : T.mel;
    for (const [cb, ct, m, d] of MEL) if (cb === barF && ct === k) { if (c) rhodes(c, ta + (Math.random() - 0.5) * 0.02, m, 0.05, BEAT * d); marcar(3, tb, 0.75); }
    if (c) latido(0.012 * fuerte);
    siguiente++;
  }
}

export function iniciarJazz() {
  arrancado = true;
  if (!reloj) { t0 = performance.now() + 120; siguiente = 0; reloj = window.setInterval(programar, 40); }
  volumen();
}
// el NIVEL (0–1): lo que suena (analizador) o, en silencio, la envolvente del tiempo
export function nivel() {
  const env = fuerzaPulso * Math.exp(-(performance.now() - ultimoPulso) / 420);
  if (an && datos && audible()) { an.getByteTimeDomainData(datos as any); let s = 0; for (let i = 0; i < datos.length; i++) { const v = (datos[i] - 128) / 128; s += v * v; } return Math.min(1, Math.sqrt(s / datos.length) * 6 + env * 0.3); }
  return env * 0.6;
}
// RONDA 103 · dónde va el compás, en tiempos (con decimales): lo leen los brazos del director y el saxo para moverse a tempo. Antes de arrancar, un reloj libre
// ronda 104 · «orgánico, no a saltos»: se lee del propio reloj (continuo); solo salta al cambiar de tema, y los brazos lo suavizan
export const fase = (t = performance.now()) => (t - t0) / (BEAT * 1000);
export const pulso = () => fuerzaPulso * Math.exp(-(performance.now() - ultimoPulso) / 300);
(window as any).__jazz = () => ({ arrancado, audible: audible(), ctx: bus()?.ctx.state ?? null, ganancia: g ? +g.gain.value.toFixed(3) : 0, compas: Math.floor(siguiente / 4), tema, bpm: BPM });

// los interruptores: el altavoz de la barra, la pestaña, la escena de Vivaldi
addEventListener('savvia:son', () => { if (sonidoEncendido()) iniciarJazz(); volumen(); });
document.addEventListener('visibilitychange', () => { oculto = document.hidden; volumen(); });
addEventListener('savvia:vivaldi', (e) => { callado = (e as CustomEvent).detail.sonando; volumen(); });
// arranca cuando la carga se resuelve (el isotipo cae en la batuta) o, si no hay carga, con el primer gesto; el reloj de pulsos corre desde ya
addEventListener('savvia:gota', () => iniciarJazz(), { once: true });
// ronda 112 · en el primer gesto que de verdad despierta el audio (también el clic: Safari), y entrando rápido
let primero = true;
const alGesto = () => setTimeout(() => { if (!bus() || bus()!.ctx.state !== 'running') return; ['pointerdown', 'pointerup', 'click', 'keydown', 'touchend'].forEach((ev) => removeEventListener(ev, alGesto, true));
  if (!arrancado) iniciarJazz(); const B = nodos(); if (B && g && primero && !fundido) { primero = false; g.gain.cancelScheduledValues(B.ctx.currentTime); g.gain.setTargetAtTime(volObjetivo(), B.ctx.currentTime, 0.3); } }, 30);
['pointerdown', 'pointerup', 'click', 'keydown', 'touchend'].forEach((ev) => addEventListener(ev, alGesto, { capture: true, passive: true }));
if (!reloj) { t0 = performance.now(); reloj = window.setInterval(programar, 40); }

// — los TEMAS —
// el cambio de tema es un FUNDIDO: el que suena se apaga (sigue tocando mientras), el nuevo empieza en su compás 1 y sube despacio. Si se pide otro a medias,
// manda el último
let temaPend: NombreTema | null = null, cambio = 0;
function aplicarTema() {
  const t = temaPend; temaPend = null; if (!t || t === tema) return;
  tema = t; T = TEMAS[t]; FORMA = T.forma; BPM = T.bpm; BEAT = 60 / BPM; SWING = T.swing;
  t0 = performance.now() + 150; siguiente = 0;
}
function ponerTema(t: NombreTema) {
  if (t === (temaPend ?? tema)) return;
  temaPend = t;
  if (cambio) return;
  const B = nodos();
  if (!B || !g || !audible() || g.gain.value < 0.005) { aplicarTema(); return; }
  fundido = true; g.gain.cancelScheduledValues(B.ctx.currentTime); g.gain.setTargetAtTime(0.0001, B.ctx.currentTime, 0.4);
  cambio = window.setTimeout(() => { cambio = 0; aplicarTema(); fundido = false; volumen(); }, 1300);
}
// la escena de Proyectos: una música por estación (null = vuelve la de la web)
export const temaEstacion = (e: string | null) => ponerTema(e && e !== 'otono' && e in TEMAS ? (e as NombreTema) : 'web'); // otoño ES el de la web: no se corta
// la partitura: la música de fondo calla mientras se ve (suenan sus propios efectos) y vuelve al irse
export const entrarPartitura = (_t0?: number) => { mutePart = true; volumen(); };
export const salirPartitura = () => { mutePart = false; volumen(); };
// — el volumen del visitante (el ecualizador de la escena de Proyectos) —
export const volumenJazz = () => (sonidoEncendido() ? usuario : 0);
export function fijarVolumenJazz(v: number) { usuario = Math.max(0, Math.min(1, v)); try { localStorage.setItem('savvia:jazz-vol', usuario.toFixed(3)); } catch {} volumen(); }
// — una nota suelta con el mismo piano eléctrico (la carga: la toca el visitante, aunque el jazz no haya empezado) —
export function rhodesSuelto(midi: number, vel = 0.1, dur = 1.6, cuando = 0, forzar = true) {
  if (!forzar && !sonidoEncendido()) return;
  const c = forzar ? audio() : bus()?.ctx; if (!c || c.state !== 'running' && !forzar) return; const B = bus(); if (!B) return;
  if (!g) nodos();
  const t = c.currentTime + 0.01 + cuando, f = hz(midi), o = c.createOscillator(), m = c.createOscillator(), mg = c.createGain(), env = c.createGain(), lp = c.createBiquadFilter();
  o.frequency.value = f; m.frequency.value = f; mg.gain.setValueAtTime(f * 1.4, t); mg.gain.exponentialRampToValueAtTime(f * 0.08, t + 0.9); m.connect(mg).connect(o.frequency);
  lp.type = 'lowpass'; lp.frequency.value = 3200;
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(vel, t + 0.008); env.gain.exponentialRampToValueAtTime(vel * 0.35, t + 1.1); env.gain.exponentialRampToValueAtTime(0.0004, t + dur + 0.5);
  o.connect(lp).connect(env); env.connect(B.salida); const s2 = c.createGain(); s2.gain.value = 0.35; env.connect(s2).connect(B.sala);
  o.start(t); m.start(t); o.stop(t + dur + 0.6); m.stop(t + dur + 0.6);
  setTimeout(() => latido(vel * 0.3), cuando * 1000);
}

// — los instrumentos SUELTOS de la partitura (sus efectos componen su música; solo con el sonido de la web encendido) —
const suelto = () => { if (!sonidoEncendido()) return null; const B = bus(); if (!B || B.ctx.state !== 'running') return null; if (!ruidoB) nodos(); return ruidoB ? B : null; };
export function bajoSuelto(midi: number, vel = 0.2, cuando = 0) { const B = suelto(); if (B) { bajo(B.ctx, B.ctx.currentTime + 0.01 + cuando, midi, vel, 0.9, B.salida); latido(vel * 0.2); } }
export function platoSuelto(vel = 0.02, cuando = 0) { const B = suelto(); if (B) escobilla(B.ctx, B.ctx.currentTime + 0.01 + cuando, vel, 0.12, 7800, 1.4, B.salida); }
export function bomboSuelto(vel = 0.25, cuando = 0) { const B = suelto(); if (B) bombo(B.ctx, B.ctx.currentTime + 0.01 + cuando, vel, B.salida); }
