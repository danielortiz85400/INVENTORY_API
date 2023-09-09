import { Schema, model } from "mongoose";

const workplaceSchema = new Schema({
    name:{
        type:String,
        required:true
    }
},{versionKey:false,timestamps:false})

export default model('workplace', workplaceSchema)