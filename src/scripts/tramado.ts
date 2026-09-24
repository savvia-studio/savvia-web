// TRAMADO (ronda 11) · el «efecto chulo estilo dithering» del roble 3D y de sus raíces.
// Un lienzo WebGL pinta una lámina (render de Blender con alfa) con TRAMADO ORDENADO (matriz de Bayer 8×8, celda de 2 px CSS):
//   · el color se reduce a pocos niveles y la trama reparte el error → textura de estampa, y disimula que es un render;
//   · CRECER no es un fundido ni un desenfoque: la imagen se va «imprimiendo» punto a punto desde un origen (la base del tronco
//     hacia arriba; el cuello de la raíz hacia abajo). El frente es la propia trama.
// `crecer(0…1)` lo llama quien lo use: el hero por tiempo, las raíces con el scroll. Devuelve null si no hay WebGL.
// OJO: nada de comillas invertidas dentro del shader (cortan la plantilla) ni uniforms que choquen con locales.
const VS = 'attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}';
const FS = [
  'precision highp float;',
  'uniform sampler2D T;uniform vec2 R,O;uniform float ti,gr,dpr,brisa,niv;varying vec2 v;',
  'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
  'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
  'float b2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}',
  'float b8(vec2 a){return b2(.25*a)*.0625+b2(.5*a)*.25+b2(a);}',
  'void main(){',
  '  vec2 asp=vec2(R.x/R.y,1.);vec2 q=v;',
  // brisa: solo lejos del origen (la copa); el tronco y el cuello no se mueven
  '  float lejos=smoothstep(.25,.8,distance(v*asp,O*asp));',
  '  q.x+=(sin(ti*.55+v.y*5.+v.x*3.)+.5*sin(ti*.93+v.x*9.))*.0026*lejos*brisa;',
  '  q.y+=sin(ti*.47+v.x*6.)*.0013*lejos*brisa;',
  '  vec4 c=texture2D(T,q);',
  '  float a=c.a*smoothstep(0.,.02,q.x)*smoothstep(1.,.98,q.x);',
  '  vec3 col=c.rgb;',
  // trama: celda de 2 px CSS
  '  vec2 celda=floor(gl_FragCoord.xy/(2.*dpr));',
  '  float t=b8(celda);',
  '  vec3 tr=floor(col*niv+t)/niv;',
  '  col=mix(col,tr,.9);',
  '  a=a>.5?1.:(a>t*.5?a*2.:0.);', // el canto translúcido también se trama: sin halo sobre Cacao
  // crecer: distancia al origen + algo de ruido; el frente es la trama
  '  float d=distance(v*asp,O*asp)/1.25+(n(v*asp*6.)-.5)*.14;',
  '  float lp=(gr*1.5-d)/.42;',
  '  a*=step(t,lp);',
  '  gl_FragColor=vec4(col*a,a);',
  '}',
].join('\n');

export type Tramado = { crecer(g: number): void; medir(): void; visible(si: boolean): void };

export function crearTramado(cv: HTMLCanvasElement, img: HTMLImageElement, op: { origen: [number, number]; brisa?: number; niveles?: number; animar?: boolean }): Tramado | null {
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
  const uR = U('R'), uT = U('ti'), uG = U('gr'), uD = U('dpr');
  gl.uniform2f(U('O'), op.origen[0], op.origen[1]);
  gl.uniform1f(U('brisa'), op.brisa ?? 0);
  gl.uniform1f(U('niv'), op.niveles ?? 5);
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let listo = false, g = 0, raf = 0, ve = true, t0 = 0;
  const pintar = (ahora: number) => {
    raf = 0;
    if (!listo) return;
    if (!t0) t0 = ahora;
    gl.uniform1f(uT, reducido ? 0 : (ahora - t0) / 1000);
    gl.uniform1f(uG, g);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (op.animar && ve && !reducido) raf = requestAnimationFrame(pintar);
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(pintar); };
  const medir = () => {
    const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(r.width * dpr)), hh = Math.max(1, Math.round(r.height * dpr));
    if (w !== cv.width || hh !== cv.height) { cv.width = w; cv.height = hh; }
    gl.viewport(0, 0, w, hh); gl.uniform2f(uR, w, hh); gl.uniform1f(uD, dpr);
    pedir();
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
    crecer(x) { const k = Math.min(1, Math.max(0, x)); if (Math.abs(k - g) > 0.0005 || k === 1) { g = k; pedir(); } },
    medir,
    visible(si) { ve = si; if (si) pedir(); },
  };
}
