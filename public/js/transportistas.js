

async function validateAndRegister() {
    var submitButton = document.querySelector(".submit-button");
    submitButton.disabled = true;

    var errorMessages = document.getElementsByClassName("error-message");

    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    validateNombre("nombre");
    validateCorreo("correo");
    validateCelular("celular");
    validateTelefono("telefono");

    for (var i = 0; i < errorMessages.length; i++) {
        if (errorMessages[i].textContent !== "") {
            submitButton.disabled = false;
            return;
        }
    }
    var transData = {
        "id_transportistaEdit": document.getElementById("id_transportistaEdit").value,
        "nombre": document.getElementById("nombreEdit").value,
        "correo": document.getElementById("correoEdit").value,
        "telefono": document.getElementById("telefonoEdit").value !== "" ? document.getElementById("telefono").value : null,
        "celular": document.getElementById("celularEdit").value,
        "tipo": document.getElementById("tipoEdit").value
    };
        
    }

    async function validateAndUpdate() {
        var submitButton = document.querySelector(".submit-button1");
        submitButton.disabled = true;
    
        var errorMessages = document.getElementsByClassName("error-message");
    
        for (var i = 0; i < errorMessages.length; i++) {
            errorMessages[i].textContent = "";
        }
    
        validateNombre("nombreEdit");
        validateCorreo("correoEdit");
        validateCelular("celularEdit");
        validateTelefono("telefonoEdit");
    
        for (var i = 0; i < errorMessages.length; i++) {
            if (errorMessages[i].textContent !== "") {
                submitButton.disabled = false;
                return;
            }
        }
        var transData = {
            "id_transportista": document.getElementById("id_transportistaEdit").value,
            "nombre": document.getElementById("nombreEdit").value,
            "correo": document.getElementById("correoEdit").value,
            "telefono": document.getElementById("telefonoEdit").value !== "" ? document.getElementById("telefonoEdit").value : null,
            "celular": document.getElementById("celularEdit").value,
            "tipo": document.getElementById("tipoEdit").value
        };
            updateTrans(transData);
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

async function registerTrans(transData) {
    try {
        const response = await fetch('http://localhost:8080/api/transportistas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: transData.nombre,
                correo: transData.correo,
                telefono: transData.telefono,
                celular: transData.celular,
                tipo: transData.tipo
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
    document.getElementById("form_transportistas").addEventListener("submit", function (event) {
        event.preventDefault();
        //validateForm();
    });
});

async function updateTrans(transData) {
    try {
        const response = await fetch(`/api/transportistas/${transData.id_transportista}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transData)
        });

        if (response.ok) {
            const responseData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Registro exitoso!',
            }).then(() => {
                document.getElementById("form_edit_transportistas").reset();
                document.getElementById("closeModalEdit").click();
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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form_transportistas").addEventListener("submit", function (event) {
        event.preventDefault();
        // validateForm();s

    });
});

var verTrans = document.getElementById("verTransportistas");
verTrans.addEventListener("click", function () {
    mostrarTransportistas();
});

const mostrarTransportistas = async () => {
    try {
        const transportistas = await getTransportistas();

        const table = document.getElementById("tablaTransportistas");

        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        transportistas.forEach(lab => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td><button id="editarButton" class="btn btn-primary" onclick="TraerEditTrans(${lab.id_transportista})"  data-bs-toggle="modal"
                data-bs-target="#exampleEditar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg></button>
                <button id="eliminarButton" class="btn btn-danger" onclick="deleteTrans(${lab.id_transportista})" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg></button>
                <button type="button" class="btn btn-outline-success" onclick="TraerTrans(${lab.id_transportista})">${lab.id_transportista}</button></td>
                <td>${lab.nombre}</td>
            `;
            table.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching transportistas', error);
    }
};

async function deleteTrans(idTransportista) {
    try {
        const response = await fetch(`/api/transportistas/${idTransportista}`, {
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


async function TraerEditTrans(id) {
    try {
        const transportista = await getTransportistaPorId(id);

        document.getElementById("id_transportistaEdit").value = transportista.id_transportista;
        document.getElementById("nombreEdit").value = transportista.nombre;
        document.getElementById("correoEdit").value = transportista.correo;
        document.getElementById("celularEdit").value = transportista.celular;
        document.getElementById("telefonoEdit").value = transportista.telefono;
        document.getElementById("tipoEdit").value = transportista.tipo;
        document.getElementById("closeModal").click();
    } catch (error) {
        console.error('Error al obtener información del transportista', error);
    }
}

async function getTransportistas() {
    try {
        const response = await fetch('/api/transportistas');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transportistas', error);
        throw error;
    }
}

async function transExists(id) {
    try {
        const response = await fetch(`/api/transportistas/${id}`);
        return response.ok;
    } catch (error) {
        console.error(`Error fetching transportista with ID ${id}`, error);
        return false;
    }
}

async function TraerTrans(id) {
    try {
        const transportista = await getTransportistaPorId(id);

        document.getElementById("id_transportista").value = transportista.id_transportista;
        document.getElementById("nombre").value = transportista.nombre;
        document.getElementById("correo").value = transportista.correo;
        document.getElementById("celular").value = transportista.celular;
        document.getElementById("telefono").value = transportista.telefono;
        document.getElementById("tipo").value = transportista.tipo;
        document.getElementById("closeModal").click();
    } catch (error) {
        console.error('Error al obtener información del transportista', error);
    }
}

async function getTransportistaPorId(id) {
    try {
        const response = await fetch(`/api/transportistas/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching laboratorio with ID ${id}`, error);
        throw error;
    }
}
