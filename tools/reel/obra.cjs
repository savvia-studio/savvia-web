// RONDA 62 · los vídeos de cada CASO (/proyectos/<slug>): portada y galería, sacados de las grabaciones del reel
// (tools/reel/planos = tomas del hero, tools/reel/momentos = secciones). → public/media/obra/<slug>/{portada,g1..}.mp4 + póster .jpg
// node tools/reel/obra.cjs [slug]
const { execSync } = require('child_process'), fs = require('fs'), path = require('path');
const FF = '/opt/homebrew/bin/ffmpeg', R = path.join(__dirname);
// [origen, inicio, duración]; origen «p:<clip>» = planos, «m:<clip>» = momentos
const OBRA = {
  multiverse: { portada: ['p:multiverse-vivo', 0.9, 6], g: [['m:multiverse-m00', 0, 4.1], ['m:multiverse-m01', 0, 4.1], ['m:multiverse-m02', 0, 4.1], ['m:multiverse-m04', 0, 1.8]] },
  amarra: { portada: ['p:zernio-vivo', 5.7, 3.2], g: [['m:zernio-m01', 0, 4.1], ['m:zernio-m02', 0, 4.1], ['m:zernio-m04', 0, 4.1], ['m:zernio-m06', 0, 4.1]] },
  playground: { portada: ['p:playground-vivo', 2.6, 6], g: [['m:playground-m01', 0, 4.1], ['m:playground-m00', 0, 4.1], ['m:playground-m06', 0, 4.1], ['m:playground-m03', 0, 4.1]] },
  neety: { portada: ['p:neety-vivo', 3, 6], g: [['m:neety-m01', 0, 4.1], ['m:neety-m00', 0, 4.1], ['m:neety-m02', 0, 4.1], ['m:neety-m06', 0, 4.1]] },
  invopop: { portada: ['p:invopop-vivo', 1, 6], g: [['m:invopop-m02', 0, 4.1], ['m:invopop-m04', 0, 4.1], ['m:invopop-m00', 0, 4.1]] },
  'business-online-payroll': { portada: ['m:business-online-payroll-m00', 0, 3.1], g: [['m:business-online-payroll-m02', 0, 3.1], ['m:business-online-payroll-m01', 0, 3.1], ['m:business-online-payroll-m03', 0, 3.1]] },
  cubbo: { portada: ['p:cubbo-vivo', 5, 5.5], g: [['m:cubbo-m01', 0, 3.2], ['m:cubbo-m02', 0, 3.3], ['m:cubbo-m03', 0, 4.1]] },
  remerge: { movil: true, portada: ['p:remerge-vivo', 1, 6], g: [['m:remerge-m00', 0, 4.1], ['m:remerge-m02', 0, 4.1], ['m:remerge-m04', 0, 1.5]] },
  isotrol: { portada: ['p:isotrol-vivo', 4, 6], g: [['m:isotrol-m02', 0, 2.6], ['m:isotrol-m00', 0, 4.1], ['m:isotrol-m03', 0, 4.1]] },
};
const src = (o) => path.join(R, o.startsWith('p:') ? 'planos' : 'momentos', o.slice(2) + '.mp4');
for (const [slug, c] of Object.entries(OBRA)) {
  if (process.argv[2] && process.argv[2] !== slug) continue;
  const dir = path.join('public/media/obra', slug); fs.mkdirSync(dir, { recursive: true });
  const escala = c.movil ? 'scale=600:-2' : 'scale=1440:-2';
  const hacer = (nombre, [o, ini, dur]) => {
    const out = path.join(dir, nombre);
    execSync(`${FF} -y -loglevel error -ss ${ini} -t ${dur} -i ${src(o)} -vf "${escala}" -an -c:v libx264 -crf 29 -preset slow -pix_fmt yuv420p -movflags +faststart ${out}.mp4`);
    execSync(`${FF} -y -loglevel error -ss ${(dur * 0.6).toFixed(2)} -i ${out}.mp4 -frames:v 1 -q:v 5 ${out}.jpg`);
  };
  hacer('portada', c.portada);
  c.g.forEach((g, i) => hacer('g' + (i + 1), g));
  const kb = fs.readdirSync(dir).reduce((s, f) => s + fs.statSync(path.join(dir, f)).size, 0) / 1024;
  console.log(slug, fs.readdirSync(dir).length, 'archivos', Math.round(kb) + ' KB');
}
