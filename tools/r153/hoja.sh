#!/bin/bash
# Ronda 153 · hoja de contacto: por cada vídeo de un proyecto, tres fotogramas (5 %, 50 %, 95 %) con su nombre
slug=$1; out=$2; tmp=$(mktemp -d); rows=()
for v in public/media/obra/$slug/*.mp4; do
  n=$(basename $v .mp4); [ "$n" = portada ] && continue
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $v | tr -d ,)
  for k in 0 1 2; do t=$(printf "%.3f" $(echo "$dur*(0.05+0.45*$k)" | bc -l)); ffmpeg -loglevel error -y -ss $t -i $v -frames:v 1 -vf "scale=300:170:force_original_aspect_ratio=decrease,pad=300:170:(ow-iw)/2:0:white" $tmp/$n-$k.png; done
  ffmpeg -loglevel error -y -i $tmp/$n-0.png -i $tmp/$n-1.png -i $tmp/$n-2.png -filter_complex "hstack=3,pad=iw:ih+18:0:18:white" $tmp/r-$n.png
  rows+=(-i $tmp/r-$n.png)
done
c=$(( ${#rows[@]} / 2 ))
ffmpeg -loglevel error -y "${rows[@]}" -filter_complex "vstack=$c" -q:v 4 $out
rm -rf $tmp
