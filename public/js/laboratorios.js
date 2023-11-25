

async function validateAndRegister() {
    var submitButton = document.querySelector(".submit-button");
    submitButton.disabled = true;

    var errorMessages = document.getElementsByClassName("error-message");

    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    validateNombre("nombre_laboratorio");
    validateCorreo("correo");
    validateCelular("celular");
    validateTelefono("telefono");

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

async function validateAndRegister() {
    var submitButton = document.querySelector(".submit-button1");
    submitButton.disabled = true;

    var errorMessages = document.getElementsByClassName("error-message");

    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    validateNombre("nombre_laboratorioEditar");
    validateCorreo("correoEditar");
    validateCelular("celularEditar");
    validateTelefono("telefonoEditar");

    for (var i = 0; i < errorMessages.length; i++) {
        if (errorMessages[i].textContent !== "") {
            submitButton.disabled = false;
            return;
        }
    }
    var labData = {
        "id_laboratorio": document.getElementById("id_laboratorioEditar").value,
        "nombre_laboratorio": document.getElementById("nombre_laboratorioEditar").value,
        "correo": document.getElementById("correoEditar").value,
        "telefono": document.getElementById("telefonoEditar").value !== "" ? document.getElementById("telefonoEditar").value : null,
        "celular": document.getElementById("celularEditar").value,
        "estado_laboratorio": document.getElementById("estadoEditar").value
    };
    updateLab(labData);
    
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

function validateCorreo(inputId) {
    var correoInput = document.getElementById(inputId);
    var correoError = document.getElementById(inputId+"Error");
    var correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!correoPattern.test(correoInput.value)) {
        correoInput.style.borderColor = "red";
        correoError.textContent = "Por favor, ingrese un correo válido.";
    } else {
        correoInput.style.borderColor = "";
        correoError.textContent = "";
    }
}

function validateCelular(inputId) {
    var celularInput = document.getElementById(inputId);
    var celularError = document.getElementById(inputId+"Error");
    var celularPattern = /^3\d{9}$/;

    if (!celularPattern.test(celularInput.value)) {
        celularInput.style.borderColor = "red";
        celularError.textContent = "El número de celular no es válido.";
    } else {
        celularInput.style.borderColor = "";
        celularError.textContent = "";
    }
}

function validateTelefono(inputId) {
    var telefonoInput = document.getElementById(inputId);
    var telefonoError = document.getElementById(inputId+"Error");
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
        var submitButton = document.querySelector(".submit-button1");
        submitButton.disabled = false;
    }
}

async function deleteLab(idLab) {
    try {
        const response = await fetch(`/api/laboratorios/${idLab}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registro eliminado',
                text: '¡Registro eliminado!',
            }).then(() => {
                mostrarTransportistas();
            });
        } else {
            const errorMessage = 'Ha ocurrido un error al eliminar el registro.';
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
            <td><button id="editarButton" class="btn btn-primary" onclick="TraerEditLab(${lab.id_laboratorio})"  data-bs-toggle="modal"
            data-bs-target="#exampleEditar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
          </svg></button>
            <button id="eliminarButton" class="btn btn-danger" onclick="deleteLab(${lab.id_laboratorio})" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
          </svg></button>
          <button type="button" class="btn btn-outline-success" onclick="TraerLab(${lab.id_laboratorio})">${lab.id_laboratorio}</button></td>
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

async function TraerEditLab(id) {
    try {
        const laboratorio = await getLaboratorioPorId(id);
        document.getElementById("id_laboratorioEditar").value = laboratorio.id_laboratorio;
        document.getElementById("nombre_laboratorioEditar").value = laboratorio.nombre_laboratorio;
        document.getElementById("correoEditar").value = laboratorio.correo;
        document.getElementById("celularEditar").value = laboratorio.celular;
        document.getElementById("telefonoEditar").value = laboratorio.telefono;
        document.getElementById("estadoEditar").value = laboratorio.estado_laboratorio;
        document.getElementById("closeModalEdit").click();
    } catch (error) {
        console.error('Error al obtener información del laboratorio', error);
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
