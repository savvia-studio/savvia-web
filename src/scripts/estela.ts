// ESTELA (rondas 13–15) · la acuarela del roble de Andoni, viva. Un lienzo WebGL por mitad (árbol en el hero, raíces debajo).
// Ronda 15 (referencias de Andoni):
//   · Shopify Editions «Agentic»: la imagen entra primero como DIBUJO (las líneas del grabado, claras) y la pintura la va llenando con un
//     frente de PAPEL RASGADO. Aquí: al caer la gota, el árbol se dibuja desde el impacto y la savia lo pinta detrás, con canto rasgado.
//   · sythera (captura): el árbol se funde con el fondo por SEMITONO: en los cantos la copa se deshace en puntos redondos en retícula a
//     45°, cada vez más pequeños; el interior, pintado. (Sustituye a la trama Bayer de la ronda 14.)
//   · clusia.com/about (la flor): en reposo la textura HIERVE (se agita a saltos, ~12 por segundo, un píxel) y en los cantos saltan
//     destellos horizontales cortos. Muy sutil: sobre esto se asientan los haces de LUZ diagonales y la deriva de tono de la ronda 14.
// La GOTA: en el hero la trae la carga (Cargador.astro: resbala por las letras de «savvia» y cae a la base del tronco) y avisa con
// `soltar()`. Sin carga (`manual: false`) el propio lienzo la deja caer desde arriba. `crecer(0…1)`: las raíces, con el scroll.
// OJO: nada de comillas invertidas dentro del shader ni uniforms que choquen con locales.
const VS = 'attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}';
const FS = [
  'precision highp float;',
  'uniform sampler2D T;uniform vec2 R,O;uniform float ti,gr,dpr,soplo,lz,dir,gt,gota,mk,ev,rad,pai,lx,ek;uniform vec2 M,EO;uniform vec3 fo;uniform vec4 est,estB;varying vec2 v;',
  'float h(float p){return fract(sin(p*127.1)*43758.5453);}',
  'float h2(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
  'float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y);}',
  'vec3 tono(vec3 c,float g){float y=dot(c,vec3(.299,.587,.114));float i=dot(c,vec3(.596,-.274,-.322));float q=dot(c,vec3(.211,-.523,.312));',
  '  float cs=cos(g),sn=sin(g);float i2=i*cs-q*sn,q2=i*sn+q*cs;return vec3(y+.956*i2+.621*q2,y-.272*i2-.647*q2,y-1.106*i2+1.703*q2);}',
  'float lum(vec4 c){return dot(c.rgb,vec3(.299,.587,.114));}',
  'void main(){',
  '  vec2 px=v*R/dpr;vec2 W=R/dpr;float asp=R.x/R.y;vec2 u1=1./R;',
  '  vec3 naranja=vec3(.965,.325,.251);vec3 claro=vec3(.95,.9,.87);',
  // HERVIR (clusia): a saltos de ~12 por segundo, cada celda de 3 px se corre un píxel; solo en reposo
  '  float paso=floor(ti*12.);',
  '  vec2 q=v+(vec2(h2(floor(px/3.)+paso),h2(floor(px/3.)+paso+17.))-.5)*1.3*dpr*u1*soplo;',
  '  vec4 c=texture2D(T,q);float a0=c.a;',
  // destellos horizontales en los cantos: alguna fila, a veces, se estira unos píxeles
  '  float fila=floor(px.y/2.);',
  '  if(soplo>.5&&a0<.9&&h(fila+paso*7.13)>.9){float dx=(4.+8.*h(fila*3.1+paso))*dpr*u1.x*(h(fila+paso)>.5?1.:-1.);',
  '    c=(c+texture2D(T,q+vec2(dx*.33,0.))+texture2D(T,q+vec2(dx*.66,0.))+texture2D(T,q+vec2(dx,0.)))*.25;}',
  '  float a=c.a;vec3 col=c.rgb/max(a,.001);',
  // mimetizarse: un poco hundido hacia el Cacao; lo translúcido, más tenue
  '  vec3 cacao=fo;',
  '  col=mix(col,cacao,pai>.5?0.:.2);col=mix(vec3(dot(col,vec3(.299,.587,.114))),col,pai>.5?1.:.84);',
  // RONDA 16 («aún más mimetizado»): hacia fuera la cobertura cae (elipse centrada en la copa) → más árbol se deshace en puntos
  '  float fuera=pai>.5?1.:1.-smoothstep(.42,1.02,length(vec2((v.x-.5)*1.85,(v.y-.56)*1.6)));',
  '  a=pow(a,pai>.5?1.:1.2)*(.3+.7*fuera);',
  // ESTACIÓN (rondas 17 y 20): solo vira lo que es HOJA (lo cálido y saturado); la madera se queda. En invierno la copa RALEA (est.w):
  // las hojas más claras se van y quedan pocas, pálidas; en primavera y verano vira a verdes (tono) con su saturación y su luz.
  // RONDA 22 · «que parezca que se va pintando»: la estación nueva (estB) avanza sobre la vieja (est) con el MISMO frente rasgado de la
  // aparición (ev = 0…1; −1 = sin cambio), desde la base del tronco, teñido de savia en el filo
  '  float hoja=smoothstep(.08,.3,max(col.r,max(col.g,col.b))-min(col.r,min(col.g,col.b)));',
  '  float d0=length(vec2((v.x-EO.x)*asp*.55,v.y-EO.y))*.95;',
  '  float rz=(n2(px*.035+7.)-.5)*.16+(n2(px*.16+3.)-.5)*.05;',
  '  float fe=ev<0.?1.:smoothstep(0.,.012,ev*1.45-d0-.1+rz);',
  '  vec4 es=mix(est,estB,fe);',
  // RONDA 40 · la paleta de Andoni: cada estación tiene UN color de árbol (es.rgb). La hoja se pinta en ese tono con sus variaciones: la sombra
  // (el color hundido), el tono y la luz (el color aclarado), según la luz de la acuarela; un 14 % de la lámina original le deja la textura
  '  float yl=clamp((dot(col,vec3(.299,.587,.114))-.12)/.72,0.,1.);',
  '  vec3 ce=mix(mix(es.rgb*.42,es.rgb,smoothstep(0.,.5,yl)),mix(es.rgb,vec3(.98,.95,.9),.5),smoothstep(.5,1.,yl));',
  '  col=mix(col,clamp(mix(ce,col,.14),0.,1.),ek>1.5?1.:hoja*ek);',  // ronda 42: intensidad > 1,5 = se tiñe TODA la lámina (la flora: el helecho es verde pálido y el umbral de hoja no lo cogía)
  '  if(ev>=0.)col=mix(col,naranja,(1.-smoothstep(.02,.22,ev*1.45-d0-.1+rz))*fe*.5*hoja);',
  '  a*=1.-hoja*es.w*smoothstep(.35,.75,dot(c.rgb/max(a0,.001),vec3(.299,.587,.114))+h2(floor(px/2.))*.25);',
  '  col=clamp(tono(col,.1*sin(ti*.21+v.x*2.4-v.y*3.1)*soplo),0.,1.);',
  // LUZ: haces diagonales desde arriba a la derecha hasta el tronco, solo sobre el árbol, al terminar de pintarse
  '  float lv=soplo*lz*smoothstep(.85,1.,gr);', // lz: ronda 47, las raíces hierven pero no reciben la luz
  '  float uu=(px.x*.95+px.y*.31)/W.x-lx;', // lx: la luz sigue al ratón (ronda 27)
  '  float b=exp(-pow((uu-.62-.018*sin(ti*.31))/.026,2.))+exp(-pow((uu-.7-.012*sin(ti*.23+1.))/.013,2.))*.85+exp(-pow((uu-.54-.02*sin(ti*.17+2.))/.035,2.))*.6;',
  '  b*=(.8+.2*sin(ti*.9+px.y*.035))*(.5+.5*(1.-v.y))*lv;',
  '  col=1.-(1.-col)*(1.-vec3(1.,.93,.72)*min(1.,b)*.5);', // ronda 29: sutil: es la luz del hero que le cae encima, no un brillo propio
  // SEMITONO en los cantos (sythera): puntos redondos en retícula a 45° (celda de 5 px); su radio sale de la cobertura
  '  vec2 ro=vec2(px.x+px.y,px.x-px.y)*.7071/5.;vec2 f=fract(ro)-.5;',
  '  float rad=sqrt(a)*.64;float punto=1.-smoothstep(rad-.07,rad+.07,length(f));',
  '  float canto=pai>.5?0.:1.-smoothstep(.5,.92,a);', // el paisaje no lleva semitono en los cantos (en la esquina de la hierba salía un parche de puntos)
  '  a=a<.04?0.:mix(a,punto,canto);',
  '  col=mix(col,claro,canto*.22);', // los puntos del canto, algo más claros («que tenga un color clarito»)
  // DISTANCIA AL ORIGEN: el hero, radial desde el impacto; las raíces bajan desde el cuello
  '  float d=(gota>.5||rad>.5)?length(vec2((v.x-O.x)*asp*.55,v.y-O.y))*.95:clamp((v.y-O.y)*dir,0.,1.)*.85+abs(v.x-O.x)*.35;',
  // DIBUJO (Shopify): las líneas del grabado —bordes de la luminancia— en claro, por delante de la pintura
  '  float e=abs(lum(texture2D(T,v+vec2(1.5*dpr*u1.x,0.)))-lum(texture2D(T,v-vec2(1.5*dpr*u1.x,0.))))+abs(lum(texture2D(T,v+vec2(0.,1.5*dpr*u1.y)))-lum(texture2D(T,v-vec2(0.,1.5*dpr*u1.y))));',
  '  float linea=smoothstep(.06,.26,e)*step(.08,a0);',
  '  float sv=smoothstep(0.,.12,gr*1.75-d);',
  // PINTURA con canto de PAPEL RASGADO: el frente lleva ruido a dos escalas y un filo claro de fibras
  '  float rasgo=(n2(px*.035)-.5)*.16+(n2(px*.16)-.5)*.05;',
  '  float fr=gr*1.4-d-.1+rasgo;', // con gr = 0 no asoma nada (las raíces, antes de hacer scroll)
  '  float pv=smoothstep(0.,.012,fr);',
  '  float filo=(smoothstep(0.,.01,fr)-smoothstep(.012,.03,fr))*step(.04,a);',
  // la savia: lo recién pintado viene teñido de Naranja y se asienta
  '  col=mix(col,naranja,(1.-smoothstep(.02,.25,fr))*pv*.55);',
  // LUPA (huevo de pascua): alrededor del cursor la pintura se retira y se ve el DIBUJO de debajo; su canto, en savia
  '  float dm=length(px-M*W);float lupa=mk*(1.-smoothstep(46.,78.,dm+(n2(px*.09+ti*.6)-.5)*18.));',
  '  float aro=mk*(smoothstep(40.,62.,dm)-smoothstep(62.,84.,dm));',
  '  col=mix(col,naranja,aro*.55);',
  '  a*=(pai>.5?1.:.94)*(1.-lupa*.88);vec3 outc=col*a*pv;float outa=a*pv;',
  '  float al=max(linea*sv*(1.-pv)*.85,linea*lupa*pv*.9)+filo*.8;',
  '  outc=outc*(1.-al)+claro*al;outa=outa+al*(1.-outa);',
  '  float ef=pai>.5?1.:smoothstep(0.,.04,v.x)*smoothstep(1.,.96,v.x);outc*=ef;outa*=ef;',
  // LA GOTA del propio lienzo (solo si no la trae la carga) y la savia que corre por la línea de suelo al caer
  '  if(gota>.5){',
  '    float tc=clamp(gt/.95,0.,1.);float yg=mix(-8.,W.y-5.,tc*tc);',
  '    vec2 qg=px-vec2(O.x*W.x,yg);qg.y*=qg.y<0.?.55-.25*tc:1.;',
  '    float ag=(1.-smoothstep(-.8,.8,length(qg)-4.5))*step(gt,.97)*step(0.,gt);',
  '    float sp=clamp((gt-.95)/.9,0.,1.);float sw=W.x*.3*(1.-pow(1.-sp,3.));',
  '    float band=(1.-smoothstep(1.2,2.8,abs(px.y-(W.y-3.))))*(1.-smoothstep(sw*.6,sw,abs(px.x-O.x*W.x)));',
  '    float as=band*step(.95,gt)*(1.-smoothstep(2.2,4.6,gt))*.85;',
  '    float ad=max(ag,as);',
  '    outc=outc*(1.-ad)+naranja*ad;outa=outa+ad*(1.-outa);',
  '  }',
  '  gl_FragColor=vec4(outc,outa);',
  '}',
].join('\n');

// el color del árbol por estación (la paleta de Andoni, ronda 40), en el orden de src/scripts/estacion.ts: otoño · invierno · primavera · verano
const c = (h: string, raleo = 0) => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255, raleo];
export const ESTACIONES_ARBOL = [c('#c65c2d'), c('#6e7b91', 0.5), c('#c76b83'), c('#67834d')];
export const ESTACIONES_SIN_RALEO = ESTACIONES_ARBOL.map((e) => [e[0], e[1], e[2], 0]);

export type Estela = { fondo(r: number, g: number, b: number): void; crecer(g: number): void; visible(si: boolean): void; soltar(): void; mirar(x: number, y: number, si: boolean): void; renacer(estacion: number): void; ciclo(): boolean; origen(x: number, y: number): void; estacion(n: number): void; luz(x: number): void };

// RONDA 23 · opciones nuevas: `radial` (el frente sale en círculo desde `origen`, sin gota), `paisaje` (una lámina completa, no el árbol: sin
// hundir el color, sin elipse de cobertura ni bordes desvanecidos) y `estaciones` (tabla propia: el paisaje del pie no ralea en invierno).
export function crearEstela(cv: HTMLCanvasElement, img: HTMLImageElement, op: { origen: [number, number]; dir: 1 | -1; soplo?: boolean; gota?: boolean; manual?: boolean; sinLuz?: boolean; radial?: boolean; paisaje?: boolean; estaciones?: number[][]; origenEstacion?: [number, number]; intensidad?: number }): Estela | null {
  const ctx = { premultipliedAlpha: true, alpha: true, antialias: false };
  const gl2 = cv.getContext('webgl2', ctx) as WebGL2RenderingContext | null;
  const gl = (gl2 ?? cv.getContext('webgl', ctx)) as WebGLRenderingContext | null;
  if (!gl) return null;
  const sh = (tipo: number, src: string) => { const s = gl.createShader(tipo)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s; };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const la = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la, 2, gl.FLOAT, false, 0, 0);
  const U = (k: string) => gl.getUniformLocation(pr, k);
  const uR = U('R'), uT = U('ti'), uG = U('gr'), uD = U('dpr'), uGT = U('gt'), uM = U('M'), uMK = U('mk'), uE = U('est'), uEB = U('estB'), uEV = U('ev');
  // estaciones: [giro de tono (rad), saturación, aclarado, raleo] · otoño (la lámina) · invierno · primavera · verano (ronda 20: verdes de verdad)
  // RONDA 40 · estaciones: [r, g, b del color del árbol (0–1), raleo] · otoño Cobre naranja · invierno Azul grisáceo (la copa ralea) · primavera
  // Rosa flor · verano Verde hoja. `intensidad`: cuánto se pinta la hoja en el color de la estación (el paisaje del pie, algo menos)
  const ESTACIONES = op.estaciones ?? ESTACIONES_ARBOL;
  gl.uniform1f(U('ek'), op.intensidad ?? 0.9);
  gl.uniform1f(U('rad'), op.radial ? 1 : 0); gl.uniform1f(U('pai'), op.paisaje ? 1 : 0);
  const uO = U('O'), uLX = U('lx'); gl.uniform1f(uLX, 0);
  // RONDA 39: el fondo de la estación (el color hacia el que se hunde el árbol para mimetizarse) y de dónde sale el frente del cambio de
  // estación (el árbol: la base del tronco; las raíces: el cuello, arriba)
  const uFO = U('fo'); gl.uniform3f(uFO, 0.188, 0.125, 0.094);
  const eo = op.origenEstacion ?? [0.5, 1]; gl.uniform2f(U('EO'), eo[0], eo[1]);
  { const e0 = ESTACIONES[0]; gl.uniform4f(uE, e0[0], e0[1], e0[2], e0[3]); gl.uniform4f(uEB, e0[0], e0[1], e0[2], e0[3]); } gl.uniform1f(uEV, -1);
  // RONDA 22: el cambio de estación se PINTA: estB avanza sobre est con el frente rasgado (ev 0 → 1 en 2,2 s); al acabar, est = estB
  let virando = false, ev0 = 0, estB = ESTACIONES[0];
  const PINTA = 2.2;
  let mx = 0.5, my = 0.5, mk = 0, mkMeta = 0;
  gl.uniform2f(uO, op.origen[0], op.origen[1]);
  gl.uniform1f(U('dir'), op.dir);
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vivo = !!op.soplo && !reducido;
  const gota = !!op.gota && !reducido;
  gl.uniform1f(U('soplo'), vivo ? 1 : 0);
  gl.uniform1f(U('lz'), op.sinLuz ? 0 : 1);
  gl.uniform1f(U('gota'), op.gota ? 1 : 0);
  // manual: el reloj de la gota no arranca hasta `soltar()` (la trae la carga)
  let listo = false, g = reducido && op.gota ? 1 : 0, raf = 0, ve = true, t0 = 0, ult = 0, suelta = !gota || !op.manual;
  const INTRO = 1.05, CRECE = 3.6; // s: la gota cae y corre por el suelo; luego el árbol se dibuja y se pinta
  // RONDA 19 · el CICLO (huevo de pascua nuevo): el árbol se DESDIBUJA (la pintura se retira hacia la base y quedan las líneas, que también se
  // van) y se vuelve a DIBUJAR y a PINTAR como cuando aparece. Sin gota ni savia por el suelo: solo el frente. `cic` = instante en que empezó.
  const BORRA = 0.8, REDIBUJA = 3.0; // s
  let cic = 0;
  const pintar = (ahora: number) => {
    raf = 0;
    if (!listo) return;
    if (!suelta) { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); return; }
    if (!t0) t0 = ahora;
    const s = (ahora - t0) / 1000;
    if (cic) {
      const c = (ahora - cic) / 1000;
      if (c < BORRA) { const k = c / BORRA; g = 1 - k * k; }
      else if (c < BORRA + REDIBUJA) { const k = (c - BORRA) / REDIBUJA; g = 1 - Math.pow(1 - k, 1.6); }
      else { g = 1; cic = 0; }
    } else if (gota) { const k = Math.min(1, Math.max(0, (s - INTRO) / CRECE)); g = 1 - Math.pow(1 - k, 1.6); }
    const enIntro = (gota && s < INTRO + CRECE + 0.2) || cic > 0;
    // en reposo basta con ~30 fps: el hervor va a 12 saltos por segundo y la deriva es lenta (con la lupa encima, a todo ritmo)
    mk += (mkMeta - mk) * 0.14; if (Math.abs(mkMeta - mk) < 0.004) mk = mkMeta;
    if (virando) {
      const k = Math.min(1, (ahora - ev0) / 1000 / PINTA);
      gl.uniform1f(uEV, k);
      if (k >= 1) { virando = false; gl.uniform4f(uE, estB[0], estB[1], estB[2], estB[3]); gl.uniform1f(uEV, -1); }
    }
    if (!enIntro && !virando && mk === 0 && ahora - ult < 30) { if (vivo && ve) raf = requestAnimationFrame(pintar); return; }
    ult = ahora;
    gl.uniform1f(uT, s);
    gl.uniform1f(uGT, gota && !cic && s < INTRO + CRECE + 1 ? s : 99); // en el ciclo no hay gota que caiga
    gl.uniform1f(uG, g);
    gl.uniform2f(uM, mx, my); gl.uniform1f(uMK, mk);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (ve && (enIntro || virando || (vivo && g >= 1))) raf = requestAnimationFrame(pintar);
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(pintar); };
  const medir = () => {
    const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(r.width * dpr)), hh = Math.max(1, Math.round(r.height * dpr));
    if (w !== cv.width || hh !== cv.height) { cv.width = w; cv.height = hh; }
    gl.viewport(0, 0, w, hh); gl.uniform2f(uR, w, hh); gl.uniform1f(uD, dpr);
    ult = 0; pedir();
  };
  const arrancar = () => {
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    if (gl2) gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl2 ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    listo = true;
    medir();
    cv.classList.add('listo');
  };
  img.complete && img.naturalWidth ? arrancar() : img.addEventListener('load', arrancar, { once: true });
  new ResizeObserver(() => listo && medir()).observe(cv);
  return {
    fondo(r, g2, b) { gl.uniform3f(uFO, r / 255, g2 / 255, b / 255); ult = 0; pedir(); },
    crecer(x) { if (gota) return; const k = Math.min(1, Math.max(0, x)); if (Math.abs(k - g) > 0.0005 || (k === 1 && g !== 1)) { g = k; ult = 0; pedir(); } },
    visible(si) { ve = si; if (si) pedir(); },
    // la gota de la carga acaba de tocar el suelo: el reloj arranca ya en el impacto (0,95 s)
    soltar() { if (suelta) return; suelta = true; t0 = performance.now() - 950; ult = 0; pedir(); },
    mirar(x, y, si) { mx = x; my = y; mkMeta = si ? 1 : 0; pedir(); },
    // RONDA 21: cambiar de estación = virar el color despacio (sin redibujar)
    renacer(n) {
      if (virando) gl.uniform4f(uE, estB[0], estB[1], estB[2], estB[3]); // un cambio a medio pintar: la vieja pasa a ser la que estaba llegando
      estB = ESTACIONES[n % ESTACIONES.length]; gl.uniform4f(uEB, estB[0], estB[1], estB[2], estB[3]);
      ev0 = performance.now(); virando = true; ult = 0; pedir();
    },
    // el ciclo solo arranca con el árbol ya pintado y si no hay otro en marcha
    ciclo() { if (cic || g < 1 || !suelta) return false; cic = performance.now(); ult = 0; pedir(); return true; },
    origen(x, y) { gl.uniform2f(uO, x, y); ult = 0; pedir(); },
    luz(x) { gl.uniform1f(uLX, x); ult = 0; pedir(); },
    // RONDA 24: fijar la estación de golpe (la de hoy, al cargar), sin pintar
    estacion(n) { estB = ESTACIONES[n % ESTACIONES.length]; gl.uniform4f(uE, estB[0], estB[1], estB[2], estB[3]); gl.uniform4f(uEB, estB[0], estB[1], estB[2], estB[3]); gl.uniform1f(uEV, -1); virando = false; ult = 0; pedir(); },
  };
}
