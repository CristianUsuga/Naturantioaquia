// middlewares/validacionesPersonalizadas.js
import { check, validationResult } from "express-validator";

const validarCelular = (value) => {
    if (!value.startsWith('3')) {
        throw new Error('El número de celular debe comenzar con "3".');
    }
    return true;
};

const validarTelefono = (value, { req, res }) => {
    if (!value || value.length === 0) {
        return true;
    }

    if (isNaN(value)) {
        throw new Error('El número de teléfono debe ser un valor numérico.');
    }

    if (value.length !== 10 || !value.startsWith('60') || !/^\d+$/.test(value)) {
        console.error('Valor de telefono:', value);
        throw new Error('El número de teléfono debe tener 10 dígitos y empezar con "60".');
    }

    return true;
};


export { validarCelular, validarTelefono };
