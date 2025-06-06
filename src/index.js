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
  let url_contenedor = document.getElementById("url_contenedor");

  if (url_contenedor.children.length > 0) {
    let url = document.getElementsByClassName("url_imagen");
    for (elemento of url) {
      if (elemento.value == "") {
        return;
      }
    }
  }
  

  let cuerpoDiv = `
    <input class="url_imagen py-2 px-3 border border-gray-200 rounded-md w-[85%]" type="text" name="url_imagen" placeholder="URL de la imagen">
    <button  class="eliminar_url text-[#020817] py-2 px-4 flex items-center justify-center gap-2 text-[14px] border border-gray-200 rounded-md ">
      <img width="16px" src="./images/equis_gris.svg" alt="" class=" top-1.5 right-1.5 z-10 flex">
    </button>
  `;

  url_contenedor.appendChild(document.createElement("div"));
  url_contenedor.lastElementChild.classList.add("flex", "mt-2", "gap-2");
  url_contenedor.lastElementChild.innerHTML = cuerpoDiv;

  let eliminar_url = document.getElementsByClassName("eliminar_url");
  for (elemento of eliminar_url) {
    elemento.addEventListener("click", function () {
      this.parentElement.remove();
    });
  }
  
});

let agregaretiqueta = document.getElementById("agregar_tag");
let nombreEtiqueta = document.getElementById("tag");

agregaretiqueta.addEventListener("click", function () {
  let etiquetas_contenedor = document.getElementById("etiquetas_contenedor");
  let cuerpoDiv = `
    <div class="text-[12px] rounded-full py-0.5 px-2.5 bg-[#F4F7FA] flex gap-1.5">
      ${nombreEtiqueta.value}
      <img width="16px" src="./images/equis_gris.svg" alt="" class="eliminar_etiqueta top-1.5 right-1.5 z-10 flex">
    </div>
  `;
  etiquetas_contenedor.appendChild(document.createElement("div"));

  etiquetas_contenedor.lastElementChild.innerHTML = cuerpoDiv;
  nombreEtiqueta.value = "";

  let eliminar_etiqueta = document.getElementsByClassName("eliminar_etiqueta");
  for (elemento of eliminar_etiqueta) {
    elemento.addEventListener("click", function () {
      this.parentElement.remove();
    });
  }
});



