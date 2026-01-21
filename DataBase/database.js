const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta del archivo de base de datos
const dbPath = path.join(__dirname, 'tienda.db');

// Crear o abrir la base de datos
const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.error('Error al abrir la base de datos', error);
    } else {
        console.log('Base de datos conectada');
    }
});

/* ================= TABLAS ================= */

// PRODUCTOS
db.run(`
    CREATE TABLE IF NOT EXISTS productos (
        id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        costo REAL NOT NULL,
        talla TEXT NOT NULL,
        categoria TEXT NOT NULL,
        imagen TEXT NOT NULL
    )
`);

// CATEGORIAS
db.run(`
    CREATE TABLE IF NOT EXISTS categorias (
        id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE
    )
`);

// USUARIO
db.run(`
    CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        domicilio TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        contrasena TEXT NOT NULL
    )
`);

// TARJETA
db.run(`
    CREATE TABLE IF NOT EXISTS tarjeta (
        id_tarjeta INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        cvv TEXT NOT NULL,
        numero_tarjeta TEXT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    )
`);

// CARRITO
db.run(`
    CREATE TABLE IF NOT EXISTS carrito_compra (
        id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        total REAL NOT NULL,
        fecha_compra TEXT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    )
`);

// DETALLE CARRITO
db.run(`
    CREATE TABLE IF NOT EXISTS detalle_carrito (
        id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        id_producto INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
    )
`);

module.exports = db;
