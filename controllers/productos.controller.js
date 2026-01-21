// Importamos la base de datos
const db = require('../DataBase/database');

/*
 OBTENER PRODUCTOS
*/
exports.obtenerProductos = (req, res) => {
    db.all('SELECT * FROM productos', [], (error, filas) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(filas);
        }
    });
};

/*
 CREAR PRODUCTO
*/
exports.crearProducto = (req, res) => {
    const { nombre, precio, imagen, cantidad } = req.body;

    const sql = `
        INSERT INTO productos (nombre, precio, imagen, cantidad)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [nombre, precio, imagen, cantidad], function (error) {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json({ id: this.lastID });
        }
    });
};

/*
 ELIMINAR PRODUCTO
*/
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM productos WHERE id = ?', id, (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json({ mensaje: 'Producto eliminado' });
        }
    });
};
