import passport from "passport";

//Respuesta personalizada por error de autenticación
export function authenticateJwt(req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (!user) return res.status(401).send({
            "error": {
                "status": 400,
                "msg": "Sin autorización. Requiere permisos de administrador"
            }
        })
        req.user = user;
        next();
    })(req, res, next);
}

