import { response, request } from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const loginPost = async (req = request, res = response) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' });
    }

    try {
        // Buscar un usuario con el campo "nombre" igual al valor de "email"
        const usuario = await Usuario.findOne({ where: { correo: email } });

        if (usuario) {
            // El usuario existe en la base de datos, puedes continuar con la autenticación
            const loginCorrecto = await bcrypt.compare(password, usuario.contraseña);
            console.log(loginCorrecto);
            if (loginCorrecto) {
                const token = jwt.sign(
                    { usuario: usuario.id_usuario },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION }
                );

                const cookieOption = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                    path: '/'
                };
                res.cookie('token', token, cookieOption);

                // Redirección basada en el rol del usuario
                if (usuario.rol_de_usuario === 1) {
                    return res.status(200).send({
                        status: 'Éxito',
                        message: 'Usuario autenticado correctamente',
                        redirect: '/admin'
                    });
                } else {
                    return res.status(200).send({
                        status: 'Éxito',
                        message: 'Usuario autenticado correctamente',
                        redirect: '/logeado'
                    });
                }
            } else {
                return res.status(401).send({ status: 'Error', message: 'Credenciales inválidas' });
            }
        } else {
            return res.status(404).send({ status: 'Error', message: 'Error durante el login.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'Error', message: 'Error en el servidor' });
    }
};

export { loginPost };
