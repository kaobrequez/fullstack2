
const CLAVE_USUARIOS = 'usuarios';

function obtenerUsuarios() {
    const datos = localStorage.getItem(CLAVE_USUARIOS);
    return datos ? JSON.parse(datos) : [];
}

function guardarUsuarios(listaUsuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(listaUsuarios));
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

        const usuarios = obtenerUsuarios();

        const yaExiste = usuarios.some(
            (u) => u.username.toLowerCase() === username.toLowerCase()
        );

        if (yaExiste) {
            mostrarMensaje('Ese nombre de usuario ya está registrado. Elige otro.', 'is-danger');
            return;
        }

        usuarios.push({ username, password, email, phone, age, country, gender, newsletter });
        guardarUsuarios(usuarios);

        mostrarMensaje('¡Registro exitoso! Redirigiendo al inicio...', 'is-success');

        const botonEnviar = formularioRegistro.querySelector('button[type="submit"]');
        if (botonEnviar) botonEnviar.disabled = true;

        setTimeout(() => {
            window.location.href = '/index.html';
        }, 3000);
    });
}

/* INICIO DE SEISON */
const formularioLogin = document.getElementById('formulario-login');

if (formularioLogin) {
    formularioLogin.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(
            (u) =>
                u.username.toLowerCase() === username.toLowerCase() &&
                u.password === password
        );

        if (!usuarioEncontrado) {
            mostrarMensaje('Usuario o contraseña incorrectos.', 'is-danger');
            return;
        }


        sessionStorage.setItem('usuarioActual', usuarioEncontrado.username);

        mostrarMensaje('Sesión iniciada con éxito. Redirigiendo al inicio...', 'is-success');

        const botonEnviar = formularioLogin.querySelector('button[type="submit"]');
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

    // Quita clases de color previas y aplica la nueva
    contenedorMensaje.classList.remove('is-warning', 'is-success', 'is-danger', 'is-info');
    contenedorMensaje.classList.add(tipo);

    mensaje.textContent = texto;
    contenedorMensaje.style.display = 'block';
}
