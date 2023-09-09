import Workplace from "../models/Workplace";

//LEER TODOS LAS SEDES
export const read = async (req,res)=>{
    try {
        const workplace = await Workplace.find()
        res.json(workplace)
    } catch (error) {
        console.log(error)
    }
}

//CREAR SEDE
export const created = async (req,res)=> {
    const {name} = req.body
    const verifyWplce = await Workplace.findOne({name})
    if(verifyWplce){
        return res.json({
            "error":{
                status:400,
                mssg:"Sede existente."
            }
        })
    }
    await Workplace.create({name})   
    return res.json({
        "success":{
            status:200,
            mssg:"Sede creada con exito."
        }
    })
}

//REMOVER SEDE
export const remove = async (req,res)=> {
    const {name} = req.body
    const verifyWplce = await Workplace.findOne({name})
    if(verifyWplce === null){
        return res.json({
            "error":{
                status:400,
                mssg:"Sede inexistente."
            }
        })
    }
    await Workplace.remove({name})   
    return res.json({
        "success":{
            status:200,
            mssg:"Sede removida con exito."
        }
    })
}
