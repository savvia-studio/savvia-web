// RONDA 64 · MUESTRAS TIPOGRÁFICAS de cada web, escritas en SU propia página con SU fuente (muchas son de pago: no se copian ni se sirven desde savvia;
// se captura la muestra como imagen, igual que los vídeos). → public/media/obra/<slug>/tipo-<n>.png (texto en su tinta sobre transparente)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
const T = {
  quantus: { url: 'https://quantus-demo.vercel.app/', tinta: '#15181c', f: [['Schibsted Grotesk', 500], ['JetBrains Mono', 400]] },
  patchbay: { url: 'https://patchbay-web.vercel.app/', tinta: '#17130f', f: [['Instrument Sans', 600], ['JetBrains Mono', 400]] },
  multiverse: { url: 'https://multiverse-home.vercel.app/', tinta: '#15181c', f: [['Schibsted Grotesk', 500], ['JetBrains Mono', 400]] },
  amarra: { url: 'https://zernio.treseiscero.app/', tinta: '#17130f', f: [['Instrument Sans', 600], ['JetBrains Mono', 400]] },
  playground: { url: 'https://playground-iep-two.vercel.app/home-v5.html', tinta: '#111d2a', f: [['Politetype', 400], ['Inter', 400]] },
  neety: { url: 'https://neety.treseiscero.app/home', tinta: '#431b44', f: [['Bricolage Grotesque', 500], ['switzer', 400]] },
  invopop: { url: 'https://invopop.com', tinta: '#0b0b10', f: [['Söhne', 400], ['Geist Mono', 400]] },
  'business-online-payroll': { url: 'https://businessonlinepayroll.com', tinta: '#121516', f: [['Untitled Sans', 500], ['Untitled Sans', 400]] },
  cubbo: { url: 'https://cubbo.com', tinta: '#031c63', f: [['Manrope', 500], ['Inter', 400]] },
  remerge: { url: 'https://remerge.io', tinta: '#202020', f: [['Editorialnew', 200], ['Gt America', 400]] },
  isotrol: { url: 'https://isotrol.com', tinta: '#090756', f: [['Aspekta 350', 300], ['Aspekta', 400]] },
};
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [slug, t] of Object.entries(T)) {
    if (process.argv[2] && process.argv[2] !== slug) continue;
    const p = await (await b.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, userAgent })).newPage();
    await p.goto(t.url, { waitUntil: 'load', timeout: 60000 }); await p.waitForTimeout(3500);
    fs.mkdirSync(`public/media/obra/${slug}`, { recursive: true });
    for (const [i, [fam, peso]] of t.f.entries()) {
      // la muestra: «Aa» grande + el abecedario (cifras y signos)
      const ok = await p.evaluate(async ([fam, peso, tinta]) => {
        document.querySelectorAll('#savvia-muestra').forEach((e) => e.remove());
        const d = document.createElement('div'); d.id = 'savvia-muestra';
        d.style.cssText = `position:fixed;left:0;top:0;z-index:2147483647;padding:20px 40px;background:transparent;color:${tinta};font-family:'${fam}';font-weight:${peso};font-style:normal;letter-spacing:0;text-transform:none;line-height:1;white-space:nowrap`;
        d.innerHTML = `<div style="font-size:300px;line-height:1">Aa</div><div style="font-size:44px;margin-top:24px">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ</div><div style="font-size:44px;margin-top:12px">abcdefghijklmnñopqrstuvwxyz</div><div style="font-size:44px;margin-top:12px">0123456789 &amp;@!?%</div>`;
        document.body.append(d);
        await document.fonts.ready;
        return document.fonts.check(`${peso} 40px '${fam}'`);
      }, [fam, peso, t.tinta]);
      // tapa la página por detrás: solo se captura la muestra (fondo transparente)
      await p.addStyleTag({ content: 'html,body{background:transparent!important} *{visibility:hidden!important;background-image:none} #savvia-muestra,#savvia-muestra *{visibility:visible!important}' });
      await p.waitForTimeout(400);
      await p.locator('#savvia-muestra').screenshot({ path: `public/media/obra/${slug}/tipo-${i + 1}.png`, omitBackground: true });
      console.log(slug, fam, peso, 'cargada:', ok);
    }
    await p.context().close();
  }
  await b.close();
})();
