import Kit from "../models/KitRegister";

export const Qr = async (req, res) => {
    const {_id} = req.body
    try {
        const kit = await Kit.findOne({_id})
        if(kit === null || kit === undefined){
            return res.json({
                "error": {
                    status: 400,
                    mssg: "Sin coinicidencias. Verifique su código",
                }
            })
        }
        res.json({
            "success": {
                status: 200,
                mssg: "Búsqueda exitosa",
                kit
            }
        })

    } catch (error) {
        return res.json({
            "error": {
                status: 400,
                mssg: "Sin coinicidencias. Verifique su código",
            }
        })
    }
}