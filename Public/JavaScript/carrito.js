document.addEventListener('DOMContentLoaded', () => {

    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if (!usuario) {
        window.location.href = 'log.html';
        return;
    }

    cargarCarrito(usuario.id_usuario);
});

// ================================
// CARGAR CARRITO
// ================================
function cargarCarrito(id_usuario) {

    fetch(`/api/carrito/${id_usuario}`)
        .then(res => res.json())
        .then(data => mostrarCarrito(data))
        .catch(err => console.error(err));
}

// ================================
// MOSTRAR CARRITO
// ================================
function mostrarCarrito(productos) {

    const contenedor = document.getElementById('carrito');
    const listaPedido = document.querySelector('.order-list');
    const totalSpan = document.querySelector('.total-value');

    contenedor.innerHTML = '';
    listaPedido.innerHTML = `
        <li>
            <span class="order-product">Producto</span>
            <span class="order-qty">Cantidad</span>
        </li>
    `;

    let total = 0;

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>Tu carrito está vacío</p>';
        totalSpan.textContent = '$0.00';
        return;
    }

    productos.forEach(prod => {

        total += prod.precio * prod.cantidad;

        contenedor.innerHTML += `
            <div class="cart-item">

                <img src="${prod.imagen}" alt="${prod.nombre}">

                <div class="info">
                    <h3>${prod.nombre}</h3>
                    <p>$${prod.precio}</p>
                </div>

                <div class="controls">
                    <button onclick="cambiarCantidad(${prod.id_detalle}, ${prod.cantidad - 1})">-</button>
                    <span>${prod.cantidad}</span>
                    <button onclick="cambiarCantidad(${prod.id_detalle}, ${prod.cantidad + 1})">+</button>
                </div>

                <button class="delete" onclick="eliminarProducto(${prod.id_detalle})">🗑</button>

            </div>
        `;

        listaPedido.innerHTML += `
            <li>
                <span>${prod.nombre}</span>
                <span>${prod.cantidad}</span>
            </li>
        `;
    });

    totalSpan.textContent = `$${total.toFixed(2)}`;
}

// ================================
// CAMBIAR CANTIDAD
// ================================
function cambiarCantidad(id_detalle, nuevaCantidad) {

    if (nuevaCantidad <= 0) {
        eliminarProducto(id_detalle);
        return;
    }

    fetch(`/api/carrito/${id_detalle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: nuevaCantidad })
    })
    .then(() => {
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        cargarCarrito(usuario.id_usuario);
    });
}

// ================================
// ELIMINAR PRODUCTO
// ================================
function eliminarProducto(id_detalle) {

    fetch(`/api/carrito/${id_detalle}`, {
        method: 'DELETE'
    })
    .then(() => {
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        cargarCarrito(usuario.id_usuario);
    });
}



document.querySelector('.checkout').addEventListener('click', finalizarCompra);

function finalizarCompra() {

    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if (!usuario) {
        alert('Debes iniciar sesión');
        return;
    }

    fetch('/api/carrito/finalizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_usuario: usuario.id_usuario
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(`Compra realizada\nTotal: $${data.total}`);
        cargarCarrito(usuario.id_usuario); // refresca carrito
    })
    .catch(err => console.error(err));
}
