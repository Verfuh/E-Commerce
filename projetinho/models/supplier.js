const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const Supplier = sequelize.define('Supplier',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false
        },
        corporateName:{
            type: Sequelize.STRING,
            allowNull: false 
        },
        cnpj:{
            type: Sequelize.STRING,
            unique: true,
            allowNull:false
        },
        password:{
            type: Sequelize.STRING,
            allowNull:false
        }
    });
    return Supplier;
};