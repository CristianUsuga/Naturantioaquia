// rutas/categoriasProductos.js
import { Router } from 'express';
import {
    categoriasProductosGet,
    getCategoriaProducto,
    categoriasProductosPost,
    categoriaProductoDelete,
    categoriasProductosPut,
    getProductosPorCategoria,
    getCategoriasPorProducto, 
} from '../controllers/categoriasProductos.js';

const router = Router();


router.get('/', categoriasProductosGet);


router.get('/:id_categoria/:id_producto', getCategoriaProducto);

router.post('/', categoriasProductosPost);


router.delete('/:id_categoria/:id_producto', categoriaProductoDelete);


router.put('/:id_categoria/:id_producto', categoriasProductosPut);

// Obtener todos los productos según una categoría
router.get('/categoria/:id_categoria/productos', getProductosPorCategoria);

// Nueva ruta para obtener categorías por producto
router.get('/producto/:id_producto/categorias', getCategoriasPorProducto);

export default router;
