import { Router } from 'express';

import { 
  laboratoriosGet, 
  laboratoriosPost,
  laboratoriosPut,
  laboratoriosDelete,
  getLaboratorio
} from '../controllers/laboratorios.js';

const router = Router();

import { check } from 'express-validator';
import { validarCampos, validarCelular, validarTelefono } from '../middlewares/index.js';

router.get('/', laboratoriosGet);

router.get('/:id_laboratorio', getLaboratorio);

router.post('/', [
  check('id_laboratorio').isNumeric(),
  check('nombre_laboratorio').notEmpty(),
  check('correo').isEmail(), 
  check('telefono').optional().custom(validarTelefono),
  check('celular').notEmpty().isNumeric().isLength({min: 10, max: 10}).custom(validarCelular),
  check('estado_laboratorio').notEmpty().isNumeric(),
  validarCampos
], laboratoriosPost);

router.put('/:id_laboratorio', laboratoriosPut); 

router.delete('/:id_laboratorio', laboratoriosDelete);

export default router;