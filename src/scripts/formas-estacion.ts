// RONDA 65 · «los iconos de cambiar de estación, que parezcan más cada estación». Las cuatro formas, en una caja de 24 × 24, cada una UN SOLO contorno
// cerrado (así el icono de la barra puede transformarse de una a otra): otoño = hoja de ROBLE (lóbulos y rabillo) · invierno = COPO de seis brazos con
// ramas · primavera = flor de CEREZO (cinco pétalos redondos, mellados en la punta) · verano = SOL con rayos largos y cortos. Orden de estacion.ts.
type P = [number, number];

// la hoja de roble, como trazo (se muestrea en el navegador con getPointAtLength); ladeada 20° al dibujarla
// RONDA 67 · «el icono de otoño, que sea una hoja»: una hoja clásica (punta, lomo algo asimétrico y rabillo), ladeada; el nombre se queda
export const HOJA_ROBLE =
  'M12 2.2C16.6 5.2 19.4 9.6 18.2 14.4C17.2 18 14.6 19.8 12.6 20.3L12.6 22.2L11.4 22.2L11.4 20.3C9 19.8 6.4 17.6 5.8 13.8C5.1 9.2 7.6 5 12 2.2Z';
export const GIRO_HOJA = -35;

// el copo: seis brazos (medio ancho h) con dos ramas en V que miran hacia la punta; el contorno se recorre brazo a brazo
export function copo(): P[] {
  const h = 0.85, R = 9.6, bx = 5.4, L = 3.1, c = Math.SQRT1_2;
  const arriba: P[] = [
    [1.732 * h, h], // donde se encuentra con el brazo vecino
    [bx - h, h],
    [bx - h + L * c - h * c, h + L * c + h * c],
    [bx - h + L * c + h * c, h + L * c - h * c],
    [bx + h * 1.2, h],
    [R - h, h],
    [R, 0],
  ];
  const brazo: P[] = [...arriba, ...arriba.slice(0, -1).reverse().map(([x, y]) => [x, -y] as P)];
  const out: P[] = [];
  for (let k = 0; k < 6; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 3, ca = Math.cos(a), sa = Math.sin(a);
    // cada brazo, del lado de abajo (-y) al de arriba (+y), para que el contorno avance en un solo sentido
    const b = [...brazo].reverse();
    for (const [x, y] of b) out.push([12 + x * ca - y * sa, 12 + x * sa + y * ca]);
  }
  return out;
}

// polares: r(a) en fracciones de 9,6
function polar(r: (a: number) => number, n = 360): P[] {
  return Array.from({ length: n }, (_, k) => { const a = (k / n) * Math.PI * 2 - Math.PI / 2, q = r(a) * 9.6; return [12 + q * Math.cos(a), 12 + q * Math.sin(a)] as P; });
}
export const flor = () => polar((a) => { const c = Math.abs(Math.cos(2.5 * a)); return 0.4 + 0.6 * Math.pow(c, 0.55) - 0.14 * Math.pow(c, 60); });
export const sol = () => polar((a) => { const c = Math.cos(8 * a); return 0.5 + 0.5 * Math.pow(Math.max(0, c), 36) + 0.26 * Math.pow(Math.max(0, -c), 36); }, 720);

export const aD = (p: P[]) => 'M' + p.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L') + 'Z';

// remuestrea un contorno a N puntos equidistantes, en sentido horario, empezando por el punto más alto (para que la transformación no se cruce)
export function remuestrear(p: P[], N: number): P[] {
  const L = [0];
  for (let i = 1; i <= p.length; i++) L.push(L[i - 1] + Math.hypot(p[i % p.length][0] - p[i - 1][0], p[i % p.length][1] - p[i - 1][1]));
  const T = L[L.length - 1], out: P[] = [];
  let j = 0;
  for (let k = 0; k < N; k++) {
    const s = (k / N) * T;
    while (L[j + 1] < s) j++;
    const a = p[j], b = p[(j + 1) % p.length], f = (s - L[j]) / Math.max(1e-6, L[j + 1] - L[j]);
    out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
  }
  let area = 0; for (let i = 0; i < N; i++) { const [x1, y1] = out[i], [x2, y2] = out[(i + 1) % N]; area += x1 * y2 - x2 * y1; }
  if (area < 0) out.reverse();
  let top = 0; for (let i = 1; i < N; i++) if (out[i][1] < out[top][1] - 1e-6 || (Math.abs(out[i][1] - out[top][1]) < 1e-6 && Math.abs(out[i][0] - 12) < Math.abs(out[top][0] - 12))) top = i;
  return [...out.slice(top), ...out.slice(0, top)];
}
