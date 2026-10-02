# Savvia · Secuencia v03

Corrección de escala y registro de la pose final. Vista previa autónoma en vista-previa.html. La web publicada no se ha modificado.

Todos los archivos llevan ahora el margen transparente necesario para compartir una escala constante. Las tiras tienen 5 celdas de 600×1000. juntos.png y juntos.webp miden 1200×1000. No recortar el alfa automáticamente ni hacer que cada silueta llene su contenedor: se volvería a introducir el salto.

Para Claude: usar la misma altura CSS para una celda y para la imagen conjunta, y el mismo borde superior. Anchos: celda = altura × 0,6; imagen conjunta = altura × 1,2. Las coordenadas de alineacion.json están en el lienzo de 1200×1000 de la pose final. Los centros de las celdas deben terminar en x=477.253 (Andoni) y x=705.270 (Eric), multiplicados por alturaCSS/1000 y sumados al borde izquierdo de la imagen conjunta.

El desplazamiento acaba al 94% del progreso; la celda 4 se usa a partir del 93%; el fundido al reposo ocurre entre el 96,5% y el 100%, manteniendo escala y posición. Celdas 0–3: pasos. Eric ya mira hacia la izquierda.

El ajuste elimina el crecimiento por encuadre. Persisten diferencias de postura y anatomía propias de las poses generadas: es una prueba, no una captura real de movimiento.
