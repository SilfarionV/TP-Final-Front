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

document.getElementById("formulario-compra").addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const formulario = evento.currentTarget;

  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    renderizarResumenCarrito();
    return;
  }

  const nombre = new FormData(formulario).get("nombre");
  const resultado = await Swal.fire({
    icon: "success",
    title: "¡Compra finalizada!",
    text: `Gracias, ${nombre}. Tu pedido quedó registrado en esta demostración; no se realizó ningún pago.`,
    confirmButtonText: "Aceptar"
  });

  if (resultado.isConfirmed) {
    vaciarCarrito();
    formulario.reset();
    renderizarResumenCarrito();
  }
});

renderizarResumenCarrito();
