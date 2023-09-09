import mongoose from "mongoose";
import config from "./config";

//CONEXIÓN A LA BASE DE DATOS
(async ()=>{
    try {
        const DB = await mongoose.connect(config.mongodbURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Conectado a la BD:', DB.connection.name)
    } catch (error) {
        console.log('Base de datos sin conexión')
    }
   
})()
