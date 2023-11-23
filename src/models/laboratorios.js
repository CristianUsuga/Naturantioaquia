import { DataTypes } from 'sequelize';
import db from "../../db/connection.js";

const Laboratorio = db.define('Laboratorio', {

  id_laboratorio: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  
  nombre_laboratorio: {
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

  estado_laboratorio: {
    type: DataTypes.INTEGER
  }

});

export default Laboratorio;