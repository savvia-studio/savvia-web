// La firma «savvia» a mano, de un solo trazo (las v acaban en PICO: con la v redonda se leía «savrra»). viewBox 0 0 240 64.
// La usan la firma bajo los pasos (Recorrido.astro, con su cola de lado a lado) y la carga (Cargador.astro, sin cola: la gota se
// descuelga de la última «a»).
export const COLA = 'C164 52 176 38 192 43C208 48 222 46 240 46';
export const LETRAS =
  'M4 52C10 46 17 35 21 29C24 34 27 41 25 47C23 52 14 53 11 48C18 53 28 51 34 44C34 34 44 27 51 32C45 26 34 32 34 42C34 51 43 53 48 46C50 42 51 36 51 32C50 40 50 49 55 50C60 50 63 42 65 31' +
  'C67 38 70 46 74 52C77 45 81 37 83 29C84 33 87 35 91 32C93 39 96 46 100 52C103 45 107 37 109 29C110 33 113 35 117 33' +
  'C117 39 117 48 121 50C126 50 130 45 133 40C136 33 143 29 149 32C143 26 132 32 132 42C132 51 141 53 146 46C148 42 149 36 149 32C148 40 148 49 153 50';
export const PUNTO = 'M118.6 21L119 21.8';
export const FIRMA = LETRAS + COLA + PUNTO;
