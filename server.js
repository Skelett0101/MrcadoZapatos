// 1. Importamos Express (framework para crear servidores)
const express = require('express');

// 2. Permite que el navegador haga peticiones al backend
const cors = require('cors');

// 3. Maneja rutas de archivos (para Public)
const path = require('path');

// 4. Importamos nuestras rutas
const productosRoutes = require('./routes/productos.routes');

// 5. Creamos la aplicación
const app = express();

// 6. Definimos el puerto
const PORT = 3000;

/*
 MIDDLEWARE
 Son funciones que se ejecutan ANTES de llegar a las rutas
*/

// Permite recibir JSON desde fetch()
app.use(express.json());

// Permite comunicación frontend ↔ backend
app.use(cors());

// Hace pública la carpeta Public
// Esto permite acceder a index.html, CSS y JS desde el navegador
app.use(express.static(path.join(__dirname, 'Public')));

/*
 RUTAS
*/
app.use('/api/productos', productosRoutes);

/*
 INICIAR SERVIDOR
*/
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3000/Html/index.html`);
});


