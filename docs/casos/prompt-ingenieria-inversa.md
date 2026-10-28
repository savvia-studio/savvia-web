# Prompt · ingeniería inversa de un proyecto para su caso de estudio

Se pega en una sesión NUEVA de Claude Code abierta en la carpeta del proyecto del cliente
(Neety: `~/ShipStudio/neety`). Solo lee; escribe un único archivo: `docs/dossier-caso.md`.
Para otro proyecto, cambiar el nombre, la carpeta y la ruta de las sesiones.

---

Vamos a hacer la ingeniería inversa de este proyecto para escribir su caso de estudio en la web de savvia
(nuestro estudio). Fue nuestro PRIMER proyecto con desarrollo agéntico, así que eso es lo más importante de contar.
Lo que buscamos NO es describir la web, sino demostrar el TRABAJO hecho y el VALOR que le aportamos al cliente.

No toques nada del proyecto. Solo lee y escribe un archivo: `docs/dossier-caso.md`.

## Fuentes (léelas todas, en este orden)
1. `docs/decisiones.md` entero (son ~170 decisiones fechadas; es la columna vertebral).
2. `CLAUDE.md`, `README.md`, `docs/lanzamiento.md`, `docs/cms-sanity.md` y cualquier `HANDOFF-*.md`.
3. Las sesiones de Claude Code del proyecto: `~/.claude/projects/-Users-ericruiz-ShipStudio-neety/*.jsonl`
   (busca los mensajes del usuario: ahí están las peticiones y el feedback del cliente con sus palabras).
4. `git log` completo (fechas, ritmo) y, si aporta, `../neety-back-2026-09-15.git`.
5. El código: rutas en `app/`, componentes en `components/`, la librería (`/library`), `scripts/`, `studio/`.
6. `.shipstudio/` (capturas) y `public/` / `assets-src/` (material visual).

## Qué escribir en `docs/dossier-caso.md`
Cada dato con su FUENTE entre corchetes (archivo y fecha o línea). Nada inventado: si algo no está, `FALTA: …`.

1. **Ficha**: cliente, qué hace (una frase), sector, país, fechas (inicio, entregas, salida), duración,
   quiénes trabajaron, páginas e idiomas, stack, dónde está publicada.
2. **Qué hicimos (resumen en 2 frases)**: para la columna fija del caso.
3. **El punto de partida**: qué tenía el cliente (Figma, marca, web anterior, plazos) y qué necesitaba.
4. **Valor aportado al cliente**: la parte más importante. Una lista de 10 a 20 puntos con este formato:
   `Qué ganó el cliente` → `qué hicimos` → `prueba` (dato, fecha, decisión). Ejemplos de tipo: autonomía
   (edita sin depender de nosotros), velocidad (rondas de feedback resueltas en horas), salida por fases
   (coming soon mientras tanto), rendimiento (peso de la web antes y después), alcance (idiomas, auto-routing),
   robustez (fallos de Safari/iOS resueltos), traspaso (documentación, librería, guía para Claude).
5. **Cómo trabajamos (lo agéntico)**: el flujo real de principio a fin: Figma → briefs de Ship Studio → código →
   feedback con Agentation → decisiones documentadas → traspaso con CLAUDE.md, decisiones.md y /library → el
   cliente pidiendo cambios a Claude (p. ej. `new-post.mjs`). Con ejemplos concretos y fechas.
6. **Rondas de feedback del cliente**: cronología corta (fecha · qué pidió, con sus palabras si están · qué se hizo).
7. **Problemas resueltos**: 5 a 10 historias pequeñas que demuestren oficio (problema, solución, resultado).
8. **Cifras verificables**: solo números que salgan de las fuentes (páginas, idiomas, decisiones, MB, días…).
9. **Las piezas de la web**: secciones y componentes más destacados, con 1 línea cada uno y qué vídeo o
   captura lo enseñaría mejor (ruta del archivo si ya existe).
10. **Material visual disponible**: lista de capturas, vídeos y assets útiles, con su ruta.
11. **Citas**: frases textuales del cliente que podrían servir de testimonio (con fecha y fuente).
12. **Preguntas para Eric y Andoni**: todo lo que falta y solo saben ellos.

## Reglas
- Habla de VALOR para el cliente, no de técnica por la técnica. La técnica solo si explica un beneficio.
- Fuera lo privado: tokens, IDs de proyecto, endpoints, contenedores de analítica, correos y nombres de
  personas del cliente (pon «su equipo», «el responsable de marketing»… salvo en «Citas», marcado como pendiente de permiso).
- En castellano, frases cortas y claras. Sin cursivas, sin «·» como separador, sin rayas largas.
- Al terminar, dime en 5 líneas lo más fuerte que has encontrado y cuántos `FALTA` quedan.
