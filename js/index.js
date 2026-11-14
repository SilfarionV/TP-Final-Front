function mostrarProductos() {
  const grilla = document.getElementById("grilla-productos");
  if (!grilla) {
    throw new Error('No se encontró el contenedor "grilla-productos".');
  }

  grilla.innerHTML = productos.map((producto) => `
      <article class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <div class="card-info">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="precio">$${producto.precio.toFixed(2)}</p>
        </div>
      </article>
  `).join("");
}

mostrarProductos();
