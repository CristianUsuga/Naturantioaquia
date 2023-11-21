import { Router } from 'express';
import { loginPost } from '../controllers/login.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/index.js';

const router = Router();

router.post('/', [
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],loginPost);



export default router;