// categorias.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";

const Categoria = db.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Categoria;
