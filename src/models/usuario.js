import { DataTypes } from "sequelize";
import db from "../../db/connection.js";

const Usuario = db.define('Usuario', {

    id_usuario: {
        type: DataTypes.INTEGER, // Cambiar de DataTypes.NUMBER a DataTypes.INTEGER
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    primer_apellido: {
        type: DataTypes.STRING
    },
    segundo_apellido: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    celular: {
        type: DataTypes.INTEGER
    },
    telefono: {
        type: DataTypes.INTEGER
    },
    rol_de_usuario: {
        type: DataTypes.INTEGER
    },
    tipo_de_documento: {
        type: DataTypes.INTEGER
    },
    estado_de_usuario: {
        type: DataTypes.INTEGER
    },
    sexo_de_usuario: {
        type: DataTypes.INTEGER
    },
});

export default Usuario;
