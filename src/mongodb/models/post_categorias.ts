import {Schema,model} from 'mongoose'

const post_categoria = new Schema({
    titulo:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    url:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    tipo_post:[
        {
            type:String,
            required:true,
            trim:true
        }
    ],
    contenido:String,
    keywords:String
},{timestamps:true,versionKey:false})

export default model('PostCategorias',post_categoria)