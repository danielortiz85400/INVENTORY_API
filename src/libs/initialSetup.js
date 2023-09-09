import Role from '../models/Role'

//Crear roles al arrancar la aplicación por primer vez
export const createRoles = async()=>{
    try {
        const count = await Role.estimatedDocumentCount()
        if(count > 0) return
        const rolNames = [{name:'USUARIO'},{name:'MODERADOR'},{name:'ADMINISTRADOR'}]
         await Promise.all(rolNames.map(n => Role.insertMany(n)))       
        
    } catch (error) {
        console.log(error)
    }
}