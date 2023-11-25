// categoriasProductos.js
import { DataTypes } from "sequelize";
import db from "../../db/connection.js";
import Categoria from "./categorias.js";
import Producto from "./productos.js";

const CategoriaProducto = db.define('CategoriaProducto', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    timestamps: false,
});

CategoriaProducto.belongsTo(Categoria, { foreignKey: 'id_categoria' });
CategoriaProducto.belongsTo(Producto, { foreignKey: 'id_producto' });

export default CategoriaProducto;
