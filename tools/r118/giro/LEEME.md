# Savvia · Giro del director

Primera secuencia de 12 poses: dirige de espaldas, baja los brazos, gira hacia el visitante y señala hacia abajo con la batuta.

## Archivos

- `frames/01.png` a `frames/12.png`: PNG originales con transparencia, todos de 1672 × 941 px.
- `vista-previa.html`: abre este archivo después de extraer el ZIP completo. Permite avanzar con scroll, reproducir una vez, mover el deslizador o usar las flechas del teclado. Conserva la carpeta `frames` junto al HTML.
- `manifest.json`: orden de fotogramas y transformaciones opcionales de encuadre.
- `contacto-revision.png`: hoja de revisión de las 12 poses con el ajuste de encuadre aplicado.
- `prompts-y-origen.json`: prompts utilizados con ImageGen y procedencia de las imágenes.

## Integración

Los PNG conservan todo el lienzo; no recortar cada silueta por separado ni ajustar por su caja visible, pues los brazos cambian de posición. Utilizar un contenedor con la proporción 1672 / 941. Mostrar un fotograma cada vez y colocar la capa de músicos detrás, si se desea.

La vista previa aplica por defecto una transformación uniforme por fotograma para reducir variaciones de altura de la cabeza. Estos valores figuran en el manifiesto como `scale`, `x` e `y`, expresados en el lienzo original. En canvas, aplicar `setTransform(scale, 0, 0, scale, x, y)` antes de dibujar. La vista previa contiene una opción para desactivar esta corrección y revisar los originales.

## Estado de esta entrega

Es un estudio de movimiento con 12 poses generadas, no un vídeo ni una interpolación continua. Se han corregido las vistas intermedias de espalda y perfil, pero persisten variaciones de contorno, pliegues, rostro y longitud de la batuta entre dibujos. El paso de espalda a perfil todavía se percibe escalonado. Evitar presentar esta prueba como animación de producción sin retocar la continuidad o interpolar las poses con revisión posterior. La estabilización del encuadre no corrige los cambios internos del dibujo.

El ejemplo no mezcla imágenes por fundido para ocultar los saltos, porque eso duplicaría brazos y caras. Respeta la preferencia de movimiento reducido desactivando el avance automático con scroll; mantiene el control manual disponible.
