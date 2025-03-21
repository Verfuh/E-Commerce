const Sequelize = require('sequelize');
module.exports = (sequelize) =>{

    const Product = sequelize.define('Product',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        name:{
            type: Sequelize.STRING,
            allowNull:false,
            unique: true
        },
        description:{
            type: Sequelize.STRING,
        },
        category:{
            type: Sequelize.STRING,
        },
        price:{
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        stock:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Product;

};