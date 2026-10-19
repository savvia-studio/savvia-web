// RONDA 138 · «se construye»: capas HTML/GSAP que montan cada web dentro de su pantalla antes de que la grabación real la sustituya.
// Cajas medidas en un fotograma de cada grabación (fracciones de la pantalla). Todo seek-safe: tl.set/fromTo con tiempos absolutos.
const T = 0.6455 * 0.62; // ronda 240: la construcción, más rápida (cabe en tres pulsos)
const f30 = (x) => Math.round(x * 30) / 30;
const hsh = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const AG = {
  claude: { n: 'Claude', c: '#ff616b' },
  codex: { n: 'Codex', c: '#96bfe6' },
  diseno: { n: 'Diseño', c: '#eadde7' },
  savvia: { n: 'savvia', c: '#ff616b' },
};
const flecha = (c) => `<svg viewBox="0 0 20 24" width="100%" height="100%"><path d="M2 2 L2 19 L6.6 14.8 L9.6 21.6 L12.6 20.3 L9.7 13.6 L16 13.4 Z" fill="${c}" stroke="#302018" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function build(o) {
  const { id, W, H, ink, bg, t0, take } = o;
  const s = o.s ?? Math.min(1.25, W / 1320);
  const X = (f) => +(f * W).toFixed(1), Y = (f) => +(f * H).toFixed(1);
  const TT = T * (o.k ?? 1); // ronda 250: la construcción, más pausada si se pide
  const bt = (b) => f30(t0 + b * TT);
  let h = `<div class="bld" id="${id}" style="width:${W}px;height:${H}px;background:${bg};--ink:${ink};--s:${s}">`;
  let g = `<div class="ghost" id="${id}g" style="width:${W}px;height:${H}px;--s:${s}">`;
  let a = `<div class="ags" id="${id}a" style="width:${W}px;height:${H}px;--s:${s}">`;
  let js = '';
  // retícula: columnas + líneas de base
  const m0 = o.margin ?? 0.06, cols = o.cols ?? 12;
  for (let c = 0; c <= cols; c++) h += `<i class="gl" style="left:${X(m0 + (1 - 2 * m0) * c / cols)}px"></i>`;
  (o.hlines ?? [0.075]).forEach((y) => (h += `<i class="gh" style="top:${Y(y)}px"></i>`));
  js += `tl.fromTo('#${id} .gl', { scaleY: 0 }, { scaleY: 1, duration: .5, ease: 'expo.out', stagger: { each: .025, from: 'center' }, immediateRender: false }, ${bt(0)});
tl.fromTo('#${id} .gh', { scaleX: 0 }, { scaleX: 1, duration: .55, ease: 'expo.out', immediateRender: false }, ${bt(0.1)});\n`;
  // cajas
  const objetivo = new Set((o.chips || []).map((c) => c.to));
  o.boxes.forEach((b, i) => {
    const x = X(b.x), y = Y(b.y), w = X(b.w), hh = Y(b.h);
    let inner = '';
    if (b.k === 'txt') {
      const n = b.n || 1, fila = hh / n, bh = Math.max(3, fila * (b.big ? 0.58 : 0.42));
      for (let l = 0; l < n; l++) {
        const ww = w * (l === n - 1 && n > 1 ? 0.5 + 0.25 * hsh(i * 9 + l) : 0.84 + 0.16 * hsh(i * 7 + l));
        const left = b.c ? (w - ww) / 2 : 0;
        inner += `<i class="bar" style="left:${left.toFixed(1)}px;top:${(l * fila + (fila - bh) / 2).toFixed(1)}px;width:${ww.toFixed(1)}px;height:${bh.toFixed(1)}px"></i>`;
      }
      inner = `<div class="bars">${inner}</div>`;
    } else if (b.k === 'row') {
      const n = b.n || 3, gap = Math.min(10 * s, w / n * 0.18), cw = (w - gap * (n - 1)) / n;
      for (let l = 0; l < n; l++) inner += `<i class="cell" style="left:${(l * (cw + gap)).toFixed(1)}px;width:${cw.toFixed(1)}px"></i>`;
    } else if (b.k === 'logo') {
      inner = `<i class="bar" style="left:0;top:20%;width:100%;height:60%"></i>`;
    } else if (b.k === 'btn' || b.k === 'rect') {
      inner = `<i class="bar" style="left:28%;top:38%;width:44%;height:24%"></i>`;
    } else if (b.k === 'img') {
      inner = `<svg class="cruzx" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0 L100 100 M100 0 L0 100" vector-effect="non-scaling-stroke"/></svg>`;
    } else if (b.k === 'code') {
      inner = `<div class="cbar"><i></i><i></i><i></i></div>`;
      const cols3 = ['rgba(var(--ink),.35)', '#ff616b', '#96bfe6', 'rgba(var(--ink),.2)'];
      for (let l = 0; l < 6; l++) {
        const top = 18 + l * 12.5, ww = 25 + 55 * hsh(i * 13 + l);
        inner += `<i class="cl" style="top:${top}%;left:${l % 3 === 2 ? 10 : 5}%;width:${ww.toFixed(1)}%;background:${cols3[l % 4]}"></i>`;
      }
    }
    if (b.fill) inner = `<div class="fl" style="background:${b.fill}"></div>` + inner;
    const lb = b.l ? `<span class="lb">${esc(b.l)}</span>` : '';
    h += `<div class="bx k-${b.k}" id="${id}b${i}" style="left:${x}px;top:${y}px;width:${w}px;height:${hh}px">${inner}${lb}</div>`;
    if (b.l) g += `<div class="gx k-${b.k}" style="left:${x}px;top:${y}px;width:${w}px;height:${hh}px"><span>${esc(b.l)} ✓</span></div>`;
    // aparición: dibujo de izquierda a derecha (o pop para pegatinas)
    const tDraw = b.at != null ? bt(b.at) : f30(bt(0.25) + i * 0.055);
    if (b.pop) js += `tl.fromTo('#${id}b${i}', { opacity: 1, scale: 0 }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2.4)', immediateRender: false }, ${tDraw});\n`;
    else js += `tl.fromTo('#${id}b${i}', { opacity: 0, scaleX: .55 }, { opacity: 1, scaleX: 1, duration: .38, ease: 'expo.out', immediateRender: false }, ${tDraw});\n`;
    if (b.from) {
      js += `tl.set('#${id}b${i}', { x: ${X(b.from[0])}, y: ${Y(b.from[1])} }, 0);
tl.to('#${id}b${i}', { x: 0, y: 0, duration: .6, ease: 'expo.out' }, ${f30(bt(o.snap ?? 2.4) + (o.snapEach ?? 0.05) * i)});\n`;
    }
    if (!objetivo.has(i)) {
      const tf = b.pop && b.fill ? f30(tDraw + 0.12) : f30(bt(o.fillAt ?? 2.5) + 0.03 * i);
      if (b.fill) js += `tl.fromTo('#${id}b${i} .fl', { opacity: 0 }, { opacity: 1, duration: .3, ease: 'power2.out', immediateRender: false }, ${tf});\n`;
      if (b.k === 'txt') js += `tl.fromTo('#${id}b${i} .bars', { opacity: .32 }, { opacity: 1, duration: .3, ease: 'power2.out', immediateRender: false }, ${tf});\n`;
    }
  });
  // agentes (cursores con nombre)
  (o.agents || []).forEach((ag, j) => {
    const A = AG[ag.k], cid = `${id}c${j}`, p = ag.path;
    a += `<div class="cu" id="${cid}"><i class="fx">${flecha(A.c)}</i><span class="nm" style="background:${A.c}">${A.n}</span></div>`;
    js += `tl.set('#${cid}', { x: ${X(p[0][0])}, y: ${Y(p[0][1])}, opacity: 0 }, 0);
tl.to('#${cid}', { opacity: 1, duration: .2 }, ${bt(p[0][2])});\n`;
    for (let k = 1; k < p.length; k++) {
      const d = f30((p[k][2] - p[k - 1][2]) * TT * 0.82);
      js += `tl.to('#${cid}', { x: ${X(p[k][0])}, y: ${Y(p[k][1])}, duration: ${d}, ease: 'power3.inOut' }, ${f30(bt(p[k][2]) - d)});\n`;
    }
    js += `tl.to('#${cid}', { opacity: 0, duration: .25 }, ${f30(take - 0.1)});\n`;
  });
  // fichas (tokens / componentes) que el agente suelta en su caja
  (o.chips || []).forEach((c, j) => {
    const ag = o.agents[c.a], pt = ag.path.find((q) => q[2] === c.b) || ag.path[1];
    const cid = `${id}h${j}`, b = o.boxes[c.to], fs = 13 * s;
    const ancho = (c.txt.length * 0.62 * fs + (c.sw ? 18 * s : 0) + 24 * s) / 2;
    a += `<div class="ch" id="${cid}">${c.sw ? `<i style="background:${c.sw}"></i>` : ''}${esc(c.txt)}</div>`;
    const cx = X(b.x + b.w / 2) - ancho, cy = Y(b.y + b.h / 2) - 14 * s;
    const t = bt(c.b);
    js += `tl.set('#${cid}', { x: ${X(pt[0]) + 16 * s}, y: ${Y(pt[1]) + 22 * s}, scale: .6, opacity: 0 }, 0);
tl.to('#${cid}', { scale: 1, opacity: 1, duration: .18, ease: 'back.out(2)' }, ${f30(t - 0.05)});
tl.to('#${cid}', { x: ${cx.toFixed(1)}, y: ${cy.toFixed(1)}, duration: .4, ease: 'power3.inOut' }, ${f30(t + 0.12)});
tl.to('#${cid}', { scale: .5, opacity: 0, duration: .16, ease: 'power2.in' }, ${f30(t + 0.5)});
tl.fromTo('#${id}b${c.to}', { scale: 1.04 }, { scale: 1, duration: .45, ease: 'expo.out', immediateRender: false }, ${f30(t + 0.52)});\n`;
    if (b.fill) js += `tl.fromTo('#${id}b${c.to} .fl', { opacity: 0 }, { opacity: 1, duration: .3, ease: 'power2.out', immediateRender: false }, ${f30(t + 0.5)});\n`;
    if (b.k === 'txt') js += `tl.fromTo('#${id}b${c.to} .bars', { opacity: .32 }, { opacity: 1, duration: .3, ease: 'power2.out', immediateRender: false }, ${f30(t + 0.5)});\n`;
  });
  // la orden (línea de comandos) que el agente recibe, y el visto bueno al publicar
  const P = AG[o.prompt.k], n = o.prompt.txt.length;
  a += `<div class="prw"${o.promptTop != null ? ` style="top:${o.promptTop * 100}%;bottom:auto"` : ''}><div class="pr" data-layout-allow-overlap id="${id}p"><i style="background:${P.c}"></i><b>${P.n}</b><span class="gt">›</span><span class="tx">${esc(o.prompt.txt)}</span><span class="ok">✓ publicado</span></div></div>`;
  js += `tl.fromTo('#${id}p', { y: ${16 * s}, opacity: 0 }, { y: 0, opacity: 1, duration: .4, ease: 'expo.out', immediateRender: false }, ${bt(0.05)});
tl.fromTo('#${id}p .tx', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: ${f30(Math.min(1.05, n * 0.03))}, ease: 'steps(${n})', immediateRender: false }, ${bt(0.2)});
tl.set(['#${id}p .tx', '#${id}p .gt', '#${id}p b', '#${id}p i'], { opacity: 0 }, ${f30(take - 0.25)});
tl.set('#${id}p .ok', { opacity: 1 }, ${f30(take - 0.25)});
tl.to('#${id}p', { opacity: 0, y: ${-8 * s}, duration: .35, ease: 'power2.in' }, ${f30(take + 0.55)});\n`;
  // relevo: una línea de savia barre de arriba abajo y descubre la web en vivo; quedan un instante las guías detectadas
  h += `</div>`;
  g += `</div>`;
  a += `<i class="scan" id="${id}s" style="width:${W}px"></i></div>`;
  js += `tl.fromTo('#${id}', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(100% 0% 0% 0%)', duration: .55, ease: 'power2.inOut', immediateRender: false }, ${f30(take)});
tl.fromTo('#${id}s', { y: 0, opacity: 1 }, { y: ${H}, duration: .55, ease: 'power2.inOut', immediateRender: false }, ${f30(take)});
tl.set('#${id}s', { opacity: 0 }, ${f30(take + 0.57)});
tl.set('#${id}g', { opacity: 1 }, ${f30(take)});
tl.to('#${id}g', { opacity: 0, duration: .5, ease: 'power1.in' }, ${f30(take + 0.45)});\n`;
  return { html: h + g + a, js };
}

const CSS = `
/* — capa de construcción — */
.bld { position: absolute; left: 0; top: 0; overflow: hidden; z-index: 3; }
.bld .gl { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(var(--ink), .09); transform-origin: 50% 0; transform: scaleY(0); }
.bld .gh { position: absolute; left: 0; right: 0; height: 1px; background: rgba(var(--ink), .14); transform-origin: 0 50%; transform: scaleX(0); }
.bx { position: absolute; border: 1px dashed rgba(var(--ink), .42); border-radius: calc(4px * var(--s)); opacity: 0; transform-origin: 0 50%; }
.bx.k-btn { border-radius: 999px; } .bx.k-circ { border-radius: 50%; transform-origin: 50% 50%; } .bx.k-pan { border-radius: calc(16px * var(--s)); }
.bx.k-code { border-radius: calc(12px * var(--s)); background: rgba(var(--ink), .03); }
.bx .bars { position: absolute; inset: 0; opacity: .32; }
.bx .bar { position: absolute; display: block; background: rgba(var(--ink), .38); border-radius: calc(3px * var(--s)); }
.bx .cell { position: absolute; top: 0; bottom: 0; display: block; border-radius: calc(3px * var(--s)); background: rgba(var(--ink), .12); }
.bx .fl { position: absolute; inset: 0; border-radius: inherit; opacity: 0; }
.bx .cruzx { position: absolute; inset: 0; width: 100%; height: 100%; } .bx .cruzx path { stroke: rgba(var(--ink), .22); stroke-width: 1; fill: none; }
.bx .cbar { position: absolute; left: 4%; top: 6%; display: flex; gap: calc(5px * var(--s)); }
.bx .cbar i { width: calc(7px * var(--s)); height: calc(7px * var(--s)); border-radius: 50%; background: rgba(var(--ink), .25); display: block; }
.bx .cl { position: absolute; display: block; height: calc(5px * var(--s)); border-radius: 3px; }
.bx .lb { position: absolute; left: calc(5px * var(--s)); top: calc(4px * var(--s)); font: 400 calc(11px * var(--s))/1 'Areal Mono', ui-monospace, monospace; letter-spacing: .03em;
  color: rgba(var(--ink), .62); white-space: nowrap; z-index: 2; }
.ghost { position: absolute; left: 0; top: 0; opacity: 0; z-index: 4; pointer-events: none; }
.gx { position: absolute; border: 1px solid rgba(255, 97, 107, .9); border-radius: calc(4px * var(--s)); }
.gx.k-btn { border-radius: 999px; } .gx.k-circ { border-radius: 50%; } .gx.k-pan { border-radius: calc(16px * var(--s)); }
.gx span { position: absolute; left: -1px; top: -1px; transform: translateY(-100%); padding: calc(3px * var(--s)) calc(6px * var(--s)); background: #ff616b; color: #302018;
  font: 400 calc(11px * var(--s))/1 'Areal Mono', ui-monospace, monospace; white-space: nowrap; border-radius: calc(3px * var(--s)) calc(3px * var(--s)) 0 0; }
.ags { position: absolute; left: 0; top: 0; z-index: 5; pointer-events: none; }
.cu { position: absolute; left: 0; top: 0; opacity: 0; }
.cu .fx { position: absolute; left: 0; top: 0; width: calc(20px * var(--s)); height: calc(24px * var(--s)); display: block; filter: drop-shadow(0 2px 6px rgba(20,12,8,.35)); }
.cu .nm { position: absolute; left: calc(15px * var(--s)); top: calc(21px * var(--s)); padding: calc(4px * var(--s)) calc(8px * var(--s)); border-radius: 999px; color: #302018;
  font: 500 calc(12px * var(--s))/1 'Areal Mono', ui-monospace, monospace; white-space: nowrap; box-shadow: 0 0 0 1px rgba(48,32,24,.18); }
.ch { position: absolute; left: 0; top: 0; opacity: 0; display: flex; align-items: center; gap: calc(7px * var(--s)); padding: calc(7px * var(--s)) calc(12px * var(--s)); border-radius: 999px;
  background: rgba(48, 32, 24, .94); color: #eadde7; border: 1px solid rgba(234, 221, 231, .2); font: 400 calc(13px * var(--s))/1 'Areal Mono', ui-monospace, monospace; white-space: nowrap;
  transform-origin: 0 50%; box-shadow: 0 8px 24px rgba(20, 12, 8, .3); }
.ch i { width: calc(11px * var(--s)); height: calc(11px * var(--s)); border-radius: 50%; display: block; box-shadow: 0 0 0 1px rgba(234,221,231,.35); }
.prw { position: absolute; left: 0; right: 0; bottom: 4%; display: flex; justify-content: center; }
.pr { position: relative; display: flex; align-items: center; gap: calc(9px * var(--s)); padding: calc(10px * var(--s)) calc(18px * var(--s)) calc(10px * var(--s)) calc(14px * var(--s)); border-radius: 999px;
  background: rgba(48, 32, 24, .94); color: #eadde7; font: 400 calc(15px * var(--s))/1 'Areal Mono', ui-monospace, monospace; white-space: nowrap; opacity: 0;
  box-shadow: 0 0 0 1px rgba(234,221,231,.16), 0 14px 40px rgba(20, 12, 8, .35); }
.pr i { width: calc(9px * var(--s)); height: calc(9px * var(--s)); border-radius: 50%; display: block; }
.pr b { font-weight: 500; } .pr .gt { color: #ff616b; }
.pr .tx { clip-path: inset(0% 100% 0% 0%); }
.pr .ok { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; border-radius: 999px; opacity: 0; color: #96bfe6; background: #302018; }
.scan { position: absolute; left: 0; top: 0; height: 2px; background: #ff616b; box-shadow: 0 0 16px rgba(255, 97, 107, .9), 0 0 2px #ff616b; opacity: 0; }
`;
module.exports = { build, CSS, AG };
