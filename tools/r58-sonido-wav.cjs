// Ronda 58 · renderiza 3,4 s de la impresora con la MISMA síntesis de LaReceta.astro (OfflineAudioContext en Chrome) → tools/shots/r58-impresora.wav
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage();
  const b64 = await p.evaluate(async () => {
    const SR = 44100, DUR = 3.4, a = new OfflineAudioContext(1, SR * DUR, SR);
    const ruido = a.createBuffer(1, SR * 0.08, SR); const d = ruido.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const curva = new Float32Array(256); for (let i = 0; i < 256; i++) curva[i] = Math.tanh((i / 128 - 1) * 3.2);
    const rafaga = (t0, t1, lineas) => {
      const m = a.createGain(); m.gain.setValueAtTime(0, t0); m.gain.linearRampToValueAtTime(0.05, t0 + 0.008); m.connect(a.destination);
      const am = a.createGain(); am.gain.value = 0.68; am.connect(m);
      const lfo = a.createOscillator(); lfo.type = 'square'; lfo.frequency.value = 92 + Math.random() * 10; const prof = a.createGain(); prof.gain.value = 0.32; lfo.connect(prof).connect(am.gain);
      const o = a.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 410 + Math.random() * 40; const sat = a.createWaveShaper(); sat.curve = curva;
      const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1400; bp.Q.value = 0.7; const go = a.createGain(); go.gain.value = 0.42;
      o.connect(sat).connect(bp).connect(go).connect(am);
      const n = a.createBufferSource(); n.buffer = ruido; n.loop = true; const hp = a.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2600; const gn = a.createGain(); gn.gain.value = 0.3;
      n.connect(hp).connect(gn).connect(am);
      lineas.forEach((t) => { m.gain.setValueAtTime(0.018, t); m.gain.linearRampToValueAtTime(0.05, t + 0.006); });
      m.gain.setValueAtTime(0.05, t1); m.gain.linearRampToValueAtTime(0, t1 + 0.035);
      [o, lfo, n].forEach((f) => { f.start(t0); f.stop(t1 + 0.05); });
    };
    // el ritmo real de LaReceta: líneas cada 28–40 ms en ráfagas de 4–8, pausas de 80–200 ms, una larga (0,3–0,46 s) entre pasos
    let t = 0.05;
    const pasos = [5, 7, 4, 6, 8, 5, 6];
    pasos.forEach((nl, k) => {
      const t0 = t, lineas = [];
      for (let i = 0; i < nl; i++) { lineas.push(t); t += 0.028 + Math.random() * 0.012; }
      rafaga(t0, t, lineas);
      t += k === 3 ? 0.38 : 0.08 + Math.random() * 0.12;
    });
    // la cuchilla
    const tc = t + 0.18;
    const n = a.createBufferSource(); n.buffer = ruido; const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 1.1;
    const g = a.createGain(); g.gain.setValueAtTime(0, tc); g.gain.linearRampToValueAtTime(0.09, tc + 0.002); g.gain.exponentialRampToValueAtTime(0.001, tc + 0.07);
    n.connect(bp).connect(g).connect(a.destination); n.start(tc); n.stop(tc + 0.08);
    const o = a.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(3200, tc); o.frequency.exponentialRampToValueAtTime(1400, tc + 0.04);
    const go = a.createGain(); go.gain.setValueAtTime(0, tc); go.gain.linearRampToValueAtTime(0.025, tc + 0.002); go.gain.exponentialRampToValueAtTime(0.001, tc + 0.05);
    o.connect(go).connect(a.destination); o.start(tc); o.stop(tc + 0.06);
    const buf = await a.startRendering(); const x = buf.getChannelData(0);
    // normaliza a −3 dB para escucharlo cómodo (en la web suena al volumen real, más bajo)
    let pico = 0; for (const v of x) pico = Math.max(pico, Math.abs(v)); const k = 0.7 / (pico || 1);
    const bytes = new DataView(new ArrayBuffer(44 + x.length * 2));
    const w = (o, s) => [...s].forEach((c, i) => bytes.setUint8(o + i, c.charCodeAt(0)));
    w(0, 'RIFF'); bytes.setUint32(4, 36 + x.length * 2, true); w(8, 'WAVEfmt '); bytes.setUint32(16, 16, true); bytes.setUint16(20, 1, true); bytes.setUint16(22, 1, true);
    bytes.setUint32(24, SR, true); bytes.setUint32(28, SR * 2, true); bytes.setUint16(32, 2, true); bytes.setUint16(34, 16, true); w(36, 'data'); bytes.setUint32(40, x.length * 2, true);
    x.forEach((v, i) => bytes.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v * k)) * 32767, true));
    let s = ''; const u = new Uint8Array(bytes.buffer); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000));
    return btoa(s);
  });
  fs.writeFileSync('tools/shots/r58-impresora.wav', Buffer.from(b64, 'base64'));
  console.log('ok', fs.statSync('tools/shots/r58-impresora.wav').size);
  await b.close();
})();
