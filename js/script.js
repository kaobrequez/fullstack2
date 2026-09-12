
const DOMINIOS_PERMITIDOS = ['gmail.com', 'outlook.com', 'duocuc.cl'];

function validarCorreo(email) {
    const dominio = email.split('@')[1]?.toLowerCase();
    return DOMINIOS_PERMITIDOS.includes(dominio);
}

function validarTelefonoChileno(phone) {
    const regexTelefono = /^(\+?56)?\s?9\d{8}$/;
    return regexTelefono.test(phone.trim());
}

function esMayorDeEdad(age) {
    const edadNum = parseInt(age, 10);
    return !isNaN(edadNum) && edadNum >= 18;
}

const formularioRegistro = document.getElementById('formulario-registro');

if (formularioRegistro) {
    formularioRegistro.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const age = document.getElementById('age').value;
        const country = document.getElementById('country').value;
        const generoSeleccionado = formularioRegistro.querySelector('input[name="gender"]:checked');
        const gender = generoSeleccionado ? generoSeleccionado.value : '';
        const newsletterInput = document.querySelector('input[name="newsletter"]');
        const newsletter = newsletterInput ? newsletterInput.checked : false;

        // Valida el correo (solo gmail.com, outlook.com o duocuc.cl)
        if (!validarCorreo(email)) {
            mostrarMensaje('Solo se permiten correos de gmail.com, outlook.com o duocuc.cl.', 'is-danger');
            return;
        }

        // Valida que el teléfono sea un número chileno
        if (!validarTelefonoChileno(phone)) {
            mostrarMensaje('Ingresa un número de teléfono chileno válido. Ej: +56912345678', 'is-danger');
            return;
        }

        // Valida que sea mayor de edad; si no, lo redirige al inicio
        if (!esMayorDeEdad(age)) {
            mostrarMensaje('Debes ser mayor de 18 años para registrarte. ¡Sigue intentando!', 'is-danger');

            const botonEnviar = formularioRegistro.querySelector('button[type="submit"]');
            if (botonEnviar) botonEnviar.disabled = true;

            setTimeout(() => {
                window.location.href = '/index.html';
            }, 3000);
            return;
        }

        mostrarMensaje('¡Registro exitoso! Redirigiendo al inicio...', 'is-success');

        const botonEnviar = formularioRegistro.querySelector('button[type="submit"]');
        if (botonEnviar) botonEnviar.disabled = true;

        setTimeout(() => {
            window.location.href = '/index.html';
        }, 3000);
    });
}

function mostrarMensaje(texto, tipo = 'is-warning') {
    const contenedorMensaje = document.getElementById('contenedor-mensaje');
    const mensaje = document.getElementById('mensaje');

    if (!contenedorMensaje || !mensaje) return;

    contenedorMensaje.classList.remove('is-warning', 'is-success', 'is-danger', 'is-info');
    contenedorMensaje.classList.add(tipo);

    mensaje.textContent = texto;
    contenedorMensaje.style.display = 'block';
}
