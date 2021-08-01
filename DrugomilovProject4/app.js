const express = require('express')
const config=require('config')
const mysql= require('mysql')
const model=require('./models/User')
const {Sequelize}=require('sequelize')
const sequelize =require('./db')
const app=express()
const PORT = config.get('port')||5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',require('./routes/auth_routes'))
app.use('/api/users',require('./routes/users.routes'))

async function start(){
    try{
       await  sequelize.authenticate();
       await sequelize.sync()
        app.listen(PORT,()=> console.log('App has been started on port '+PORT))
    }
    catch (e){
        console.log('Server Error',e.message)
        process.exit(1);
    }
}
start();
