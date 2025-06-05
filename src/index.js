document.querySelectorAll('.nuevo_producto').forEach(agregar => {
  agregar.addEventListener('click', function() {
    irArriba();
    ocultarSecciones("seccion_1");
    mostrarSecciones("seccion_2");
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

function nuevoProducto() {
  let nombre = getElementById("nombre_producto").value;
  let marca = getElementById("marca").value;
  let modelo = getElementById("modelo").value;


}

let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  //nuevoProducto();
});

limpiarSelect("categoria");
limpiarSelect("subcategoría");

function limpiarSelect(select) {
  let nombre = document.getElementById(select);
  nombre.addEventListener("click", function () {
    nombre.options[0].style.display = 'none'; 
  });
}

let subcategoria = document.getElementById("subcategoría");

subcategoria.addEventListener("click", function () {
  let categoria = document.getElementById("categoria").value;
  if (categoria == "Electrónicos") {
    subcategoria.innerHTML = `
      <option selected>Seleccione una subcategoría</option> 
      <option value="Teléfonos">Teléfonos</option>
      <option value="Computadoras">Computadoras</option>
      <option value="Audio">Audio</option>
      <option value="Accesorios">Accesorios</option>
  `
  }
  if (categoria == "Ropa") {
    subcategoria.innerHTML = `
      <option selected>Seleccione una subcategoría</option> 
      <option value="Vestimenta">Vestimenta</option>
      <option value="Accesorios">Accesorios</option>
      <option value="Calzado">Calzado</option>
  `
  }
  if (categoria == "Hogar") {
    subcategoria.innerHTML = `
      <option selected>Seleccione una subcategoría</option> 
      <option value="Muebles">Muebles</option>
      <option value="Accesorios">Accesorios</option>
      <option value="Electrónica">Electrónica</option>
  `
  }
});

let agregarURLImg = document.getElementById("agregar_imagen");

agregarURLImg.addEventListener("click", function () {
  //let url = document.getElementById("url_imagen").value;
  let url_contenedor = document.getElementById("url_contenedor");
  url_contenedor.innerHTML += `
    <div class="url_hijo flex mt-2 gap-2">
      <input class=" py-2 px-3 border border-gray-200 rounded-md w-[85%]" type="text" name="url_imagen" id="url_imagen" placeholder="URL de la imagen">
      <button  class="eliminar_url text-[#020817] py-2 px-4 flex items-center justify-center gap-2 text-[14px] border border-gray-200 rounded-md ">
        <img width="16px" src="./images/equis_gris.svg" alt="" class=" top-1.5 right-1.5 z-10 flex">
      </button>
    </div>
  `;

  let eliminar_url = document.getElementsByClassName("eliminar_url");
  for (elemento of eliminar_url) {
    elemento.addEventListener("click", function () {
      this.parentElement.remove();
    });
  }
  
});

