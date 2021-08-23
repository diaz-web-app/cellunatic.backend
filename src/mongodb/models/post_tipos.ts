import {Schema,model,Document} from 'mongoose'

const post_tipo = new Schema({
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
    }
},{timestamps:true,versionKey:false})

export default model<Document<{titulo:String,url:String}>>('Post_tipos',post_tipo)