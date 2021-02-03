// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar Formulario
    formulario.addEventListener('submit', enviarFormulario);

    // Resetea formulario
    btnReset.addEventListener('click', resetearFormulario);
}

// Funciones 
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {

    if(e.target.value.length > 0) {
        // Elimina mensaje de error
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        // Elimina mensaje de error
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {

        if(validarEmail.test(e.target.value)) {
        // Elimina mensaje de error
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El email no es válido');
        }

    }

    if(validarEmail.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }

}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

// Envía el formulario
function enviarFormulario(event) {
    event.preventDefault();
    
    // Mostrar Spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Ocultar spinner después de 3sec
    setTimeout(() => {
        spinner.style.display = 'none';

        // Muestra mensaje de envío exitoso del formulario
        const mensajeExitoso = document.createElement('p');
        mensajeExitoso.classList.add('text-center', 'bg-green-500', 'mb-10', 'py-3', 'text-white');
        mensajeExitoso.textContent = 'Formulario enviado exitosamente';
        formulario.insertBefore(mensajeExitoso, spinner);

        setTimeout(() => {
            mensajeExitoso.remove();
            resetearFormulario();
        }, 1500);

    }, 3000);

}

function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}