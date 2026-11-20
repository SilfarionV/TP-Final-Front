// Lee el carrito guardado en el navegador; si aún no existe, comienza vacío.
function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado === null) {
    return [];
  }
  return JSON.parse(carritoGuardado);  
}

// Guarda los cambios del carrito y mantiene sincronizado su contador visual.
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
  actualizarContador();
}

// Agrega una unidad del producto indicado y muestra una notificación.
function agregarProducto(id) {
  const carrito = obtenerCarrito();

  
  const producto = productos.find(function (p) {
    return p.id === id;
  });

 
  const itemEnCarrito = carrito.find(function (item) {
    return item.id === id;
  });

  if (itemEnCarrito) {
    itemEnCarrito.cantidad = itemEnCarrito.cantidad + 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
 
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Agregaste: " + producto.nombre,
    showConfirmButton: false,
    timer: 1500
  });
}

// Elimina del carrito todas las unidades del producto indicado.
function eliminarProducto(id) {
  const carrito = obtenerCarrito();

  // filter se queda con todos MENOS el que tiene ese id
  const carritoNuevo = carrito.filter(function (item) {
    return item.id !== id;
  });

  guardarCarrito(carritoNuevo);
}

// Quita una unidad del producto o lo elimina cuando solo queda una.
function quitarProducto(id) {
  const carrito = obtenerCarrito();
  const indice = carrito.findIndex(function (item) {
    return item.id === id;
  });

  if (indice === -1) {
    return;
  }

  if (carrito[indice].cantidad > 1) {
    carrito[indice].cantidad = carrito[indice].cantidad - 1;
    guardarCarrito(carrito);
  } else {
    eliminarProducto(id);
  }
}

// Vacía el carrito después de completar la compra.
function vaciarCarrito() {
  guardarCarrito([]);
}

// Suma los subtotales de todos los productos guardados.
function calcularTotal() {
  const carrito = obtenerCarrito();
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio * carrito[i].cantidad;
  }

  return total;
}

// Cuenta las unidades totales, considerando la cantidad de cada producto.
function contarProductos() {
  const carrito = obtenerCarrito();
  let cantidad = 0;

  for (let i = 0; i < carrito.length; i++) {
    cantidad = cantidad + carrito[i].cantidad;
  }

  return cantidad;
}

// Actualiza el número que aparece junto al ícono del carrito.
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  contador.textContent = contarProductos();
}

// Presenta un importe con el símbolo de moneda y formato regional argentino.
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-AR");
}

// Inicializa el contador al cargar cualquier página que incluya este archivo.
actualizarContador();
