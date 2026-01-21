const db = require('../DataBase/database');

// ================================
// OBTENER CARRITO DEL USUARIO
// ================================
exports.obtenerCarrito = (req, res) => {

    const { id_usuario } = req.params;

    const sql = `
        SELECT 
            dc.id_detalle,
            p.id_producto,
            p.nombre,
            p.costo AS precio,
            p.imagen,
            dc.cantidad
        FROM detalle_carrito dc
        JOIN productos p ON p.id_producto = dc.id_producto
        WHERE dc.id_usuario = ?
    `;

    db.all(sql, [id_usuario], (error, filas) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
        res.json(filas);
    });
};
// ================================
// AGREGAR PRODUCTO AL CARRITO
// ================================
exports.agregarAlCarrito = (req, res) => {

    const { id_usuario, id_producto, cantidad } = req.body;

    const sql = `
        INSERT INTO detalle_carrito (id_usuario, id_producto, cantidad)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [id_usuario, id_producto, cantidad], function (error) {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ mensaje: 'Producto agregado al carrito' });
    });
};

// ================================
// ACTUALIZAR CANTIDAD
// ================================
exports.actualizarCantidad = (req, res) => {

    const { id } = req.params;
    const { cantidad } = req.body;

    db.run(
        'UPDATE detalle_carrito SET cantidad = ? WHERE id_detalle = ?',
        [cantidad, id],
        (error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json({ mensaje: 'Cantidad actualizada' });
        }
    );
};

// ================================
// ELIMINAR PRODUCTO
// ================================
exports.eliminarDelCarrito = (req, res) => {

    const { id } = req.params;

    db.run(
        'DELETE FROM detalle_carrito WHERE id_detalle = ?',
        [id],
        (error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json({ mensaje: 'Producto eliminado' });
        }
    );
};



// ================================
// FINALIZAR COMPRA
// ================================
exports.finalizarCompra = (req, res) => {

    const { id_usuario } = req.body;

    if (!id_usuario) {
        return res.status(400).json({ mensaje: 'Usuario no válido' });
    }

    // 1️⃣ Obtener total del carrito
    const sqlTotal = `
        SELECT SUM(p.costo * dc.cantidad) AS total
        FROM detalle_carrito dc
        JOIN productos p ON p.id_producto = dc.id_producto
        WHERE dc.id_usuario = ?
    `;

    db.get(sqlTotal, [id_usuario], (err, resultado) => {

        if (err) return res.status(500).json(err);

        if (!resultado.total) {
            return res.status(400).json({ mensaje: 'El carrito está vacío' });
        }

        const total = resultado.total;
        const fecha = new Date().toISOString();

        // 2️⃣ Insertar compra
        const sqlCompra = `
            INSERT INTO carrito_compra (id_usuario, total, fecha_compra)
            VALUES (?, ?, ?)
        `;

        db.run(sqlCompra, [id_usuario, total, fecha], function (err) {

            if (err) return res.status(500).json(err);

            const id_compra = this.lastID;

            // 3️⃣ Vaciar carrito
            db.run(
                'DELETE FROM detalle_carrito WHERE id_usuario = ?',
                [id_usuario],
                (err) => {
                    if (err) return res.status(500).json(err);

                    res.json({
                        mensaje: 'Compra realizada con éxito',
                        id_compra,
                        total
                    });
                }
            );
        });
    });
};
