import multer from "multer";
import path from "path";
import * as uuid from "uuid"

//Definicion de carpeta y configuración para la subida de imagenes
const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
})
export default multer ({storage})