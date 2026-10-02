// RONDA 111 · la versión musical en savvia.studio/musica (y /musica-clara) sin pisar la de siempre.
// 1) compila con SAVVIA_BASE=/musica (Astro prefija sus propios recursos: /musica/_astro/…)
// 2) copia dist/ a tools/r111/out/musica/ y PREFIJA las rutas absolutas escritas a mano en el código (/media/…, el logotipo, /proyectos, «/» y «/#…»)
// 3) tools/r111/out/ se publica como un proyecto de Vercel aparte (savvia-musica); main solo lleva un vercel.json que reenvía /musica y /musica-clara
const { execSync } = require('child_process'), fs = require('fs'), path = require('path');
const raiz = path.resolve(__dirname, '../..'), out = path.join(__dirname, 'out'), dst = path.join(out, 'musica');
execSync('npx astro build', { cwd: raiz, stdio: 'inherit', env: { ...process.env, SAVVIA_BASE: '/musica' } });
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
fs.cpSync(path.join(raiz, 'dist'), dst, { recursive: true });
const PUB = '(?:media/|savvia-logo\\.svg|savvia-isotipo\\.svg|favicon\\.svg|apple-touch-icon\\.png|og\\.jpg|proyectos(?=[/"\'`?#$]))';
const re = new RegExp(`([\"'\`(=,:\\s])/${PUB}`, 'g');
let n = 0, archivos = 0;
const andar = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const f = path.join(d, e.name);
  if (e.isDirectory()) return andar(f);
  if (!/\.(html|js|css|mjs|json)$/.test(e.name)) return;
  let s = fs.readFileSync(f, 'utf8'); const antes = s;
  s = s.replace(re, (m, a) => { n++; return `${a}/musica${m.slice(a.length)}`; });
  // enlaces a la portada y a sus anclas
  s = s.replace(/href="\/(#[^"]*)?"/g, (m, h) => { n++; return `href="/musica/${h || ''}"`; });
  if (s !== antes) { fs.writeFileSync(f, s); archivos++; }
});
andar(dst);
// sin doble prefijo
let dobles = 0; const mira = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const f = path.join(d, e.name); if (e.isDirectory()) return mira(f); if (/\.(html|js|css)$/.test(e.name) && fs.readFileSync(f, 'utf8').includes('/musica/musica/')) dobles++; });
mira(dst);
fs.writeFileSync(path.join(out, 'index.html'), '<!doctype html><meta http-equiv="refresh" content="0;url=/musica/"><title>savvia</title>');
console.log(JSON.stringify({ sustituciones: n, archivos, dobles }));
