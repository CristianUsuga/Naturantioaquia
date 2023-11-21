// usuario.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";

const Usuario = db.define('Usuario', {
    id_usuario: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    primer_apellido: {
        type: DataTypes.STRING(50),
    },
    segundo_apellido: {
        type: DataTypes.STRING(50),
    },
    correo: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    celular: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permite valores nulos
      },      
    perfil_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sexo_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true, // Esto agrega createdAt y updatedAt automáticamente
});

export default Usuario;
