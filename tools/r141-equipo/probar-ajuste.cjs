const fs=require('fs');const {mascaraFoto,ajustar}=require('./ajuste.cjs');const J=JSON.parse(fs.readFileSync('tools/r141-equipo/montaje.json'));
(async()=>{for(const [k,x0,x1,nombre,head] of [['a',0,568,'andoni-paseo',300],['e',568,1200,'eric-paseo',230]]){const foto=await mascaraFoto(x0,x1);const P=J[k].paseo;
 const dx12=P.dxs[11];const X0=P.pecho-P.ancho*P.s+0; // celda→foto; el fotograma 12 tiene dx 0 y pad: lienzo nativo empieza en pad
 const pad=P.ancho-(P.ancho-0); // ancho = pad+pecho12 → lienzo nativo X = celdaX + pad*s
 const padPx=(P.celda-480)/2; const Xn=X0+padPx*P.s,Yn=P.pies-P.base*P.s;
 const r=await ajustar(`tools/r141-equipo/fuente/poses/${nombre}/12.png`,foto,P.s,Xn,Yn,head);console.log(k,'paseo12',JSON.stringify(r));}})();
