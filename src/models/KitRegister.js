import { Schema, model } from "mongoose";
const kitRegisterSchema = new Schema({
    workplace:{
        type:Schema.Types.ObjectId,
        ref:'Workplace',
        required:true
    },
    workplaceName:{
        type:String,
    },
    screen:{
        type:String,
        required:true
    },
    cpu:{
        type:String,
        required:true
        
    },
    kitImage:{
        path:[{public_id:"", url:""}]
    },
    mouse:{
        type:String,
        required:true
    },
    keyboard:{
        type:String,
        required:true
    },
    headphone:{
        type:String,
        required:true
    },
    print:{
        type:String,
        required:true
    }

},{
    versionKey:false,
    timestamps:true
})

export default model('kitRegister',kitRegisterSchema)