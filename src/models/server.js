import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser';

import routerUser from '../routes/usuarios.js';
import db from '../../db/connection.js';
import loginRouter from '../routes/login.js';
import { methods as validarRol } from "../middlewares/validar-rol.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.__dirname = path.dirname(fileURLToPath(import.meta.url));

        this.paths = {
            usuarios: '/api/usuarios', login: '/login', registro: '/registroUsuario', ingresar: '/api/login', admin:'/admin', log:'/logeado'
        };

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
        

    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Conectado - Database');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        this.app.use(cookieParser());
        // Manejo de errores global
        this.app.use(this.errorHandler);
    }

    

    routes() {
        this.app.use(this.paths.usuarios, routerUser);
        this.app.use(this.paths.ingresar, loginRouter);

        //Pages
        this.app.get(this.paths.login,validarRol.soloPublico, (req, res) => res.sendFile(path.join(this.__dirname, '/../pages/login.html')));
        this.app.get(this.paths.registro,validarRol.soloPublico, (req, res) => res.sendFile(path.join(this.__dirname, '/../pages/register.html')));
        this.app.get(this.paths.admin,validarRol.soloAdmin, (req, res) => res.sendFile(path.join(this.__dirname, '/../pages/admin.html')));
        //TODO: agregar validar rol desues a logeado
        this.app.get(this.paths.log, (req, res) => res.sendFile(path.join(this.__dirname, '/../pages/logeado.html'))); 
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }

    errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export { Server };
