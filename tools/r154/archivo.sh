#!/bin/bash
# RONDA 154 · tomas de la web ENTREGADA (grabaciones archivadas de treseiscero), a la mejor resolución que tienen: ≤ 1920 px, CRF 21
# corta <slug> <nombre> <origen> <inicio> <dur> [filtro extra]
A=/Users/andonimart/Desktop/savvia/savvia_inspo/assets/treseiscero/proyectos
O=$(cd "$(dirname "$0")/../../public/media/obra" && pwd)
corta() {
  local out=$O/$1/$2
  ffmpeg -v error -y -ss $4 -t $5 -i $A/$3 -vf "${6:+$6,}scale='min(1920,iw)':-2:flags=lanczos" -an -r 30 -c:v libx264 -crf ${CRF:-21} -preset slow -pix_fmt yuv420p -movflags +faststart $out.mp4
  ffmpeg -v error -y -i $out.mp4 -frames:v 1 -q:v 3 $out.jpg
  echo "$1 $2 $(ffprobe -v error -show_entries stream=width,height:format=duration -of csv=p=0 $out.mp4 | tr '\n' ' ') $(du -k $out.mp4 | cut -f1) KB"
}
# foto: un fotograma quieto de la grabación archivada, recortado (x y w h en píxeles del original) → .webp q80 ≤ 1920
foto() { # slug nombre origen t x y w h
  local out=$O/$1/$2
  ffmpeg -v error -y -ss $4 -i $A/$3 -frames:v 1 -vf "crop=$7:$8:$5:$6,scale='min(2400,iw)':-2:flags=lanczos" -c:v libwebp -quality 80 $out.webp 2>/dev/null || \
  { ffmpeg -v error -y -ss $4 -i $A/$3 -frames:v 1 -vf "crop=$7:$8:$5:$6,scale='min(2400,iw)':-2:flags=lanczos" /tmp/_f.png && node -e "require('sharp')('/tmp/_f.png').webp({quality:80}).toFile('$out.webp')"; }
  echo "$1 $2.webp"
}
[ "$1" = "cubiertas" ] && {
  corta invopop cubierta invopop/video-02.webm 0 1.9
  corta isotrol cubierta isotrol/video-02.mp4 0 4
}
# INVOPOP (1674×1080, la web entregada): tramos LIMPIOS, cada uno dentro de una sola sección
[ "$1" = "invopop" ] && {
  corta invopop c-mapa invopop/video-02.webm 50.2 9.6
  corta invopop x-impuestos invopop/video-02.webm 22.9 4.0
  corta invopop x-consola invopop/video-02.webm 35.1 5.2
  corta invopop x-paises invopop/video-02.webm 63.2 6.6
  foto invopop c-ficha invopop/video-02.webm 77.4 0 0 1674 1080
}
# BUSINESS ONLINE PAYROLL (3840×2496): el microsite de AmericanBank en fotos fijas (la web es quieta; el vídeo archivado solo hace scroll)
[ "$1" = "bop" ] && {
  foto business-online-payroll c-banco business-online-payroll/video-02.webm 2.2 0 0 3840 2400
  foto business-online-payroll c-ventajas business-online-payroll/video-02.webm 4.4 0 0 3840 2400
  foto business-online-payroll c-precio business-online-payroll/video-02.webm 9.2 0 0 3840 2400
  foto business-online-payroll c-cta business-online-payroll/video-02.webm 12.6 0 0 3840 2160
}
# ISOTROL (3840×2496, la web entregada): cada tramo, dentro de su sección; el resto, en foto fija
[ "$1" = "isotrol" ] && {
  CRF=23 corta isotrol x-mapa isotrol/video-02.mp4 12.45 4.4
  CRF=23 corta isotrol x-bluence isotrol/video-02.mp4 4.9 1.9
  CRF=23 corta isotrol x-historia isotrol/video-02.mp4 8.7 2.5
  foto isotrol c-beneficios isotrol/video-02.mp4 24.6 0 0 3840 2400
}
