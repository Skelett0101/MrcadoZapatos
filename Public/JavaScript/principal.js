document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});



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
