document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});


const searchBtn = document.querySelector('.search-btn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
    const texto = searchInput.value.trim();

    if (texto !== '') {
        buscarProductos(texto);
    }
});


async function buscarProductos(texto) {
    const response = await fetch(`/api/productos/buscar/${texto}`);
    const productos = await response.json();

    const section = document.getElementById('searchResultsSection');
    const container = document.getElementById('searchResults');
    const message = document.getElementById('searchMessage');

    // Mostrar la sección de resultados
    section.style.display = 'block';

    // Limpiar contenido previo
    container.innerHTML = '';
    message.style.display = 'none';

    // Si no hay resultados
    if (productos.length === 0) {
        message.style.display = 'block';
        return;
    }

    // Renderizar productos encontrados
    productos.forEach(p => {
        container.innerHTML += `
            <article class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="card-info">
                    <h3>${p.nombre}</h3>
                    <span class="price">$${p.precio}</span>
                    <button class="add-btn">Agregar</button>
                </div>
            </article>
        `;
    });
}




// FUNCIÓN ASÍNCRONA PARA TRAER PRODUCTOS
async function cargarProductos() {

    // Llamada al backend
    const response = await fetch('/api/productos');

    // Convertimos la respuesta en JSON
    const productos = await response.json();

    // Referencia al track del carrusel
    const track = document.getElementById('carouselTrack');

    // Limpiamos contenido previo
    track.innerHTML = '';

    // Recorremos los productos
    productos.forEach(p => {

        // Creamos la tarjeta usando template literal
        track.innerHTML += `
            <article class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">

                <div class="card-info">
                    <div class="row-top">
                        <h3>${p.nombre}</h3>
                        
                    </div>

                    <div class="row-bottom">
                        <span class="price">
                            $ ${p.costo}
                            
                        </span>
                        <button class="add-btn">Agregar</button>
                    </div>
                </div>
            </article>
        `;
    });
}


// Índice actual del carrusel
let posicion = 0;

// Botones
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');
const track = document.getElementById('carouselTrack');

// Ancho aproximado de una tarjeta
const anchoTarjeta = 320;

// BOTÓN DERECHA
btnNext.addEventListener('click', () => {
    posicion++;
    moverCarrusel();
});

// BOTÓN IZQUIERDA
btnPrev.addEventListener('click', () => {
    posicion--;
    moverCarrusel();
});

// FUNCIÓN QUE MUEVE EL TRACK
function moverCarrusel() {

    // Evita que se salga del rango
    posicion = Math.max(0, Math.min(posicion, track.children.length - 1));

    // Aplica el movimiento
    track.style.transform = `translateX(-${posicion * anchoTarjeta}px)`;
}
