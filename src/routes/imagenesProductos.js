import { Router } from 'express';
import {
    imagenesProductosGet,
    getImagenProducto,
    imagenesProductosPost,
    imagenProductoDelete,
    imagenesProductosPut,
    getImagenesPorProducto,
} from '../controllers/imagenesProductos.js';

const router = Router();

router.get('/', imagenesProductosGet);
router.get('/:id_imagen', getImagenProducto);
router.post('/', imagenesProductosPost);
router.delete('/:id_imagen', imagenProductoDelete);
router.put('/:id_imagen', imagenesProductosPut);
router.get('/producto/:id_producto', getImagenesPorProducto);
export default router;
