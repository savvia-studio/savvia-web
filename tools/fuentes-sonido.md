# Fuentes de sonido (ronda 59)

Todas de Pixabay, licencia de contenido de Pixabay (uso libre, también comercial, sin atribución obligatoria). Se recortan y normalizan a
`public/media/sonido/` (mono; ambientes en bucle de 45 s con fundido cruzado de 3 s y −23 LUFS).

| Archivo | Original | Autor | Tramo |
|---|---|---|---|
| impresora.mp3 · cuchilla.mp3 | https://pixabay.com/sound-effects/technology-057941-epson-receipt-printer5-82477/ | freesound_community | 0,3–7,9 s · 8,72–9,05 s |
| ambiente-primavera.mp3 | https://pixabay.com/sound-effects/nature-forest-ambience-morningspring-localization-poland-4-296923/ | AudioPapkin | desde 73 s |
| ambiente-verano.mp3 | https://pixabay.com/sound-effects/nature-field-meadow-insects-crickets-summer-day-notl-10-57854/ | freesound_community | desde 65 s |
| ambiente-otono.mp3 | https://pixabay.com/sound-effects/nature-autumn-wind-grabbs-the-trees-17477/ | freesound_community | desde 161 s |
| ambiente-invierno.mp3 | https://pixabay.com/sound-effects/nature-gusty-winter-wind-loop-by-using-crossfades-215541/ | Shut_Up_Ghost | desde 200 s |

## Reel (ronda 60) — música provisional
- «Distant Miles», JonasBlakewood (Pixabay, licencia de contenido de Pixabay: uso libre sin atribución) · https://pixabay.com/music/beats-distant-miles-313990/
  → `tools/reel/distant-miles.mp3` (y copia en `tools/reel/hf/assets/`). 92 BPM. Provisional hasta elegir el tema definitivo (Artlist/Musicbed).

## Las cuatro estaciones (ronda 83) — la música de Proyectos destacados
Antonio Vivaldi, *Las cuatro estaciones*, interpretadas por **John Harrison (violín) con los Wichita State University Chamber Players**. Wikimedia Commons,
licencia **CC BY-SA 4.0** (atribución obligatoria: va en el pie de la web). Normalizadas a −23 LUFS, estéreo 96 kbps → `public/media/sonido/vivaldi/`.

| Archivo | Movimiento | Original |
|---|---|---|
| primavera.mp3 | La primavera, I Allegro | https://commons.wikimedia.org/wiki/File:Vivaldi_-_Four_Seasons_1_Spring_mvt_1_Allegro_-_John_Harrison_violin.oga |
| verano.mp3 | El verano, III Presto | https://commons.wikimedia.org/wiki/File:Vivaldi_-_Four_Seasons_2_Summer_mvt_3_Presto_-_John_Harrison_violin.oga |
| otono.mp3 | El otoño, I Allegro | https://commons.wikimedia.org/wiki/File:Vivaldi_-_Four_Seasons_3_Autumn_mvt_1_Allegro_-_John_Harrison_violin.oga |
| invierno.mp3 | El invierno, I Allegro non molto | https://commons.wikimedia.org/wiki/File:Vivaldi_-_Four_Seasons_4_Winter_mvt_1_Allegro_non_molto_-_John_Harrison_violin.oga |

## Ronda 116 · la música de la web (versión musical)
- **«Smooth Lovin'» — Kevin MacLeod (incompetech.com)**, licencia **Creative Commons Attribution 3.0** (https://creativecommons.org/licenses/by/3.0/).
  Fuente: https://commons.wikimedia.org/wiki/File:Smooth_Lovin_(ISRC_USUAN1700077).mp3 (Wikimedia Commons, CC BY 3.0). Atribución en el pie de la web.
- `public/media/sonido/smooth-lovin.mp3`: los primeros 245 s, normalizada a −18 LUFS, 128 kbps. 75 BPM (una negra = 0,8 s), primer pulso en 0,186 s;
  el bucle va del pulso 16 (13,186 s) al 304 (243,386 s): 72 compases (medido con librosa: `tools/r116/musica/analiza.py`).

## Ronda 117 · candidatas de jazz (Kevin MacLeod, incompetech.com)
Tres candidatas de jazz de verdad (sin IA) para sustituir a «Smooth Lovin'». Todas **Creative Commons Attribution 4.0** (https://creativecommons.org/licenses/by/4.0/;
las de Wikimedia/archive.org figuran como CC BY 3.0). Atribución obligatoria en el pie: `«<título>» — Kevin MacLeod (incompetech.com), CC BY 4.0`.
Descargadas del catálogo oficial (https://incompetech.com/music/royalty-free/mp3-royaltyfree/<título>.mp3; metadatos en https://incompetech.com/music/royalty-free/pieces.json),
convertidas a mp3 128 kbps estéreo, −18 LUFS (loudnorm) → `public/media/sonido/`. Análisis con librosa (rejilla de pulsos ajustada por regresión; el compás 1 se
elige por energía de graves + onset; el cierre del bucle, por correlación de croma con el inicio). Tiempos sobre el mp3 convertido.

| Archivo | Título · ISRC | BPM | firstBeat | loopStart → loopEnd | Compases | Instrumentos |
|---|---|---|---|---|---|---|
| jazz-study-and-relax.mp3 | «Study And Relax» · USUAN1900030 · https://incompetech.com/music/royalty-free/music.html (buscar el título) | 72,0 | 0,056 s | 13,389 → 120,055 s | 32 (croma 0,97) | saxos, piano, bajo, percusión |
| jazz-i-knew-a-guy.mp3 | «I Knew a Guy» · USUAN1100199 · también en https://archive.org/details/Jazz_Sampler-9619 | 75,0 | 0,046 s | 12,849 → 115,281 s | 32 (croma 0,85) | bajo andante, batería escasa, vibráfono |
| jazz-cool-vibes.mp3 | «Cool Vibes» · USUAN1100863 | 83,0 | 0,074 s | 14,529 → 199,554 s | 64 (croma baja: modula a mitad) | vibráfono, bajo, batería (trío lento) |

## Ronda 118 · Lobby Time (de serie)
- «Lobby Time», Kevin MacLeod (incompetech.com), CC BY 3.0 — https://commons.wikimedia.org/wiki/File:Lobby_Time_(ISRC_USUAN1600054).mp3 → `public/media/sonido/jazz-lobby-time.mp3` (3:13, 256 kbps). Medida con librosa: 129 BPM en el detector, se siente a la mitad; bucle 5,224 → 155,225 s (40 compases, 64 BPM). Crédito en el pie (automático: `cancionActual()`).
