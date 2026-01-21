document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('registroForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const domicilio = document.getElementById('domicilio').value;
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;

        const response = await fetch('/api/usuarios/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre,
                domicilio,
                correo,
                contrasena
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Usuario registrado correctamente');
            window.location.href = 'log.html';
        } else {
            alert(data.mensaje || 'Error al registrar');
        }
    });

});
