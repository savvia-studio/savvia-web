#!/bin/bash
# RONDA 152 · DETALLES sacados de las grabaciones ARCHIVADAS de treseiscero (la web de Webflow tal como se entregó; invopop.com hoy es otra web):
# corta (inicio, duración), recorta y acelera si hace falta → public/media/obra/<slug>/<nombre>.mp4 + póster
A=/Users/andonimart/Desktop/savvia/savvia_inspo/assets/treseiscero/proyectos
O=$(cd "$(dirname "$0")/../../public/media/obra" && pwd)
corta() { # slug nombre origen inicio dur velocidad filtro_extra
  local out=$O/$1/$2; local vf="setpts=PTS/$6${7:+,$7},scale='min(1440,iw)':-2"
  ffmpeg -v error -y -ss $4 -t $(echo "$5" | bc) -i $A/$3 -vf "$vf" -an -r 30 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart $out.mp4
  ffmpeg -v error -y -sseof -0.3 -i $out.mp4 -frames:v 1 -q:v 4 $out.jpg
  echo "$1 $2 $(ffprobe -v error -show_entries stream=width,height:format=duration -of csv=p=0 $out.mp4 | tr '\n' ' ') $(du -k $out.mp4 | cut -f1) KB"
}
# INVOPOP (1674×1080): portada = el hero; el mapa con el paso por los países; la lista que se filtra por región y se busca; la ficha de un país
corta invopop portada invopop/video-02.webm 0 9 1
corta invopop x-mapa invopop/video-02.webm 48.6 11 1.2
corta invopop x-paises invopop/video-02.webm 61 15 1.6
corta invopop x-ficha invopop/video-02.webm 76.5 8 1.2
corta invopop x-flujos invopop/video-02.webm 30.2 10 1.2
# BUSINESS ONLINE PAYROLL (3840×2496): el microsite de un banco (AmericanBank) con su marca, montado desde el CMS
corta business-online-payroll x-banco business-online-payroll/video-03.mp4 0 5 1
corta business-online-payroll x-ventajas business-online-payroll/video-03.mp4 4.5 5 1
corta business-online-payroll x-precio business-online-payroll/video-03.mp4 8.5 5 1
# ISOTROL (3840×2496): el hero, la historia que se entinta al bajar, el mapa con sus cifras que cuentan y el producto Bluence
corta isotrol portada isotrol/video-02.mp4 0 4 1
corta isotrol x-historia isotrol/video-02.mp4 7.5 4.5 1
corta isotrol x-mapa isotrol/video-02.mp4 11.5 6.5 1
corta isotrol x-bluence isotrol/video-02.mp4 3.5 4.5 1
