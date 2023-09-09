export const validations = {
   //INICIO DE SESIÓN
   signIn:{
      email:{
         'string.empty': 'Email requiere no estar vacío',
         'any.required': 'Email requerido'
      },
      password:{
         'string.empty': 'Contraseña requiere no estar vacía',
         'any.required': 'Contraseña requerida'
      }
   },
   //REGISTRO DE USUARIOS
   signUp:{
      name:{
         'string.empty': 'Nombre requerido',
         'any.required': 'Nombre requerido',
         'string.max': 'Nombre requiere 10 caracteres como máximo',
     },
     lastName:{
         'string.empty': 'Apellido(1) requerido',
         'any.required': 'Apellido(1) requerido',
         'string.max': 'Apellido requiere 10 caracteres como máximo',
     },
     email:{
         'string.empty': 'Email es requerido',
         'any.required': 'Email es requerido',
         'string.max': 'Email requiere 35 caracteres como máximo',
         'string.email': 'Email debe ser un correo electrónico válido'
     },
     password:{
         'string.empty': 'Contraseña requerida',
         'any.required': 'Contraseña requerida',
         'string.pattern.base': 'Contraseña requiere caracteres: máximo: 15, mínimo: 7',
         "string.max": `Contraseña de 15 caracteres máximo`,
     },
     rol: {
         'string.empty': 'Rol es requerido',
         'any.required': 'Rol es requerido',
         'any.only': 'Rol requiere ser: ADMINISTRADOR, MODERADOR O USUARIO'
     },
   },
   //SEDES
   workplace:{
      create:{
         'string.empty': 'Nombre de sede requerido',
         'any.required': 'Nombre de sede requerido',
         'string.max': 'Nombre de sede requiere 8 caracteres como máximo'
      },
      remove:{
         'string.empty': 'Nombre de sede requerido',
         'any.required': 'Nombre de sede requerido'
      }
   },
}
