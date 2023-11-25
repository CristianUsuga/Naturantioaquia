import { Router } from 'express';
import { categoriaDelete, categoriasGet, categoriasPost, categoriasPut, getCategoria } from '../controllers/categorias.js';
const router = Router();
import { check } from 'express-validator';

import { } from "../middlewares/index.js";

router.get('/', categoriasGet);


router.get('/:id_categoria', getCategoria);

router.post('/', categoriasPost);

router.delete('/:id_categoria', categoriaDelete);

router.put('/:p_id_categoria', categoriasPut);



export default router;