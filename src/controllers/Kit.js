import cloudinary from "cloudinary";
import config from "../config";
import KitRegister from "../models/KitRegister";
import WorkPlace from "../models/Workplace";
import fs from "fs-extra";

cloudinary.config(config.cloudinaryConfig);

export const readKits = async(req,res) =>{
    try {
        const kits = await KitRegister.find()
        res.json({
            "success": {
                status: 200,
                kits
            }
        })
    } catch (error) {
        res.json("Ah ocurrido un error. Inténtelo de nuevo")
    }
}

//CREAR
export const created = async (req, res) => {
    console.log(req)
    try {
        if(!req.file){
            return res.json({
                "error": {
                    status: 400,
                    mssg: "Registro falló. Imagen requerida"
                }
            })
        }
        const { workplace: wp, ...body } = req.body
        const { public_id, url } = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'app-images',
            use_fildname: true
        })

        const [{ _id: workplace }] = await WorkPlace.find({ name: { $in: wp } })
        await KitRegister.create({
            ...body,
            workplace,
            workplaceName:wp,
            kitImage: { path: { public_id, url } }
        })
        await fs.unlink(req.file.path)
        res.json({
            "success": {
                status: 200,
                mssg: "Reistro exitoso"
            }
        })
    } catch (error) {
        res.json({
            "error": {
                status: 400,
                mssg: "Registro falló. verifíque los campos"
            }
        })
    }
}

//ELIMINAR
export const Delete = async (req, res) => {
    try {
        const { _id } = req.body
        const kit = await KitRegister.findByIdAndDelete(_id)
        await cloudinary.v2.uploader.destroy(kit.kitImage.path[0].public_id)
        res.json({
            "success": {
                status: 200,
                mssg: "Removido con exito"
            }
        })
    } catch (error) {
        res.json({
            "error": {
                status: 400,
                mssg: "Error. Inténtelo de nuevo"
            }
        })
    }
}

//ACTUALIZAR
export const Update = async (req, res) => {

    try {
        console.log(req.body)
        const { kit_id, workplace:wp, ...body } = req.body
        console.log(wp)
        const { kitImage: { path: [{ public_id: image_id }] } } = await KitRegister.findById(kit_id) //id de imagen (image_id) 

       const d = await WorkPlace.find({ name: { $in: wp } })
       console.log(d)

       const [{ _id }] = await WorkPlace.find({ name: { $in: wp } })

        if (req.file) {
            await cloudinary.v2.uploader.destroy(image_id)
            const { public_id, url } = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'app-images',
                use_fildname: true
            })
            const bodyWithoutImage = {
                ...body,
                workplace:_id,
                workplaceName:wp,
                kitImage: { path: { public_id, url } }
            }
            await KitRegister.updateOne({ _id: kit_id }, bodyWithoutImage)
            await fs.unlink(req.file.path)
            return res.json({
                "success": {
                    status: 200,
                    mssg: "Modificado con exito"
                }
            })
        } else {
            const bodyWithImage = {...body, workplace:_id, workplaceName:wp,}
            await KitRegister.updateOne({_id: kit_id}, bodyWithImage)
            res.json({
                "success": {
                    status: 200,
                    mssg: "Modificado con exito"
                }
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            "error": {
                status: 400,
                mssg: "Algo ocurrió. Inténtelo de nuevo"
            }
        })
    }

}





