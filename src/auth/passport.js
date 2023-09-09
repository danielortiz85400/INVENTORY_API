
import configEnv from '../config'
import User from '../models/SignUp'
import Role from '../models/Role';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local-roles";
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt'

//REGISTRO
passport.use('signUp', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    roleField: 'rol',
    passReqToCallback: true
}, async (req, email, password, rol, done) => {
    try {  
        const check_email = await User.findOne({ email })
        if (check_email) {
            return done(null, { status: 400, mssg: 'Email en uso' })
        }
        else {
            const userRegistration = {
                name:req.body.name,
                lastName:req.body.lastName
            }
            const { [rol]: currentRol = 'USUARIO' } = {
                ADMINISTRADOR: ['ADMINISTRADOR', 'USUARIO'],
                MODERADOR: ['ADMINISTRADOR', 'USUARIO'],
                USUARIO: ['USUARIO', 'USUARIO']
            }
            const [{ _id: role }] = await Role.find({ name: { $in: currentRol } })
            const newUser = await User.create({
                name:userRegistration.name,
                lastName:userRegistration.lastName,
                email,
                password: User().encryptPassword(password),
                role,
                roleName: currentRol,
                roleMain:currentRol[0]
            })
            done(null, newUser, { status: 201, mssg: 'Usuario creado con exito' })

        }
    } catch (error) {
        console.log(error)
    }
}))

//INICIO DE SESIÓN
passport.use('signIn', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, role, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return done(null, { status: 401, mssg: 'Usuario no autorizado,' })
        }
        done(null, user, { status: 200 });
    } catch (e) {
        console.log(e)
    }
}))

//AUTENTICACIÓN (JWT)
passport.use('jwt', new JWTStrategy({
    secretOrKey: configEnv.tokenSecret,
    jwtFromRequest: ExtractJWT.fromHeader('secret_token')
}, async (token, done) => {
    try {
        done(null, token)
    } catch (error) {
        done(error);
    }
}

))

