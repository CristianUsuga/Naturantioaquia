import { Sequelize } from "sequelize";


const db = new Sequelize('naturantioquia','Naturantioquia','123456',{
    host: '127.0.0.1',
    dialect: "mysql", //que tipo 
    // logging: false,

});

export default db;