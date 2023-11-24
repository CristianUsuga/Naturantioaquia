function validateForm() {
    // Deshabilita el botón de "Enviar" para evitar envíos múltiples
    var submitButton = document.querySelector(".submit-button");
    submitButton.disabled = true;

    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

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

    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        if (errorMessages[i].textContent !== "") {
            // Habilita el botón de "Enviar" nuevamente si hay errores
            submitButton.disabled = false;
            return false;
        }
    }

    var formData = new FormData(document.getElementById("form_usuarios"));

    var userData = {
        "id_usuario": formData.get("cedula"),
        "nombre": formData.get("primerNombre"),
        "primer_apellido": formData.get("primerApellido"),
        "segundo_apellido": formData.get("segundoApellido") !== "" ? formData.get("segundoApellido") : null,
        "correo": formData.get("correo"),
        "contraseña": formData.get("password1"),
        "fecha_nacimiento": formData.get("fechaNacimiento"),
        "celular": formData.get("celular"),
        "telefono": formData.get("telefono") !== "" ? formData.get("telefono") : null,
        "perfil_usuario": formData.get("rol"),
        "tipo_documento": formData.get("tipoDocumento"),
        "estado_usuario": formData.get("estado"),
        "sexo_usuario": formData.get("sexo")
    };

    registerUser(userData);
}



function validateCedula() {
    var cedulaInput = document.getElementById("cedula");
    var cedulaError = document.getElementById("cedulaError");
    var cedulaPattern = /^\d{7,10}$/;

    if (!cedulaPattern.test(cedulaInput.value)) {
        cedulaInput.style.borderColor = "red";
        cedulaError.textContent = "La cédula debe tener entre 7 y 10 dígitos numéricos.";
        cedulaError.style.display = "inline";
    } else {
        cedulaInput.style.borderColor = "";
        cedulaError.textContent = "";
        cedulaError.style.display = "none";
    }
}

function validateNombre(inputId) {
    var nombreInput = document.getElementById(inputId);
    var nombreError = document.getElementById(inputId + "Error");
    var nombreValue = nombreInput.value.trim();

    if (nombreValue.length < 1) {
        nombreInput.style.borderColor = "red";
        nombreError.textContent = "El nombre debe tener  más caracteres.";
    } else if (nombreValue.length > 60) {
        nombreInput.style.borderColor = "red";
        nombreError.textContent = "El nombre no puede tener más de 60 caracteres.";
    } else {
        nombreInput.style.borderColor = "";
        nombreError.textContent = "";
    }
}

function validateApellido(inputId) {
    var apellidoInput = document.getElementById(inputId);
    var apellidoError = document.getElementById(inputId + "Error");
    var apellidoValue = apellidoInput.value.trim();

    if (apellidoValue.length < 2) {
        apellidoInput.style.borderColor = "red";
        apellidoError.textContent = "El apellido debe tener al menos 2 caracteres.";
    } else if (apellidoValue.length > 30) {
        apellidoInput.style.borderColor = "red";
        apellidoError.textContent = "El apellido no puede tener más de 30 caracteres.";
    } else {
        apellidoInput.style.borderColor = "";
        apellidoError.textContent = "";
    }
}

function validateSApellido(inputId) {
    var apellidoInput = document.getElementById(inputId);
    var apellidoError = document.getElementById(inputId + "Error");
    var apellidoValue = apellidoInput.value.trim();

    if (apellidoValue.length === 0) {
        apellidoError.textContent = "";
    } else if (apellidoValue.length > 30) {
        apellidoInput.style.borderColor = "red";
        apellidoError.textContent = "El segundo apellido no puede tener más de 30 caracteres.";
    } else {
        apellidoInput.style.borderColor = "";
        apellidoError.textContent = "";
    }
}

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

function validateCelular() {
    var celularInput = document.getElementById("celular");
    var celularError = document.getElementById("celularError");
    var celularPattern = /^3\d{9}$/;

    if (!celularPattern.test(celularInput.value)) {
        celularInput.style.borderColor = "red";
        celularError.textContent = "El número de celular no válido.";
    } else {
        celularInput.style.borderColor = "";
        celularError.textContent = "";
    }
}

function validateTelefono() {
    var telefonoInput = document.getElementById("telefono");
    var telefonoError = document.getElementById("telefonoError");
    var telefonoPattern = /^60\d{8}$/;

    var telefonoValue = telefonoInput.value.trim(); // Eliminar espacios en blanco al principio y al final

    if (telefonoValue.length < 1) {
        telefonoInput.style.borderColor = "";
        telefonoError.textContent = "";
    } else if (!telefonoPattern.test(telefonoValue) || !/^\d+$/.test(telefonoValue) || telefonoValue.length !== 10) {
        telefonoInput.style.borderColor = "red";
        telefonoError.textContent = "El número de teléfono no válido. Código de área + número de teléfono fijo.";
    } else {
        telefonoInput.style.borderColor = "";
        telefonoError.textContent = "";
    }
}





function validateFechaNacimiento() {
    var fechaNacimientoInput = document.getElementById("fechaNacimiento");
    var fechaNacimientoError = document.getElementById("fechaNacimientoError");
    var fechaNacimiento = new Date(fechaNacimientoInput.value);
    var hoy = new Date();
    var edadMinima = new Date(hoy.getFullYear() - 14, hoy.getMonth(), hoy.getDate());

    if (fechaNacimiento >= edadMinima || fechaNacimiento >= hoy) {
        fechaNacimientoInput.style.borderColor = "red";
        fechaNacimientoError.textContent = "Debe tener al menos 14 años.";
    } else {
        fechaNacimientoInput.style.borderColor = "";
        fechaNacimientoError.textContent = "";
    }
}

async function registerUser(userData) {
    try {
        const response = await fetch('http://localhost:8080/api/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const responseData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Registro exitoso!',
            }).then(() => {
                window.location.href = '/login';
            });
        } else {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.errors[0].msg; // Obtener el mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }        
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.',
        });
    } finally {
        // Habilita el botón de "Enviar" nuevamente después de manejar la respuesta
        var submitButton = document.querySelector(".submit-button");
        submitButton.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form_usuarios").addEventListener("submit", function (event) {
        event.preventDefault();
        //validateForm();
    });

    var maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 14);
    var formattedMaxDate = maxDate.toISOString().split('T')[0];
    document.getElementById("fechaNacimiento").setAttribute("max", formattedMaxDate);

});