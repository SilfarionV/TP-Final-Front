// Genera las tarjetas del catálogo y conecta el botón para agregar productos.
function mostrarProductos() {
  const grilla = document.getElementById("grilla-productos");
  if (!grilla) {
    throw new Error('No se encontró el contenedor "grilla-productos".');
  }

  // Construye una tarjeta por cada producto disponible en el catálogo.
  grilla.innerHTML = productos.map((producto) => `
      <article class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <div class="card-info">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="precio">$${producto.precio.toFixed(2)}</p>
          <button class="agregar-carrito" type="button" data-producto-id="${producto.id}">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Agregar al carrito
          </button>
        </div>
      </article>
  `).join("");

  // Delegación de eventos para responder a los botones de todas las tarjetas.
  grilla.addEventListener("click", (evento) => {
    if (!(evento.target instanceof Element)) {
      return;
    }

    const boton = evento.target.closest(".agregar-carrito");
    if (boton) {
      agregarProducto(Number(boton.dataset.productoId));
    }
  });
}

// Valida que el formulario de contacto no contenga nombre o mensaje en blanco.
function validarFormularioContacto(evento) {
  const formulario = evento.currentTarget;
  const nombre = formulario.elements.namedItem("nombre");
  const mensaje = formulario.elements.namedItem("mensaje");

  nombre.setCustomValidity("");
  mensaje.setCustomValidity("");

  if (!nombre.value.trim()) {
    nombre.setCustomValidity("Ingresá tu nombre.");
  }

  if (!mensaje.value.trim()) {
    mensaje.setCustomValidity("Ingresá un mensaje.");
  }

  if (!formulario.checkValidity()) {
    evento.preventDefault();
    formulario.reportValidity();
  }
}

// Conecta los eventos de envío y escritura para validar el formulario de contacto.
const formularioContacto = document.getElementById("formulario-contacto");
formularioContacto.addEventListener("submit", validarFormularioContacto);

formularioContacto.addEventListener("input", (evento) => {
  if (evento.target instanceof HTMLInputElement) {
    evento.target.setCustomValidity("");
  }
});

// Carga el catálogo al iniciar la página principal.
mostrarProductos();
