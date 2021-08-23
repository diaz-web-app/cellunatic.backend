import {Schema,model} from 'mongoose'

const post_meta = new Schema({
    id_post:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    clave:{
        type:String,
        required:true
    },
    contenido:{
        type:String,
        index:true
    }
},{timestamps:true,versionKey:false})

export default model('Post_metas',post_meta)