// estadosProductos.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";

const EstadoProducto = db.define('EstadoProducto', {
    id_estado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_est_producto: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    timestamps: false,
});

export default EstadoProducto;
