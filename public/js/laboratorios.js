

async function validateAndRegister() {
    var submitButton = document.querySelector(".submit-button");
    submitButton.disabled = true;

    var errorMessages = document.getElementsByClassName("error-message");

    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    validateNombre("nombre_laboratorio");
    validateCorreo();
    validateCelular();
    validateTelefono();

    for (var i = 0; i < errorMessages.length; i++) {
        if (errorMessages[i].textContent !== "") {
            submitButton.disabled = false;
            return;
        }
    }
    var labData = {
        "nombre_laboratorio": document.getElementById("nombre_laboratorio").value,
        "correo": document.getElementById("correo").value,
        "telefono": document.getElementById("telefono").value !== "" ? document.getElementById("telefono").value : null,
        "celular": document.getElementById("celular").value,
        "estado_laboratorio": document.getElementById("estado").value
    };

    try {
        const response = await fetch('http://localhost:8080/api/laboratorios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(labData)
        });

        if (response.ok) {
            const responseData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Registro exitoso!',
            }).then(() => {
                // mandar para otra parte, pero la verdad no se en donde 
                document.getElementById("form_labs").reset();
            });
        } else {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.errors[0].msg || 'Error desconocido';
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
        // Habilitar el botón de envío después de la ejecución
        submitButton.disabled = false;
    }
}

function validateNombre(inputId) {
    var nombreInput = document.getElementById(inputId);
    var nombreError = document.getElementById(inputId + "Error");
    var nombreValue = nombreInput.value.trim();

    if (nombreValue.length < 1) {
        nombreInput.style.borderColor = "red";
        nombreError.textContent = "El nombre debe tener más caracteres.";
    } else if (nombreValue.length > 100) {
        nombreInput.style.borderColor = "red";
        nombreError.textContent = "El nombre no puede tener más de 100 caracteres.";
    } else {
        nombreInput.style.borderColor = "";
        nombreError.textContent = "";
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

function validateCelular() {
    var celularInput = document.getElementById("celular");
    var celularError = document.getElementById("celularError");
    var celularPattern = /^3\d{9}$/;

    if (!celularPattern.test(celularInput.value)) {
        celularInput.style.borderColor = "red";
        celularError.textContent = "El número de celular no es válido.";
    } else {
        celularInput.style.borderColor = "";
        celularError.textContent = "";
    }
}

function validateTelefono() {
    var telefonoInput = document.getElementById("telefono");
    var telefonoError = document.getElementById("telefonoError");
    var telefonoPattern = /^60\d{8}$/;

    var telefonoValue = telefonoInput.value.trim();

    if (telefonoValue.length < 1) {
        telefonoInput.style.borderColor = "";
        telefonoError.textContent = "";
    } else if (!telefonoPattern.test(telefonoValue) || !/^\d+$/.test(telefonoValue) || telefonoValue.length !== 10) {
        telefonoInput.style.borderColor = "red";
        telefonoError.textContent = "El número de teléfono no es válido. Código de área + número de teléfono fijo.";
    } else {
        telefonoInput.style.borderColor = "";
        telefonoError.textContent = "";
    }
}

async function registerLab(labData) {
    try {
        const response = await fetch('http://localhost:8080/api/laboratorios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_laboratorio: labData.nombre_laboratorio,
                correo: labData.correo,
                telefono: labData.telefono,
                celular: labData.celular,
                estado_laboratorio: labData.estado_laboratorio
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Registro exitoso!',
            }).then(() => {
                // window.location.href = '/laboratorios';
            });
        } else {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.errors[0].msg || 'Error desconocido';
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
        var submitButton = document.querySelector(".submit-button");
        submitButton.disabled = false;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form_labs").addEventListener("submit", function (event) {
        event.preventDefault();
        validateForm();
    });
});

async function updateLab(labData) {
    try {
        const response = await fetch(`/api/laboratorios/${labData.id_laboratorio}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(labData)
        });

        if (response.ok) {
            const responseData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Registro exitoso!',
            }).then(() => {
                // window.location.href = '/laboratorios';
            });
        } else {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.errors[0].msg || 'Error desconocido';
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
        var submitButton = document.querySelector(".submit-button");
        submitButton.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form_labs").addEventListener("submit", function (event) {
        event.preventDefault();
        // validateForm();
    });
});

var verLabs = document.getElementById("verLabs");
verLabs.addEventListener("click", function () {
    mostrarLaboratorios();
});

const mostrarLaboratorios = async () => {
    try {
        const laboratorios = await getLaboratorios();

        const table = document.getElementById("tablaLaboratorios");

        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        laboratorios.forEach(lab => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><button type="button" class="btn btn-outline-success" onclick="TraerLab(${lab.id_laboratorio})">${lab.id_laboratorio}</button></td>
                <td>${lab.nombre_laboratorio}</td>
            `;
            table.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching laboratorios', error);
    }
};

async function getLaboratorios() {
    try {
        const response = await fetch('/api/laboratorios');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching laboratorios', error);
        throw error;
    }
}

async function labExists(id) {
    try {
        const response = await fetch(`/api/laboratorios/${id}`);
        return response.ok;
    } catch (error) {
        console.error(`Error fetching laboratorio with ID ${id}`, error);
        return false;
    }
}

async function TraerLab(id) {
    try {
        const laboratorio = await getLaboratorioPorId(id);

        document.getElementById("nit").value = laboratorio.id_laboratorio;
        document.getElementById("nombre_laboratorio").value = laboratorio.nombre_laboratorio;
        document.getElementById("correo").value = laboratorio.correo;
        document.getElementById("celular").value = laboratorio.celular;
        document.getElementById("telefono").value = laboratorio.telefono;
        document.getElementById("estado").value = laboratorio.estado_laboratorio;
        document.getElementById("closeModal").click();
    } catch (error) {
        console.error('Error al obtener información del laboratorio', error);
    }
}

async function getLaboratorioPorId(id) {
    try {
        const response = await fetch(`/api/laboratorios/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching laboratorio with ID ${id}`, error);
        throw error;
    }
}
