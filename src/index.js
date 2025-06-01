semaforo = false;

document.querySelectorAll('.nuevo_producto').forEach(agregar => {
  agregar.addEventListener('click', function() {
    irArriba();
    ocultarSecciones("seccion_1");
    mostrarSecciones("seccion_2");
    semaforo = true;
  });
});
  
document.querySelectorAll('.volver').forEach(atras => {
  atras.addEventListener('click', function() {
    ocultarSecciones("seccion_2");
    mostrarSecciones("seccion_1");
  });
});

  

function ocultarSecciones(seccion = "seccion_1") {
  ocultar = document.getElementsByClassName(seccion);
  
  for (elemento of ocultar) {
    elemento.classList.remove('flex');
    elemento.style.display = 'none';
  }
}

function mostrarSecciones(seccion = "seccion_2") {
  mostrar = document.getElementsByClassName(seccion);
  
  for (elemento of mostrar) {
    elemento.classList.add('flex');
    elemento.classList.remove('hidden');
    elemento.style.display = 'flex';
  }
}

function irArriba() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' // Animación suave
  });
}