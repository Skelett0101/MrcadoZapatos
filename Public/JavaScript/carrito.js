// Función para cargar los productos del carrito de un usuario
async function cargarCarrito(id_usuario) {
  try {
    // 1) Hacer la petición al backend para obtener los productos del carrito
    //    Se usa el id del usuario para saber qué carrito cargar
    const res = await fetch(`/api/carrito?id_usuario=${id_usuario}`);

    // 2) Convertir la respuesta en JSON (lista de productos)
    const productos = await res.json();

    // 3) Obtener el contenedor donde se mostrará el carrito
    const contenedor = document.getElementById('carrito');

    // 4) Vaciar el contenedor para que no se dupliquen productos
    contenedor.innerHTML = '';

    // 5) Recorrer cada producto y crear el bloque HTML dinámicamente
    productos.forEach(p => {
      contenedor.innerHTML += `
        <div class="item">
          <img src="${p.IMAGEN}" alt="${p.Nombre_Pro}">
          <div class="info">
            <h3 class="product-name">${p.Nombre_Pro}</h3>
            <p class="product-brand">${p.MARCA}</p>
          </div>
          <div class="actions">
            <button class="delete" data-id="${p.id_detalle}" title="Eliminar">🗑</button>
            <div class="qty">
              <label>Cantidad</label>
              <input type="number" min="1" value="${p.cantidad}" data-id="${p.id_detalle}">
            </div>
          </div>
          <p class="price">Precio: $${p.Costo}</p>
        </div>
      `;
    });

  } catch (error) {
    // 6) Si ocurre algún error (por ejemplo si la API no existe), se muestra en consola
    console.error("Error cargando el carrito:", error);
  }
}
