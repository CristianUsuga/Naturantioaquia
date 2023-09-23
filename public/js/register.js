function validateCedula() {
    var cedulaInput = document.getElementById("cedula");
    var cedulaError = document.getElementById("cedulaError");
    var cedulaPattern = /^[0-9]{6,10}$/;

    if (!cedulaPattern.test(cedulaInput.value)) {
        cedulaInput.style.borderColor = "red";
        cedulaError.textContent = "La cédula debe contener máximo 10 dígitos.";
        cedulaError.style.display = "inline"; // Mostrar el mensaje de error
    } else {
        cedulaInput.style.borderColor = "";
        cedulaError.textContent = "";
        cedulaError.style.display = "none"; // Ocultar el mensaje de error
    }
}

// Función para validar el nombre (letras, espacios, tildes)
function validateNombre(inputId) {
    var nombreInput = document.getElementById(inputId);
    var nombreError = document.getElementById(inputId + "Error");
    var nombrePattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]+$/;

    if (!nombrePattern.test(nombreInput.value)) {
        nombreInput.style.borderColor = "red";
        nombreError.textContent = "El nombre solo puede contener letras, espacios y tildes.";
    } else {
        nombreInput.style.borderColor = "";
        nombreError.textContent = "";
    }
}

// Función para validar el apellido (letras, espacios, tildes)
function validateApellido(inputId) {
    var apellidoInput = document.getElementById(inputId);
    var apellidoError = document.getElementById(inputId + "Error");
    var apellidoPattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]+$/;

    if (!apellidoPattern.test(apellidoInput.value)) {
        apellidoInput.style.borderColor = "red";
        apellidoError.textContent = "El apellido solo puede contener letras, espacios y tildes.";
    } else {
        apellidoInput.style.borderColor = "";
        apellidoError.textContent = "";
    }
}

function validateSApellido(inputId) {
    var apellidoInput = document.getElementById(inputId);
    var apellidoError = document.getElementById(inputId + "Error");
    var apellidoPattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]*$/;

    if (apellidoInput.value.trim() !== '' && !apellidoPattern.test(apellidoInput.value)) {
        apellidoInput.style.borderColor = "red";
        apellidoError.textContent = "El apellido solo puede contener letras, espacios y tildes.";
    } else {
        apellidoInput.style.borderColor = "";
        apellidoError.textContent = "";
    }
}

// Función para validar el correo (expresión regular)
function validateCorreo() {
    var correoInput = document.getElementById("correo");
    var correoError = document.getElementById("correoError");
    var correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!correoPattern.test(correoInput.value)) {
        correoInput.style.borderColor = "red";
        correoError.textContent = "Por favor, ingrese un correo válido.";
    } else {
        correoInput.style.borderColor = "";
        correoError.textContent = "";
    }
}

// Función para validar la contraseña (recomendaciones básicas)
function validatePassword() {
    var passwordInput = document.getElementById("password1");
    var passwordError = document.getElementById("passwordError");
    var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(passwordInput.value)) {
        passwordInput.style.borderColor = "red";
        passwordError.textContent = "La contraseña debe contener al menos 8 caracteres, una mayúscula y un número.";
    } else {
        passwordInput.style.borderColor = "";
        passwordError.textContent = "";
    }
}

// Función para validar que la contraseña coincida con la repetición de la contraseña
function validateConfirmPassword() {
    var passwordInput = document.getElementById("password1");
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var confirmPasswordError = document.getElementById("confirmPasswordError");

    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = "red";
        confirmPasswordError.textContent = "Las contraseñas no coinciden.";
    } else {
        confirmPasswordInput.style.borderColor = "";
        confirmPasswordError.textContent = "";
    }
}

// Función para validar el número de celular (solo números, máximo 11)
function validateCelular() {
    var celularInput = document.getElementById("celular");
    var celularError = document.getElementById("celularError");
    var celularPattern = /^[0-9]{1,11}$/;

    if (!celularPattern.test(celularInput.value)) {
        celularInput.style.borderColor = "red";
        celularError.textContent = "El número de celular debe contener solo números y máximo 11 dígitos.";
    } else {
        celularInput.style.borderColor = "";
        celularError.textContent = "";
    }
}

// Función para validar el número de teléfono (solo números, máximo 11)
function validateTelefono() {
    var telefonoInput = document.getElementById("telefono");
    var telefonoError = document.getElementById("telefonoError");
    var telefonoPattern = /^[0-9]{1,11}$/;

    if (!telefonoPattern.test(telefonoInput.value)) {
        telefonoInput.style.borderColor = "red";
        telefonoError.textContent = "El número de teléfono debe contener solo números y máximo 11 dígitos.";
    } else {
        telefonoInput.style.borderColor = "";
        telefonoError.textContent = "";
    }
}

// Función para validar la fecha de nacimiento (mayor a 13 años)
function validateFechaNacimiento() {
    var fechaNacimientoInput = document.getElementById("fechaNacimiento");
    var fechaNacimientoError = document.getElementById("fechaNacimientoError");
    var fechaNacimiento = new Date(fechaNacimientoInput.value);
    var hoy = new Date();
    var edadMinima = new Date(hoy.getFullYear() - 13, hoy.getMonth(), hoy.getDate());

    if (fechaNacimiento >= edadMinima) {
        fechaNacimientoInput.style.borderColor = "red";
        fechaNacimientoError.textContent = "Debe tener al menos 13 años para registrarse.";
    } else {
        fechaNacimientoInput.style.borderColor = "";
        fechaNacimientoError.textContent = "";
    }
}

// Función para validar el formulario antes de enviarlo al servidor
function validateForm() {
    validateCedula();
    validateNombre('primerNombre');
    validateApellido('primerApellido');
    validateSApellido('segundoApellido');
    validateCorreo();
    validatePassword();
    validateConfirmPassword();
    validateCelular();
    validateTelefono();
    validateFechaNacimiento();

    // Verificar si hay algún error en los campos
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        if (errorMessages[i].textContent !== "") {
            return false; // Hay errores, no se envía el formulario
        }
    }

    // Si no hay errores, prepara el objeto de datos
    var formData = {
        nombre: document.getElementById("primerNombre").value,
        primer_apellido: document.getElementById("primerApellido").value,
        segundo_apellido: document.getElementById("segundoApellido").value,
        correo: document.getElementById("correo").value,
        contraseña: document.getElementById("password1").value,
        fecha_nacimiento: document.getElementById("fechaNacimiento").value,
        celular: document.getElementById("celular").value,
        telefono: document.getElementById("telefono").value,
        rol_de_usuario: document.getElementById("rol").value,
        tipo_de_documento: document.getElementById("tipoDocumento").value,
        estado_de_usuario: document.getElementById("estado").value,
        sexo_de_usuario: document.getElementById("sexo").value
    };

    // Realiza una solicitud POST al API
    fetch('/api/usuarios/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // Maneja un registro exitoso (por ejemplo, muestra un mensaje de éxito)
            alert('¡Registro exitoso!');
            // Opcionalmente, puedes redirigir al usuario a una página de inicio de sesión
            window.location.href = '/login';
        } else {
            // Maneja los errores del API (por ejemplo, muestra un mensaje de error)
            alert('El registro falló. Por favor, inténtalo de nuevo más tarde.');
        }
    })
    .catch(error => {
        // Maneja errores de red u otros errores
        console.error('Error:', error);
    });

    return false; // Evita que el formulario se envíe mediante la presentación HTML de formulario estándar
}
