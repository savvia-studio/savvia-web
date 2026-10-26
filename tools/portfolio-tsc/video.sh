#!/bin/zsh
# Vídeo de una pieza de /proyectos desde un enlace de Screen Studio (26/10/2026, Eric: «el vídeo siempre a velocidad normal», entero).
#   tools/portfolio-tsc/video.sh <slug> <https://screen.studio/share/... | https://…/video.mp4> [movil]
# Con «movil» (grabación del inspector de Chrome en iPhone 16): <slug>-movil.mp4/.jpg a 390 de ancho, sin recorte (la mesa con el móvil la encaja);
# después, añadir el slug a MOVIL_GRABADO en src/views/Portfolio.astro.
# → public/media/anteriores/video/<slug>.mp4/.jpg (card, 960 de ancho) y <slug>-grande.mp4/.jpg (visor, 1600). Screen Studio: recortado a 960×552.
# Después: añadir el slug a GRABADOS en src/views/Portfolio.astro.
set -e
slug=$1; url=$2
tmp=$(mktemp -d); out=$(cd "$(dirname $0)/../.." && pwd)/public/media/anteriores/video
if [[ $url == *.mp4* || $url == *.webm* ]]; then src=$url; else  # un mp4 directo (los vídeos del CMS de treseiscero) o una página de Screen Studio
  curl -sL "$url" -o $tmp/share.html
  src=$(grep -oE 'https://[^"\\ ]*-video\.mp4[^"\\ ]*' $tmp/share.html | sed 's/&amp;/\&/g; s/\\u0026/\&/g' | head -1)
fi
[ -z "$src" ] && { echo "no encuentro el vídeo en $url"; exit 1; }
curl -sL "$src" -o $tmp/src.mp4
dims=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $tmp/src.mp4); w=${dims%,*}; h=${dims#*,}
# recorte centrado a la proporción de las cards (960:552)
cw=$(( h * 960 / 552 )); (( cw > w )) && cw=$w
crop="crop=$cw:$(( cw * 552 / 960 ))"
# los mp4 del CMS, con SU proporción (Eric: «para el caso de mp4 adapta el ratio del mockup»: el navegador toma la medida del póster)
[[ $url == *.mp4* || $url == *.webm* ]] && crop="null"
peq="scale=960:-2:flags=lanczos"; gra="scale=1600:-2:flags=lanczos"
C=(-an -c:v libx264 -preset medium -g 30 -movflags +faststart)
if [[ $3 == movil ]]; then
  ffmpeg -v error -y -i $tmp/src.mp4 -vf "scale=390:-2:flags=lanczos,fps=30,format=yuv420p" $C -crf 28 $out/$slug-movil.mp4
  ffmpeg -v error -y -ss 1.5 -i $tmp/src.mp4 -frames:v 1 -vf "scale=390:-2:flags=lanczos" -q:v 3 $out/$slug-movil.jpg
  echo "$slug (móvil) · $(ffprobe -v error -show_entries format=duration -of csv=p=0 $out/$slug-movil.mp4) s · $(du -h $out/$slug-movil.mp4 | cut -f1) · origen ${w}×${h}"
  rm -rf $tmp; exit 0
fi
ffmpeg -v error -y -i $tmp/src.mp4 -vf "$crop,$peq,fps=30,format=yuv420p" $C -crf 30 $out/$slug.mp4
ffmpeg -v error -y -i $tmp/src.mp4 -vf "$crop,$gra,fps=30,format=yuv420p" $C -crf 31 $out/$slug-grande.mp4
ffmpeg -v error -y -ss 1 -i $tmp/src.mp4 -frames:v 1 -vf "$crop,$peq" -q:v 3 $out/$slug.jpg
ffmpeg -v error -y -ss 1 -i $tmp/src.mp4 -frames:v 1 -vf "$crop,$gra" -q:v 3 $out/$slug-grande.jpg
echo "$slug · $(ffprobe -v error -show_entries format=duration -of csv=p=0 $out/$slug.mp4) s · $(du -h $out/$slug.mp4 | cut -f1) · grande $(du -h $out/$slug-grande.mp4 | cut -f1) · origen ${w}×${h}"
rm -rf $tmp
