// middlewares/validacionesPersonalizadas.js
const validarCelular = (value) => {
    if (!value.startsWith('3')) {
        throw new Error('El número de celular debe comenzar con "3".');
    }
    return true;
};

const validarTelefono = (value) => {
    if (!value.startsWith('60')) {
        throw new Error('El número de teléfono debe comenzar con "60".');
    }
    return true;
};

export { validarCelular, validarTelefono };
