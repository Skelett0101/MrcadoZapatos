const express = require('express');
const router = express.Router();

// Importamos el controlador
const productosController = require('../controllers/productos.controller');

// GET /api/productos
router.get('/', productosController.obtenerProductos);

// POST /api/productos
router.post('/', productosController.crearProducto);

// DELETE /api/productos/:id
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
