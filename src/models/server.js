import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import routerUser from '../routes/usuarios.js';
import laboratoriosRouter from '../routes/laboratorios.js';
import transportistasRouter from '../routes/transportistas.js';
import db from '../../db/connection.js';
import loginRouter from '../routes/login.js';
import productosRauter from "../routes/productos.js";
import { methods as validarRol } from "../middlewares/validar-rol.js";
import routerCategorias from '../routes/categorias.js';
import routerCategoriasProductos from '../routes/categoriasProductos.js';
import routerImagenesProductos from '../routes/imagenesProductos.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.__dirname = path.dirname(fileURLToPath(import.meta.url));

        this.paths = {
            imagenesAPI : '/api/imagenes',
            categoriasProductosAPI: '/api/categoriasProductos',
            categoriasAPI: '/api/categorias',
            productosAPI: '/api/productos',
            usuarios: '/api/usuarios',
            login: '/login',
            registro: '/registroUsuario',
            ingresar: '/api/login',
            admin: '/admin',
            log: '/logeado',
            about: '/about',
            contact: '/contact',
            services: '/services',
            laboratorios: '/api/laboratorios',
            laboratorio: '/laboratorio',
            transportistas: '/api/transportistas',
            transportista: '/transportista'
        };

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        // Rutas de la aplicación
        this.routes();

        // Motor de plantillas (EJS en este caso)
        this.app.set('view engine', 'ejs');
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
        // Definir las rutas API
        this.app.use(this.paths.usuarios, routerUser);
        this.app.use(this.paths.ingresar, loginRouter);
        this.app.use(this.paths.laboratorios, laboratoriosRouter);
        this.app.use(this.paths.productosAPI, productosRauter);
        this.app.use(this.paths.transportistas, transportistasRouter);
        this.app.use(this.paths.categoriasAPI, routerCategorias);
        this.app.use(this.paths.categoriasProductosAPI, routerCategoriasProductos);
        this.app.use(this.paths.imagenesAPI, routerImagenesProductos);

        //Pages
        this.app.get(this.paths.login, validarRol.soloPublico, (req, res) => res.render(path.join(this.__dirname, '/../pages/login.ejs')));
        this.app.get(this.paths.registro, validarRol.soloPublico, (req, res) => res.render(path.join(this.__dirname, '/../pages/register.ejs')));
        this.app.get(this.paths.about, validarRol.soloPublico, (req, res) => res.render(path.join(this.__dirname, '/../pages/about.ejs')));
        this.app.get(this.paths.contact, validarRol.soloPublico, (req, res) => res.render(path.join(this.__dirname, '/../pages/contact.ejs')));
        this.app.get(this.paths.services, validarRol.soloPublico, (req, res) => res.render(path.join(this.__dirname, '/../pages/services.ejs')));

        this.app.get(this.paths.admin, validarRol.soloAdmin, (req, res) => res.render(path.join(this.__dirname, '/../pages/admin.ejs')));
        this.app.get(this.paths.laboratorio, validarRol.soloAdmin, (req, res) => res.render(path.join(this.__dirname, '/../pages/forms/laboratorios.ejs')));
        this.app.get(this.paths.transportista, validarRol.soloAdmin, (req, res) => res.render(path.join(this.__dirname, '/../pages/forms/transportistas.ejs')));
        // TODO: agregar validar rol después a logeado
        this.app.get(this.paths.log, (req, res) => res.render(path.join(this.__dirname, '/../pages/logeado.ejs')));

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
