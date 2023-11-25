import { DataTypes } from 'sequelize';
import db from "../../db/connection.js";

const Transportista = db.define('Transportista', {
  id_transportista: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  correo: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.INTEGER
  },
  celular: {
    type: DataTypes.INTEGER
  },
  tipo: {
    type: DataTypes.INTEGER
  }
});

export default Transportista;
