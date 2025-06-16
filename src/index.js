const botonActualizar = document.getElementById("nuevo_producto");
const spanActualizar = botonActualizar.querySelector("span");

function actualizarEventos() {
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


      if (spanActualizar.textContent === "Actualizar Producto") {
        botonActualizar.classList.remove("gap-2");
        botonActualizar.classList.add("gap-4");
        spanActualizar.textContent = "Crear Producto";
        spanActualizar.classList.remove("text-[12px]");
      }


      irArriba();

      limpiarFormulario();

      evaluarProductos();

      ocultarSecciones("seccion_2");
      mostrarSecciones("seccion_1");
    });
  });
}

actualizarEventos();

const seccionBusqueda = document.getElementById("busqueda");
let sinProductos = document.getElementById("contenedor_sin_productos");
let productos = [];

function ocultarSecciones(seccion = "seccion_1") {

  if (seccion === "seccion_1") {
    seccionBusqueda.classList.remove('grid');
    seccionBusqueda.classList.add('hidden');
  } else {
    seccionBusqueda.classList.remove('hidden');
    seccionBusqueda.classList.add('grid');
  }

  ocultar = document.getElementsByClassName(seccion);
  for (elemento of ocultar) {
    elemento.classList.remove('flex');
    elemento.classList.add('hidden');
  }
}

function mostrarSecciones(seccion = "seccion_2") {
  
  mostrar = document.getElementsByClassName(seccion);
  
  for (elemento of mostrar) {
    elemento.classList.add('flex');
    elemento.classList.remove('hidden');
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

const subcategoriaHtml = document.getElementById("subcategoria");
let listasSubcategoria = [
  ["Teléfonos", "Computadoras", "Audio", "Accesorios"],
  ["Vestimenta", "Accesorios", "Calzado"],
  ["Muebles", "Accesorios", "Electrónica"],
];

let categoriaHTML = document.getElementById("categoria");

categoriaHTML.addEventListener("click", function () {

  subcategoriaHtml.innerHTML = `
    <option selected>Seleccione una subcategoría</option> 
  `

  let categoriaValor = document.getElementById("categoria").value;
  
  if (categoriaValor == "Electrónicos") {
    actualizarSubcategoria(0);
  }
  if (categoriaValor == "Ropa") {
    subcategoriaHtml.innerHTML = `
      <option selected>Seleccione una subcategoría</option> 
      <option value="Vestimenta">Vestimenta</option>
      <option value="Accesorios">Accesorios</option>
      <option value="Calzado">Calzado</option>
  `
  }
  if (categoriaValor == "Hogar") {
    subcategoriaHtml.innerHTML = `
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
    subcategoriaHtml.appendChild(nuevaOption);
});
}

function agregarUrl(event, indice = undefined) {
  
  event.preventDefault();

  let url_contenedor = document.getElementById("url_contenedor");

  let cuerpoDiv = `
    <input class="url_imagen py-2 px-3 border border-gray-200 rounded-md w-[85%]" type="text" name="url_imagen" placeholder="URL de la imagen">
    <button onClick="this.parentElement.remove();" class="eliminar_url text-[#020817] py-2 px-4 flex items-center justify-center gap-2 text-[14px] border border-gray-200 rounded-md hover:bg-[#F1F5F9] cursor-pointer">
      <img width="16px" src="./images/equis_gris.svg" alt="" class=" top-1.5 right-1.5 z-10 flex">
    </button>
  `;
  
  if (indice != undefined) {

    document.getElementById("url_contenedor").innerHTML = "";

    for (let i = 0; i < productos[indice].imagenes.length; i++) {
      url_contenedor.appendChild(document.createElement("div"));
      url_contenedor.lastElementChild.classList.add("flex", "mt-2", "gap-2");
      url_contenedor.lastElementChild.innerHTML = cuerpoDiv;

      document.getElementsByClassName("url_imagen")[i].value = productos[indice].imagenes[i];
    };    
    return;
  }

  

  if (url_contenedor.children.length > 0) {
    let url = document.getElementsByClassName("url_imagen");
    for (elemento of url) {
      if (elemento.value == "") {
        return;
      }
    }
  }

  url_contenedor.appendChild(document.createElement("div"));
  url_contenedor.lastElementChild.classList.add("flex", "mt-2", "gap-2");
  url_contenedor.lastElementChild.innerHTML = cuerpoDiv;
}

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
  let etiquetas_contenedor = document.getElementById("etiquetas_contenedor");

  if (indice != undefined) {

    document.getElementById("etiquetas_contenedor").innerHTML = "";

    for (let i = 0; i < productos[indiceProducto].etiquetas.length; i++) {
      etiquetas_contenedor.appendChild(document.createElement("div"));
      etiquetas_contenedor.lastElementChild.classList.add("text-[12px]", "rounded-full", "py-0.5", "px-2.5", "bg-[#F4F7FA]", "flex", "gap-1.5");
      etiquetas_contenedor.lastElementChild.innerHTML = cuerpoDiv;

      document.getElementsByClassName("url_imagen")[i].value = productos[indice].imagenes[i];
    };    
    return;
  }

  switch (booleano) {
    case true:

      etiquetas.push(valor1.value);

      
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

function eliminarEtiqueta(indice = -1) {
  let eliminar_etiqueta = document.getElementsByClassName("eliminar_etiqueta");

  if (productos.length >= 1 && indice >= 0) {
    document.getElementById("etiquetas_contenedor").children[indice].remove();
    productos[indiceProducto].etiquetas.splice([indice], 1);
  }
  
  for (elemento of eliminar_etiqueta) {
    elemento.addEventListener("click", function () {
      this.parentElement.remove();
    });
  };

};

let formulario = document.getElementById("formulario");

function addProduct(event) {
  event.preventDefault();
  nuevoProducto();
  ocultarSecciones("seccion_2");
  mostrarSecciones("seccion_1");
  irArriba();
  limpiarFormulario();
};


contadorID = 1;

function nuevoProducto() {

  let producto = {};

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

  if (spanActualizar.textContent === "Actualizar Producto") {
    productos[indiceProducto] = producto;
    console.log("actualizar");
  } else {
    console.log("nuevo producto");
    productos.push(producto);
    contadorID++;
    actualizarCantidadProductos();
  }
  console.log(productos);
  mostrarProducto();
}

let contenedorProductos = document.getElementById("contenedor_productos");

function mostrarProducto() {
  
  contenedorProductos.innerHTML = "";

  productos.forEach((producto, indice) => {
    let imprimirProducto = document.createElement("article");

    imprimirProducto.classList.add("flex", "flex-col", "gap-3", "p-6", "border", "border-gray-200", "rounded-md", "seccion_1", "mt-6", "justify-center", "bg-white");

    imprimirProducto.innerHTML = `
      <div class="flex items-start justify-between">
          <div class="w-[75%]">
            <h3 class="text-[18px] font-semibold">${producto.nombre}</h3>
            <p class="mt-1 text-[14px] text-[#4B5563] font-semibold">${producto.marca} - ${producto.modelo}</p>
          </div>
          <div class=" flex justify-center items-center py-0.5 px-2.5 rounded-2xl text-[12px] text-white bg-[#0F172A] hover:bg-[#262E3F]">
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
            <button id="editar_producto" onclick="editarProducto(${indice})" class="nuevo_producto w-full py-2 px-3 flex gap-3 text-[14px] border border-gray-200 rounded-md font-semibold  justify-center hover:bg-[#F1F5F9] cursor-pointer">
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
    actualizarEventos();

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

let indiceProducto = -1;

function editarProducto(indice) {

  indiceProducto = indice;

  document.getElementById("nombre_producto").value = productos[indice].nombre;
  document.getElementById("descripcion").value= productos[indice].descripcion;
  document.getElementById("categoria").value = productos[indice].categoria;
  document.getElementById("subcategoria").value = productos[indice].subcategoria;
  document.getElementById("marca").value = productos[indice].marca;
  document.getElementById("modelo").value = productos[indice].modelo;
  document.getElementById("precio_compra").value = productos[indice].precioCompra;
  document.getElementById("precio_venta").value = productos[indice].precioVenta;
  document.getElementById("costo_envio").value = productos[indice].costoEnvio;
  document.getElementById("cantidad_stock").value = productos[indice].cantidadStock;
  document.getElementById("cantidad_minima").value = productos[indice].cantidadMinima;
  document.getElementById("nombre_proveedor").value = productos[indice].proveedor;
  document.getElementById("fecha_ingreso").value = productos[indice].fechaIngreso;
  document.getElementById("fecha_vencimiento").value = productos[indice].fechaVencimiento;
  document.getElementById("peso").value = productos[indice].peso;
  document.getElementById("largo_producto").value = productos[indice].dimensiones.largo;
  document.getElementById("ancho_producto").value = productos[indice].dimensiones.ancho;
  document.getElementById("alto_producto").value = productos[indice].dimensiones.alto;
  document.getElementById("color_producto").value = productos[indice].color;
  document.getElementById("material").value = productos[indice].material;
  document.getElementById("codigo_barra").value = productos[indice].codigoBarra;
  document.getElementById("estado").value = productos[indice].estado;
  document.getElementById("notas_adicionales").value = productos[indice].notas;
  
  agregarUrl(event, indice);
  sumarEtiqueta();

  botonActualizar.classList.remove("gap-4");
  botonActualizar.classList.add("gap-2");
  spanActualizar.textContent = "Actualizar Producto";
  spanActualizar.classList.add("text-[12px]");
  
  //document.getElementById("url_imagen").

  
  /*for (let i = 0; i < productos[indice].imagenes.length; i++) {
    document.getElementsByClassName("url_imagen")[i].value = productos[indice].imagenes[i];
  }*/

}







