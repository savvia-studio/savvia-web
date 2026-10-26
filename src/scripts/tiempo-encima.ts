// EL TIEMPO ENCIMA (ronda 137, la 404; ronda 228, también la palabra «Contáctanos» del pie): lo que cae según la estación se POSA sobre la tinta del
// texto. Antes vivía dentro de `404/Cuatro.astro`; ahora es una función que sirve a los dos:
//  · sin `palabra`: el «404» en grande, que dibuja el propio lienzo (con su sol de verano y su sombra);
//  · con `palabra`: el elemento del DOM cuya tinta recoge lo que cae; el lienzo solo pinta lo posado (la luz del pie ya existe). `espera`: una promesa a
//    la que se aguarda antes de arrancar (el pie la resuelve cuando el paisaje está pintado y la palabra, descubierta).
type Est = 'invierno' | 'otono' | 'primavera' | 'verano';
type P = { x: number; y: number; vy: number; s: number; ph: number; f: number; a: number; va: number; sl: number; c: string; rest?: number };
type Fl = { x: number; y: number; t: number; tallo: number; inc: number; r: number; tipo: string; hoja: number };
type Br = { x: number; y: number; t: number; h: number; w: number; inc: number; cur: number; ph: number; c: string; esp: boolean };


export function tiempoEncima({ zona, cv, palabra, espera }: { zona: HTMLElement; cv: HTMLCanvasElement; palabra?: HTMLElement; espera?: Promise<unknown> }) {
    const c = cv.getContext('2d')!;
    const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    const C = 2; // celda de la máscara (px CSS)
    const leerEst = (): Est => (['invierno', 'otono', 'primavera', 'verano'].includes(html.dataset.estacion || '') ? (html.dataset.estacion as Est) : 'otono');
    const tinta = () => getComputedStyle(zona).getPropertyValue('--fg').trim() || '#eadde7';

    // capas
    const dig = document.createElement('canvas'), dx = dig.getContext('2d')!;      // las cifras, en su tinta
    const acc = document.createElement('canvas'), ax = acc.getContext('2d')!;      // lo posado
    const som = document.createElement('canvas'), sx = som.getContext('2d')!;      // verano: la sombra proyectada (alfa)
    const tmp = document.createElement('canvas'), tx = tmp.getContext('2d')!;      // verano: el haz menos la sombra
    const luz = document.createElement('canvas'), lx = luz.getContext('2d')!;      // verano: las cifras con su cara al sol
    let W = 0, H = 0, dpr = 1, GW = 0, GH = 0, mask = new Uint8Array(0);
    let suelo = 0, x0 = 0, x1 = 0, techo = 0, fs = 0, fam = 'Georgia, serif';
    let est: Est = leerEst(), parts: P[] = [], flores: Fl[] = [], hierba: Br[] = [], t = 0, emitidos = 0, raf = 0, visible = true, listo = false;
    let fade = 1, fadeMeta = 1, colorT = 0, mx = 0.5, mxT = 0.5;

    const solido = (cx: number, cy: number) => cx < 0 || cx >= GW || (cy >= 0 && (cy >= GH ? !palabra : mask[cy * GW + cx] > 0));
    const marcar = (x: number, y: number, rx: number, ry: number) => {
      const a = Math.floor((x - rx) / C), b = Math.ceil((x + rx) / C), d = Math.floor((y - ry) / C), e = Math.ceil((y + ry) / C);
      for (let cy = Math.max(0, d); cy <= Math.min(GH - 1, e); cy++)
        for (let cx = Math.max(0, a); cx <= Math.min(GW - 1, b); cx++) {
          const u = (cx * C + C / 2 - x) / rx, v = (cy * C + C / 2 - y) / ry;
          if (u * u + v * v <= 1) mask[cy * GW + cx] = 2;
        }
    };

    // ── cuánto cae, según el ancho (lo que se ve en un móvil ha de cuajar igual)
    const total = () => {
      const k = Math.max(0.3, (x1 - x0) / 1100);
      return est === 'invierno' ? Math.round(1900 * k) : est === 'otono' ? Math.round(300 * k) : 0;
    };
    const EMITIR = 15; // segundos que dura la nevada / la caída de hojas

    // ── las cifras y su máscara
    const preparar = () => {
      const r = zona.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      dpr = Math.min(2, devicePixelRatio || 1);
      for (const k of [cv, dig, acc, som, tmp, luz]) { k.width = Math.round(W * dpr); k.height = Math.round(H * dpr); }
      let bx = 0, by = 0, glifos: [string, number][] = [];
      if (palabra) {
        // LA PALABRA DEL PIE (ronda 228): el texto ya está maquetado en el DOM; se lee dónde cae cada letra (el rectángulo de su rango) y la línea base (una
        // sonda en línea sin alto), y se redibuja igual en la máscara: así lo que se posa asienta justo sobre la tinta real, con su interletraje y su kerning
        const cs = getComputedStyle(palabra), n = palabra.firstChild as Text;
        fs = parseFloat(cs.fontSize); fam = cs.fontFamily;
        const sonda = document.createElement('span'); sonda.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
        palabra.appendChild(sonda); by = sonda.getBoundingClientRect().bottom - r.top; sonda.remove();
        const txt = n.textContent || '', rg = document.createRange();
        for (let k = 0; k < txt.length; k++) { if (txt[k] === ' ') continue; rg.setStart(n, k); rg.setEnd(n, k + 1); glifos.push([txt[k], rg.getBoundingClientRect().left - r.left]); }
        const m = document.createElement('canvas').getContext('2d')!; m.font = `400 ${fs}px ${fam}`;
        const ult = glifos[glifos.length - 1];
        x0 = glifos[0][1]; x1 = ult[1] + m.measureText(ult[0]).width; suelo = by + fs * 0.01; techo = by - fs * 0.72;
        bx = 0;
      } else {
        const hueco = zona.querySelector<HTMLElement>('[data-cuatro-hueco]')!.getBoundingClientRect();
        const fila = zona.querySelector<HTMLElement>('[data-cuatro-suelo]')!;
        const fr = fila.getBoundingClientRect(), cs = getComputedStyle(fila);
        suelo = fr.top - r.top;
        const izq = fr.left - r.left + parseFloat(cs.paddingLeft), der = fr.right - r.left - parseFloat(cs.paddingRight);
        fam = getComputedStyle(zona.querySelector('.font-display') || document.body).fontFamily;
        const m = document.createElement('canvas').getContext('2d')!;
        m.font = `400 100px ${fam}`;
        const m0 = m.measureText('404');
        const anchoK = (m0.actualBoundingBoxLeft + m0.actualBoundingBoxRight) / 100;
        const altoK = m0.actualBoundingBoxAscent / 100;
        const cabeza = W < 700 ? 34 : 56; // el aire de encima, para las caperuzas y las flores
        fs = Math.min((der - izq) / anchoK, (suelo - (hueco.top - r.top) - cabeza) / altoK);
        m.font = `400 ${fs}px ${fam}`;
        const mm = m.measureText('404');
        const ancho = mm.actualBoundingBoxLeft + mm.actualBoundingBoxRight;
        bx = (izq + der) / 2 - ancho / 2 + mm.actualBoundingBoxLeft; // x del origen del texto
        by = suelo - mm.actualBoundingBoxDescent;                     // la tinta de abajo, justo en la línea
        x0 = (izq + der) / 2 - ancho / 2; x1 = x0 + ancho; techo = by - mm.actualBoundingBoxAscent;
      }
      // máscara a celdas
      GW = Math.ceil(W / C); GH = Math.ceil(H / C); mask = new Uint8Array(GW * GH);
      const g = document.createElement('canvas'); g.width = GW; g.height = GH;
      const gx = g.getContext('2d', { willReadFrequently: true })!;
      gx.scale(1 / C, 1 / C); gx.font = `400 ${fs}px ${fam}`; gx.fillStyle = '#fff';
      if (palabra) for (const [ch, gxp] of glifos) gx.fillText(ch, gxp, by); else gx.fillText('404', bx, by);
      const px = gx.getImageData(0, 0, GW, GH).data;
      for (let i = 0; i < GW * GH; i++) if (px[i * 4 + 3] > 120) mask[i] = 1;
      // el suelo (en la palabra, solo bajo ella: el resto del paisaje no recoge nada)
      for (let cy = Math.floor(suelo / C); cy < GH; cy++) { if (palabra) mask.fill(1, Math.max(0, Math.floor((x0 - 6) / C)) + cy * GW, Math.min(GW, Math.ceil((x1 + 6) / C)) + cy * GW); else mask.fill(1, cy * GW, (cy + 1) * GW); }
      (preparar as any).bx = bx; (preparar as any).by = by;
      pintarCifras();
      ax.setTransform(1, 0, 0, 1, 0, 0); ax.clearRect(0, 0, acc.width, acc.height); ax.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = []; t = 0; emitidos = 0;
      if (est === 'primavera') sembrarFlores();
      if (est === 'verano') { if (!palabra) prepararSombra(); sembrarHierba(); }
      listo = true;
    };
    const pintarCifras = () => {
      if (palabra) return; // la tinta es la del DOM
      dx.setTransform(1, 0, 0, 1, 0, 0); dx.clearRect(0, 0, dig.width, dig.height); dx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dx.font = `400 ${fs}px ${fam}`; dx.fillStyle = tinta(); dx.fillText('404', (preparar as any).bx, (preparar as any).by);
    };

    // ── INVIERNO y OTOÑO: lo que cae
    const HOJAS = ['#c65c2d', '#e0a03a', '#7a2e16', '#d98b3a', '#9c3b1c', '#efc070'];
    const nacer = (): P => {
      const enCifras = palabra ? true : Math.random() < 0.72;
      const x = enCifras ? x0 + Math.random() * (x1 - x0) : Math.random() * W;
      const inv = est === 'invierno';
      return {
        x, y: -10 - Math.random() * 40, vy: inv ? 58 + Math.random() * 44 : 46 + Math.random() * 30,
        s: inv ? (1.6 + Math.random() * 2.6) * (W < 700 ? 0.72 : 1) : (W < 700 ? 5 : 6.5) + Math.random() * (W < 700 ? 4 : 6),
        ph: Math.random() * 6.28, f: 0.5 + Math.random() * 0.8, a: Math.random() * 6.28, va: (Math.random() - 0.5) * 3, sl: 0,
        c: HOJAS[Math.floor(Math.random() * HOJAS.length)],
      };
    };
    const hoja = (k: CanvasRenderingContext2D, x: number, y: number, s: number, a: number, col: string, plana = 1) => {
      k.save(); k.translate(x, y); k.rotate(a); k.scale(1, plana); k.fillStyle = col;
      k.beginPath(); k.moveTo(0, -s); k.quadraticCurveTo(s * 0.8, 0, 0, s); k.quadraticCurveTo(-s * 0.8, 0, 0, -s); k.fill();
      k.strokeStyle = 'rgba(40,20,10,.35)'; k.lineWidth = Math.max(0.6, s * 0.08); k.beginPath(); k.moveTo(0, -s * 0.8); k.lineTo(0, s * 0.95); k.stroke();
      k.restore();
    };
    const posar = (p: P, yS: number) => {
      if (est === 'invierno') {
        const r = p.s * 1.15;
        // sombra fría por debajo (la nieve nueva sombrea a la de abajo: la caperuza gana volumen) y el copo
        const R = r * 1.5, g = ax.createRadialGradient(p.x, yS, 0, p.x, yS, R);
        g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.55, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        ax.fillStyle = g; ax.fillRect(p.x - R, yS - R, R * 2, R * 2);
        marcar(p.x, yS, r * 0.95, r * 0.8);
      } else {
        // se posa tal cual llegaba: mismo ángulo y misma forma que en el último fotograma de la caída
        const yy = yS + p.s * 0.1;
        ax.save(); ax.shadowColor = 'rgba(20,10,5,.35)'; ax.shadowBlur = 3; ax.shadowOffsetY = 1;
        hoja(ax, p.x, yy, p.s, p.a, p.c, 0.85 + 0.15 * Math.sin(p.ph * 3)); ax.restore();
        marcar(p.x, yy, p.s * 0.85, p.s * 0.55);
      }
    };
    const paso = (p: P, dt: number): boolean => {
      const inv = est === 'invierno';
      if (p.rest !== undefined) {
        // ya tocó: se asienta suave hasta su sitio, sin saltar (la forma y el ángulo se congelan al tocar)
        p.y += (p.rest - p.y) * Math.min(1, dt * 14);
        if (Math.abs(p.rest - p.y) < 0.3) { p.y = p.rest; posar(p, p.rest - p.s * 0.1); return false; }
        return true;
      }
      p.ph += dt * p.f; p.a += p.va * dt;
      p.x += (Math.sin(p.ph * (inv ? 1.1 : 1.6)) * (inv ? 10 : 26) + (inv ? 3 : 8)) * dt;
      let dy = p.vy * dt * (inv ? 1 : 0.85 + 0.3 * Math.sin(p.ph * 2.2));
      const bajo = inv ? p.s * 0.6 : p.s * 0.35;
      while (dy > 0) {
        const d = Math.min(dy, C * 0.9); dy -= d; p.y += d;
        const cx = Math.floor(p.x / C), cy = Math.floor((p.y + bajo) / C);
        if (cx < 0 || cx >= GW) return false;
        if (cy >= 0 && solido(cx, cy)) {
          // resbala por la pendiente (la nieve más que las hojas): caperuzas redondas, no torres
          const prob = inv ? 0.9 : 0.7, max = inv ? 8 : 5;
          if (p.sl < max && Math.random() < prob) {
            const s = Math.random() < 0.5 ? -1 : 1;
            for (const d2 of [s, -s]) if (!solido(cx + d2, cy) && !solido(cx + d2, cy - 1)) { p.x += d2 * C; p.sl++; return true; }
          }
          let yy = cy; while (yy > 0 && solido(cx, yy - 1)) yy--;
          const yS = yy * C - bajo + C * 0.5;
          if (inv) { posar(p, yS); return false; }
          p.rest = yS + p.s * 0.1; return true;
        }
      }
      return p.y < H + 40;
    };
    const avanzarCaida = (dt: number) => {
      const N = total();
      t += dt;
      const meta = Math.min(N, Math.round(N * Math.min(1, t / EMITIR) ** 1.1));
      const cap = est === 'invierno' ? 460 : 150;
      while (emitidos < meta && parts.length < cap) { parts.push(nacer()); emitidos++; }
      for (let i = parts.length - 1; i >= 0; i--) if (!paso(parts[i], dt)) parts.splice(i, 1);
      return emitidos < N || parts.length > 0;
    };

    // ── PRIMAVERA: flores que brotan por los cantos de arriba
    const FLORES = ['margarita', 'margarita', 'margarita', 'azul', 'azul', 'rosa'];
    const sembrarFlores = () => {
      const borde: [number, number][] = [];
      // el aire que ve el cielo (relleno desde arriba): el hueco cerrado del 0 no cuenta
      const cielo = new Uint8Array(GW * GH), pila: number[] = [];
      for (let cx = 0; cx < GW; cx++) if (!mask[cx]) { cielo[cx] = 1; pila.push(cx); }
      while (pila.length) { const i = pila.pop()!, cx = i % GW; for (const j of [i - GW, i + GW, cx > 0 ? i - 1 : -1, cx < GW - 1 ? i + 1 : -1]) if (j >= 0 && j < GW * GH && !mask[j] && !cielo[j]) { cielo[j] = 1; pila.push(j); } }
      for (let cy = 2; cy < Math.floor(suelo / C) - 1; cy++)
        for (let cx = 1; cx < GW - 1; cx++) {
          const i = cy * GW + cx;
          if (mask[i] === 1 && cielo[i - GW] && !mask[i - 2 * GW] && !mask[i - 3 * GW]) borde.push([cx * C + C / 2, cy * C]);
        }
      // también al pie, a ras de la línea, unas pocas
      const k = W < 700 ? 0.6 : 1;
      flores = [];
      if (!borde.length) return;
      const n = Math.round(110 * k);
      // en matas: centros sembrados por el borde, y flores alrededor
      const centros = Array.from({ length: Math.round(16 * k) }, () => borde[Math.floor(Math.random() * borde.length)]);
      for (let i = 0; i < n; i++) {
        const [cx0, cy0] = centros[i % centros.length];
        let best = borde[0], bd = 1e9;
        const tx2 = cx0 + (Math.random() - 0.5) * fs * 0.12;
        for (let j = 0; j < 40; j++) { const b = borde[Math.floor(Math.random() * borde.length)]; const d = Math.abs(b[0] - tx2) + Math.abs(b[1] - cy0) * 2; if (d < bd) { bd = d; best = b; } }
        const r = (W < 700 ? 2.4 : 3.2) + Math.random() * (W < 700 ? 2.2 : 3.6);
        flores.push({ x: best[0], y: best[1] + 0.5, t: 0.4 + ((best[0] - x0) / (x1 - x0)) * 9 + Math.random() * 3.5, tallo: 3 + Math.random() * (W < 700 ? 8 : 14), inc: (Math.random() - 0.5) * 0.5, r, tipo: FLORES[Math.floor(Math.random() * FLORES.length)], hoja: Math.random() });
      }
      for (let i = 0; i < Math.round(14 * k); i++) {
        const x = x0 - 20 + Math.random() * (x1 - x0 + 40);
        flores.push({ x, y: suelo, t: 2 + Math.random() * 10, tallo: 2 + Math.random() * 7, inc: (Math.random() - 0.5) * 0.4, r: 2 + Math.random() * 2.4, tipo: FLORES[Math.floor(Math.random() * FLORES.length)], hoja: Math.random() });
      }
      flores.sort((a, b) => a.y - b.y);
    };
    const florecilla = (k: CanvasRenderingContext2D, x: number, y: number, r: number, tipo: string, a: number, abre: number) => {
      const col = tipo === 'azul' ? '118,146,218' : tipo === 'rosa' ? '246,198,214' : '252,251,246';
      const n = tipo === 'margarita' ? 11 : 5, largo = (tipo === 'margarita' ? r * 1.25 : r * 0.95) * abre, ancho = (tipo === 'margarita' ? r * 0.3 : r * 0.55) * Math.max(0.4, abre);
      k.save(); k.translate(x, y); k.scale(1, 0.7);
      k.fillStyle = `rgba(${col},${a})`;
      for (let i = 0; i < n; i++) { const g = (i / n) * 6.283 + x; k.beginPath(); k.ellipse(Math.cos(g) * largo * 0.6, Math.sin(g) * largo * 0.6, Math.max(0.3, largo * 0.55), ancho, g, 0, 6.283); k.fill(); }
      k.fillStyle = tipo === 'margarita' ? `rgba(236,184,58,${a})` : `rgba(248,236,190,${a})`;
      k.beginPath(); k.arc(0, 0, (tipo === 'margarita' ? r * 0.38 : r * 0.26) * (0.5 + 0.5 * abre), 0, 6.283); k.fill();
      k.restore();
    };
    const flor = (k: CanvasRenderingContext2D, f: Fl, tt: number) => {
      const g = Math.min(1, Math.max(0, (tt - f.t) / 1.6)); if (g <= 0) return;
      const e = 1 - (1 - g) ** 3;
      const crece = Math.min(1, e * 1.5), abre = Math.max(0, (e - 0.45) / 0.55);
      const L = f.tallo * crece, tx2 = f.x + Math.sin(f.inc) * L, ty2 = f.y - Math.cos(f.inc) * L;
      k.strokeStyle = 'rgba(132,166,96,.95)'; k.lineWidth = W < 700 ? 0.9 : 1.1; k.lineCap = 'round';
      k.beginPath(); k.moveTo(f.x, f.y); k.quadraticCurveTo(f.x, f.y - L * 0.5, tx2, ty2); k.stroke();
      if (f.hoja > 0.45 && L > 4) { // una hojita en el tallo
        k.fillStyle = 'rgba(122,156,88,.9)'; const s = f.hoja > 0.7 ? 1 : -1, hy = f.y - L * 0.35;
        k.beginPath(); k.ellipse(f.x + s * 2.2 * crece, hy, 2.6 * crece, 1 * crece, s * -0.6, 0, 6.283); k.fill();
      }
      if (abre > 0) florecilla(k, tx2, ty2, f.r, f.tipo, 0.95, abre);
      else { k.fillStyle = 'rgba(160,190,120,.9)'; k.beginPath(); k.arc(tx2, ty2, 0.9 + crece, 0, 6.283); k.fill(); } // el capullo
    };

    // ── VERANO: la hierba (RONDA 178)
    const VERDES = ['#4f7a30', '#5f8c36', '#6f9c3c', '#86ad48', '#9dbb52', '#b5c75e', '#c9c66a', '#5a7d2c', '#3f6a2a'];
    const sembrarHierba = () => {
      hierba = [];
      const k = Math.max(0.35, (x1 - x0) / 1100), movil = W < 700;
      const ola = (x: number) => 0.2 + Math.max(0, Math.min(1, (x - x0) / (x1 - x0))) * 4.2;
      const brizna = (x: number, y: number, h: number, extra = 0): Br => ({
        x, y, h, t: ola(x) + extra + Math.random() * 2.2, w: (movil ? 1.1 : 1.6) + Math.random() * (movil ? 1.4 : 2.4),
        inc: (Math.random() - 0.5) * 0.5, cur: (Math.random() - 0.5) * 0.6, ph: Math.random() * 6.283,
        c: VERDES[Math.floor(Math.random() * VERDES.length)], esp: Math.random() < 0.05,
      });
      // los cantos que miran arriba (con aire encima), también el fondo del hueco del 0
      const borde: [number, number][] = [];
      for (let cy = 3; cy < Math.floor(suelo / C) - 1; cy++)
        for (let cx = 1; cx < GW - 1; cx++) {
          const i = cy * GW + cx;
          if (mask[i] === 1 && !mask[i - GW] && !mask[i - 2 * GW] && !mask[i - 3 * GW]) borde.push([cx * C + C / 2, cy * C + 1]);
        }
      if (borde.length) {
        const n = Math.round(Math.min(borde.length * 1.4, 900 * k));
        for (let i = 0; i < n; i++) {
          const [bx, by] = borde[Math.floor(Math.random() * borde.length)];
          hierba.push(brizna(bx + (Math.random() - 0.5) * C, by, 5 + Math.random() ** 1.6 * fs * (movil ? 0.13 : 0.16)));
        }
      }
      // a ras del suelo: en matas, más alta y espesa bajo las cifras, que se pierde hacia los lados
      // repartida por todo el ancho (no a puñados al azar, que dejaban una cifra pelada); las matas solo marcan dónde sube más
      const ext = (x1 - x0) * 0.18, span = x1 - x0 + ext * 2, nM = Math.round(18 * k);
      const matas = Array.from({ length: nM }, (_, i) => x0 - ext + ((i + 0.2 + Math.random() * 0.6) / nM) * span);
      const nS = Math.round(1300 * k);
      for (let i = 0; i < nS; i++) {
        const x = x0 - ext + ((i + Math.random()) / nS) * span;
        const dM = Math.min(...matas.map((m) => Math.abs(m - x))) / (span / nM), m = 0.55 + 0.45 * Math.max(0, 1 - dM * 1.4);
        const lado = x < x0 ? (x0 - x) / ext : x > x1 ? (x - x1) / ext : 0; if (lado >= 1) continue;
        const alto = (1 - lado * lado) * m * (8 + Math.random() ** 1.3 * fs * (movil ? 0.3 : 0.36));
        hierba.push(brizna(x, suelo + 1, alto, 0.4));
      }
      hierba.sort((a, b) => a.y - b.y || a.h - b.h);
    };
    const pintarHierba = (k: CanvasRenderingContext2D) => {
      const viento = reducido ? 0 : 1;
      for (const b of hierba) {
        const g = Math.min(1, Math.max(0, (t - b.t) / 2.4)); if (g <= 0) continue;
        const e = 1 - (1 - g) ** 3, L = b.h * e;
        // la brisa: una racha que recorre la hierba de izquierda a derecha, más en las puntas de las altas
        const sw = viento * (Math.sin(t * 1.3 + b.x * 0.012 + b.ph * 0.3) * 0.09 + Math.sin(t * 0.45 + b.x * 0.004) * 0.12) * Math.min(1, L / 60)
          + (mx - 0.5) * 0.18 * Math.min(1, L / 80);
        const lean = b.inc + sw, dxT = Math.sin(lean) * L + b.cur * L * 0.35, tx2 = b.x + dxT, ty2 = b.y - Math.cos(lean) * L;
        const cxp = b.x + dxT * 0.25 + b.cur * L * 0.25, cyp = b.y - L * 0.55, w = b.w * (0.5 + 0.5 * e);
        k.fillStyle = b.c;
        k.beginPath(); k.moveTo(b.x - w / 2, b.y);
        k.quadraticCurveTo(cxp - w * 0.3, cyp, tx2, ty2);
        k.quadraticCurveTo(cxp + w * 0.3, cyp, b.x + w / 2, b.y);
        k.closePath(); k.fill();
        if (b.esp && e > 0.85) { // una espiga
          k.fillStyle = '#d6c27a';
          k.beginPath(); k.ellipse(tx2, ty2 + 3, 1.6 + w * 0.3, 5, lean, 0, 6.283); k.fill();
        }
      }
    };

    // ── VERANO: el sol
    const ANG = 0.52; // la luz baja desde arriba a la izquierda (rad desde la vertical)
    const prepararSombra = () => {
      sx.setTransform(1, 0, 0, 1, 0, 0); sx.clearRect(0, 0, som.width, som.height);
      const L = Math.min(110, fs * 0.28), dxs = Math.sin(ANG), dys = Math.cos(ANG);
      sx.save();
      sx.beginPath(); sx.rect(0, 0, som.width, suelo * dpr); sx.clip(); // la sombra no pasa del suelo
      sx.filter = `blur(${Math.round(3 * dpr)}px)`;
      for (let i = 0; i <= 24; i++) { const k2 = (i / 24) * L * dpr; sx.globalAlpha = 1; sx.drawImage(dig, dxs * k2, dys * k2); }
      sx.filter = 'none'; sx.globalCompositeOperation = 'destination-out'; sx.drawImage(dig, 0, 0);
      sx.restore();
    };
    const motas = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random(), f: Math.random() * 10 }));
    const sol = (k: CanvasRenderingContext2D, dt: number) => {
      const off = (mx - 0.5) * W * 0.12;
      // el eje del haz: entra arriba a la izquierda de las cifras y cae sobre ellas
      const cxA = x0 + (x1 - x0) * 0.32 + off, ancho = Math.max(140, (x1 - x0) * 0.42);
      const tA = Math.tan(ANG);
      const top = -40, bot = suelo + 140;
      const xTop = cxA - (techo - top) * tA, xBot = cxA + (bot - techo) * tA;
      tx.setTransform(1, 0, 0, 1, 0, 0); tx.clearRect(0, 0, tmp.width, tmp.height); tx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // el resplandor del sol, arriba
      const g0 = tx.createRadialGradient(xTop, 0, 0, xTop, 0, W * 0.5);
      g0.addColorStop(0, 'rgba(255,214,140,.17)'); g0.addColorStop(0.3, 'rgba(255,200,124,.07)'); g0.addColorStop(0.65, 'rgba(255,196,120,.02)'); g0.addColorStop(1, 'rgba(255,190,110,0)'); // RONDA 138 · más sutil
      tx.fillStyle = g0; tx.fillRect(0, 0, W, H);
      // el haz: una banda oblicua de bordes blandos. RONDA 138 · Andoni: «el rayo de sol tiene un corte raro por arriba, y hacerlo un poco más sutil»:
      // el canto de arriba del rectángulo asomaba en diagonal por la esquina → la banda arranca muy por encima del lienzo (su canto nunca se ve) y
      // se funde desde arriba (máscara vertical más abajo); intensidad ~60 % de la de antes y bordes más largos.
      tx.save(); tx.translate(xTop, top); tx.rotate(-ANG);
      const len = Math.hypot(xBot - xTop, bot - top);
      const gb = tx.createLinearGradient(-ancho / 2, 0, ancho / 2, 0);
      gb.addColorStop(0, 'rgba(255,220,150,0)'); gb.addColorStop(0.18, 'rgba(255,218,150,.035)'); gb.addColorStop(0.35, 'rgba(255,218,150,.10)'); gb.addColorStop(0.5, 'rgba(255,226,165,.15)'); gb.addColorStop(0.65, 'rgba(255,218,150,.10)'); gb.addColorStop(0.82, 'rgba(255,218,150,.035)'); gb.addColorStop(1, 'rgba(255,220,150,0)');
      tx.fillStyle = gb; tx.fillRect(-ancho / 2, -len, ancho, len * 2);
      tx.restore();
      // la sombra de las cifras se come la luz
      tx.setTransform(1, 0, 0, 1, 0, 0); tx.globalCompositeOperation = 'destination-out'; tx.globalAlpha = 0.7; tx.drawImage(som, 0, 0);
      tx.globalAlpha = 1; tx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // la luz se apaga al llegar al suelo (sin canto)
      tx.globalCompositeOperation = 'destination-in';
      const gv = tx.createLinearGradient(0, 0, 0, suelo + 90);
      // RONDA 138 · y también entra fundida desde arriba: sin canto en el borde superior
      const fArr = Math.min(0.42, (techo * 0.85) / (suelo + 90));
      gv.addColorStop(0, 'rgba(0,0,0,.18)'); gv.addColorStop(fArr * 0.5, 'rgba(0,0,0,.6)'); gv.addColorStop(fArr, 'rgba(0,0,0,1)'); gv.addColorStop(Math.max(fArr + 0.01, (suelo - 60) / (suelo + 90)), 'rgba(0,0,0,.9)'); gv.addColorStop(1, 'rgba(0,0,0,0)');
      tx.fillStyle = gv; tx.fillRect(0, 0, W, H);
      tx.globalCompositeOperation = 'source-over';
      // motas de polvo, solo dentro del haz
      tx.fillStyle = 'rgb(255,240,205)';
      for (const m of motas) {
        m.f += dt; if (!reducido) { m.y -= (0.004 + m.z * 0.006) * dt; m.x += Math.sin(m.f * 0.5) * 0.003 * dt; }
        if (m.y < 0) { m.y = 1; m.x = Math.random(); }
        const yy = m.y * suelo, axe = xTop + (yy - top) * tA, xx = axe + (m.x - 0.5) * ancho * 0.9;
        const dd = Math.abs(xx - axe) / (ancho / 2), a = Math.max(0, 1 - dd * dd) * (0.35 + 0.4 * (0.5 + 0.5 * Math.sin(m.f * 1.7)));
        tx.globalAlpha = a; tx.beginPath(); tx.arc(xx, yy, 0.7 + m.z * 1.5, 0, 6.283); tx.fill();
      }
      tx.globalAlpha = 1;
      k.globalCompositeOperation = 'lighter'; k.drawImage(tmp, 0, 0, W, H); k.globalCompositeOperation = 'source-over';
      return [xTop, top, cxA, ancho] as const;
    };

    // ── el fotograma
    const dibujar = (dt: number) => {
      c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height); c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.globalAlpha = 1;
      if (est === 'verano') {
        mx += (mxT - mx) * Math.min(1, dt * 2.5);
        c.globalAlpha = fade;
        if (palabra) { // solo la hierba: la luz es la del pie
          lx.setTransform(1, 0, 0, 1, 0, 0); lx.clearRect(0, 0, luz.width, luz.height); lx.setTransform(dpr, 0, 0, dpr, 0, 0);
          pintarHierba(lx); c.globalAlpha = 1; c.drawImage(luz, 0, 0, W, H); return;
        }
        const [xTop, top, , ancho] = sol(c, dt);
        // las cifras, y su cara al sol dorada (la banda del haz, solo sobre la tinta)
        lx.setTransform(1, 0, 0, 1, 0, 0); lx.clearRect(0, 0, luz.width, luz.height); lx.drawImage(dig, 0, 0);
        lx.setTransform(dpr, 0, 0, dpr, 0, 0);
        pintarHierba(lx); // la hierba, delante de las cifras y bajo el mismo haz que las dora
        lx.globalCompositeOperation = 'source-atop';
        lx.save(); lx.translate(xTop, top); lx.rotate(-ANG);
        const gb = lx.createLinearGradient(-ancho / 2, 0, ancho / 2, 0);
        gb.addColorStop(0, 'rgba(255,196,118,0)'); gb.addColorStop(0.5, 'rgba(255,204,128,.3)'); gb.addColorStop(1, 'rgba(255,196,118,0)');
        lx.fillStyle = gb; lx.fillRect(-ancho / 2, 0, ancho, H * 2); lx.restore();
        lx.globalCompositeOperation = 'source-over';
        c.globalAlpha = 1; c.drawImage(luz, 0, 0, W, H);
        return;
      }
      if (!palabra) c.drawImage(dig, 0, 0, W, H);
      c.globalAlpha = fade;
      if (est === 'invierno') { c.save(); c.shadowColor = 'rgba(70,86,116,.38)'; c.shadowBlur = 5 * dpr; c.shadowOffsetY = 2 * dpr; c.drawImage(acc, 0, 0, W, H); c.restore(); }
      else c.drawImage(acc, 0, 0, W, H);
      if (est === 'invierno') {
        // los copos van a una capa y se pintan de una vez con una sombra fría (blanco sobre nieve no se vería)
        lx.setTransform(1, 0, 0, 1, 0, 0); lx.clearRect(0, 0, luz.width, luz.height); lx.setTransform(dpr, 0, 0, dpr, 0, 0);
        lx.fillStyle = '#fff';
        for (const p of parts) { lx.globalAlpha = (0.65 + 0.35 * Math.min(1, p.s / 3.5)) * Math.min(1, Math.max(0, p.y + p.s) / 110); lx.beginPath(); lx.arc(p.x, p.y, p.s, 0, 6.283); lx.fill(); }
        lx.globalAlpha = 1;
        c.save(); c.globalAlpha = fade; c.shadowColor = 'rgba(70,86,116,.45)'; c.shadowBlur = 3 * dpr; c.shadowOffsetY = 1 * dpr; c.drawImage(luz, 0, 0, W, H); c.restore();
      } else if (est === 'otono') {
        for (const p of parts) { c.globalAlpha = fade * Math.min(1, Math.max(0, p.y + p.s) / 110); hoja(c, p.x, p.y, p.s, p.a, p.c, 0.85 + 0.15 * Math.sin(p.ph * 3)); }
      } else if (est === 'primavera') {
        for (const f of flores) flor(c, f, t);
      }
      c.globalAlpha = 1;
    };

    // ¿queda algo por moverse?
    const vivo = () => {
      if (fadeMeta !== fade || colorT > 0) return true;
      if (est === 'verano') return !reducido;
      if (est === 'primavera') return flores.some((f) => t < f.t + 1.7);
      return emitidos < total() || parts.length > 0;
    };
    let tAnt = 0;
    const bucle = (ahora: number) => {
      raf = 0;
      const dt = Math.min(0.05, tAnt ? (ahora - tAnt) / 1000 : 0.016); tAnt = ahora;
      if (colorT > 0) { colorT -= dt; pintarCifras(); if (est === 'verano' && !palabra) prepararSombra(); }
      fade += (fadeMeta - fade) * Math.min(1, dt * 4);
      if (Math.abs(fadeMeta - fade) < 0.01) fade = fadeMeta;
      if (fadeMeta === 0 && fade === 0) { est = leerEst(); preparar(); fade = 1; fadeMeta = 1; colorT = 2.6; }
      else if (est === 'invierno' || est === 'otono') avanzarCaida(dt);
      else t += dt;
      dibujar(dt);
      pedir();
    };
    function pedir() { if (!raf && visible && !document.hidden && listo && vivo()) { if (!raf) raf = requestAnimationFrame(bucle); } }
    const despertar = () => { tAnt = 0; pedir(); };

    // movimiento reducido (o al cambiar de tamaño ya terminado): se adelanta la escena hasta su final, sin pintar, y se pinta una vez
    const adelantar = () => {
      if (est === 'invierno' || est === 'otono') { let n = 0; while (avanzarCaida(1 / 30) && n++ < 30 * 60); }
      else t = 99;
      dibujar(0);
    };
    let terminado = false;
    const arrancar = () => {
      preparar();
      if (reducido || terminado) adelantar(); else despertar();
    };

    // la estación cambia en vivo (el icono de la barra)
    new MutationObserver(() => {
      if (leerEst() === est && fadeMeta === 1) return;
      if (reducido) { est = leerEst(); setTimeout(() => { preparar(); adelantar(); }, 1300); return; }
      terminado = false; fadeMeta = 0; despertar();
    }).observe(html, { attributes: true, attributeFilter: ['data-estacion'] });

    zona.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' && est === 'verano') { mxT = e.clientX / innerWidth; } });
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; despertar(); }).observe(zona);
    document.addEventListener('visibilitychange', despertar);
    let rt = 0, w0 = 0, h0 = 0;
    new ResizeObserver(() => {
      const r = zona.getBoundingClientRect();
      if (Math.abs(r.width - w0) < 2 && Math.abs(r.height - h0) < 2) return;
      w0 = r.width; h0 = r.height;
      clearTimeout(rt); rt = window.setTimeout(() => { if (!listo) return; terminado = terminado || !vivo(); arrancar(); }, 160);
    }).observe(zona);
    if (!palabra) (window as any).__cuatro = () => ({ est, emitidos, total: total(), vivas: parts.length, flores: flores.filter((f) => t > f.t + 1.6).length, de: flores.length, hierba: hierba.length, terminado: listo && !vivo(), x0, x1, suelo, techo, fs });
    document.fonts.ready.then(() => espera).then(() => { cv.classList.add('listo'); arrancar(); });
}
