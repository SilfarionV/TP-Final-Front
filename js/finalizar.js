// Dibuja el contenido del carrito y actualiza total, aviso y estado del botón.
function renderizarResumenCarrito() {
  const carrito = obtenerCarrito();
  const lista = document.getElementById("lista-carrito");
  const avisoCarritoVacio = document.getElementById("carrito-vacio");
  const botonFinalizar = document.querySelector("#formulario-compra button[type='submit']");

  lista.replaceChildren();

  carrito.forEach((item) => {
    const fila = document.createElement("li");
    fila.className = "item-resumen-carrito";

    const nombre = document.createElement("span");
    nombre.className = "nombre-item-carrito";
    nombre.textContent = item.nombre;

    const detalle = document.createElement("span");
    detalle.className = "detalle-item-carrito";
    detalle.textContent = `${item.cantidad} x ${formatearPrecio(item.precio)} = ${formatearPrecio(item.precio * item.cantidad)}`;

    const botonQuitar = document.createElement("button");
    botonQuitar.className = "boton-quitar";
    botonQuitar.type = "button";
    botonQuitar.dataset.productoId = item.id;
    botonQuitar.setAttribute("aria-label", `Quitar una unidad de ${item.nombre}`);
    botonQuitar.textContent = "Quitar";

    fila.append(nombre, detalle, botonQuitar);
    lista.appendChild(fila);
  });

  const carritoVacio = carrito.length === 0;
  avisoCarritoVacio.hidden = !carritoVacio;
  lista.hidden = carritoVacio;
  botonFinalizar.disabled = carritoVacio;
  document.getElementById("total-carrito").textContent = formatearPrecio(calcularTotal());
}

// Permite quitar unidades desde el resumen y vuelve a dibujar el carrito.
document.getElementById("lista-carrito").addEventListener("click", (evento) => {
  if (!(evento.target instanceof Element)) {
    return;
  }

  const boton = evento.target.closest(".boton-quitar");
  if (boton) {
    quitarProducto(Number(boton.dataset.productoId));
    renderizarResumenCarrito();
  }
});

// Evita enviar el formulario sin productos; al completar la compra, vacía el carrito y redirige.
document.getElementById("formulario-compra").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    renderizarResumenCarrito();
    return;
  }

  vaciarCarrito();
  window.location.href = "mensaje.html";
});

// Muestra el estado inicial del carrito al abrir la página.
renderizarResumenCarrito();
