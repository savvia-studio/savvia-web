// RONDA 269 · los estilos de las aficiones ANIMADOS para el artefacto: vídeo de Playwright (Chrome, 1280 × 720), primero se pasa por Andoni y luego por
// Eric; recortado a la pareja con ffmpeg → scratchpad/aficiones-artefacto/vid/<nombre>.mp4 (bucle, mudo)
// node tools/r268-comparar/grabar.cjs <nombre> <equipo|''>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const { execFileSync } = require('child_process'), fs = require('fs'), path = require('path');
const BASE = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
const TMP = BASE + 'vid-tmp', OUT = BASE + 'aficiones-artefacto/vid'; fs.mkdirSync(TMP, { recursive: true }); fs.mkdirSync(OUT, { recursive: true });
const [nombre, eq = ''] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent, recordVideo: { dir: TMP, size: { width: 1280, height: 720 } } });
  const p = await ctx.newPage(); const t0 = Date.now(); const m = {};
  await p.goto(`http://localhost:4332/?carga=0${eq ? '&equipo=' + eq : ''}`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelector('[data-juntos]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1800);
  await p.evaluate(() => { const o = () => { for (const el of document.querySelectorAll('body *')) if (getComputedStyle(el).position === 'fixed') { el.style.visibility = 'hidden'; el.style.opacity = '0'; } }; o(); setInterval(o, 250); });
  await p.waitForTimeout(600);
  const r = await (await p.$('[data-juntos]')).boundingBox();
  m.a = (Date.now() - t0) / 1000;
  await p.mouse.move(r.x + r.width * 0.39, r.y + r.height * 0.5, { steps: 6 }); await p.waitForTimeout(3600);
  await p.mouse.move(r.x + r.width * 0.58, r.y + r.height * 0.5, { steps: 10 }); await p.waitForTimeout(3600);
  await p.mouse.move(1270, 700, { steps: 6 }); await p.waitForTimeout(900);
  m.b = (Date.now() - t0) / 1000;
  const v = await p.video().path(); await ctx.close(); await b.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(m.a), '-i', v, '-t', (m.b - m.a).toFixed(2), '-vf', 'crop=700:440:540:150,fps=30', '-an', '-c:v', 'libx264', '-crf', '23', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${OUT}/${nombre}.mp4`]);
  console.log(nombre, (m.b - m.a).toFixed(1) + ' s', Math.round(fs.statSync(`${OUT}/${nombre}.mp4`).size / 1024) + ' KB');
})();
