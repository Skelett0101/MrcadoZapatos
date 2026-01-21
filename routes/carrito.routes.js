const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// Obtener carrito de un usuario
router.get('/:id_usuario', carritoController.obtenerCarrito);

// Agregar producto al carrito
router.post('/agregar', carritoController.agregarAlCarrito);

// Actualizar cantidad
router.put('/:id', carritoController.actualizarCantidad);

// Eliminar producto
router.delete('/:id', carritoController.eliminarDelCarrito);

router.post('/finalizar', carritoController.finalizarCompra);


module.exports = router;
