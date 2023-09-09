import { config } from "dotenv";

config()

//EXPORTACIÓN DE VARIABLES DE ENTORNO
export default{
    mongodbURL: process.env.MONGODB_URI,
    tokenSecret: process.env.TOKEN,
    cloudinaryConfig:{
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET

    }

}
