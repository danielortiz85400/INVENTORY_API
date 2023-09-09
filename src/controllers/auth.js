import jwt from "jsonwebtoken";
import configEnv from '../config'

//INICIO DE SESIÓN
export const signIn = (req, res) => {
    const user = req.user
    console.log(req)
    if (user.status === 401) {
        return res.json({
            "error": {
                status: 401,
                mssg: "No pudo autenticarse. Confirme su usuario"
            }
        })
    }
    const body = { _id: user._id, email: user.email };
    const token = jwt.sign(body, configEnv.tokenSecret)

    res.json({
        "success": {
            status: 200,
            role: user.roleName,
            token
        }
    })
}


