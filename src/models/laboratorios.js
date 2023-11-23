// laboratorios.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";
import EstadoLaboratorio from "./estadosLaboratorios.js";

const Laboratorio = db.define('Laboratorio', {
    id_laboratorio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_laboratorio: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    celular: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    estado_laboratorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});


Laboratorio.belongsTo(EstadoLaboratorio, { foreignKey: 'estado_laboratorio', as: 'estado' });

export default Laboratorio;
