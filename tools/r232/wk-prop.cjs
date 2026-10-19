const { webkit, chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, e, o] of [['webkit', webkit, { headless: true }], ['chrome', chromium, launchOpts]]) {
    const b = await e.launch(o); const p = await b.newPage();
    console.log(n, b.version());
    await p.setContent(`<style>@property --c { syntax: '<color>'; inherits: true; initial-value: red; }
      :root { --c: rgb(255,0,0); transition: --c 2s linear; } html.b { --c: rgb(0,0,255); }
      body { background: var(--c); } #d { width: 50px; height: 50px; background: var(--c); transition: background-color 2s linear; }
      #e { width: 50px; height: 50px; background-color: rgb(255,0,0); transition: background-color 2s linear; } html.b #e { background-color: rgb(0,0,255); }</style><div id=d></div><div id=e></div>`);
    await p.waitForTimeout(300);
    await p.evaluate(() => document.documentElement.classList.add('b'));
    await p.waitForTimeout(1000);
    console.log(await p.evaluate(() => [getComputedStyle(document.documentElement).getPropertyValue('--c'), getComputedStyle(document.body).backgroundColor, getComputedStyle(document.getElementById('e')).backgroundColor]));
    await b.close();
  }
})();
