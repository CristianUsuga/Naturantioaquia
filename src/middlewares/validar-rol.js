import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/usuario.js';

dotenv.config();

async function soloAdmin(req, res, next) {
    try {
        const logueado = await revisarCookie(req);
        const usuario = await usuarioToken(req);
        if (logueado === true && usuario.perfil_usuario  === 1 ) {
            return next();
        } else {
            return res.redirect("/login");
        }
    } catch (error) {
        console.error("Error al revisar la cookie:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function soloPublico(req, res, next) {
    try {
        const logueado = await revisarCookie(req);

        if (logueado === false) {
            return next();
        } else {
            const usuario = await usuarioToken(req);
            console.log("solo publico: ", usuario.dataValues)
            if (usuario.perfil_usuario === 1) {
                return res.redirect("/admin");
            } else if (usuario.perfil_usuario === 2) {
                return res.redirect("/logeado");
            } else {
                // Otros roles, manejar según sea necesario
                return res.redirect("/login");
            }
        }
    } catch (error) {
        console.error("Error al revisar la cookie:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}


//Heramientas

async function revisarCookie(req) {

    try {

        if (!req.headers.cookie) {
            return false; // No hay cookies, consideramos que el usuario no está logueado
        }

        const cookieToken = req.headers.cookie.split(" ; ").find(cookie => cookie.startsWith("token=")).slice(6);
        console.log("Cookie Token:", cookieToken)

        const decodificada = jwt.verify(cookieToken, process.env.JWT_SECRET);
        // console.log(decodificada)
        const usuario = await Usuario.findByPk(decodificada.usuario);
        console.log("Usuario: ", usuario.dataValues)

        if (!usuario) {
            return false;
        }
        return true;

    } catch {
        return false;
    }
}

async function usuarioToken(req) {
    try {
        const cookieToken = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("token=")).slice(6);
        const decodificada = jwt.verify(cookieToken, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decodificada.usuario);
        if (usuario) {
            return usuario;
        } else {
            console.log("error en armado de usuario");
        }
    } catch {
        return { usuario: null };
    }
}

export const methods = {
    soloAdmin,
    soloPublico,
};
