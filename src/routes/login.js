import { Router } from 'express';
import { loginPost } from '../controllers/login.js';

const router = Router();

//TODO: Hacer las validaciones de los datos en express-validator
router.post('/', loginPost);



export default router;