semaforo = false;

document.getElementById('nuevo_producto').addEventListener('click', () => {
  
  ocultarSecciones("seccion_1");
  mostrarSecciones("seccion_2");

  semaforo = true;
});

document.getElementById('volver').addEventListener('click', () => {
  ocultarSecciones("seccion_2");
  mostrarSecciones("seccion_1");
});

function ocultarSecciones(seccion = "seccion_1") {
  ocultar = document.getElementsByClassName(seccion);
  
  for (elemento of ocultar) {
    //elemento.classList.remove('flex');
    elemento.style.display = 'none';
  }
}

function mostrarSecciones(seccion = "seccion_2") {
  mostrar = document.getElementsByClassName(seccion);
  
  for (elemento of mostrar) {
    //elemento.classList.add('flex');
    elemento.classList.remove('hidden');
    elemento.style.display = 'flex';
  }
}