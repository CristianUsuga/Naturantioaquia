// middlewares/validacionesPersonalizadas.js
import { check, validationResult } from "express-validator";

const validarCelular = (value) => {
    if (!value.startsWith('3')) {
        throw new Error('El número de celular debe comenzar con "3".');
    }
    return true;
};

const validarTelefono = (value, { req, res }) => {
    // Verifica si el campo 'telefono' está presente en la solicitud y no es null
    if (!value || value.length === 0) {
        return true; // Considera esto como válido si el campo no está presente o tiene longitud cero
    }

    // Verifica si 'telefono' es un número
    if (isNaN(value)) {
        res.status(400).json({
            errors: [{
                type: 'field',
                msg: 'El número de teléfono debe ser un valor numérico.',
                path: 'telefono',
                location: 'body'
            }]
        });
        return false;
    }

    // Verifica la longitud, si comienza con '60' y si solo contiene dígitos
    if (value.length !== 10 || !value.startsWith('60') || !/^\d+$/.test(value)) {
        console.error('Valor de telefono:', value); // Imprime el valor actual de 'telefono'
        res.status(400).json({
            errors: [{
                type: 'field',
                msg: 'El número de teléfono debe tener 10 dígitos y empezar con "60".',
                path: 'telefono',
                location: 'body'
            }]
        });
        return false;
    }

    return true;
};



export { validarCelular, validarTelefono };
