document.querySelectorAll('.nuevo_producto').forEach(agregar => {
  agregar.addEventListener('click', function() {
    irArriba();
    sinProductos.classList.remove('flex');
    sinProductos.classList.add('hidden');
    ocultarSecciones("seccion_1");
    mostrarSecciones("seccion_2");
  });
});
  
document.querySelectorAll('.volver').forEach(atras => {
  atras.addEventListener('click', function(event) {
    event.preventDefault();

    irArriba();

    limpiarFormulario();

    evaluarProductos();

    ocultarSecciones("seccion_2");
    mostrarSecciones("seccion_1");
  });
});

let sinProductos = document.getElementById("contenedor_sin_productos");
let productos = [];

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

limpiarSelect("categoria");
limpiarSelect("subcategoria");

function limpiarSelect(select) {
  let ocultar = document.getElementById(select);
  ocultar.addEventListener("click", function () {
    ocultar.options[0].style.display = 'none'; 
  });
}

const subcategoria = document.getElementById("subcategoria");
let listasSubcategoria = [
  ["Teléfonos", "Computadoras", "Audio", "Accesorios"],
  ["Vestimenta", "Accesorios", "Calzado"],
  ["Muebles", "Accesorios", "Electrónica"],
];

let categoria = document.getElementById("categoria");

categoria.addEventListener("click", function () {

  subcategoria.innerHTML = `
    <option selected>Seleccione una subcategoría</option> 
  `

  let categoriaValor = document.getElementById("categoria").value;
  
  if (categoriaValor == "Electrónicos") {
    actualizarSubcategoria(0);
  }
  if (categoriaValor == "Ropa") {
    subcategoria.innerHTML = `
      <option selected>Seleccione una subcategoría</option> 
      <option value="Vestimenta">Vestimenta</option>
      <option value="Accesorios">Accesorios</option>
      <option value="Calzado">Calzado</option>
  `
  }
  if (categoriaValor == "Hogar") {
    subcategoria.innerHTML = `
      <option selected>Seleccione una subcategoría</option> 
      <option value="Muebles">Muebles</option>
      <option value="Accesorios">Accesorios</option>
      <option value="Electrónica">Electrónica</option>
  `
  }
  
});

function actualizarSubcategoria(posicion) {
  
  listasSubcategoria[posicion].forEach(opcion => {
    let nuevaOption = document.createElement("option");
    nuevaOption.value = opcion;
    nuevaOption.textContent = opcion;
    subcategoria.appendChild(nuevaOption);
});
}

let agregarURLImg = document.getElementById("agregar_imagen");

agregarURLImg.addEventListener("click", function (event) {

  event.preventDefault();

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

let agregarEtiquetaClick = document.getElementById("agregar_tag");
let nombreEtiqueta = document.getElementById("tag");

agregarEtiquetaClick.addEventListener("click", function (event) {
  event.preventDefault();
  sumarEtiqueta(true, nombreEtiqueta);
  eliminarEtiqueta();
});

let agregarEtiquetaEnter = document.getElementById("tag");

agregarEtiquetaEnter.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sumarEtiqueta(true, nombreEtiqueta);
    eliminarEtiqueta();
  }
});

agregarEspecificacion = document.getElementById("agregar_especificacion");

agregarEspecificacion.addEventListener("click", function (event) {
  event.preventDefault();
  sumarEtiqueta(false);
});

let especificacionesTecnicas = [];
let etiquetas = [];

function sumarEtiqueta(booleano, valor1) {
  
  let cuerpoDiv = "";

  switch (booleano) {
    case true:

      etiquetas.push(valor1.value);

      let etiquetas_contenedor = document.getElementById("etiquetas_contenedor");
      cuerpoDiv = `
        ${valor1.value}
        <img width="16px" src="./images/equis_gris.svg" alt="" class="eliminar_etiqueta top-1.5 right-1.5 z-10 flex">
      `;
      etiquetas_contenedor.appendChild(document.createElement("div"));
      etiquetas_contenedor.lastElementChild.classList.add("text-[12px]", "rounded-full", "py-0.5", "px-2.5", "bg-[#F4F7FA]", "flex", "gap-1.5");
      etiquetas_contenedor.lastElementChild.innerHTML = cuerpoDiv;
      valor1.value = "";
      break;

    case false:
      let especificacion = document.getElementById("especificacion");
      let valor = document.getElementById("valor_especificacion");
      let especificaciones_contenedor = document.getElementById("especificaciones_contenedor");

      let especificacionProducto = {
        especificacion: especificacion.value,
        valor: valor.value
      }
      especificacionesTecnicas.push(especificacionProducto);

      cuerpoDiv = `
        <span class="font-medium">${especificacion.value}:</span>
        <span>${valor.value}</span>
        <img  src="./images/equis_gris.svg" alt="" class="eliminar_especificacion p-3 w-[40px]">
      `;
      especificaciones_contenedor.appendChild(document.createElement("div"));
      especificaciones_contenedor.lastElementChild.classList.add("flex", "items-center", "gap-2", "bg-gray-50", "rounded", "p-2");
      especificaciones_contenedor.lastElementChild.innerHTML = cuerpoDiv;
      especificacion.value = "";
      valor.value = "";

      break;
  }
  
  
}

function eliminarEtiqueta() {
  let eliminar_etiqueta = document.getElementsByClassName("eliminar_etiqueta");
  for (elemento of eliminar_etiqueta) {
    elemento.addEventListener("click", function () {
      this.parentElement.remove();
    });
  }
};

let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  nuevoProducto();
  ocultarSecciones("seccion_2");
  mostrarSecciones("seccion_1");
  irArriba();
  limpiarFormulario();
});

let producto = {};
let contadorID = 1;

function nuevoProducto() {
  let id = contadorID;
  let nombre = document.getElementById("nombre_producto").value;
  let marca = document.getElementById("marca").value;
  let modelo = document.getElementById("modelo").value;
  let categoria = document.getElementById("categoria").value;
  let subcategoria = document.getElementById("subcategoria").value;
  let estado = document.getElementById("estado").value;
  let descripcion = document.getElementById("descripcion").value;

  let precioCompra = document.getElementById("precio_compra").value;
  let precioVenta = document.getElementById("precio_venta").value;
  let costoEnvio = document.getElementById("costo_envio").value;
  let cantidadStock = document.getElementById("cantidad_stock").value;
  let cantidadMinima = document.getElementById("cantidad_minima").value;
  let proveedor = document.getElementById("nombre_proveedor").value;

  let fechaIngreso = document.getElementById("fecha_ingreso").value;
  let fechaVencimiento = document.getElementById("fecha_vencimiento").value;
  let peso = document.getElementById("peso").value;
  let color = document.getElementById("color_producto").value;
  let material = document.getElementById("material").value;
  let codigoBarras = document.getElementById("codigo_barra").value; 
  let largo = document.getElementById("largo_producto").value;
  let ancho = document.getElementById("ancho_producto").value;
  let alto = document.getElementById("alto_producto").value;

  let notas = document.getElementById("notas_adicionales").value;

  let imagenesGlobal = document.getElementsByClassName("url_imagen");
  let imagenes = [];

  for (elemento of imagenesGlobal) {
    imagenes.push(elemento.value);
  }


  producto = {id, nombre, descripcion, categoria, subcategoria, marca, modelo, precioCompra, precioVenta, costoEnvio, cantidadStock, cantidadMinima, proveedor, fechaIngreso, fechaVencimiento, peso, dimensiones: {largo, ancho, alto}, color, material, codigoBarras, imagenes, especificacionesTecnicas, etiquetas ,estado, notas};

  productos.push(producto);
  contadorID++;
  console.log(productos);

  actualizarCantidadProductos();

  mostrarProducto();
}

let contenedorProductos = document.getElementById("contenedor_productos");

function mostrarProducto() {
  
  contenedorProductos.innerHTML = "";

  productos.forEach((producto, indice) => {
    let imprimirProducto = document.createElement("article");

    imprimirProducto.classList.add("flex", "flex-col", "gap-3", "p-6", "border", "border-gray-200", "rounded-md", "seccion_1", "mt-6", "justify-center", "bg-white");

    imprimirProducto.innerHTML = `
      <div class="flex items-start">
          <div class="w-[75%]">
            <h3 class="text-[18px] font-semibold">${producto.nombre}</h3>
            <p class="mt-1 text-[14px] text-[#4B5563]">${producto.marca} - ${producto.modelo}</p>
          </div>
          <div class="w-[25%] flex justify-center items-center py-0.5 px-2.5 rounded-2xl text-[12px] text-white bg-[#0F172A]">
            <div class="">${producto.estado}</div>
          </div>
        </div>
        <div>
          <div class="aspect-video overflow-hidden rounded-lg">
            <img class="w-full h-full object-cover" src="${producto.imagenes[0]}" alt="">
          </div>
          <div class="mt-3">
            <p class="text-[14px] text-[#4B5563] line-clamp-2">${producto.descripcion}</p>
            <div class="mt-2 flex justify-between">
              <div class="py-0.5 px-2.5 text-[12px] font-semibold rounded-full bg-gray-50 border border-gray-200">
                ${producto.categoria}
              </div>
              <div class="text-[14px] text-gray-500">
                ${producto.subcategoria}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-2 text-[14px]">
            <div>
              <span class="text-gray-500">Compra:</span>
              <div class="text-[#030817] font-semibold">${producto.precioCompra} $</div>
            </div>
            <div class="text-right">
              <span class="text-gray-500">Venta:</span>
              <div class="text-[#030817] font-semibold">${producto.precioVenta} $</div>
            </div>
          </div>
          <div class="flex justify-between mt-3">
            <span class="text-gray-500 text-[14px]">Stock:</span>
            <div class="text-green-600 font-semibold text-[16px]">${producto.cantidadStock}</div>
          </div>
          <div class="mt-3 pt-2 flex gap-2 w-full">
            <button id="editar_producto" class="w-full py-2 px-3 flex gap-3 text-[14px] border border-gray-200 rounded-md font-semibold  justify-center">
              <img class="w-4" src="./images/editar.svg" alt="">
              <span class="">Editar</span>
            </button>
            <button onclick="eliminarProducto(${indice})" class=" px-3 flex gap-4 border border-gray-200 rounded-md font-semibold  justify-center items-center">
              <img width="22px" src="./images/eliminar.svg" alt="">
            </button>
          </div>
        </div>
    `;
  
    contenedorProductos.appendChild(imprimirProducto);

  });

  

};

function limpiarFormulario() {
  let formulario = document.getElementById("formulario");
  formulario.reset();
}

function eliminarProducto(indice) {
  productos.splice(indice, 1);
  actualizarCantidadProductos();
  evaluarProductos();
  mostrarProducto();
}

function evaluarProductos() {
  if (productos.length >= 1) {
      sinProductos.classList.remove('flex');
      sinProductos.classList.add('hidden');
    } else {
      sinProductos.classList.add('flex');
      sinProductos.classList.remove('hidden');
    }
}

function actualizarCantidadProductos() {
  let cantidadProductos = productos.length;
  const cantidadProductosElement = document.getElementById("total_productos");
  cantidadProductosElement.textContent = cantidadProductos;
}





