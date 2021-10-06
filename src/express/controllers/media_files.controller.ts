import {RequestHandler} from 'express'
import Media_files from '../../mongodb/models/media_files'
import cloudinary from 'cloudinary'
import { cloudynary_api, express } from '../../config';
import {promises} from 'fs'

cloudinary.v2.config({ 
    cloud_name: cloudynary_api.cloud_name,
    api_key: cloudynary_api.api_key, 
    api_secret: cloudynary_api.api_secret
  });

export const get_files:RequestHandler = async(req,res)=>{
    return
}
export const create_file:RequestHandler = async(req,res)=>{
    const {files}:any = req

    for(let i=0;i<files.length;i++ ){
        if(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production'){
            files[i].url = express.domains.backend_cellunatic+files[i].path.replace('public','')
            await Media_files.create(files[i])
        }
        if(process.env.NODE_ENV || process.env.NODE_ENV == 'production'){
            try{
                let resp = await cloudinary.v2.uploader.upload(files[i].path)
                files[i].url = resp.secure_url
                await Media_files.create(files[i])
                await promises.unlink(files[i].path)
            }catch(err){
                await promises.unlink(files[i].path)
                console.error(err)
            }
        }
    }
    return res.json(files)
}

export const delete_file:RequestHandler = async(req,res)=>{
    const {path} = req.body
    await promises.unlink(path)
    const deleted = await Media_files.findOneAndDelete({path})
    return res.json(deleted)
}