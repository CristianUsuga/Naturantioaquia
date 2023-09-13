import express from 'express';
import cors from 'cors';
import routerUser  from '../routes/usuarios.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths ={usuarios: '/api/usuarios'} ;

        // Middlewares
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
        
        // Manejo de errores global
        this.app.use(this.errorHandler);
    }

    routes() {
        this.app.use(this.paths.usuarios, routerUser);
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
