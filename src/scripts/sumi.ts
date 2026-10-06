// RONDA 114 · TINTA Y AGUA (sumi-e) en WebGL2. Andoni: «algo mucho más artístico, que eleve, como el árbol» → «la pincelada suena».
// Un papel que se moja de verdad: el pincel deja PIGMENTO y AGUA; en cada paso el agua se extiende por las FIBRAS del papel (una textura de fibras hecha una
// vez, anisótropa y al azar) y arrastra la tinta con ella; al irse el agua, la tinta se SECA y queda fija, más oscura donde el frente mojado se para (el canto
// de la aguada). El pincel tiene CERDAS: cuando se queda sin tinta abre huecos a lo largo del trazo (el «trazo seco», feibai).
// Estado (RGBA16F, ping-pong): R = tinta mojada · G = agua · B = tinta seca. Se pinta en un lienzo transparente: la tinta es el color del texto de la sección
// y el papel es la propia página (con su grano).
export type Trazo = { pts: [number, number, number][]; pig: number; agua: number; carga: number; gasto: number; semilla: number };
type Vivo = { t: Trazo; t0: number; dur: number; L: number; acum: number[]; hecho: number; fin: boolean };

const VS_PUNTO = `#version 300 es
in vec2 aP; in float aR; in float aAng; in float aPig; in float aAgua; in float aCarga; in float aSem;
uniform vec2 uRes;
out float vR; out float vAng; out float vPig; out float vAgua; out float vCarga; out float vSem; out float vTam;
void main(){ vR=aR; vAng=aAng; vPig=aPig; vAgua=aAgua; vCarga=aCarga; vSem=aSem; vTam=aR*2.6;
  gl_Position=vec4(aP/uRes*2.-1.,0.,1.); gl_PointSize=vTam; }`;
const FS_PUNTO = `#version 300 es
precision highp float;
in float vR; in float vAng; in float vPig; in float vAgua; in float vCarga; in float vSem; in float vTam;
out vec4 o;
float h1(float x){ return fract(sin(x*127.1)*43758.5453); }
float n1(float x){ float i=floor(x), f=fract(x); f=f*f*(3.-2.*f); return mix(h1(i),h1(i+1.),f); }
void main(){
  vec2 q=(gl_PointCoord-.5)*vec2(1.,-1.)*vTam/vR;           // en radios del pincel
  float c=cos(vAng), s=sin(vAng); vec2 l=vec2(c*q.x+s*q.y, -s*q.x+c*q.y); // l.x a lo largo del trazo, l.y de través
  float e=length(vec2(l.x*.82, l.y)) + (n1(atan(l.y,l.x)*3.+vSem*9.)-.5)*.16;
  float m=smoothstep(1.,.86,e);
  float pelo=n1(l.y*5.+vSem*31.)*.65+n1(l.y*17.+vSem*7.)*.35;                          // las cerdas: el mismo dibujo a lo largo de todo el trazo
  float seco=1.-vCarga;
  float hay=smoothstep(seco-.05, seco+.06, pelo*.92+.08);
  o=vec4(vPig*m*hay*(.3+.7*pelo*pelo), vAgua*m*mix(.35,1.,hay), 0., 0.);
}`;
const VS_PLANO = `#version 300 es
layout(location=0) in vec2 aP; out vec2 vUv; void main(){ vUv=aP*.5+.5; gl_Position=vec4(aP,0.,1.); }`;
// el papel: fibras (R) en direcciones al azar y grano fino (G)
const FS_PAPEL = `#version 300 es
precision highp float; in vec2 vUv; uniform vec2 uRes; uniform float uSem; out vec4 o;
float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))+uSem)*43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y); }
void main(){ vec2 p=vUv*uRes; float fib=0.;
  for(int k=0;k<5;k++){ float a=float(k)*1.37+uSem; vec2 d=vec2(cos(a),sin(a)); vec2 r=vec2(dot(p,d), dot(p,vec2(-d.y,d.x)));
    fib+=pow(n(r*vec2(.035,.6)+float(k)*17.), 3.); }
  o=vec4(clamp(.25+fib*.55,0.,1.), n(p*.9), 0., 1.); }`;
// un paso: el agua se extiende por las fibras, arrastra la tinta, se evapora y la tinta se seca (más en el canto que se para)
const FS_PASO = `#version 300 es
precision highp float; in vec2 vUv; uniform sampler2D uE; uniform sampler2D uPapel; uniform vec2 uTx; out vec4 o;
void main(){
  vec4 c=texture(uE,vUv); float W=c.r, A=c.g, D=c.b; float fc=texture(uPapel,vUv).r;
  vec2 off[4]=vec2[4](vec2(uTx.x,0.),vec2(-uTx.x,0.),vec2(0.,uTx.y),vec2(0.,-uTx.y));
  float dA=0., dW=0., gA=0.;
  for(int i=0;i<4;i++){ vec4 v=texture(uE,vUv+off[i]); float f=(fc+texture(uPapel,vUv+off[i]).r)*.5;
    dA+=(v.g-A)*f; dW+=(v.r-W)*f*smoothstep(.12,.6,min(A,v.g)); gA+=abs(v.g-A); }
  A=max(0., A+dA*.22); W=max(0., W+dW*.2);
  A=max(0., A*.9935-.0006);
  float moja=smoothstep(.015,.22,A);
  float seca=W*(.02+.3*(1.-moja)) + W*min(1.,gA*10.)*.12;
  W-=seca; D+=seca;
  o=vec4(min(W,2.), min(A,1.6), min(D,3.), 1.);
}`;
const FS_VER = `#version 300 es
precision highp float; in vec2 vUv; uniform sampler2D uE; uniform sampler2D uPapel; uniform vec3 uTinta; uniform float uFuerza; out vec4 o;
void main(){ vec4 c=texture(uE,vUv); vec2 pp=texture(uPapel,vUv).rg;
  float d=c.b+c.r*.8; float t=1.-exp(-d*1.25); t*=mix(.8,1.1,pp.g);
  float a=clamp(t*uFuerza + c.g*.035, 0., 1.);
  o=vec4(uTinta*a, a); }`;

export function crearSumi(cv: HTMLCanvasElement, { tinta = [0.92, 0.87, 0.9] as number[], semilla = 1 } = {}) {
  const gl = cv.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl || !gl.getExtension('EXT_color_buffer_float')) return null;
  const compila = (vs: string, fs: string) => {
    const p = gl.createProgram()!;
    for (const [t, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]] as const) { const s = gl.createShader(t)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader'); gl.attachShader(p, s); }
    gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link'); return p;
  };
  const pPunto = compila(VS_PUNTO, FS_PUNTO), pPapel = compila(VS_PLANO, FS_PAPEL), pPaso = compila(VS_PLANO, FS_PASO), pVer = compila(VS_PLANO, FS_VER);
  const quad = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const vaoPlano = gl.createVertexArray()!; gl.bindVertexArray(vaoPlano); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  // los puntos (las pinceladas de cada fotograma): 8 floats por punto
  const ATR = ['aP', 'aR', 'aAng', 'aPig', 'aAgua', 'aCarga', 'aSem'], TAM = [2, 1, 1, 1, 1, 1, 1];
  const vbo = gl.createBuffer()!, vaoP = gl.createVertexArray()!; gl.bindVertexArray(vaoP); gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  let off = 0; ATR.forEach((n, i) => { const loc = gl.getAttribLocation(pPunto, n); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, TAM[i], gl.FLOAT, false, 8 * 4, off * 4); off += TAM[i]; });
  gl.bindVertexArray(null);
  let W = 0, H = 0, k = 1, tex: WebGLTexture[] = [], fbo: WebGLFramebuffer[] = [], papel: WebGLTexture | null = null, fPapel: WebGLFramebuffer | null = null, cur = 0;
  const nueva = (w: number, h: number) => { const t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const f = gl.createFramebuffer()!; gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); return [t, f] as const; };
  // el tamaño: el lienzo a la medida CSS (a lo sumo 1,25×) y la simulación a lo sumo ~1 Mpx
  const medir = (cw: number, ch: number) => {
    const dpr = Math.min(1.25, devicePixelRatio || 1);
    cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr);
    k = Math.min(dpr, Math.sqrt(1_000_000 / (cw * ch))); const w = Math.max(2, Math.round(cw * k)), h = Math.max(2, Math.round(ch * k));
    if (w === W && h === H) return; W = w; H = h;
    tex.forEach((t) => gl.deleteTexture(t)); fbo.forEach((f) => gl.deleteFramebuffer(f)); tex = []; fbo = [];
    for (let i = 0; i < 2; i++) { const [t, f] = nueva(W, H); tex.push(t); fbo.push(f); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); }
    if (papel) { gl.deleteTexture(papel); gl.deleteFramebuffer(fPapel); }
    const [pt, pf] = nueva(W, H); papel = pt; fPapel = pf;
    gl.viewport(0, 0, W, H); gl.useProgram(pPapel); gl.uniform2f(gl.getUniformLocation(pPapel, 'uRes'), W, H); gl.uniform1f(gl.getUniformLocation(pPapel, 'uSem'), (semilla % 97) * 0.731);
    gl.bindVertexArray(vaoPlano); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    vivos.forEach((v) => { v.hecho = 0; }); // tras un cambio de tamaño se vuelve a pintar lo que estaba a medias
  };
  // ── las pinceladas vivas
  const vivos: Vivo[] = [], puntos: number[] = [];
  const largo = (t: Trazo) => { const a = [0]; for (let i = 1; i < t.pts.length; i++) a.push(a[i - 1] + Math.hypot(t.pts[i][0] - t.pts[i - 1][0], t.pts[i][1] - t.pts[i - 1][1])); return a; };
  const en = (v: Vivo, d: number) => { const p = v.t.pts, a = v.acum; let i = 1; while (i < a.length - 1 && a[i] < d) i++; const u = Math.min(1, Math.max(0, (d - a[i - 1]) / Math.max(1e-6, a[i] - a[i - 1])));
    return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * u, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * u, p[i - 1][2] + (p[i][2] - p[i - 1][2]) * u, Math.atan2(p[i][1] - p[i - 1][1], p[i][0] - p[i - 1][0])]; };
  const empuje = (u: number) => 1 - Math.pow(1 - u, 2.2); // el pincel arranca decidido y frena al levantarse
  const emitir = (ahora: number) => {
    for (const v of vivos) {
      if (v.fin || ahora < v.t0) continue;
      const u = Math.min(1, (ahora - v.t0) / v.dur), hasta = empuje(u) * v.L;
      while (v.hecho <= hasta) {
        const [x, y, r, ang] = en(v, v.hecho), f = v.L > 0 ? v.hecho / v.L : 1, carga = Math.max(0, v.t.carga - v.t.gasto * f);
        puntos.push(x * k, H - y * k, Math.max(0.6, r * k), -ang, v.t.pig * 0.085, v.t.agua * 0.16, carga, v.t.semilla);
        v.hecho += Math.max(0.45, r * k * 0.16) / k;
      }
      if (u >= 1) v.fin = true;
    }
    for (let i = vivos.length - 1; i >= 0; i--) if (vivos[i].fin) vivos.splice(i, 1);
  };
  const agua: number[] = [];
  let quieto = 0, fuerza = 1;
  const paso = () => {
    gl.viewport(0, 0, W, H);
    // las pinceladas y el agua del cursor, sumadas sobre el estado
    const lote = puntos.concat(agua); puntos.length = 0; agua.length = 0;
    if (lote.length) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo[cur]); gl.useProgram(pPunto); gl.uniform2f(gl.getUniformLocation(pPunto, 'uRes'), W, H);
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.bindVertexArray(vaoP); gl.bindBuffer(gl.ARRAY_BUFFER, vbo); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lote), gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.POINTS, 0, lote.length / 8); gl.disable(gl.BLEND); quieto = 0;
    }
    // la difusión: tres pasos por fotograma
    gl.useProgram(pPaso); gl.bindVertexArray(vaoPlano);
    gl.uniform2f(gl.getUniformLocation(pPaso, 'uTx'), 1 / W, 1 / H); gl.uniform1i(gl.getUniformLocation(pPaso, 'uE'), 0); gl.uniform1i(gl.getUniformLocation(pPaso, 'uPapel'), 1);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, papel);
    for (let i = 0; i < 3; i++) { gl.bindFramebuffer(gl.FRAMEBUFFER, fbo[1 - cur]); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex[cur]); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); cur = 1 - cur; }
    quieto++;
  };
  const ver = () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, cv.width, cv.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(pVer); gl.bindVertexArray(vaoPlano);
    gl.uniform1i(gl.getUniformLocation(pVer, 'uE'), 0); gl.uniform1i(gl.getUniformLocation(pVer, 'uPapel'), 1); gl.uniform3fv(gl.getUniformLocation(pVer, 'uTinta'), tinta); gl.uniform1f(gl.getUniformLocation(pVer, 'uFuerza'), fuerza);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex[cur]); gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, papel);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  return {
    medir,
    // una pincelada, en px CSS del lienzo; empieza en `t0` (performance.now) y dura `dur` ms
    trazo(t: Trazo, t0: number, dur: number) { const acum = largo(t); vivos.push({ t, t0, dur: Math.max(16, dur), L: acum[acum.length - 1], acum, hecho: 0, fin: false }); },
    // agua limpia (el cursor): la tinta cercana se vuelve a mojar y se corre
    mojar(x: number, y: number, r = 16, f = 1) { agua.push(x * k, H - y * k, r * k, 0, 0, 0.05 * f, 1, 0); },
    // un fotograma: devuelve si queda algo vivo (pinceladas o agua aún moviéndose)
    fotograma(ahora: number) { emitir(ahora); paso(); ver(); return vivos.length > 0 || quieto < 420; },
    pendientes: () => vivos.length,
    tinta(c: number[]) { tinta = c; },
    fuerza(f: number) { fuerza = f; },
  };
}
export type Sumi = NonNullable<ReturnType<typeof crearSumi>>;
