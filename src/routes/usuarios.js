import { Router } from 'express';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut, getUsuario } from '../controllers/usuarios.js';
const router = Router();
import { check } from 'express-validator'; 

import { validarCampos,validarCelular,validarFechaNacimiento, validarTelefono } from "../middlewares/index.js";

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
    check('celular').notEmpty().isNumeric().isLength({ min: 10, max: 10 }).custom(validarCelular),
    check('telefono').optional().custom(validarTelefono), 
    check('perfil_usuario').notEmpty(),
    check('tipo_documento').notEmpty(),
    check('estado_usuario').notEmpty(),
    check('sexo_usuario').notEmpty(),
    validarCampos,
    
], usuariosPost);

router.delete('/:id_usuario', usuariosDelete);

router.patch('/', usuariosPatch);


export default router;