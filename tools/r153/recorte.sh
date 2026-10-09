#!/bin/bash
# RONDA 153 · PRIMEROS PLANOS para el mosaico de «Los detalles»: un trozo cuadrado de un vídeo de detalle ya cortado del archivo (la web tal como
# se entregó; tools/r152/archivo.sh), recortado en el tiempo y en el encuadre → public/media/obra/<slug>/c-<nombre>.mp4 + póster.
O=$(cd "$(dirname "$0")/../../public/media/obra" && pwd)
plano() { # slug nombre origen(x-…) inicio dur x y lado
  local out=$O/$1/c-$2
  ffmpeg -v error -y -i $O/$1/$3.mp4 -ss $4 -t $5 -vf "crop=$8:$8:$6:$7,scale=900:900:flags=lanczos" -an -r 30 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart $out.mp4
  ffmpeg -v error -y -ss 0.5 -i $out.mp4 -frames:v 1 -q:v 4 $out.jpg
  echo "$1 c-$2 $(ffprobe -v error -show_entries format=duration -of csv=p=0 $out.mp4) s $(du -k $out.mp4 | cut -f1) KB"
}
# INVOPOP (1440×930)
plano invopop alcance x-mapa 1.6 8 440 60 840     # el mapa con el filtro por tipo de factura (B2G · B2B · B2C) y la ficha de cada país
plano invopop fichas x-paises 1.6 2.6 100 150 720    # las fichas de los países con sus tres tipos
plano invopop flujo x-flujos 1.1 1.8 40 260 860   # los pasos de un flujo de facturación, de cerca
# TRAMOS: un recorte cuadrado (d1/d2, de la ronda 62) que mezclaba dos secciones, cortado para que enseñe solo lo que dice su pie
tramo() { # slug nombre origen inicio
  local out=$O/$1/c-$2
  ffmpeg -v error -y -i $O/$1/$3.mp4 -ss $4 -an -r 30 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart $out.mp4
  ffmpeg -v error -y -ss 0.3 -i $out.mp4 -frames:v 1 -q:v 4 $out.jpg
  echo "$1 c-$2 $(ffprobe -v error -show_entries format=duration -of csv=p=0 $out.mp4) s $(du -k $out.mp4 | cut -f1) KB"
}
tramo arkdev clientes d2 0.9     # solo las reseñas
tramo isotrol cifras d2 1.2      # solo «Our global impact» con sus cifras
tramo kuanta casos d1 1.2        # solo la sección de los casos de uso
tramo invopop mapa x-mapa 1.9       # el mapa sin el pie de la página de antes (el corte de la ronda 152 arrancaba en él)
# FOTO FIJA: el recorte d2 de Business Online Payroll pasa por una lista antes de la foto; dura 1,9 s: se queda la foto, como imagen
ffmpeg -v error -y -ss 1.3 -i $O/business-online-payroll/d2.mp4 -frames:v 1 -q:v 3 $O/business-online-payroll/c-foto.jpg && echo "business-online-payroll c-foto.jpg"
tramo isotrol soluciones d1 1.4  # solo las soluciones de Bluence (el recorte arrancaba en el hero)
tramo arkdev atraca d1 1.2       # solo el titular del muelle (el recorte arrancaba en la sección oscura)
