# RetroGame Store

Sitio web de una tienda demo de videojuegos retro. Permite explorar un catálogo, agregar productos a un carrito y recorrer un flujo de compra de demostración.

## Funcionalidades

- Catálogo de videojuegos con imágenes, descripciones y precios.
- Carrito persistente en el navegador mediante `localStorage`, con contador de unidades.
- Resumen del carrito con total y opción para quitar unidades.
- Formulario de compra con validación de campos obligatorios.
- Página de confirmación al finalizar la compra.
- Formulario de contacto y enlaces a redes sociales.
- Diseño adaptable a pantallas pequeñas.

> **Importante:** el checkout es demostrativo. No se procesan pagos ni se envían los datos de compra a un servidor.

## Tecnologías

- HTML5
- CSS3
- JavaScript sin frameworks
- SweetAlert2 y Google Fonts cargados desde CDN

No se requiere instalar dependencias ni ejecutar un proceso de compilación.

## Estructura del proyecto

```text
.
├── index.html          # Página principal, catálogo, reseñas y contacto
├── finalizar.html      # Resumen del carrito y formulario de compra
├── mensaje.html        # Confirmación de compra y regreso a la tienda
├── css/
│   └── styles.css      # Estilos compartidos y diseño adaptable
└── js/
    ├── productos.js    # Datos del catálogo
    ├── carrito.js      # Operaciones del carrito y almacenamiento local
    ├── index.js        # Renderizado del catálogo y validación de contacto
    └── finalizar.js    # Resumen del carrito y envío del formulario
```

## Cómo ejecutar

El proyecto es estático y puede abrirse con cualquier servidor web local. Por ejemplo, desde la carpeta raíz:

```bash
python -m http.server 8000
```

Luego visita [http://localhost:8000](http://localhost:8000). También puedes iniciar `index.html` con una extensión de servidor local para VS Code, como Live Server.

Se necesita conexión a internet para cargar las fuentes, SweetAlert2 y las imágenes alojadas externamente.

## Flujo de uso

1. Explora el catálogo en la página principal y agrega productos al carrito.
2. Abre el carrito para consultar cantidades y el total, o quitar unidades.
3. Completa los campos obligatorios del formulario de compra y envíalo.
4. Si el carrito contiene productos, se vacía y se muestra la página de confirmación.

El formulario de contacto está configurado para enviarse a través de Formspree.