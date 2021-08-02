const express = require('express')
const config=require('config')
const mysql= require('mysql')
const model=require('./models/User')
const {Sequelize}=require('sequelize')
const sequelize =require('./db')
const app=express()
const PORT = process.env.PORT||80
const path=require('path')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',require('./routes/auth_routes'))
app.use('/api/users',require('./routes/users.routes'))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'client/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client/build','index.html'));
    }
)
}


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
