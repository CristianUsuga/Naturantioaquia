// estadosLaboratorios.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";

const EstadoLaboratorio = db.define('EstadoLaboratorio', {
    id_estado_lab: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_est_lab: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default EstadoLaboratorio;
