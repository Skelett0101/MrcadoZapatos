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

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL,
        cantidad INTEGER NOT NULL
    )
`);

module.exports = db;
