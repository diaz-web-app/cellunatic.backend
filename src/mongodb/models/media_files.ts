import {Schema,model,Document} from 'mongoose'
import { TMediaFile } from '../../interfaces/media_files.types'

const Media_file = new Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    id_post:String,
    url:String
      
},{timestamps:true,versionKey:false})

export default model<Document<TMediaFile>>('Media_files',Media_file)