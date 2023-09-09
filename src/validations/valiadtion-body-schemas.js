import * as validationMssg from "./validation-mssg-error";
import Joi from "joi";


export const schemaValidation = {

    //INICIO DE SESIÓN DE USUARIOS
    signin: Joi.object().keys({
        email: Joi.string().trim().required().messages(validationMssg.validations.signIn.email),
        password: Joi.string().trim().required().messages(validationMssg.validations.signIn.password)
    }).or('email', 'password')
        .messages({ 'object.missing': 'El inicio de sesión debe contener valores de inicio: email y contraseña' }),
    
    //REGISTRO DE USUARIOS
    signup: Joi.object().keys({
        name: Joi.string().trim().required().max(10).messages(validationMssg.validations.signUp.name),
        lastName: Joi.string().trim().required().max(10).messages(validationMssg.validations.signUp.lastName),
        email: Joi.string()
            .trim()
            .max(35)
            .required()
            .email({ minDomainSegments: 2, tlds: true })
            .messages(validationMssg.validations.signUp.email),
        password: Joi.string()
            .trim()
            .required()
            .pattern(/^[a-zA-Z0-9]{7,15}$/)
            .max(10)
            .messages(validationMssg.validations.signUp.password),
        rol: Joi.string()
            .trim()
            .valid('ADMINISTRADOR', 'MODERADOR', 'USUARIO')
            .required()
            .messages(validationMssg.validations.signUp.rol)
    }),
    //SEDES
    workplaces:{
        create: Joi.object().keys({
            name: Joi.string().trim().required().max(8).messages(validationMssg.validations.workplace.create)
        }),
        remove:Joi.object().keys({
            name: Joi.string().trim().required().max(8).messages(validationMssg.validations.workplace.remove)
        })
    },
}