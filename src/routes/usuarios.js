import { Router } from 'express';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut, getUsuario } from '../controllers/usuarios.js';
const router = Router();
import { check } from 'express-validator'; 

import { validarCampos,validarFechaNacimiento } from "../middlewares/index.js";

router.get('/', usuariosGet);//Mandar la referencia
router.get('/:id_usuario', getUsuario);


router.put('/:id_usuario', usuariosPut);

router.post('/', [
    check('id_usuario').isNumeric().isLength({ min: 7, max: 10 }),
    check('nombre').notEmpty(),
    check('primer_apellido').notEmpty(),
    check('correo').isEmail(),
    check('contraseña').notEmpty().isLength({ min: 8 }).matches(/^(?=.*[A-Z])(?=.*\d)/),
    check('fecha_nacimiento').notEmpty().custom(validarFechaNacimiento),
    check('celular').notEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    check('telefono').notEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    check('rol_de_usuario').notEmpty(),
    check('tipo_de_documento').notEmpty(),
    check('estado_de_usuario').notEmpty(),
    check('sexo_de_usuario').notEmpty(),
    validarCampos,
    
], usuariosPost);

router.delete('/:id_usuario', usuariosDelete);

router.patch('/', usuariosPatch);


export default router;