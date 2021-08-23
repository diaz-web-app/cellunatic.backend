import {Schema,model} from 'mongoose'

const post = new Schema({
    titulo:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    url:{
        type:String,
        unique:true,
        required:true
    },
    keywords:String,
    contenido:{
        type:String,
        index:true,
        required:true
    },
    html:String,
    categoria:[
        {type:String}
    ],
    cover:String,
    tipo:{
        type:String,
        index:true,
        required:true
    },
    estado:{
        type:String,
        default:'publicado'
    },
    visitas:{
        type:Number
    }
},{timestamps:true,versionKey:false})

export default model('Posts',post)