#!/bin/bash
# RONDA 154 · HOJA DE CONTACTOS de los medios de «Los detalles» (y la portada) de un caso: inicio · 25 % · 50 % · 75 % · final de cada vídeo
# bash tools/r154/hoja.sh <slug> <salida.jpg>
S=$1; OUT=$2; O=$(cd "$(dirname "$0")/../../public/media/obra" && pwd); T=$(mktemp -d)
LIST="${3:-portada $(grep -o "pz('$S', '[a-z0-9-]*'" "$(dirname "$0")/../../src/data/proyectos.ts" | sed "s/.*', '\([^']*\)'/\1/")}"
i=0
for n in $LIST; do
  f=$O/$S/$n.mp4; [ -f $f ] || continue
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)
  args=""; for k in 0 0.25 0.5 0.75 0.97; do t=$(printf '%.3f' $(echo "$d*$k" | bc -l)); ffmpeg -v error -y -ss $t -i $f -frames:v 1 -vf "scale=360:240:force_original_aspect_ratio=decrease,pad=360:240:(ow-iw)/2:(oh-ih)/2:color=gray" $T/$n-$k.png; args="$args $T/$n-$k.png"; done
  ffmpeg -v error -y $(for a in $args; do echo -n "-i $a "; done) -filter_complex "hstack=inputs=5,pad=iw:ih+8:0:8:color=white" $T/r$(printf %02d $i).png
  echo "fila $i: $n $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 $f) ${d}s"; i=$((i+1))
done
ffmpeg -v error -y $(for r in $T/r*.png; do echo -n "-i $r "; done) -filter_complex "$([ $i -gt 1 ] && echo vstack=inputs=$i || echo null)" -q:v 4 $OUT
rm -rf $T; echo $OUT
