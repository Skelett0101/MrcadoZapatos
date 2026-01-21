const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta física del archivo .db
const dbPath = path.join(__dirname, 'productos.db');

// Crear o abrir la base de datos
const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.error('Error al abrir la base de datos', error);
    } else {
        console.log('Base de datos conectada');
    }
});


//----------------------TABLAS-------------------------

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL,
        imagen TEXT NOT NULL,
        cantidad INTEGER NOT NULL
    )
`);

module.exports = db;

db.run(`DROP TABLE productos; )`);


db.run(`CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre_usu TEXT NOT NULL,
    Apat TEXT NOT NULL,
    Amat TEXT NOT NULL,
    Domicilio TEXT NOT NULL,
    Correo TEXT NOT NULL,
    Contrasena TEXT NOT NULL)
`);



db.run(`
        CREATE TABLE IF NOT EXISTS Producto (
            id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre_Pro TEXT NOT NULL,
            Costo REAL NOT NULL,  -- DECIMAL 
            MARCA TEXT NOT NULL,
            TALLA TEXT NOT NULL,
            CATEGORIA TEXT NOT NULL,
            IMAGEN TEXT NOT NULL
        )
    `);



db.run(`
        CREATE TABLE IF NOT EXISTS TARJETA (
            id_TARJETA INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            FECHA TEXT NOT NULL,
            CVV TEXT NOT NULL,
            NUMERO_TARJETA TEXT NOT NULL,
            FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
        )
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS CARRO_COMPRA (
        Id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        total REAL NOT NULL,       
        Fecha_compra TEXT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
    )
`);

//----------------------registros-------------------------
