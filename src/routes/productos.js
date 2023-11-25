import { Router } from 'express';
import { ProductosPut, getProducto, productoDelete, productosGet, productosPatch, productosPost } from '../controllers/productos.js';
const router = Router();
import { check } from 'express-validator';

import { validarCampos, validarStock, validarPrecioNoNegativo } from "../middlewares/index.js";

router.get('/', productosGet);//Mandar la referencia
router.get('/:id_producto', getProducto);

router.post('/', [
    check('nombre_producto').notEmpty().withMessage('El nombre del producto es obligatorio.'),
    check('descripcion_producto').notEmpty().withMessage('La descripción del producto es obligatoria.'),
    check('precio').isNumeric().withMessage('El precio debe ser un número.').custom(validarPrecioNoNegativo),
    check('STOCK_MINIMO').isNumeric().notEmpty().withMessage('Debe ingresar un número para el stock de reservas.').custom(validarPrecioNoNegativo),
    check('STOCK_MAXIMO').isNumeric().notEmpty().withMessage('Debe ingresar un número para el stock máximo').custom(validarPrecioNoNegativo),
    check('stock').isNumeric().notEmpty().custom(validarStock).custom(validarPrecioNoNegativo),
    validarCampos, 
  ], productosPost);
  
router.delete('/:id_producto', productoDelete);

router.put('/:p_id_producto', ProductosPut);

router.patch('/', productosPatch);


export default router;