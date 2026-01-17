const form = document.getElementById('formProducto');
const lista = document.getElementById('listaProductos');

/*
 OBTENER PRODUCTOS
*/
async function cargarProductos() {
    const response = await fetch('/api/productos');
    const productos = await response.json();

    lista.innerHTML = '';

    productos.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.nombre} - $${p.precio}`;

        const btn = document.createElement('button');
        btn.textContent = 'Eliminar';
        btn.onclick = () => eliminarProducto(p.id);

        li.appendChild(btn);
        lista.appendChild(li);
    });
}

/*
 CREAR PRODUCTO
*/
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = {
        nombre: nombre.value,
        precio: precio.value,
        cantidad: cantidad.value
    };

    await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    });

    form.reset();
    cargarProductos();
});

/*
 ELIMINAR PRODUCTO
*/
async function eliminarProducto(id) {
    await fetch(`/api/productos/${id}`, {
        method: 'DELETE'
    });
    cargarProductos();
}

// Carga inicial
cargarProductos();
