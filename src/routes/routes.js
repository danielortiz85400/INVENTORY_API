
import { Router } from "express";
const router = Router();
import { createValidator as validator } from "express-joi-validation";
import { schemaValidation } from "../validations/valiadtion-body-schemas";
import passport from 'passport';
import { signIn } from '../controllers/auth';
//import { authenticateJwt } from "../libs/authenticate";
import * as kit from "../controllers/Kit";
import multer from "../libs/multer";
import * as workplace from "../controllers/Workplace";
import * as user from '../controllers/Users'
import { Qr } from "../controllers/Qr"

//authenticateJwt
router.get('/read/kits', kit.readKits) 
router.get('/read/workplace', workplace.read)
router.get('/read/users', user.readUsers)

// INICIO DE SESIÓN
router.post('/signin',
    [
        validator().body(schemaValidation.signin),
        passport.authenticate('signIn', { session: false })
    ],
    signIn
)

//REGISTRO USUARIOS
router.post('/signup',
    [
       // authenticateJwt,
        validator().body(schemaValidation.signup),
        passport.authenticate('signUp', { session: false })
    ],
    user.signUp
);
router.delete('/users/remove', user.remove) //authenticateJwt

//SEDES
router.post('/create/workplace',
    [
        //authenticateJwt,
        validator().body(schemaValidation.workplaces.create)
    ],
    workplace.created)
router.delete('/remove/workplace',
    [
        //authenticateJwt,
        validator().body(schemaValidation.workplaces.remove)
    ],
    workplace.remove)

//KIT
//authenticateJwt
router.post('/kit/create', [ multer.single("kitImage")], kit.created)
router.delete('/kit/delete',  kit.Delete)
router.put('/kit/update', [ multer.single("kitImage")], kit.Update)

//QR
//authenticateJwt
router.post('/qr/findOne',  Qr)

export default router;