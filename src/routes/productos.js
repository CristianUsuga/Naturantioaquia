import { Router } from 'express';
import { getProducto, productoDelete, productosGet, productosPatch, productosPost } from '../controllers/productos.js';
const router = Router();
import { check } from 'express-validator'; 

import { } from "../middlewares/index.js";

router.get('/', productosGet);//Mandar la referencia
router.get('/:id_producto', getProducto);


router.put('/:id_producto', );

router.post('/', productosPost);

router.delete('/:id_usuario', productoDelete);

router.patch('/', productosPatch);


export default router;