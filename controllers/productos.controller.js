const db = require('../DataBase/database');

/* ===== MOSTRAR PRODUCTOS ===== */
exports.obtenerProductos = (req, res) => {
    db.all('SELECT * FROM productos', [], (err, rows) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(rows);
        }
    });
};

/* ===== AGREGAR PRODUCTO ===== */
exports.crearProducto = (req, res) => {
    const { nombre, costo, talla, categoria, imagen } = req.body;

    const sql = `
        INSERT INTO productos (nombre, costo, talla, categoria, imagen)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [nombre, costo, talla, categoria, imagen], function (err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ id: this.lastID });
        }
    });
};

/* ===== ELIMINAR PRODUCTO ===== */
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM productos WHERE id_producto = ?',
        id,
        (err) => {
            if (err) res.status(500).json(err);
            else res.json({ mensaje: 'Producto eliminado' });
        }
    );
};
