const db = require('../DataBase/database');

/* ===== REGISTRAR USUARIO ===== */
exports.registrarUsuario = (req, res) => {

    const { nombre, domicilio, correo, contrasena } = req.body;

    // Validación básica
    if (!nombre || !domicilio || !correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const sql = `
        INSERT INTO usuario (nombre, domicilio, correo, contrasena)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [nombre, domicilio, correo, contrasena], function (err) {

        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({ mensaje: 'El correo ya está registrado' });
            }
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Usuario registrado correctamente',
            id_usuario: this.lastID
        });
    });
};

/* ===== LOGIN USUARIO ===== */
exports.loginUsuario = (req, res) => {

    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const sql = `
        SELECT id_usuario, nombre, correo, contrasena
        FROM usuario
        WHERE correo = ?
    `;

    db.get(sql, [correo], (err, usuario) => {

        if (err) return res.status(500).json(err);

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        // Comparación directa (por ahora)
        if (usuario.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Login correcto
        res.json({
            mensaje: 'Login exitoso',
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });
    });
};


exports.registrarUsuario = (req, res) => {

    const { nombre, domicilio, correo, contrasena } = req.body;

    if (!nombre || !domicilio || !correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const sql = `
        INSERT INTO usuario (nombre, domicilio, correo, contrasena)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [nombre, domicilio, correo, contrasena], function (err) {

        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({ mensaje: 'El correo ya está registrado' });
            }
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Usuario registrado correctamente',
            id_usuario: this.lastID
        });
    });
};

