const sequelize=require('../db')
const seq=require('sequelize')
const User=sequelize.define('user',{
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:seq.DataTypes.INTEGER

    },
    name:{
        type:seq.DataTypes.STRING
    },
    email:{
        type:seq.DataTypes.STRING, unique:true
    }
    ,
    password:{
        type:seq.DataTypes.STRING
    },
    createdAt:{
        allowNull: false,
        type:seq.DataTypes.DATE
    },
    updatedAt:{
        allowNull:false,
        type:seq.DataTypes.DATE
    }
})
module.exports={ User };