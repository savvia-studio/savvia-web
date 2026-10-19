// mide el movimiento de cada vídeo de detalle cada 0,25 s (diferencia media entre fotogramas en gris, 96 px) y propone la ventana más viva
const { execFileSync } = require('child_process');
const clips = process.argv.slice(2);
for (const f of clips) {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', f, '-vf', 'fps=8,scale=96:54,format=gray', '-f', 'rawvideo', '-'], { maxBuffer: 1 << 28 });
  const N = 96 * 54, n = raw.length / N, m = [];
  for (let i = 1; i < n; i++) { let s = 0; for (let j = 0; j < N; j++) s += Math.abs(raw[i * N + j] - raw[(i - 1) * N + j]); m.push(s / N); }
  const ventana = (w) => { let best = 0, bi = 0; for (let i = 0; i + w <= m.length; i++) { const s = m.slice(i, i + w).reduce((a, b) => a + b, 0); if (s > best) { best = s; bi = i; } } return [(bi / 8).toFixed(2), (best / w).toFixed(2)]; };
  console.log(f.split('/').slice(-2).join('/'), 'dur', (n / 8).toFixed(1), 'vent2s', ventana(16).join(' @'), 'perfil', m.filter((_, i) => i % 4 === 0).map((x) => x.toFixed(1)).join(' '));
}
