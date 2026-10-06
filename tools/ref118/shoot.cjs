const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sites = {'gehry':'https://gehry.getty.edu/','rca':'https://rcarecords.com/','noart':'https://www.noartmusic.com/','spatial':'https://spatial-festival.program.studio/','callas':'https://airtight.cc/projects/callas/'};
(async()=>{
 const b=await chromium.launch(launchOpts);
 for(const [s,u] of Object.entries(sites)){
  const ctx=await b.newContext({viewport:{width:1440,height:900},userAgent});
  const p=await ctx.newPage();
  try{
   await p.goto(u,{waitUntil:'domcontentloaded',timeout:30000});
   await p.waitForTimeout(1500);
   for(const t of [/reject all|decline|only necessary|reject/i,/accept all|accept|agree|allow all|got it/i]){
     const btn=p.getByRole('button',{name:t}).first();
     if(await btn.count()){ try{await btn.click({timeout:1500});break;}catch{} }
   }
   await p.waitForTimeout(3500);
   await p.screenshot({path:`${s}-1.jpg`,type:'jpeg',quality:70});
   await p.waitForTimeout(3000);
   await p.screenshot({path:`${s}-2.jpg`,type:'jpeg',quality:70});
   console.log('ok',s,await p.title());
  }catch(e){console.log('fail',s,e.message.slice(0,80));}
  await ctx.close();
 }
 await b.close();
})();
