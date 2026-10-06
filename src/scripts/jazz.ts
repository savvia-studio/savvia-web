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

let BPM = 72, BEAT = 60 / BPM, SWING = 0.58; // ronda 117: el de la canción (se fija abajo, al elegirla)
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
  web: { bpm: 72, swing: 0.58, forma: FORMA_LOFI, mel: SANTOS, alterna: true, bajo: 'lofi', bat: 'boombap', comp: 0.45 },
  otono: { bpm: 72, swing: 0.58, forma: FORMA_LOFI, mel: SANTOS, alterna: true, bajo: 'lofi', bat: 'boombap', comp: 0.45 },
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
const volObjetivo = () => (audible() && !grabando() ? VOL * Math.pow(usuario / 0.75, 1.5) * (sentado ? 0.35 : 1) : 0);

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

// — RONDA 116 · LA CANCIÓN DE VERDAD: «Smooth Lovin'» de Kevin MacLeod (incompetech.com, CC BY 3.0; crédito en el pie). Andoni: «buscar alguna canción estilo
// jazz que encaje para la web» → «dale con tu recomendación». En el tema de la web (y en otoño) suena la GRABACIÓN en bucle en vez del lo-fi sintetizado; el reloj
// de pulsos sigue igual pero a su tempo (75 BPM) y alineado con ella: el pulso 0 del reloj = el pulso 16 de la grabación (13,186 s), y el bucle dura 72 compases
// (hasta 243,386 s). Así todo lo que late en la web (ondas, ASCII, retícula) late con la canción. Sin la grabación (o con `?musica=sintetica`), el lo-fi de siempre.
// RONDA 117 · «la canción que hemos puesto no me gusta, algo más jazz». Tres candidatas de Kevin MacLeod (incompetech, CC BY 4.0; análisis y fuentes en
// tools/fuentes-sonido.md): de serie «Study And Relax» (saxos, piano, bajo y batería; 72 BPM); `?cancion=guy` «I Knew a Guy» (bajo andante y vibráfono, nocturna;
// 75); `?cancion=vibes` «Cool Vibes» (trío lento; 83); `?cancion=smooth` la de la 116. ls/le: el bucle, en compases enteros; el reloj va a su tempo.
const CANCIONES: Record<string, { f: string; ls: number; le: number; bpm: number; titulo: string; g?: number }> = {
  // ronda 118 · «vamos con Lobby Time, pero que se escuche bastante de fondo»: Kevin MacLeod (CC BY 3.0, Wikimedia Commons). Medida con librosa: el detector
  // marca 129 BPM y se siente a la mitad; bucle de 40 compases sobre sus pulsos reales (5,224 → 155,225 s = 160 tiempos → 64 BPM). g: su nivel, muy bajo
  lobby: { f: 'jazz-lobby-time.mp3', ls: 5.224, le: 155.225, bpm: 64, titulo: 'Lobby Time', g: 0.42 },
  study: { f: 'jazz-study-and-relax.mp3', ls: 13.389, le: 120.055, bpm: 72, titulo: 'Study And Relax' },
  guy: { f: 'jazz-i-knew-a-guy.mp3', ls: 12.849, le: 115.281, bpm: 75, titulo: 'I Knew a Guy' },
  vibes: { f: 'jazz-cool-vibes.mp3', ls: 14.529, le: 199.554, bpm: 83, titulo: 'Cool Vibes' },
  smooth: { f: 'smooth-lovin.mp3', ls: 13.186, le: 243.386, bpm: 75, titulo: "Smooth Lovin'" },
};
const CANCION = CANCIONES[(location.search.match(/[?&]cancion=(\w+)/) || [])[1] || 'lobby'] || CANCIONES.lobby;
export const cancionActual = () => CANCION.titulo;
const GRAB = { url: (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/') + 'media/sonido/' + CANCION.f, ls: CANCION.ls, le: CANCION.le };
TEMAS.web.bpm = TEMAS.otono.bpm = CANCION.bpm; if (tema === 'web' || tema === 'otono') { BPM = CANCION.bpm; BEAT = 60 / BPM; }
let grabBuf: AudioBuffer | null = null, grabSrc: AudioBufferSourceNode | null = null, grabG: GainNode | null = null, grabPidiendo = false;
// RONDA 118 · «DIRIGE TÚ»: la grabación pasa por tres filtros de pico (graves · medios · agudos). Señalar una familia de la orquesta la ADELANTA en la mezcla
// (+7 dB en su banda y −3 en las otras); al soltar, vuelve plana. La grabación va mezclada: no se aísla un instrumento, se le acerca el oído.
let eq: BiquadFilterNode[] = [];
const BANDAS_EQ = { grave: [140, 0.8], medio: [900, 0.9], agudo: [4200, 0.8] } as const;
export type BandaEq = keyof typeof BANDAS_EQ;
export function enfocar(b: BandaEq | null) {
  const B = bus(); if (!B || !eq.length) return; const t = B.ctx.currentTime;
  (Object.keys(BANDAS_EQ) as BandaEq[]).forEach((k, i) => { eq[i].gain.cancelScheduledValues(t); eq[i].gain.setTargetAtTime(b === null ? 0 : b === k ? 7 : -3, t, b === null ? 0.5 : 0.18); });
}
const conGrabacion = () => !/[?&]musica=sintetica/.test(location.search);
const grabando = () => conGrabacion() && !!grabBuf && (tema === 'web' || tema === 'otono') && !temaPend;
const pedirGrabacion = (ctx: AudioContext) => {
  if (grabBuf || grabPidiendo || !conGrabacion()) return; grabPidiendo = true;
  fetch(GRAB.url).then((r) => r.arrayBuffer()).then((ab) => ctx.decodeAudioData(ab)).then((b) => { grabBuf = b; volumen(); }).catch(() => { grabPidiendo = false; });
};
// arranca (o recoloca) la grabación en la fase que marca el reloj: la posición = ls + (tiempo desde t0) módulo el bucle
function ponerGrabacion(reiniciar = false) {
  const B = bus(); if (!B || !grabBuf || B.ctx.state !== 'running') return;
  if (!grabG) { grabG = B.ctx.createGain(); grabG.gain.value = 0; grabG.connect(B.salida); eq = (Object.values(BANDAS_EQ) as readonly (readonly [number, number])[]).map(([f, q]) => { const n = B.ctx.createBiquadFilter(); n.type = 'peaking'; n.frequency.value = f; n.Q.value = q; n.gain.value = 0; return n; }); eq[0].connect(eq[1]).connect(eq[2]).connect(grabG); const s2 = B.ctx.createGain(); s2.gain.value = 0.12; grabG.connect(s2).connect(B.sala); }
  const quiere = grabando() && audible();
  if (grabSrc && (reiniciar || !quiere)) { const v = grabSrc; v.stop(B.ctx.currentTime + (quiere ? 0.02 : 0.6)); grabSrc = null; }
  if (quiere && !grabSrc) {
    const loop = GRAB.le - GRAB.ls, ahora = performance.now(), dt = (ahora - t0) / 1000;
    const cuando = dt < 0 ? -dt : 0, pos = dt < 0 ? GRAB.ls : GRAB.ls + (((dt % loop) + loop) % loop);
    const src = B.ctx.createBufferSource(); src.buffer = grabBuf; src.loop = true; src.loopStart = GRAB.ls; src.loopEnd = GRAB.le; src.connect(eq[0] ?? grabG);
    src.start(B.ctx.currentTime + 0.02 + cuando, pos); grabSrc = src;
  }
  const v = quiere ? 0.36 * (CANCION.g ?? 1) * Math.pow(usuario / 0.75, 1.5) /* ronda 117: «la música de fondo más baja» (antes 0,62) */ * (sentado ? 0.35 : 1) : 0;
  grabG.gain.cancelScheduledValues(B.ctx.currentTime); grabG.gain.setTargetAtTime(v, B.ctx.currentTime, v > 0.001 ? 0.8 : 0.4);
}
// RONDA 101 · «los cambios de música, mucho más fluidos»: se apaga despacio (τ 0,6 s) y sube más despacio aún (τ 1,3 s, unos 4 s hasta su nivel)
let fundido = false;
const volumen = () => { const B = nodos(); if (B) { pedirGrabacion(B.ctx); ponerGrabacion(); } if (!B || !g || fundido) return; const v = volObjetivo(); g.gain.cancelScheduledValues(B.ctx.currentTime); g.gain.setTargetAtTime(v, B.ctx.currentTime, v > 0.001 ? 1.3 : 0.6); };

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

// — RONDA 115 · «que la música tenga más instrumentos, estilo saxofón, piano» —
// SAXO tenor sintetizado: dos sierras casi al unísono por tres formantes (la «o» del tudel), con la entrada ligeramente baja que sube a la nota (el
// «scoop»), vibrato que llega tarde, un soplo de aire filtrado y un paso bajo cálido. Va directo al bus del jazz (el bombo no lo hunde).
function sax(c: AudioContext, t: number, midi: number, vel: number, dur: number) {
  const f = hz(midi), o1 = c.createOscillator(), o2 = c.createOscillator(), env = c.createGain(), mezcla = c.createGain(), lp = c.createBiquadFilter();
  o1.type = 'sawtooth'; o2.type = 'sawtooth'; o1.frequency.value = f; o2.frequency.value = f; o2.detune.value = 7;
  for (const o of [o1, o2]) { o.detune.setValueAtTime((o === o2 ? 7 : 0) - 45, t); o.detune.linearRampToValueAtTime(o === o2 ? 7 : 0, t + 0.07); }
  const vib = c.createOscillator(), vg = c.createGain(); vib.frequency.value = 5.1; vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(0, t + Math.min(0.3, dur * 0.4)); vg.gain.linearRampToValueAtTime(11, t + Math.min(0.7, dur * 0.8));
  vib.connect(vg); vg.connect(o1.detune); vg.connect(o2.detune);
  o1.connect(mezcla); o2.connect(mezcla); mezcla.gain.value = 0.5;
  lp.type = 'lowpass'; lp.frequency.setValueAtTime(1400, t); lp.frequency.linearRampToValueAtTime(2600, t + 0.12); lp.frequency.linearRampToValueAtTime(1900, t + dur); lp.Q.value = 0.5;
  for (const [fq, q, gn] of [[520, 2.2, 1], [1150, 3.5, 0.55], [2500, 5, 0.22]] as const) { const bp = c.createBiquadFilter(), bg = c.createGain(); bp.type = 'bandpass'; bp.frequency.value = fq; bp.Q.value = q; bg.gain.value = gn; mezcla.connect(bp).connect(bg).connect(lp); }
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(vel, t + 0.06); env.gain.setValueAtTime(vel * 0.92, t + Math.max(0.08, dur - 0.12)); env.gain.exponentialRampToValueAtTime(0.0004, t + dur + 0.18);
  lp.connect(env).connect(g!);
  // el aire
  if (ruidoB) { const s = c.createBufferSource(), bp = c.createBiquadFilter(), ag = c.createGain(); s.buffer = ruidoB; bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 1.2; ag.gain.setValueAtTime(0, t); ag.gain.linearRampToValueAtTime(vel * 0.16, t + 0.04); ag.gain.exponentialRampToValueAtTime(0.0004, t + dur + 0.15); s.connect(bp).connect(ag).connect(g!); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.2); }
  const fin = t + dur + 0.25; o1.start(t); o2.start(t); vib.start(t); o1.stop(fin); o2.stop(fin); vib.stop(fin);
}
// PIANO de cola: parciales con su caída (los agudos se apagan antes), un golpe de macillo y algo de desafinación entre cuerdas. Va al bus de las teclas.
function piano(c: AudioContext, t: number, midi: number, vel: number, dur: number) {
  const f = hz(midi), nota = c.createGain(), lp = c.createBiquadFilter();
  nota.gain.setValueAtTime(0, t); nota.gain.linearRampToValueAtTime(vel, t + 0.005); nota.gain.exponentialRampToValueAtTime(vel * 0.3, t + 0.4); nota.gain.exponentialRampToValueAtTime(0.0004, t + dur + 0.8);
  lp.type = 'lowpass'; lp.frequency.setValueAtTime(Math.min(8000, f * 8), t); lp.frequency.exponentialRampToValueAtTime(Math.max(600, f * 2), t + dur);
  nota.connect(lp).connect(teclas ?? g!);
  for (const [m, gn, d] of [[1, 1, 1], [2, 0.42, 0.6], [3, 0.16, 0.42], [4.01, 0.08, 0.3], [5.02, 0.04, 0.22]] as const) {
    for (const det of [-3, 3]) { const o = c.createOscillator(), og = c.createGain(); o.frequency.value = f * m; o.detune.value = det; og.gain.setValueAtTime(gn * 0.5, t); og.gain.exponentialRampToValueAtTime(0.0004, t + (dur + 0.8) * d); o.connect(og).connect(nota); o.start(t); o.stop(t + dur + 0.9); }
  }
  if (ruidoB) { const s = c.createBufferSource(), bp = c.createBiquadFilter(), mg = c.createGain(); s.buffer = ruidoB; bp.type = 'bandpass'; bp.frequency.value = Math.min(5000, f * 3); bp.Q.value = 1; mg.gain.setValueAtTime(vel * 0.25, t); mg.gain.exponentialRampToValueAtTime(0.0004, t + 0.04); s.connect(bp).connect(mg).connect(nota); s.start(t, Math.random() * 0.5); s.stop(t + 0.05); }
}
// la frase del SAXO sobre la vuelta lo-fi (ocho compases en do): [compás, tiempo (con medios: se les aplica el swing), nota, tiempos]. Suena en las vueltas
// en que el piano eléctrico NO cita The Saints (las pares): así nunca se pisan
const SAXO: [number, number, number, number][] = [
  [0, 0.5, 67, 1], [0, 1.5, 69, 0.5], [0, 2, 71, 1.6],
  [1, 0, 72, 1], [1, 1, 71, 0.5], [1, 1.5, 67, 2.2],
  [2, 0.5, 69, 1], [2, 1.5, 72, 0.5], [2, 2, 74, 1.6],
  [3, 0, 76, 0.5], [3, 0.5, 74, 0.5], [3, 1, 71, 2.4],
  [4, 0.5, 64, 0.5], [4, 1, 67, 0.5], [4, 1.5, 71, 1], [4, 2.5, 72, 1.2],
  [5, 0, 76, 1.5], [5, 2, 74, 0.5], [5, 2.5, 72, 1.2],
  [6, 0, 69, 1], [6, 1, 72, 1], [6, 2, 76, 1.6],
  [7, 0, 75, 1], [7, 1, 72, 0.5], [7, 1.5, 70, 1], [7, 2.5, 68, 1.4],
];
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
    const B = audible() && !grabando() ? nodos() : null, c = B && g ? B.ctx : null, ta = c ? c.currentTime + Math.max(0.01, (tb - ahora) / 1000) : 0, sw = BEAT * SWING, swMs = sw * 1000;
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
    // RONDA 115 · el SAXO (vueltas pares del tema de la web) y FRASES DE PIANO (dos o tres notas del acorde, arriba, en el «y» del 2 o del 4, a veces)
    if (T.bajo === 'lofi') {
      if (vuelta % 2 === 0) for (const [cb, cbt, m, d] of SAXO) if (cb === barF && Math.floor(cbt) === k) { const fr = cbt - k, sw2 = fr === 0.5 ? SWING : fr; if (c) sax(c, ta + sw2 * BEAT, m, 0.05, d * BEAT); marcar(3, tb + sw2 * BEAT * 1000, 0.7); }
      if ((k === 1 || k === 3) && Math.random() < 0.42) { const nn = ac.v.slice(-3).map((m) => m + 12); const n = 2 + (Math.random() < 0.4 ? 1 : 0); for (let j = 0; j < n; j++) { if (c) piano(c, ta + sw + j * BEAT * 0.25, nn[(j + Math.floor(Math.random() * 3)) % nn.length], 0.032, BEAT * 0.9); } marcar(2, tb + swMs, 0.35); }
    }
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
export const pulsoMs = () => BEAT * 1000; // ronda 118: lo que dura un tiempo (los dolores entran a compás)
export const pulso = () => fuerzaPulso * Math.exp(-(performance.now() - ultimoPulso) / 300);
(window as any).__jazz = () => ({ arrancado, audible: audible(), ctx: bus()?.ctx.state ?? null, ganancia: g ? +g.gain.value.toFixed(3) : 0, compas: Math.floor(siguiente / 4), tema, bpm: BPM, grabacion: !!grabSrc, grabGanancia: grabG ? +grabG.gain.value.toFixed(3) : 0, eq: eq.map((n) => +n.gain.value.toFixed(1)) });

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
  t0 = performance.now() + 150; siguiente = 0; ponerGrabacion(true);
}
function ponerTema(t: NombreTema) {
  if (t === (temaPend ?? tema)) return;
  temaPend = t; ponerGrabacion();
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

// — RONDA 113 · EL CARTEL Y LA CUENTA —
// `alinearJazz(t)`: el compás 1 del tema cae en el instante `t` (performance.now): la cuenta de entrada de la carga («1 · 2 · 3 · 4») aterriza justo en el
// primer tiempo del lo-fi. Antes de `t` no se programa nada (el silencio es de la cuenta).
export function alinearJazz(tMs: number) { t0 = tMs; siguiente = 0; ponerGrabacion(true); }
// `partituraWeb()`: la partitura de UNA vuelta (8 compases, 32 tiempos) del tema de la web, en tiempos: lo que el cartel del hero dibuja en anillos. Sale de
// los mismos patrones que programa `programar()` (sin los golpes al azar: anticipaciones del bajo, el bombo suelto del 3, el comping)
export function partituraWeb() {
  const W = TEMAS.web, sw = W.swing, out: { voz: string; b: number; len: number; v: number }[] = [];
  for (let b = 0; b < 32; b++) {
    const k = b % 4;
    if (k % 2 === 1) out.push({ voz: 'caja', b: b + 0.03, len: 0.5, v: 1 });
    if (k === 0) out.push({ voz: 'bombo', b, len: 1.05, v: 1 }, { voz: 'bajo', b, len: 1.5, v: 1 });
    if (k === 1) out.push({ voz: 'bombo', b: b + sw, len: 0.62, v: 0.7 }, { voz: 'bajo', b: b + sw, len: 0.38, v: 0.6 });
  }
  W.forma.forEach((bar, i) => bar.forEach((_, j) => { const s = i * 4 + j * 2, len = (bar.length > 1 ? 2 : 4) - 0.22; for (let vi = 0; vi < 4; vi++) out.push({ voz: 'acorde' + vi, b: s, len, v: 1 }); }));
  for (const [cb, ct, , d] of W.mel) out.push({ voz: 'melodia', b: cb * 4 + ct, len: Math.max(0.5, d * 0.86), v: 1 });
  return out;
}
// RONDA 114 · el acorde que suena AHORA (las notas, en midi): la tinta toca dentro de él
export const acordeActual = () => { const a = acordeEn(Math.max(0, Math.floor(fase()))); return { raiz: a.r, notas: a.v }; };
