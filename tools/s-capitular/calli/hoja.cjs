// Hoja de contactos: las 120 S con nuestra pluma. uso: node hoja.cjs centros.json hoja.png
const fs = require('fs'); const { svgS } = require('./pluma.cjs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [IN, PNG] = process.argv.slice(2); const D = JSON.parse(fs.readFileSync(IN, 'utf8'));
const html = `<body style="margin:0;background:#3b231b;color:#eadde7;font:11px monospace;display:grid;grid-template-columns:repeat(12,1fr);gap:4px;padding:8px">${D.map((d) => `<div style="height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #fff2"><div style="height:110px;display:flex">${svgS(d.trazos).replace('<svg ', '<svg style="height:110px;width:auto" ')}</div><span>${d.id}·${d.st}·${d.bias}</span></div>`).join('')}</body>`;
fs.writeFileSync(PNG.replace('.png', '.html'), html);
(async () => { const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 1800, height: 800 } }); await p.setContent(html); await p.screenshot({ path: PNG, fullPage: true }); await b.close(); })();
