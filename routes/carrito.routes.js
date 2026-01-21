// Importa el módulo "express" para poder usar sus funciones
const express = require('express');

// Crea un "router" de Express, que permite definir rutas (endpoints) separadas
// y organizarlas mejor dentro de la aplicación.
const router = express.Router();

// Importa el controlador del carrito. Este archivo contiene las funciones
// que se ejecutan cuando se llama a cada ruta.
const carritoController = require('../controllers/carrito.controller');

// Define una ruta GET en la raíz del router ("/").
// Cuando un usuario hace una petición GET a "/carrito",
// se ejecuta la función obtenerCarrito del controlador.
router.get('/', carritoController.obtenerCarrito);

// Define una ruta POST en la raíz del router ("/").
// Cuando un usuario hace una petición POST a "/carrito",
// se ejecuta la función agregarAlCarrito del controlador.
router.post('/', carritoController.agregarAlCarrito);

// Define una ruta PUT con un parámetro dinámico ":id".
// Cuando un usuario hace una petición PUT a "/carrito/:id",
// se ejecuta la función actualizarCantidad del controlador.
// ":id" representa el identificador del producto dentro del carrito.
router.put('/:id', carritoController.actualizarCantidad);

// Define una ruta DELETE con un parámetro dinámico ":id".
// Cuando un usuario hace una petición DELETE a "/carrito/:id",
// se ejecuta la función eliminarDelCarrito del controlador.
// ":id" representa el identificador del producto a eliminar.
router.delete('/:id', carritoController.eliminarDelCarrito);

// Exporta el router para poder usar estas rutas en otros archivos,
// normalmente en el archivo principal de la aplicación (app.js o index.js).
module.exports = router;
