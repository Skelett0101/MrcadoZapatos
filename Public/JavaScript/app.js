const lista = document.getElementById('listaProductos');
const form = document.getElementById('formProducto');

/* MOSTRAR */
async function cargarProductos() {
    const res = await fetch('/api/productos');
    const productos = await res.json();

    lista.innerHTML = '';

    productos.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.nombre} - $${p.costo}`;

        const btn = document.createElement('button');
        btn.textContent = 'Eliminar';
        btn.onclick = () => eliminarProducto(p.id_producto);

        li.appendChild(btn);
        lista.appendChild(li);
    });
}

/* AGREGAR */
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = {
        nombre: nombre.value,
        costo: costo.value,
        talla: talla.value,
        categoria: categoria.value,
        imagen: imagen.value
    };

    await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    });

    form.reset();
    cargarProductos();
});

/* ELIMINAR */
async function eliminarProducto(id) {
    await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    cargarProductos();
}

cargarProductos();
