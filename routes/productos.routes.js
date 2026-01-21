const express = require('express');
const router = express.Router();
const controller = require('../controllers/productos.controller');

// GET /api/productos
router.get('/', controller.obtenerProductos);

// POST /api/productos
router.post('/', controller.crearProducto);

// DELETE /api/productos/:id
router.delete('/:id', controller.eliminarProducto);



module.exports = router;
