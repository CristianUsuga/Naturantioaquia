// imagenesProductos.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";
import Producto from "./productos.js";

const ImagenProducto = db.define('imagenes_productos', {
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_imagen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_imagen: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    ubicacion_imagen: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Establecer la relación con la tabla productos
ImagenProducto.belongsTo(Producto, { foreignKey: 'id_producto' });

export default ImagenProducto;
