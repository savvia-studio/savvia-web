// RONDA 114 · EL ROBLE A TINTA: las pinceladas, en el orden en que las daría un pintor de sumi-e, y cuánto dura cada una EN TIEMPOS del lo-fi.
// Tronco de abajo arriba (dos o tres trazos de pincel cargado que se secan al subir) → ramas maestras que se abren anchas y se quiebran (el roble pedunculado:
// copa ancha y baja, brazos tortuosos) → ramas y ramitas → AGUADAS de copa (mucha agua, poca tinta: la masa del follaje) → HOJAS a toques, racimo a racimo →
// musgo en el tronco → la línea del suelo. Unidades: el árbol mide 1 de alto, x = 0 en el pie del tronco, y hacia arriba. Una semilla = un roble distinto.
export type Voz = 'tronco' | 'raiz' | 'rama' | 'ramita' | 'aguada' | 'hoja' | 'musgo' | 'suelo';
export type Pincelada = { voz: Voz; pts: [number, number, number][]; pig: number; agua: number; carga: number; gasto: number; semilla: number; dur: number; paso: number };

export function roble(sem: number) {
  let h = (sem * 7919) % 2147483647 || 1; const az = () => ((h = (h * 16807) % 2147483647) / 2147483647);
  const ent = (a: number, b: number) => a + (b - a) * az();
  const gauss = () => (az() + az() + az() - 1.5) / 1.5;
  const out: Pincelada[] = [];
  const pon = (p: Omit<Pincelada, 'semilla'>) => out.push({ ...p, semilla: az() * 50 });
  // ── EL TRONCO: una línea en S, ensanchada en el pie
  const hF = ent(0.3, 0.37), incl = ent(-0.06, 0.06), fase = ent(0, 6);
  const eje = (t: number): [number, number] => [incl * t + 0.028 * Math.sin(t * Math.PI * 1.4 + fase) * (1 - t * 0.3), hF * t];
  const ancho = (t: number) => 0.062 * (1 - t * 0.38) + 0.03 * Math.pow(1 - t, 6);
  const linea = (dx: number, kw: number, t1 = 1.04): [number, number, number][] => Array.from({ length: 14 }, (_, i) => { const t = (i / 13) * t1, [x, y] = eje(t); return [x + dx * ancho(t), y, ancho(t) * kw]; });
  pon({ voz: 'tronco', pts: linea(0, 0.55), pig: 0.42, agua: 0.32, carga: 0.95, gasto: 0.6, dur: 1.5, paso: 1 });
  pon({ voz: 'tronco', pts: linea(-0.36, 0.3), pig: 0.95, agua: 0.25, carga: 0.85, gasto: 0.7, dur: 1, paso: 0.75 });
  pon({ voz: 'tronco', pts: linea(0.4, 0.2, 0.9), pig: 0.85, agua: 0.2, carga: 0.7, gasto: 0.6, dur: 0.75, paso: 0.75 });
  // las raíces que agarran el suelo
  for (const lado of [-1, 1]) pon({ voz: 'raiz', pts: [[lado * 0.02, 0.025, 0.02], [lado * 0.07, 0.008, 0.012], [lado * ent(0.11, 0.15), 0, 0.004]], pig: 0.8, agua: 0.25, carga: 0.7, gasto: 0.6, dur: 0.5, paso: 0.5 });
  // ── LAS RAMAS: brazos tortuosos que se abren casi en horizontal; cada uno echa hijos
  const [fx, fy] = eje(1);
  const puntas: [number, number][] = [];
  const ramas: Pincelada[][] = [[], [], []];
  const rama = (x: number, y: number, ang: number, L: number, w: number, nivel: number) => {
    const n = 5, pts: [number, number, number][] = [[x, y, w]]; let a = ang, px = x, py = y;
    for (let i = 1; i <= n; i++) {
      a += ent(-0.38, 0.38) - Math.sin(a) * 0.08; // se quiebra, y los brazos muy abiertos se rinden un poco
      const s = L / n; px += Math.sin(a) * s; py += Math.cos(a) * s * (nivel === 0 ? 0.82 : 1);
      pts.push([px, py, w * (1 - (i / n) * 0.78)]);
      if (nivel < 2 && i >= 2 && i <= 4 && az() < (nivel === 0 ? 0.85 : 0.6)) { const lado = az() < 0.5 ? -1 : 1; rama(px, py, a + lado * ent(0.4, 0.95), L * ent(0.45, 0.62), w * 0.5, nivel + 1); }
    }
    puntas.push([px, py]);
    ramas[nivel].push({ voz: nivel === 0 ? 'rama' : 'ramita', pts, pig: nivel === 0 ? 1 : 0.9, agua: 0.1, carga: 0.85, gasto: 0.8, semilla: az() * 50, dur: [1, 0.5, 0.375][nivel], paso: [0.75, 0.375, 0.25][nivel] });
  };
  const N = 5, angs = [-1.15, -0.62, -0.08, 0.5, 1.08];
  for (let i = 0; i < N; i++) rama(fx + gauss() * 0.012, fy - ent(0, 0.06), angs[i] + gauss() * 0.14, ent(0.36, 0.5) * (1 - Math.abs(angs[i]) * 0.12), ent(0.022, 0.03), 0);
  ramas.forEach((l) => l.forEach((p) => out.push(p)));
  // ── LA COPA (ronda 114, 2.ª: «rala, no se lee como un roble»): una cúpula ancha y baja; los racimos salen de las puntas y de huecos de la cúpula
  // que tengan una rama cerca. Primero las aguadas (la masa), luego las hojas a toques, racimo a racimo
  const huesos: [number, number][] = []; ramas.forEach((l) => l.forEach((p) => p.pts.forEach(([x, y]) => huesos.push([x, y]))));
  const cerca = (x: number, y: number) => huesos.some(([a, b]) => Math.hypot(a - x, b - y) < 0.07);
  const ccx = fx, ccy = hF + 0.27, rx = 0.6, ry = 0.29;
  const cand: [number, number][] = puntas.filter(([, y]) => y > hF + 0.04);
  for (let j = 0; j < 260; j++) { const t = az() * Math.PI * 2, rr = Math.sqrt(az()), x = ccx + Math.cos(t) * rx * rr, y = ccy + Math.sin(t) * ry * rr; if (y > hF + 0.02 && cerca(x, y)) cand.push([x, y]); }
  const racimos: [number, number][] = [];
  for (const p of cand) if (racimos.length < 22 && racimos.every((r) => Math.hypot(r[0] - p[0], (r[1] - p[1]) * 1.4) > 0.085)) racimos.push(p);
  racimos.sort((a, b) => a[1] - b[1]); // de abajo arriba, como sube la copa
  for (const [cx, cy] of racimos) {
    const r = ent(0.07, 0.1);
    pon({ voz: 'aguada', pts: [[cx - r * 0.55, cy - r * 0.08, r * 0.75], [cx, cy + r * 0.1, r], [cx + r * 0.55, cy - r * 0.04, r * 0.7]], pig: ent(0.22, 0.34), agua: 1.3, carga: 1, gasto: 0.1, dur: 0.5, paso: 0.25 });
  }
  for (const [cx, cy] of racimos) {
    const n = Math.round(ent(18, 28));
    for (let j = 0; j < n; j++) {
      const x = cx + gauss() * 0.075, y = cy + gauss() * 0.045 + 0.012, a = ent(-1, 1) + (x - cx) * 4, l = ent(0.012, 0.026), w = ent(0.008, 0.015), oscuro = az() < 0.18;
      pon({ voz: 'hoja', pts: [[x - Math.sin(a) * l * 0.5, y - Math.cos(a) * l * 0.5, w * 0.6], [x, y, w], [x + Math.sin(a) * l * 0.5, y + Math.cos(a) * l * 0.5, w * 0.3]], pig: oscuro ? 1.15 : ent(0.28, 0.5), agua: 0.14, carga: 0.85, gasto: 0.4, dur: 0.2, paso: 0.0625 });
    }
  }
  // ── el musgo del tronco y el suelo
  for (let j = 0; j < 6; j++) { const t = ent(0.05, 0.85), [x, y] = eje(t), w = ancho(t); const dx = (az() < 0.5 ? -1 : 1) * w * ent(0.25, 0.5); pon({ voz: 'musgo', pts: [[x + dx, y, 0.005], [x + dx + 0.004, y + 0.004, 0.004]], pig: 1, agua: 0.15, carga: 1, gasto: 0, dur: 0.125, paso: 0.125 }); }
  const suelo: [number, number, number][] = Array.from({ length: 12 }, (_, i) => { const t = i / 11; return [-0.56 + t * 1.18, (Math.sin(t * 9 + fase) * 0.004), 0.006 * (1 - Math.abs(t - 0.45))]; });
  pon({ voz: 'suelo', pts: suelo, pig: 0.55, agua: 0.15, carga: 0.75, gasto: 0.7, dur: 1.5, paso: 1 });
  for (let j = 0; j < 5; j++) { const x = ent(-0.3, 0.32); pon({ voz: 'musgo', pts: [[x, 0, 0.004], [x + ent(-0.01, 0.01), ent(0.015, 0.03), 0.0015]], pig: 0.7, agua: 0.1, carga: 0.8, gasto: 0.6, dur: 0.125, paso: 0.125 }); }
  // dónde va el sello: a la derecha del suelo
  return { pinceladas: out, sello: [0.62, 0.02] as [number, number] };
}
