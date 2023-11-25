import { Router } from 'express';
import {  } from '../controllers/categorias.js';
const router = Router();
import { check } from 'express-validator';

import { } from "../middlewares/index.js";

router.get('/', productosGet);
router.get('/:id_categoria', getProducto);


router.put('/:id_categoria',);

router.post('/', [
    check('nombre_producto').notEmpty().withMessage('El nombre del producto es obligatorio.'),
    check('descripcion_producto').notEmpty().withMessage('La descripción del producto es obligatoria.'),
    check('precio').isNumeric().withMessage('El precio debe ser un número.').custom(validarPrecioNoNegativo),
    check('STOCK_MINIMO').isNumeric().notEmpty().withMessage('Debe ingresar un número para el stock de reservas.').custom(validarPrecioNoNegativo),
    check('STOCK_MAXIMO').isNumeric().notEmpty().withMessage('Debe ingresar un número para el stock máximo').custom(validarPrecioNoNegativo),
    check('stock').isNumeric().notEmpty().custom(validarStock).custom(validarPrecioNoNegativo),
    validarCampos, 
  ], productosPost);
  
router.delete('/:id_categoria', productoDelete);

router.put('/:p_id_categoria', ProductosPut);

router.patch('/', productosPatch);


export default router;