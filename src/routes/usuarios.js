import { Router } from 'express';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut, getUsuario } from '../controllers/usuarios.js';
const router = Router();


router.get('/',usuariosGet);//Mandar la referencia
router.get('/:id_usuario',    getUsuario );


router.put('/:id_usuario', usuariosPut);

router.post('/', usuariosPost);

router.delete('/:id_usuario',usuariosDelete );

router.patch('/', usuariosPatch);


export default router;