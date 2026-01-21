const db = require('../DataBase/database');

exports.obtenerCarrito = (req, res) => {
  const id_usuario = req.query.id_usuario;

  const sql = `
    SELECT dc.id_detalle, p.id_producto, p.Nombre_Pro, p.MARCA, p.Costo, p.IMAGEN, dc.cantidad
    FROM DETALLE_CARRITO dc
    JOIN productos p ON p.id_producto = dc.id_producto
    WHERE dc.id_usuario = ?
  `;

  db.all(sql, [id_usuario], (error, filas) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(filas);
    }
  });
};

exports.agregarAlCarrito = (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;

  const sql = `
    INSERT INTO DETALLE_CARRITO (id_usuario, id_producto, cantidad)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [id_usuario, id_producto, cantidad], function (error) {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ id_detalle: this.lastID });
    }
  });
};

exports.actualizarCantidad = (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  const sql = `
    UPDATE DETALLE_CARRITO
    SET cantidad = ?
    WHERE id_detalle = ?
  `;

  db.run(sql, [cantidad, id], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ mensaje: 'Cantidad actualizada' });
    }
  });
};

exports.eliminarDelCarrito = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM DETALLE_CARRITO WHERE id_detalle = ?', id, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ mensaje: 'Producto eliminado del carrito' });
    }
  });
};
