// RONDA 129 · EL ROBLE EN RELIEVE: gofrado en seco sobre el papel del manifiesto (sin tinta: solo luz y sombra en el color del papel).
// El mapa de alturas (public/media/manifiesto/roble-relieve.webp, tools/r129/relieve.cjs) se sube UNA vez a la GPU.
// Ronda 130: el relieve es ESTÁTICO (la página lo pinta una vez, con la luz fija desde arriba a la izquierda, y solo repinta al cambiar de tamaño).

// Ronda 133: LA MANO. Al pasar el puntero, una luz rasante local nace en la mano (la dirección de la luz gira alrededor de ella,
// como inclinar el papel bajo una lámpara), el relieve se marca más bajo la palma y el papel coge un calor mínimo. Se apaga con la distancia.
export type Mano = { x: number; y: number; f: number; alza: number; r: number };
export type Pose = { cx: number; cy: number; w: number; h: number; giro: number; luz: number; fuerza: number; mano?: Mano };

const VS = `attribute vec2 p; uniform vec2 c; uniform vec2 s; uniform float g; uniform vec2 res; varying vec2 uv;
void main(){ uv = p * 0.5 + 0.5; uv.y = 1.0 - uv.y; vec2 q = p * s * 0.5; float cs = cos(g), sn = sin(g);
q = vec2(q.x * cs - q.y * sn, q.x * sn + q.y * cs); vec2 px = c + vec2(q.x, -q.y);
gl_Position = vec4(px / res * 2.0 - 1.0, 0.0, 1.0); gl_Position.y = -gl_Position.y; }`;

// dos escalas de relieve: la fina (hojas, corteza) y la ancha (el bulto del árbol, que es lo que «se ve» desde lejos)
const FS = `precision mediump float; uniform sampler2D t; uniform vec2 px; uniform vec2 L; uniform float k; varying vec2 uv;
uniform vec2 rz; uniform vec3 M; uniform float R; uniform float A;
float h(vec2 o){ return texture2D(t, uv + o).r; }
void main(){
  vec2 g1 = vec2(h(vec2(px.x,0.)) - h(vec2(-px.x,0.)), h(vec2(0.,px.y)) - h(vec2(0.,-px.y)));
  vec2 d = px * 3.5;
  vec2 g2 = vec2(h(vec2(d.x,0.)) - h(vec2(-d.x,0.)), h(vec2(0.,d.y)) - h(vec2(0.,-d.y)));
  vec2 g = g1 * 1.6 + g2 * 0.9;
  // la mano: posición del fragmento en píxeles del lienzo (y hacia abajo, como la luz)
  vec2 fp = vec2(gl_FragCoord.x, rz.y - gl_FragCoord.y);
  vec2 dm = M.xy - fp;
  float dist = length(dm);
  float rr = R * 0.5; float w = M.z * exp(-(dist * dist) / (rr * rr));
  // luz rasante desde la mano, un poco por encima: cerca rodea el bulto, lejos vuelve la luz de la sala
  vec2 Ll = dm / (dist + R * 0.22);
  vec2 Lm = normalize(mix(L, Ll * 1.35, w) + vec2(1e-4));
  float kk = k * (1.0 + w * (0.55 + A));
  float s = dot(-g, Lm) * kk;
  float hi = clamp(s, 0.0, 1.0), sh = clamp(-s, 0.0, 1.0);
  vec3 cHi = mix(vec3(1.0, 0.985, 0.995), vec3(1.0, 0.93, 0.84), w * 0.35), cSh = vec3(0.188, 0.125, 0.094);
  float ah = 0.62 + w * 0.12, as = 0.18 + w * 0.1;
  // el calor de la palma sobre el papel: casi nada
  float calor = w * 0.035;
  vec3 col = cHi * hi * ah + cSh * sh * as + vec3(1.0, 0.86, 0.72) * calor;
  float a = clamp(hi * ah + sh * as + calor, 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}`;

export async function crearRelieve(lienzo: HTMLCanvasElement, src: string) {
  const img = new Image();
  img.src = src;
  await img.decode();


  const gl = lienzo.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return { pintar: (_: Pose) => {}, tam: (_w: number, _h: number) => {}, ok: false };

  const sh = (tipo: number, s: string) => { const o = gl.createShader(tipo)!; gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(pr);
  gl.useProgram(pr);
  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const ap = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(ap);
  gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

  // textura cuadrada potencia de dos (mipmaps en WebGL1 también: al reducirla no chispea con la deriva)
  const T = 1024;
  const tc = document.createElement('canvas');
  tc.width = T; tc.height = T;
  const tx = tc.getContext('2d')!;
  tx.drawImage(img, 0, 0, T, T);
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const U = (n: string) => gl.getUniformLocation(pr, n);
  const uc = U('c'), us = U('s'), ug = U('g'), ures = U('res'), upx = U('px'), uL = U('L'), uk = U('k'), uM = U('M'), uR = U('R'), uA = U('A'), urz = U('rz');
  let dpr = 1;
  const tam = (w: number, h: number) => {
    dpr = Math.min(1.5, devicePixelRatio || 1);
    lienzo.width = Math.round(w * dpr);
    lienzo.height = Math.round(h * dpr);
    gl.viewport(0, 0, lienzo.width, lienzo.height);
  };
  const pintar = (p: Pose) => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uc, p.cx * dpr, p.cy * dpr);
    gl.uniform2f(us, p.w * dpr, p.h * dpr);
    gl.uniform1f(ug, p.giro);
    gl.uniform2f(ures, lienzo.width, lienzo.height);
    gl.uniform2f(upx, 1.1 / (p.w * dpr), 1.1 / (p.h * dpr));
    gl.uniform2f(uL, Math.cos(p.luz), Math.sin(p.luz));
    gl.uniform1f(uk, p.fuerza);
    const m = p.mano;
    gl.uniform3f(uM, (m?.x ?? -1e4) * dpr, (m?.y ?? -1e4) * dpr, m?.f ?? 0);
    gl.uniform1f(uR, (m?.r ?? 180) * dpr);
    gl.uniform1f(uA, m?.alza ?? 0);
    gl.uniform2f(urz, lienzo.width, lienzo.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  return { pintar, tam, ok: true };
}
