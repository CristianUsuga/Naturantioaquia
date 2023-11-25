// Importar express y express-validator
import { Router } from 'express';
import { check } from 'express-validator';

// Importar los controladores y middleware
import { 
  transportistasGet, 
  transportistasPost,
  transportistasPut,
  transportistasDelete,
  getTransportista
} from '../controllers/transportistas.js';

import { validarCampos, validarCelular, validarTelefono } from '../middlewares/index.js';

const router = Router();

// Rutas para transportistas
router.get('/', transportistasGet);

router.get('/:id_transportista', getTransportista);

router.post('/', [
  check('nombre').notEmpty().isLength({ max: 150 }),
  check('celular').notEmpty().isNumeric().isLength({ min: 10, max: 10 }).custom(validarCelular),
  check('telefono').optional().isNumeric().isLength({ min: 7, max: 10 }).custom(validarTelefono),
  check('correo').isEmail().isLength({ max: 100 }),
  check('tipo').isNumeric(),
  validarCampos
], transportistasPost);

router.put('/:id_transportista', transportistasPut);

router.delete('/:id_transportista', transportistasDelete);

export default router;
