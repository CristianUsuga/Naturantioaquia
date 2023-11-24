import { validationResult } from 'express-validator';

const validarStock = (value, { req }) => {
    const stockMinimo = req.body.STOCK_MINIMO;

    if (value < stockMinimo) {
        throw new Error('La cantidad de stock no puede ser menor que el stock mínimo.');
    }

    return true;
};

export { validarStock };
