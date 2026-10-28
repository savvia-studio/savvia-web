#!/bin/bash
# ronda 307 (18.ª): los 8 reels (4 estaciones × 2 idiomas) → renders/estaciones/ y, para la web, public/media/reel/ (reel, miniatura y pósters)
set -e
cd "$(dirname "$0")"; WEB=../../public/media/reel
for L in en; do for E in ${ESTS:-otono invierno primavera verano}; do
  EST=$E IDIOMA=$L node build.cjs | tail -1
  (cd hf && npx --yes hyperframes@0.8.174 render -q delivery -w 3 --quiet -o ../renders/estaciones/crudo.mp4 2>&1 | tail -1)
  F=renders/estaciones/reel-$E-$L.mp4
  ffmpeg -y -loglevel error -i renders/estaciones/crudo.mp4 -i renders/clics.wav -filter_complex "[1:a]aformat=sample_rates=48000:channel_layouts=stereo[c];[0:a][c]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-15:TP=-1.5:LRA=11[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart $F
  ffmpeg -y -loglevel error -i $F -vf scale=1600:900 -c:v libx264 -preset slow -crf 26 -maxrate 2M -bufsize 4M -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart $WEB/reel-$E-$L.mp4
  ffmpeg -y -loglevel error -i $WEB/reel-$E-$L.mp4 -frames:v 1 -vf scale=1600:900 -q:v 4 $WEB/reel-$E-$L.jpg
  ffmpeg -y -loglevel error -ss 57.5 -t 7 -i $F -vf scale=640:360 -an -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart $WEB/reel-mini-$E-$L.mp4
  ffmpeg -y -loglevel error -i $WEB/reel-mini-$E-$L.mp4 -frames:v 1 -q:v 4 $WEB/reel-mini-$E-$L.jpg
  echo "listo $E $L $(du -h $WEB/reel-$E-$L.mp4 | cut -f1)"
done; done
rm -f renders/estaciones/crudo.mp4
