#!/bin/bash
# RONDA 188 · «que todos los vídeos se vean con buena calidad»: las tomas de las webs ENTREGADAS (grabaciones archivadas de treseiscero, ronda 154)
# y las PORTADAS del listado (tomas del reel, que se codificaron a CRF 29) vuelven a sacarse de su original a CRF 18, ≤ 1920 px (portadas, 1440).
A=/Users/andonimart/Desktop/savvia/savvia_inspo/assets/treseiscero/proyectos
R=/Users/andonimart/Desktop/savvia/savvia-web/tools/reel   # planos y momentos del reel (rama musica)
O=$(cd "$(dirname "$0")/../../public/media/obra" && pwd)
saca() { # slug nombre origen inicio dur ancho_max
  local out=$O/$1/$2
  ffmpeg -nostdin -v error -y -ss $4 -t $5 -i $3 -vf "scale='min(${6:-1920},iw)':-2:flags=lanczos" -an -r 30 -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart $out.mp4
  ffmpeg -nostdin -v error -y -ss $(echo "$5*0.6" | bc) -i $out.mp4 -frames:v 1 -q:v 3 $out.jpg  # póster al 60 %, como tools/reel/obra.cjs
  echo "$1 $2 $(ffprobe -v error -show_entries stream=width,height:format=duration -of csv=p=0 $out.mp4 | tr '\n' ' ') $(du -k $out.mp4 | cut -f1) KB"
}
# los mismos tramos de tools/r154/archivo.sh
saca invopop cubierta $A/invopop/video-02.webm 0 1.9
saca isotrol cubierta $A/isotrol/video-02.mp4 0 4
saca invopop c-mapa $A/invopop/video-02.webm 50.2 9.6
saca invopop x-impuestos $A/invopop/video-02.webm 22.9 4.0
saca invopop x-consola $A/invopop/video-02.webm 35.1 5.2
saca invopop x-paises $A/invopop/video-02.webm 63.2 6.6
saca isotrol x-mapa $A/isotrol/video-02.mp4 12.45 4.4
saca isotrol x-bluence $A/isotrol/video-02.mp4 4.9 1.9
saca isotrol x-historia $A/isotrol/video-02.mp4 8.7 2.5
# las portadas del listado: Invopop e Isotrol, de la grabación archivada (como en la ronda 152); el resto, de los mismos tramos que tools/reel/obra.cjs (las de las webs en vivo las graba tools/r188/grabar.cjs)
saca invopop portada $A/invopop/video-02.webm 0 9 1440
saca neety portada $R/planos/neety-vivo.mp4 3 6 1440
saca cubbo portada $R/planos/cubbo-vivo.mp4 5 5.5 1440
saca isotrol portada $A/isotrol/video-02.mp4 0 4 1440
saca business-online-payroll portada $R/momentos/business-online-payroll-m00.mp4 0 3.1 1440
