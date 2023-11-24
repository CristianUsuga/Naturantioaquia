const validarPrecioNoNegativo = (value) => {
    if (value < 0) {
        throw new Error('El valor no puede ser negativo.');
    }

    return true;
};


export {validarPrecioNoNegativo}