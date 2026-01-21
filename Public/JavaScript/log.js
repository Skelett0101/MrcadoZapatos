// Public/JavaScript/log.js
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('loginForm');

    if (!form) {
        console.error('No se encontró el formulario');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const correo = document.getElementById('email').value;
        const contrasena = document.getElementById('password').value;

        const response = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login exitoso');
            sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
            window.location.href = 'index.html';
        } else {
            alert(data.mensaje);
        }
    });

});
