function validateForm() {
    // Deshabilita el botón de "Enviar" para evitar envíos múltiples
    var submitButton = document.querySelector(".submit-button");
    submitButton.disabled = true;

    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    validateNombre('nombre_laboratorio');
    validateCorreo();
    validateCelular();
    validateTelefono();

    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        if (errorMessages[i].textContent !== "") {
            // Habilita el botón de "Enviar" nuevamente si hay errores
            submitButton.disabled = false;
            return false;
        }
    }

    var formData = new FormData(document.getElementById("form_labs"));
console.log(formData);
    var labData = {
        "id_laboratorio": formData.get("nit"),
        "nombre_laboratorio": formData.get("nombre_laboratorio"),
        "correo": formData.get("correo"),
        "celular": formData.get("celular"),
        "telefono": formData.get("telefono") !== "" ? formData.get("telefono") : null,
        "estado_laboratorio": formData.get("estado")
    };
    if(getLaboratorioPorId(formData.get("nit")).length>0)
    {
        registerLab(labData);
    }else{
        updateLab(labData);
    }
}




function validateNombre(inputId) {
    var nombreInput = document.getElementById(inputId);
    var nombreError = document.getElementById(inputId + "Error");
    var nombreValue = nombreInput.value.trim();

    if (nombreValue.length < 1) {
        nombreInput.style.borderColor = "red";
        nombreError.textContent = "El nombre debe tener  más caracteres.";
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

async function registerLab(labData) {
    try {
        const response = await fetch('http://localhost:8080/api/laboratorios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(labData)
        });
console.log(labData);
        if (response.ok) {
            const responseData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Registro exitoso!',
            }).then(() => {
                //window.location.href = '/laboratorios';
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
                //window.location.href = '/laboratorios';
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
    document.getElementById("form_labs").addEventListener("submit", function (event) {
        event.preventDefault();
        //validateForm();
    });

   /* var maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 14);
    var formattedMaxDate = maxDate.toISOString().split('T')[0];
    document.getElementById("fechaNacimiento").setAttribute("max", formattedMaxDate);
*/
});


var verLabs = document.getElementById("verLabs");
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

verLabs.addEventListener("click", function() {
    mostrarLaboratorios();
});

const mostrarLaboratorios = async () => {

    try {
      const laboratorios = await getLaboratorios(); 
  
      // Obtener elemento contenedor de la tabla
      const table = document.getElementById("tablaLaboratorios");
  
      while (table.firstChild) {
        table.removeChild(table.firstChild);
        }
      laboratorios.forEach(lab => {
        
        // Crear fila de tabla
        const row = document.createElement("tr");
  
        // Insertar datos en celdas  
        row.innerHTML = `
          <td><button type="button" class="btn btn-outline-success" onclick="TraerLab(${lab.id_laboratorio})">${lab.id_laboratorio}</button></td>
          <td>${lab.nombre_laboratorio}</td>
        `;
  
        // Agregar fila a la tabla  
        table.appendChild(row);
  
      });
  
    } catch (error) {
  
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
  async function TraerLab(id){
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
        // Manejo de errores
    }
  }