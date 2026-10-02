// RONDA 97 · EL DIRECTOR EN ASCII. Andoni: «hacer el director de orquesta con ASCII y que reaccione a la música, con pulsos».
// Un lienzo WebGL (un solo triángulo a pantalla): la lámina se lee CELDA A CELDA (su luz y su color en el centro de la celda) y en cada celda se pinta un
// carácter de una rampa de densidad (" .,:-=+*xo%#@"), tomado de un atlas hecho con la mono de la web. Lo que lo hace MÚSICA:
// · el NIVEL de lo que suena (jazz.ts › nivel) sube la densidad de toda la figura: respira con la música;
// · cada PULSO (un tiempo del compás, o la onda de un atril) es un anillo que recorre los caracteres: los empuja dos o tres escalones de la rampa y los aclara;
// · un parpadeo de caracteres al azar, más vivo cuanto más suena (la trama nunca está quieta del todo).
// Se DIBUJA al llegar desde la batuta (`soltar`). Misma API que el motor del árbol: el hero no distingue un estilo del otro.
// RONDA 98 · «quiero que se parezca más a esto» (ascii.fm: rejilla gruesa, pocos caracteres « . - + # », letra de terminal VT323, gris sobre casi negro, nada
// se mueve de sitio). Y «la reacción a la música, con pulsos: la animación del hero vendrá únicamente de que los colores se encienden y apagan con las
// diferentes frecuencias; que se note pero que transmita calma». Fuera los anillos y el parpadeo de la ronda 97: los caracteres están quietos, en gris, y
// cada FRANJA de la figura se enciende con su banda del jazz (abajo el bajo, luego el acorde, la melodía y arriba los platos): sube su luz y asoma el color
// de la ilustración; se apaga despacio (jazz.ts › bandas). La ronda 97, en tools/retirados/ascii.r97.ts.txt.
// RONDA 99 · «el ASCII, más denso y con detalle, y más animado: que la música genere pulsos encima, como ONDAS DE COLOR que pintan ese ASCII». Rejilla más
// fina y rampa de diez caracteres; y vuelven las ondas, ahora de COLOR: cada pulso del jazz abre un anillo que tiñe los caracteres a su paso (y los aviva
// un escalón) y deja detrás un poso de su color que se apaga. Las bandas siguen encendiendo las franjas. La ronda 98, en tools/retirados/ascii.r98.ts.txt.
const RAMPA = ' .:-=+*#%@';
const NB = 5;
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FS = `precision mediump float;
uniform sampler2D uImg,uAtl,uTxt;uniform float uTexto,uLen,uNA;uniform vec2 uRes,uOrig;uniform float uCel,uN,uRev,uInv,uColor,uDpr,uT,uVel,uAn,uVida;uniform vec3 uTinta;uniform float uB[${NB}];uniform vec4 uO[6];uniform vec3 uOC[6];uniform vec4 uMP[3];uniform vec4 uMT[3];uniform vec3 uRat;uniform float uFr;uniform sampler2D uOrd;uniform float uTec,uNT;uniform vec3 uCor;
float h(vec2 q){return fract(sin(dot(q,vec2(12.9898,78.233)))*43758.5453);}
// RONDA 103 · «que el director mueva los brazos como orquestando; en el footer, el saxo como tocando»: cada miembro GIRA la lámina alrededor de su pivote (el
// hombro; en el saxofonista, la cadera). Lo que gira es el lado de una línea que sale del pivote (fuera queda la cabeza, el cuerpo), por encima del pivote, y
// con un peso que nace en él: deformación continua (se lee la lámina girada al revés), sin recorte, así que no queda una copia quieta detrás (ronda 94)
vec2 rig(vec2 c){
  float asp=uRes.x/uRes.y; vec2 q=c*vec2(asp,1.);
  for(int i=0;i<3;i++){ vec4 m=uMP[i],n=uMT[i]; if(m.w==0.) continue;
    vec2 pv=m.xy*vec2(asp,1.),d=normalize(n.xy*vec2(asp,1.)-pv),r=q-pv;
    float lado=(d.x*r.y-d.y*r.x)*sign(m.z), w=smoothstep(-abs(m.z),abs(m.z),lado)*smoothstep(n.z,n.w,length(r))*smoothstep(.05,-.05,r.y);
    float a=-m.w*w, cs=cos(a), sn=sin(a); q=pv+vec2(cs*r.x-sn*r.y,sn*r.x+cs*r.y); }
  return q/vec2(asp,1.);
}
void main(){
  vec2 p0=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y);
  // RONDA 101 · «las ondas mueven el ASCII también, como si lo hicieran vibrar, temblar»: al paso del anillo, cada punto de la lámina se desplaza (empujón radial
  // que oscila y un temblor fino), así que los caracteres se corren y tiemblan antes de volver a su sitio
  vec2 disp=vec2(0.);
  // ronda 102 · «los pulsos mueven más el ASCII»: el empujón, el doble, y el temblor más ancho
  for(int i=0;i<6;i++){vec4 o=uO[i]; if(o.z>=0.){float R=o.z*uVel*uDpr,w=uAn*uDpr; vec2 dv=p0-o.xy; float dd=length(dv),vida=max(0.,1.-o.z/uVida),an=exp(-pow((dd-R)/w,2.))*o.w*vida;
    disp+=(dv/max(dd,1.))*an*sin(uT*30.+dd*.06)*7.*uDpr+vec2(sin(uT*53.+p0.y*.31),cos(uT*47.+p0.x*.29))*an*2.6*uDpr;}}
  vec2 p=p0-disp;
  // RONDA 105–106 · el ratón abre hueco. RONDA 107 · «parece que tiene un círculo enorme alrededor: tiene que ser del tamaño un poco más grande del cursor y que
  // de verdad se aparten las letras, de arriba abajo y de izquierda a derecha»: remapeo RADIAL y pequeño (r' = r − H·e^(−r²/R²), H 15 px, R 40 px): un hueco
  // de ~13 px de radio y las letras de alrededor empujadas hacia fuera en todas direcciones, unos 8 px a 30 px del cursor y casi nada a 60. Continuo en
  // subcelda (el glifo también se corre), así que se ven apartarse, no saltar de casilla
  if(uRat.z>.001){ vec2 dv=p-uRat.xy; float d=length(dv),H=15.*uDpr*uRat.z,R=40.*uDpr; float r2=d-H*exp(-d*d/(R*R)); if(r2<0.) discard; p=uRat.xy+dv/max(d,.001)*r2; }
  vec2 cel=floor(p/uCel),c=(cel+.5)*uCel/uRes;
  // RONDA 108 · «al caer la V se inicia el dibujado del director signo a signo, y se escuchan los tecleos»: cada celda con figura tiene su turno (orden de
  // lectura, solo celdas con tinta: uOrd, 16 bits en R y G); se ve si su turno ya pasó (uTec) y en el turno que toca va el CURSOR, un bloque coral
  float ord=-1.;
  if(uTec>=0.){ vec2 c0=(floor(p0/uCel)+.5)*uCel/uRes; vec4 oc=texture2D(uOrd,c0); float o0=(oc.r*255.*256.+oc.g*255.)/65535.;
    if(oc.b>.5 && o0>=uTec && o0<uTec+1.01/uNT){ vec2 g0=fract(p0/uCel); float bl=step(.12,g0.x)*step(g0.x,.88)*step(.06,g0.y)*step(g0.y,.94); if(bl>0.){ gl_FragColor=vec4(uCor,1.); return; } }
    vec4 od=texture2D(uOrd,c); ord=od.b>.5?(od.r*255.*256.+od.g*255.)/65535.:2.; }
  vec4 im=texture2D(uImg,rig(c));
  // ronda 107 · «el efecto de movimiento de ascii.fm»: allí cada fotograma es un dibujo nuevo y los cantos de la figura HIERVEN (caracteres que aparecen y se
  // van en el borde). Aquí, en cada fotograma (uFr), el umbral del canto y la luz se re-sortean un poco
  float hv=h(floor(c*uRes/uCel)+uFr*7.13);
  if(im.a<.08+hv*.3*step(.5,uFr)) discard;
  float L=dot(im.rgb,vec3(.299,.587,.114)); L=mix(L,1.-L,uInv);
  float d=distance(c*uRes,uOrig*uRes)/length(uRes);
  float rev=uTec>=0.?step(ord,uTec):smoothstep(uRev,uRev-.1,d+h(cel)*.08);
  float k=.3+pow(L,mix(.7,1.2,uInv))*.82+(hv-.5)*.12*step(.5,uFr); // un suelo: el traje oscuro sobre la noche no puede quedarse en puntos
  vec2 pc=(cel+.5)*uCel; vec3 oc=vec3(0.); float pinta=0.;
  for(int i=0;i<6;i++){vec4 o=uO[i]; if(o.z>=0.){float R=o.z*uVel*uDpr,w=uAn*uDpr,dd=distance(pc,o.xy),vida=max(0.,1.-o.z/uVida);
    float an=exp(-pow((dd-R)/w,2.))*o.w*vida, poso=smoothstep(R,R-w*4.,dd)*.32*o.w*vida*vida, q=min(1.,an+poso); oc+=uOC[i]*q; pinta+=q;}}
  float tinte=min(1.,pinta); if(pinta>0.) oc/=pinta;
  float idx=floor(clamp(k+tinte*.18,0.,.999)*uN);
  if(idx<1.) discard;
  // RONDA 100 · en modo TEXTO, el carácter no sale de la rampa: es la letra que le toca del manifiesto, que corre fila a fila por la figura; la luz de la
  // lámina decide cuánta tinta lleva (las zonas oscuras, apenas; las claras, plenas)
  float tinTexto=1.;
  if(uTexto>.5){ float cols=floor(uRes.x/uCel); float i=mod(cel.y*cols+cel.x,uLen); idx=floor(texture2D(uTxt,vec2((i+.5)/uLen,.5)).r*255.+.5); tinTexto=smoothstep(.22,.75,k); }
  float fr=clamp((1.-c.y)+(h(floor(cel/5.))-.5)*.28,0.,.999)*${NB}.;
  float e=0.;
  for(int i=0;i<${NB};i++){ float w=max(0.,1.-abs(fr-.5-float(i))); e+=uB[i]*w; }
  e=clamp(e,0.,1.);
  vec2 g=fract(p/uCel);
  float gl=texture2D(uAtl,vec2((idx+g.x)/uNA,g.y)).a;
  vec3 claro=mix(min(vec3(1.),im.rgb*1.45+.08),im.rgb*.5,uInv);
  vec3 col=mix(uTinta*mix(.86,1.,uInv),mix(uTinta,claro,uColor),e);
  // ronda 102 · «los pulsos, siempre del mismo color, pero a su paso REVELAN colores en el ASCII»: el anillo destapa el color de la propia lámina
  col=mix(col,mix(min(vec3(1.),im.rgb*1.9+.12),im.rgb*.45,uInv),tinte*.92);
  float a=gl*im.a*rev*min(1.,.74+.26*e+tinte*.3)*mix(1.,.25+.75*tinTexto+tinte*.4,uTexto);
  gl_FragColor=vec4(col*a,a);
}`;

export function crearAscii(cv: HTMLCanvasElement, img: HTMLImageElement, op: { origen: [number, number]; celda?: number; clara?: boolean; color?: number; bandas?: () => Float32Array; texto?: string; vel?: number; ancho?: number; vida?: number; teclear?: () => void; hueco?: boolean; fotogramas?: (t: number) => number; miembros?: { p: [number, number]; t: [number, number]; lado: number; r0: number; r1: number }[]; angulos?: (ahora: number) => number[] }) {
  const gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(o)); return o; };
  const pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr);
  const bf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
  const U = (n: string) => gl.getUniformLocation(pr, n);
  const tex = (unidad: number) => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unidad); gl.bindTexture(gl.TEXTURE_2D, t); [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE)); return t; };
  const tImg = tex(0), tAtl = tex(1), tOrd = tex(3);
  gl.uniform1i(U('uImg'), 0); gl.uniform1i(U('uAtl'), 1); gl.uniform1i(U('uOrd'), 3);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const TEC = 3400; let teclas = 0;
  // ronda 109 · ruido de valor (manchas) y un RITMO irregular para el tecleo: doce tramos con velocidades distintas (ráfagas y pausas)
  const sem = Math.random() * 1000, hh = (x: number, y: number) => { const v = Math.sin(x * 127.1 + y * 311.7 + sem) * 43758.5453; return v - Math.floor(v); };
  const manchas = (x: number, y: number) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    return (hh(xi, yi) * (1 - sx) + hh(xi + 1, yi) * sx) * (1 - sy) + (hh(xi, yi + 1) * (1 - sx) + hh(xi + 1, yi + 1) * sx) * sy; };
  const tramos = Array.from({ length: 12 }, () => (Math.random() < 0.2 ? 0.15 : 0.5 + Math.random() * 1.3)), suma = tramos.reduce((a, b) => a + b, 0);
  const ritmo = (u: number) => { if (u >= 1) return u; const k = Math.floor(u * 12), f = u * 12 - k; let acc = 0; for (let i = 0; i < k; i++) acc += tramos[i]; return (acc + tramos[k] * f) / suma; };
  const velAhora = (u: number) => tramos[Math.min(11, Math.floor(u * 12))] / (suma / 12);
  let W = 0, H = 0, dpr = 1, celPx = 6, listo = false, suelta = false, visto = true, raf = 0, tSol = 0, impar = false;
  let tinta = [0.92, 0.87, 0.9];
  const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-vt323').trim() || 'monospace';
  const ondas: { x: number; y: number; t0: number; f: number; c: number[] }[] = [];
  const suave: number[] = [];
  // ronda 105 · el ratón (px de dispositivo del lienzo), suavizado; fuerza 0–1 que sube al entrar y baja al salir
  let rx = -1e4, ry = -1e4, mx = -1e4, my = -1e4, rf = 0, encima = false;
  if (op.hueco && !reducido && matchMedia('(hover: hover)').matches) addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect(); encima = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
    mx = (e.clientX - r.left) * dpr; my = (e.clientY - r.top) * dpr; if (rf < 0.01) { rx = mx; ry = my; }
  }, { passive: true });
  // el texto (si lo hay): sus letras forman el atlas y su orden, una textura de índices
  const txt = (op.texto || '').toLowerCase().replace(/\s+/g, ' ').trim() + ' · ';
  const usar = !!op.texto, LETRAS = usar ? [...new Set([...txt])] : [...RAMPA];
  const tTxt = (() => { if (!usar) return null; gl.activeTexture(gl.TEXTURE2); const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE)); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    const L = Math.min(4096, [...txt].length), d = new Uint8Array(L * 4); [...txt].slice(0, L).forEach((ch, i) => { d[i * 4] = LETRAS.indexOf(ch); d[i * 4 + 3] = 255; });
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, L, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, d); return L; })();
  gl.uniform1i(U('uTxt'), 2); gl.uniform1f(U('uTexto'), usar ? 1 : 0); gl.uniform1f(U('uLen'), tTxt ?? 1);
  const atlas = () => {
    const N = LETRAS.length, a = document.createElement('canvas'); a.width = celPx * N; a.height = celPx;
    const c = a.getContext('2d')!; c.fillStyle = '#fff'; c.font = `400 ${Math.round(celPx * 1.5)}px ${mono}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (let i = 0; i < N; i++) c.fillText(LETRAS[i], celPx * (i + 0.5), celPx * 0.52);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tAtl);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, a);
  };
  const medir = () => {
    const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1);
    W = Math.round(r.width * dpr); H = Math.round(r.height * dpr); if (W < 2 || H < 2) return false;
    cv.width = W; cv.height = H; gl.viewport(0, 0, W, H);
    // la celda: la que pida el sitio (en px CSS), entera en px de dispositivo para que los caracteres no se emborronen
    celPx = Math.max(5, Math.round((op.celda ?? Math.max(5, r.width / 118)) * dpr)); // ronda 99: «más denso y con detalle» (ronda 98: /80)
    const m = getComputedStyle(cv).color.match(/[\d.]+/g); if (m) tinta = [+m[0] / 255, +m[1] / 255, +m[2] / 255];
    atlas();
    // ronda 108 · el ORDEN de tecleo: la lámina reducida a una celda por píxel; cada celda con tinta recibe su número en orden de lectura
    if (op.teclear && img.naturalWidth) {
      const cols = Math.ceil(W / celPx), rows = Math.ceil(H / celPx), o = document.createElement('canvas'); o.width = cols; o.height = rows;
      const ox = o.getContext('2d', { willReadFrequently: true })!; ox.drawImage(img, 0, 0, cols, rows); const d = ox.getImageData(0, 0, cols, rows).data;
      let n = 0; for (let i = 0; i < cols * rows; i++) if (d[i * 4 + 3] > 40) n++;
      // ronda 109 · «aleatorizar la construcción, que no sea uniforme»: el turno de cada celda mezcla una tendencia (ronda 110: desde el centro de abajo, donde cae la V, 40 %), MANCHAS (ruido
      // grueso: se construyen racimos a la vez, en sitios distintos) y azar suelto; luego se ordenan
      const out = new Uint8Array(cols * rows * 4), llaves: [number, number][] = [];
      for (let i = 0; i < cols * rows; i++) { if (d[i * 4 + 3] <= 40) continue; const x = i % cols, y = Math.floor(i / cols); llaves.push([i, Math.hypot((x / cols - 0.5) * (cols / rows), 1 - y / rows) / 1.2 * 0.4 + manchas(x / 7, y / 5) * 0.4 + Math.random() * 0.2]); }
      llaves.sort((a, b) => a[1] - b[1]).forEach(([i], k) => { const v = Math.round((k / Math.max(1, n - 1)) * 65535); out[i * 4] = v >> 8; out[i * 4 + 1] = v & 255; out[i * 4 + 2] = 255; out[i * 4 + 3] = 255; });
      gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, tOrd); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, cols, rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, out);
      gl.uniform1f(U('uNT'), Math.max(1, n));
      const cor = (getComputedStyle(document.documentElement).getPropertyValue('--color-coral').trim() || '#ff616b').match(/[0-9a-f]{2}/gi) || ['ff', '61', '6b'];
      gl.uniform3f(U('uCor'), parseInt(cor[0], 16) / 255, parseInt(cor[1], 16) / 255, parseInt(cor[2], 16) / 255);
    }
    gl.uniform2f(U('uRes'), W, H); gl.uniform1f(U('uCel'), celPx); gl.uniform1f(U('uN'), usar ? RAMPA.length : LETRAS.length); gl.uniform1f(U('uNA'), LETRAS.length); gl.uniform1f(U('uDpr'), dpr); gl.uniform1f(U('uVel'), op.vel ?? 160); gl.uniform1f(U('uAn'), op.ancho ?? 56); gl.uniform1f(U('uVida'), op.vida ?? 4.5);
    gl.uniform2f(U('uOrig'), op.origen[0], op.origen[1]); gl.uniform1f(U('uInv'), op.clara ? 1 : 0); gl.uniform1f(U('uColor'), op.color ?? 0.7);
    gl.uniform3f(U('uTinta'), tinta[0], tinta[1], tinta[2]);
    return true;
  };
  const pintar = (ahora: number) => {
    const rev = reducido ? 2 : suelta ? Math.min(1.25, ((ahora - tSol) / 2400) * 1.25) : -0.2;
    // ronda 108 · el tecleo dura TEC ms; antes de soltar no hay nada, después todo
    const tec = !op.teclear || reducido || !suelta ? -1 : ritmo((ahora - tSol) / TEC);
    gl.uniform1f(U('uTec'), tec >= 1.02 ? -1 : tec); if (op.teclear && suelta && tec < 1.02 && !teclas) teclas = window.setInterval(() => { if ((performance.now() - tSol) / TEC > 1) { clearInterval(teclas); return; } if (Math.random() < 0.55 * velAhora((performance.now() - tSol) / TEC)) op.teclear!(); }, 55);
    gl.uniform1f(U('uRev'), rev); gl.uniform1f(U('uT'), (ahora / 1000) % 1000);
    gl.uniform1fv(U('uB[0]'), reducido || !op.bandas ? new Float32Array(NB) : op.bandas());
    const r = cv.getBoundingClientRect(), arr = new Float32Array(24).fill(-1), cols = new Float32Array(18);
    for (let i = ondas.length - 1; i >= 0; i--) if ((ahora - ondas[i].t0) / 1000 > (op.vida ?? 4.5)) ondas.splice(i, 1);
    ondas.slice(-6).forEach((o, i) => { arr.set([(o.x - r.left) * dpr, (o.y - r.top) * dpr, (ahora - o.t0) / 1000, o.f], i * 4); cols.set(o.c, i * 3); });
    gl.uniform4fv(U('uO[0]'), arr); gl.uniform3fv(U('uOC[0]'), cols);
    // ronda 103 · los miembros que se mueven (pivote, lado y blandura de la línea, ángulo · el punto que marca la línea y la rampa desde el pivote)
    const fr = op.fotogramas && !reducido ? op.fotogramas(ahora) : 0, tq = ahora; // ronda 107: el fotograma lo marca el compás (tres por tiempo), el mismo que sostiene la pose
    gl.uniform1f(U('uFr'), op.fotogramas && !reducido ? (fr % 997) + 1 : 0);
    const mp = new Float32Array(12), mt = new Float32Array(12), meta = !reducido && op.angulos ? op.angulos(tq) : [];
    // ronda 104 · los ángulos, suavizados (un cambio de tema reinicia el reloj: el brazo no salta, llega)
    // ronda 107 · con `fotogramas`, la pose se sostiene (stop-motion, como el galope de ascii.fm): no se suaviza, cambia de golpe en cada fotograma
    const an = op.fotogramas ? meta : meta.map((v, i) => (suave[i] = suave[i] === undefined ? v : suave[i] + (v - suave[i]) * 0.12));
    (op.miembros || []).slice(0, 3).forEach((m, i) => { mp.set([m.p[0], m.p[1], m.lado, an[i] || 1e-6], i * 4); mt.set([m.t[0], m.t[1], m.r0, m.r1], i * 4); });
    gl.uniform4fv(U('uMP[0]'), mp); gl.uniform4fv(U('uMT[0]'), mt);
    rf += ((encima ? 1 : 0) - rf) * (encima ? 0.09 : 0.05); rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    gl.uniform3f(U('uRat'), rx, ry, rf < 0.002 ? 0 : rf * rf * (3 - 2 * rf));
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const frame = (ahora: number) => {
    raf = 0; if (!listo || !visto) return;
    impar = !impar; if (impar || op.miembros?.length) pintar(ahora); // a 30 fps; con miembros que se mueven, a 60 (ronda 104: a 30 se veía a saltos)
    if (!reducido) raf = requestAnimationFrame(frame);
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const arrancar = () => {
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tImg);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    if (!medir()) return; listo = true; if (suelta) cv.classList.add('listo'); pedir();
    if (reducido) pintar(performance.now());
  };
  (img.complete && img.naturalWidth ? Promise.resolve() : new Promise<void>((r) => img.addEventListener('load', () => r(), { once: true }))).then(() => document.fonts.load(`20px ${mono}`)).catch(() => {}).then(arrancar);
  let rz = 0;
  new ResizeObserver(() => { if (!listo) return; clearTimeout(rz); rz = window.setTimeout(() => { medir(); pintar(performance.now()); }, 150); }).observe(cv);
  return {
    soltar() { if (suelta) return; suelta = true; tSol = performance.now(); if (listo) { cv.classList.add('listo'); pedir(); } },
    visible(si: boolean) { visto = si; if (si) pedir(); },
    // ronda 99: la onda de COLOR (x, y en pantalla; c = rgb 0–1)
    onda(x: number, y: number, f = 1, c: number[] = [1, 0.38, 0.42]) { if (reducido) return; ondas.push({ x, y, t0: performance.now(), f, c }); },
    fondo() {}, luz() {}, punto(_k: number, x: number, y: number) { return [x, y]; },
  };
}
