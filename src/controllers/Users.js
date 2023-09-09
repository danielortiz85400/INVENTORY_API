import User from '../models/SignUp' 
export const readUsers = async(req,res) =>{
    try {
        const users = await User.find()
        res.json({
            "success": {
                status: 200,
                users
            }
        })
    } catch (error) {
        res.json("Ah ocurrido un error. Inténtelo de nuevo")
    }
}

//REGISTRO DE USUARIOS
export const signUp = async (req, res) => {
    console.log(req)
    const user = req.user
    const authInfo = req.authInfo
    if (user.status === 400) {
        return res.json({
            "error": {
                register: true,
                status: 400,
                mssg: user.mssg
            }
        })
    }
    res.json({
        "success": {
            status: 200,
            mssg: authInfo.mssg
        }
    })
}
//REMOVER USUARIOS
export const remove = async (req, res) => {
    const {_id} = req.body
    const verifyUser = await  User.deleteOne({_id})
    if (verifyUser.deletedCount !== 1) {
        return res.json({
            "error": {
                status: 400,
                mssg: 'Usuario inexistente.'
            }
        })
    }
    res.json({
        "success": {
            status: 200,
            mssg: 'Usuario removido con exito'
        }
    })
}