const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const F = ['Pinyon Script','Monsieur La Doulaise','Italianno','Great Vibes','Imperial Script','Corinthia','Ballet','Mea Culpa','Petit Formal Script','Rouge Script','Alex Brush','Herr Von Muellerhoff','Mrs Saint Delafield','Luxurious Script','Ephesis','Tangerine','WindSong','Allura','Parisienne','Lovers Quarrel','Birthstone Bounce','Grey Qo','Island Moments','Ingrid Darling'];
(async()=>{
 const b = await chromium.launch(launchOpts); const p = await b.newPage({viewport:{width:1600,height:2400}});
 const fam = F.map(f=>'family='+f.replace(/ /g,'+')).join('&');
 await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?${fam}&display=block" rel="stylesheet"><style>body{margin:0;background:#1a1410;color:#f5efe6;font-family:Georgia;display:grid;grid-template-columns:repeat(4,1fr)}div{height:390px;border:1px solid #333;padding:10px;position:relative}b{font-weight:400;font-size:190px;line-height:1}span{font-size:44px;font-family:Georgia}i{position:absolute;bottom:6px;left:8px;font:13px sans-serif;font-style:normal;opacity:.6}</style></head><body>${F.map(f=>`<div><b style="font-family:'${f}'">T</b><span>u web</span><b style="font-family:'${f}';font-size:120px">V</b><i>${f}</i></div>`).join('')}</body></html>`);
 await p.waitForTimeout(3500); await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:'shots/fuentes.png',fullPage:true}); await b.close();
})();
