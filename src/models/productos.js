// productos.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";
import Laboratorio from "./laboratorios.js";
import EstadoProducto from "./estadosProductos.js";

const Producto = db.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_producto: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion_producto: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
    },
    STOCK_MINIMO: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    STOCK_MAXIMO: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_laboratorios: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});


Producto.belongsTo(Laboratorio, { foreignKey: 'id_laboratorios' });
Producto.belongsTo(EstadoProducto, { foreignKey: 'estado_producto' });

export default Producto;
