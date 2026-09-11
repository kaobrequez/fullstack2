// ==============================
// Registro de usuario
// ==============================
const formularioRegistro = document.getElementById('formulario-registro');

if (formularioRegistro) {
  formularioRegistro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Aquí, más adelante, se puede agregar el envío real de los datos
    // (fetch a una API, guardado en localStorage, etc.)

    mostrarMensaje('¡Registro exitoso! Redirigiendo al inicio...', 'is-success');

    // Deshabilita el botón para evitar doble envío mientras se redirige
    const botonEnviar = formularioRegistro.querySelector('button[type="submit"]');
    if (botonEnviar) botonEnviar.disabled = true;

    // Espera 3 segundos y redirige a index.html (ubicado un nivel arriba de /pages)
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 3000);
  });
}

/**
 * Muestra el contenedor de mensajes con el texto y estilo indicados.
 * @param {string} texto - Mensaje a mostrar.
 * @param {string} tipo - Clase de color de Bulma: is-success, is-danger, is-warning, etc.
 */
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
