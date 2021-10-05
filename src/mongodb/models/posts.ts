import {Schema,model} from 'mongoose'

const post_schema = new Schema({
    titulo:{
        type:String,
        trim:true,
        required:true,
        text:true
    },
    url:{
        type:String,
        unique:true,
        required:true
    },
    meta_keywords:String,
    meta_description:{
        type:String,
        required:true
    },
    html:String,
    categoria:[
        {type:String}
    ],
    hijo:{
        type:String
    },
    cover:String,
    tipo:{
        type:String,
        required:true,
        trim:true,
        text:true,
        default:'post'
    },
    estado:{
        type:String,
        default:'publicado'
    },
    visitas:{
        type:Number
    }
},{timestamps:true,versionKey:false})

export default model('Posts',post_schema)