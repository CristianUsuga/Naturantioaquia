const mensajeError = document.querySelector('.error');

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.children.email.value;
    const password = e.target.children.password.value;

    if (!email || !password) {
        mensajeError.textContent = "Por favor, ingrese el correo electrónico y la contraseña.";
        mensajeError.classList.remove("escondido");
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
 
        if (res.ok) {
            const resJson = await res.json();
            if (resJson.redirect) {
                window.location.href = resJson.redirect;
            }
        } else {
            const errorResponse = await res.json();
            mensajeError.textContent = errorResponse.message;
            mensajeError.classList.remove("escondido");
        }
    } catch (error) {
        mensajeError.textContent = "Error al conectar con el servidor";
        mensajeError.classList.remove("escondido");
    }
});
