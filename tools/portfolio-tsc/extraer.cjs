// Los proyectos del portfolio de treseiscero.com (Webflow CMS) con sus filtros: país, tecnología, servicios y categorías.
// node tools/portfolio-tsc/extraer.cjs → src/data/portfolio-tsc.json (en vivo: las listas anidadas las carga Finsweet en el navegador)
const fs = require('fs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts || {});
  const p = await b.newPage();
  await p.goto('https://www.treseiscero.com/portfolio', { waitUntil: 'networkidle' });
  await p.waitForFunction(() => document.querySelectorAll('.more-work_layout [fs-list-field=services]').length > 41, null, { timeout: 30000 });
  const datos = await p.evaluate(() => {
    const L = document.querySelector('.more-work_layout');
    return [...L.children].map((i) => {
      const f = (k) => [...i.querySelectorAll(`[fs-list-field=${k}]`)].map((e) => e.textContent.trim()).filter(Boolean);
      const a = i.querySelector('a');
      return {
        slug: (a?.getAttribute('href') || '').replace('/portfolio/', ''),
        dominio: i.querySelector('[data-typed-text]')?.getAttribute('data-typed-text') || i.textContent.trim().split(/\s+/)[0],
        captura: i.querySelector('.macbook_img')?.getAttribute('src') || '',
        pais: f('location'), tecnologia: f('tech'), servicios: f('services'), categorias: f('categories'),
      };
    });
  });
  fs.writeFileSync('src/data/portfolio-tsc.json', JSON.stringify(datos, null, 1));
  console.log(datos.length, datos.filter((d) => !d.captura).length, 'sin captura');
  await b.close();
})();
