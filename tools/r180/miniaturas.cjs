// RONDA 180 (rehecho el 28/10) · miniaturas del catálogo de secciones (/sistema/dev › Catálogo).
// Contra el servidor de desarrollo que ya corre (no lo arranca ni lo para): `node tools/r180/miniaturas.cjs [base] [id,id…]`.
// Chrome del sistema a 1440 × 900 (16:10), ?carga=0, otoño y movimiento reducido. Cada pieza: se coloca la sección en la ventana, se espera a que
// se pinte y se guarda la ventana entera reducida a 1200 px en public/media/sistema/catalogo/<id>.webp (calidad 78).
const path = require('path');
const { chromium } = require(process.env.PW_CORE || path.join(process.env.HOME, '.ship-studio/playwright-env/node_modules/playwright-core'));
const sharp = require('sharp');

const BASE = (process.argv[2] || 'http://localhost:3935').replace(/\/$/, '');
const SOLO = process.argv[3] ? process.argv[3].split(',') : null;
const OUT = path.join(__dirname, '../../public/media/sistema/catalogo');
const Q = 'carga=0&estacion=otono';
const W = 1440, H = 900;

// sel: el elemento que se coloca · al: 'arriba' (su borde de arriba al de la ventana), 'abajo' (su borde de abajo al de la ventana), 'px' (scrollY fijo)
// dy: desplazamiento extra (px) · antes: acción en la página antes de esperar · espera: ms
const PIEZAS = [
  { id: 'inicio-hero', url: '/', sel: '[data-hero]', al: 'arriba', espera: 3500 },
  // 28/10 · Eric: «esta foto la veo bastante rara»: las roble y raíces juntos, sin el cielo de Proyectos debajo
  { id: 'inicio-raices', url: '/', sel: '[data-raices]', al: 'abajo', dy: -40, espera: 7000 },
  { id: 'inicio-proyectos', url: '/', sel: '#proyectos', al: 'arriba', dy: 0.62, espera: 3500 },
  // 28/10 · Eric: «faltaría actualizar el hover con la pill de cambio de desktop/mobile»: el puntero encima de la primera pieza
  { id: 'inicio-mas-proyectos', url: '/', sel: '#anteriores', al: 'arriba', dy: 40, espera: 3000, antes: async (p) => { const c = p.locator('[data-celda]').first(); await c.hover(); await p.waitForTimeout(900); } },
  { id: 'inicio-servicios', url: '/', sel: '#servicios', al: 'arriba', dy: 40, espera: 3500 },
  { id: 'inicio-agentic', url: '/', sel: '#la-savvia', al: 'arriba', dy: 60, espera: 3500 },
  { id: 'inicio-estudio', url: '/', sel: '#estudio', al: 'arriba', dy: 80, espera: 3500 },
  { id: 'inicio-preguntas', url: '/', sel: '#preguntas', al: 'arriba', dy: 60, espera: 2500 },
  // 28/10 · Eric: «en foto el estado final de cada estación» (el vídeo cortaba los enlaces de arriba): una foto por estación, la ventana entera
  ...['otono', 'invierno', 'primavera', 'verano'].map((e) => ({ id: `inicio-pie-${e}`, url: '/', q: `carga=0&estacion=${e}`, sel: '#contacto', al: 'abajo', espera: 9000, antes: async (p) => { await p.addStyleTag({ content: 'header[data-nav]{opacity:0!important}' }); } })),
  { id: 'comun-menu', url: '/', sel: '[data-hero]', al: 'arriba', espera: 1500, antes: async (p) => { await p.click('[data-menu-boton], button[aria-controls="menu"]'); await p.waitForTimeout(1600); } },
  { id: 'comun-carga', url: '/', q: 'carga=1&estacion=otono', sel: null, espera: 2600 },
  { id: 'portfolio-todos', url: '/proyectos', sel: '[data-todos]', al: 'arriba', dy: -40, espera: 3500 },
  // 28/10 · las piezas nuevas del catálogo: el chat (abierto, fuera del hero), el mentor del portfolio y el visor
  { id: 'comun-chat', url: '/', sel: '#servicios', al: 'arriba', dy: 40, espera: 1800, antes: async (p) => { await p.waitForTimeout(800); await p.click('[data-cf-btn]'); await p.waitForTimeout(1400); } },
  { id: 'portfolio-mentor', url: '/proyectos', sel: '[data-mentor]:not([hidden])', al: 'arriba', dy: -120, espera: 4500 },
  { id: 'portfolio-visor', url: '/proyectos', sel: '[data-obra]', al: 'arriba', dy: -200, espera: 3500, antes: async (p) => { await p.click('[data-obra] a'); await p.waitForTimeout(2200); } },
  { id: 'caso-cabecera', url: '/proyectos/neety', sel: 'main', al: 'arriba', espera: 2500 },
  { id: 'caso-portada', url: '/proyectos/neety', sel: 'main .pz, main [class*="pieza"]', al: 'arriba', dy: -60, espera: 3000 },
  // 28/10 · Neety ya no enseña «Los detalles» (sinDetalles): se captura en Quantus
  { id: 'caso-detalles', url: '/proyectos/quantus', sel: '#det-h', al: 'arriba', dy: -64, espera: 3000 },
  { id: 'caso-sistema', url: '/proyectos/neety', sel: '#color-h', al: 'arriba', dy: -120, espera: 2500 },
  { id: 'caso-siguiente', url: '/proyectos/neety', sel: '#concl-h', al: 'arriba', dy: -80, espera: 2500 },
  { id: 'lab', url: '/lab', sel: null, espera: 4000 },
  { id: 'manifiesto-portada', url: '/manifiesto', sel: null, espera: 4500 },
  { id: 'manifiesto-texto', url: '/manifiesto', sel: '.texto .primero', al: 'arriba', dy: -220, espera: 4500 },
  { id: '404', url: '/esta-pagina-no-existe', sel: null, espera: 6000 },
];

(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  for (const z of PIEZAS) {
    if (SOLO && !SOLO.includes(z.id)) continue;
    // el servidor de desarrollo recarga la página si otra sesión guarda un archivo: hasta tres intentos
    for (let intento = 1; intento <= 3; intento++) {
      try { await pieza(ctx, z); break; } catch (e) { console.log(z.id, `intento ${intento} falló:`, String(e).split('\n')[0]); }
    }
  }
  await b.close();
})();

// dónde poner el scroll para colocar `sel` (dy entre −1 y 1 = fracción del alto del elemento)
const MEDIR = ({ sel, al, dy }) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  let y = al === 'abajo' ? scrollY + r.bottom - innerHeight : al === 'centro' ? scrollY + r.top + r.height / 2 - innerHeight / 2 : scrollY + r.top;
  y += Math.abs(dy) < 1 && dy !== 0 ? dy * r.height : dy;
  return Math.max(0, Math.round(y));
};

async function pieza(ctx, z) {
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(`${BASE}${z.url}?${z.q || Q}`, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(800);
    if (z.sel) {
      // bajar poco a poco hasta la sección (que los observadores de entrada y los lienzos se enteren), luego colocarla
      const y = await p.evaluate(MEDIR, { sel: z.sel, al: z.al, dy: z.dy || 0 });
      if (y == null) { console.log(z.id, 'SIN ELEMENTO', z.sel); await p.close(); return; }
      for (let s = 0; s < y; s += 600) { await p.evaluate((s) => scrollTo(0, s), s); await p.waitForTimeout(90); }
      // al bajar se cargan medios y la página cambia de alto: se vuelve a medir antes de colocar
      await p.waitForTimeout(400);
      const y2 = await p.evaluate(MEDIR, { sel: z.sel, al: z.al, dy: z.dy || 0 });
      await p.evaluate((y) => scrollTo(0, y), y2 ?? y);
    }
    // fuera de la foto: la barra de Agentation (en local va siempre)
    await p.addStyleTag({ content: '#reviewRoot,[class*="styles-module__"]{display:none!important}' });
    if (z.antes) await z.antes(p);
    await p.waitForTimeout(z.espera || 2500);
    const buf = await p.screenshot({ type: 'png' });
    const dst = path.join(OUT, `${z.id}.webp`);
    await sharp(buf).resize(1200, 750).webp({ quality: 78 }).toFile(dst);
    const kb = Math.round(require('fs').statSync(dst).size / 1024);
    console.log(z.id, `${kb} KB`, errs.length ? 'ERRORES: ' + errs.join(' | ').slice(0, 200) : '');
    await p.close();
}
