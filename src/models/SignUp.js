
import {Schema, model} from 'mongoose'
import bcrypt, {genSaltSync} from 'bcrypt'

 const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required:true
    },
    roleName:[],
    roleMain:{
        type:String
    }

},{
    versionKey:false,
    timestamps:true
})

//Metodos de encriptación y comparar contraseñas.
userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password.toString(), genSaltSync(10))
}
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

export default model('User', userSchema)

