// Los brotes del hover del menú y del pie (28/10): uno por estación, en una caja de 24 con el pie del tallo abajo a la izquierda (2, 22),
// para que crezcan desde la palabra. Una sola tinta (son máscaras: el color lo pone --arbol de la estación).
// uso: node brotes.cjs → brotes.css (las cuatro variables --brote-*) + hoja.png (comprobación, a varios tamaños)
const fs = require('fs');
const S = {
  // primavera: un tallo que se curva y abre una flor de cinco pétalos, con una hojita
  primavera: `<path d='M2.5 22c1.6-4.4 4.6-8 9.2-10.4' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round'/>
    <path d='M6.6 17.2c-2.3-.6-3.3-2.7-2.8-5 2.1.4 3.4 2.4 2.8 5z'/>
    <g transform='translate(15.4 8.6)'>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx='0' cy='-3.1' rx='2' ry='2.9' transform='rotate(${a})'/>`).join('')}</g>`,
  // verano: un tallo con dos hojas abiertas, la de arriba mayor
  verano: `<path d='M2.5 22c1.8-5 5-9 10-11.6' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round'/>
    <path d='M7.4 15.8C4.4 15.6 2.8 12.6 3.6 9.4c2.9.8 4.4 3.5 3.8 6.4z'/>
    <path d='M12.2 10.6c.2-4.4 3.6-7.6 9-7.6-.4 4.8-4 7.8-9 7.6z'/>`,
  // otoño: una ramita de la que cuelga una bellota (con su caperuza), y una hoja
  otono: `<path d='M2.5 22c3-4.2 7.4-7.4 13-9.4' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round'/>
    <path d='M8.6 17.4c-2.2-1.4-2.6-4.3-1-6.6 1.9 1.4 2.4 4.2 1 6.6z'/>
    <path d='M15.5 12.6v1.1' stroke='black' stroke-width='1.2' stroke-linecap='round'/>
    <path d='M12.6 15.2c.2-1.7 1.5-2.6 2.9-2.6s2.7.9 2.9 2.6z'/>
    <path d='M13.1 15.9h4.8c0 2.6-1.1 4.6-2.4 5.3-1.3-.7-2.4-2.7-2.4-5.3z'/>`,
  // invierno: una rama desnuda con una ramita y dos yemas cerradas
  invierno: `<path d='M2.5 22c2.2-4.8 5.6-9 10.6-12.6' fill='none' stroke='black' stroke-width='1.4' stroke-linecap='round'/>
    <path d='M8.2 14.6c2-1.2 4.4-1.6 6.8-1' fill='none' stroke='black' stroke-width='1.2' stroke-linecap='round'/>
    <ellipse cx='14.4' cy='8.3' rx='1.5' ry='2.6' transform='rotate(38 14.4 8.3)'/>
    <ellipse cx='16.4' cy='13.4' rx='1.3' ry='2.2' transform='rotate(78 16.4 13.4)'/>`,
};
const svg = (k) => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>${S[k].replace(/\s+/g, ' ')}</svg>`;
const uri = (k) => `url('data:image/svg+xml,${svg(k).replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/'/g, '%27')}')`;
fs.writeFileSync(__dirname + '/brotes.css', Object.keys(S).map((k) => `--brote-${k}: ${uri(k)};`).join('\n') + '\n');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const col = { primavera: '#d98aa5', verano: '#6f9a4e', otono: '#c65c2d', invierno: '#7d8ba3' };
(async () => { const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 900, height: 420 }, deviceScaleFactor: 2 });
  await p.setContent(`<body style="margin:20px;font-family:Georgia;background:#f5f5f7">${Object.keys(S).map((k) => `<div style="display:flex;align-items:flex-end;gap:24px;margin-bottom:18px;color:${col[k]}">${[96, 40, 14].map((t) => `<span style="width:${t}px;height:${t}px;display:inline-block;background:currentColor;-webkit-mask:${uri(k)} center/contain no-repeat;mask:${uri(k)} center/contain no-repeat"></span>`).join('')}<span style="font-size:28px;color:#3b231b">Portfolio<span style="display:inline-block;width:.7em;height:.7em;background:${col[k]};-webkit-mask:${uri(k)} center/contain no-repeat;mask:${uri(k)} center/contain no-repeat"></span></span><span style="font:14px sans-serif;color:#3b231b">${k}</span></div>`).join('')}</body>`);
  await p.screenshot({ path: __dirname + '/hoja.png' }); await b.close(); })();
