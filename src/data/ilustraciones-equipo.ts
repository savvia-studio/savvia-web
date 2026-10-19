// RONDA 254 · Andoni: «quitamos los frames, dejamos a Andoni y Eric parados y cuando hovereamos hacemos que las cards que salen estén acompañadas por
// ilustraciones del estilo que te voy a mandar» (referencia: cómic a línea gruesa con trama de puntos; los objetos de quien es SALEN DE SU CABEZA).
// Ronda 257: van DENTRO de cada píldora, como su icono, en la tinta de la píldora (más mimetizadas con las tarjetas que salen).
// Una por afición (home.ts › estudio.personas[].hobbies), en el mismo orden. viewBox 100 × 100; trazo en la tinta de la sección (currentColor), los
// interiores en el fondo (var(--noche)) y las sombras con la trama de puntos compartida (#trama-eq, en Estudio.astro).
const T = 'fill="url(#trama-eq)"', N = 'fill="var(--noche)"', S = 'fill="currentColor"';

const balon = `<circle cx="50" cy="50" r="33" ${N}/>
<path d="M73.3 26.7A33 33 0 0 1 26.7 73.3A38 38 0 0 0 73.3 26.7Z" ${T}/>
<circle cx="50" cy="50" r="33"/>
<path d="M50 17V83M17 50H83M28 25C41 38 41 62 28 75M72 25C59 38 59 62 72 75"/>
<path d="M10 30L4 27M8 44H1M12 58L5 61" class="v"/>`;

const mando = `<path d="M24 38C24 31 31 29 37 31H63C69 29 76 31 76 38L85 66C87 75 79 79 73 73L65 63H35L27 73C21 79 13 75 15 66Z" ${N}/>
<path d="M65 63H35L27 73C21 79 13 75 15 66L19 52C24 58 30 61 36 61H64C70 61 76 58 81 52L85 66C87 75 79 79 73 73Z" ${T}/>
<path d="M24 38C24 31 31 29 37 31H63C69 29 76 31 76 38L85 66C87 75 79 79 73 73L65 63H35L27 73C21 79 13 75 15 66Z"/>
<path d="M29 45H39M34 40V50"/>
<circle class="boton" cx="64" cy="42" r="3.4" ${S}/><circle class="boton b2" cx="71" cy="48" r="3.4" ${S}/>
<circle cx="44" cy="54" r="5" ${N}/><circle cx="56" cy="54" r="5" ${N}/>
<path d="M44 23V15M50 24L54 17M56 25L62 20" class="v"/>`;

const cafe = `<path d="M27 38H67V69C67 77 61 82 54 82H40C33 82 27 77 27 69Z" ${N}/>
<path d="M56 38H67V69C67 77 61 82 54 82Z" ${T}/>
<path d="M27 38H67V69C67 77 61 82 54 82H40C33 82 27 77 27 69Z"/>
<ellipse cx="47" cy="38" rx="20" ry="4.5" ${S}/>
<path d="M67 45C80 45 80 64 67 64"/>
<path d="M39 28C35 22 43 18 39 11M49 28C45 22 53 18 49 11M59 28C55 22 63 18 59 11" class="v"/>`;

const futbol = `<circle cx="50" cy="50" r="33" ${N}/>
<path d="M73.3 26.7A33 33 0 0 1 26.7 73.3A38 38 0 0 0 73.3 26.7Z" ${T}/>
<path d="M50 39L60.5 46.6L56.5 59L43.5 59L39.5 46.6Z" ${S}/>
<circle cx="50" cy="50" r="33"/>
<path d="M50 39V18M60.5 46.6L80 40M56.5 59L68 76M43.5 59L32 76M39.5 46.6L20 40"/>
<path d="M90 30L96 27M92 44H99M88 58L95 61" class="v"/>`;

// ronda 257 · Andoni: «a Eric en la huerta, una azada»
const azada = `<g class="golpe"><path d="M18 86L25 91L74 20L67 15Z" ${N}/>
<path d="M18 86L25 91L74 20L67 15Z"/>
<path d="M64 13L90 25L85 43L69 31Z" ${T}/>
<path d="M64 13L90 25L85 43L69 31Z"/></g>
<path d="M44 93H90"/>
<path class="brote" d="M70 93V80M70 84C62 78 56 80 54 85C61 88 67 87 70 84M70 81C76 73 83 75 85 79C80 84 74 84 70 81"/>`;

// ronda 257 · Andoni: «a Eric en música, unos AirPods»
const bud = `<path d="M14 26C14 15 33 13 37 24C40 31 35 38 31 40V76C31 83 21 83 21 76V42C17 38 14 33 14 26Z"/>
<ellipse cx="26" cy="25" rx="5.5" ry="4" ${S}/>`;
const airpods = `<path d="M14 26C14 15 33 13 37 24C40 31 35 38 31 40V76C31 83 21 83 21 76V42C17 38 14 33 14 26Z" ${N}/>
${bud}
<g transform="translate(36 8)"><path d="M14 26C14 15 33 13 37 24C40 31 35 38 31 40V76C31 83 21 83 21 76V42C17 38 14 33 14 26Z" ${N}/>
<path d="M21 42H31V76C31 83 21 83 21 76Z" ${T}/>${bud}</g>
<path d="M84 26C89 32 89 42 84 48M91 20C99 30 99 46 91 56" class="v"/>`;

// nombre de cada una (para su gesto, en Estudio.astro)
export const GESTOS: Record<'Andoni' | 'Eric', string[]> = { Andoni: ['balon', 'mando', 'cafe'], Eric: ['futbol', 'azada', 'airpods'] };

export const ILUSTRACIONES: Record<'Andoni' | 'Eric', string[]> = {
  Andoni: [balon, mando, cafe], // baloncesto · videojuegos · café en casa
  Eric: [futbol, azada, airpods], // deporte · naturaleza (la huerta) · música
};
