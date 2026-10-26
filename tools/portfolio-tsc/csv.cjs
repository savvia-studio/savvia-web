// El CMS de treseiscero.com (exportado de Webflow a CSV, 26/10/2026) → src/data/portfolio-cms.json, listo para las páginas de proyectos.
// Las referencias (país, tecnologías, servicios, categorías) se resuelven a su nombre; el HTML de «Success storie» se queda tal cual.
// OJO: lleva reseñas con nombre y cargo; los vídeos testimoniales nombran el estudio anterior (rechazados en la ronda 48).
// Uso: node tools/portfolio-tsc/csv.cjs
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'csv');

// CSV con comillas, comas y saltos de línea dentro de los campos
function leer(nombre) {
  const t = fs.readFileSync(path.join(DIR, nombre), 'utf8').replace(/^﻿/, '');
  const filas = [];
  let fila = [], campo = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"' && t[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') q = false;
      else campo += c;
    } else if (c === '"') q = true;
    else if (c === ',') { fila.push(campo); campo = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      fila.push(campo); campo = '';
      if (fila.some((x) => x !== '')) filas.push(fila);
      fila = [];
    } else campo += c;
  }
  if (campo || fila.length) { fila.push(campo); filas.push(fila); }
  const [cab, ...resto] = filas;
  return resto.map((f) => Object.fromEntries(cab.map((k, i) => [k, (f[i] ?? '').trim()])));
}

const tabla = (n) => Object.fromEntries(leer(n).map((r) => [r.Slug, r.Name]));
const PAIS = tabla('countries.csv'), TEC = tabla('technologies.csv'), SERV = tabla('services.csv'), CAT = tabla('categories.csv');
const lista = (v, m) => v.split(';').map((x) => x.trim()).filter(Boolean).map((x) => m[x] ?? x);
const si = (v) => v === 'true';
const o = (v) => v || undefined;
const fecha = (v) => (v ? new Date(v).toISOString().slice(0, 10) : undefined);

const proyectos = leer('portfolios.csv')
  .filter((r) => !si(r.Archived) && !si(r.Draft))
  .map((r) => ({
    slug: r.Slug,
    nombre: r.Name,
    web: o(r['Link of the website']),
    dominio: o(r['Text of the link']),
    descripcion: o(r['Small description']),
    ubicacion: o(r.Location),
    pais: lista(r.Country, PAIS),
    tecnologia: lista(r['Technologies used'], TEC),
    servicios: lista(r.Services, SERV),
    categorias: lista(r.Categories, CAT),
    destacado: si(r['¿Is featured work?']),
    resena: r.Review ? { texto: r.Review.replace(/^"|"$/g, '').trim(), autor: o(r.Reviewer), cargo: o(r['Title of reviewer']) } : undefined,
    historia: o(r['Success storie']), // HTML
    logo: o(r.Logo),
    miniatura: o(r['Thumbnail Big'] || r['Thumbnail Small']),
    video: r['Video Link MP4'] ? { mp4: r['Video Link MP4'], webm: o(r['Video Link Webm']) } : undefined,
    videoTestimonio: si(r['Video testimonial?']) ? { mp4: o(r['Video testimonial mp4']), webm: o(r['Video testimonial webm']), foto: o(r['Video testimonial photo']), idioma: o(r['Video Lang']) } : undefined,
    asociado: si(r['Associated?']),
    publicado: fecha(r['Published On']),
  }));

const salida = path.join(__dirname, '../../src/data/portfolio-cms.json');
fs.writeFileSync(salida, JSON.stringify(proyectos, null, 1) + '\n');
console.log(`${proyectos.length} proyectos → ${path.relative(process.cwd(), salida)}`);
