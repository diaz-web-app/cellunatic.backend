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
            files[i].url = express.domains.backend_cellunatic+'/'+files[i].path.replace('puclic','')
            await Media_files.create(files[i])
        }
        if(process.env.NODE_ENV || process.env.NODE_ENV == 'production'){
            try{
                let resp = await cloudinary.v2.uploader.upload(files[i].path)
                files[i].url = resp.secure_url
                cloudinary.v2.image ( resp.secure_url , { transformación : [
                    { gravedad : " cara " , altura : 200 , ancho : 200 , recorte : " pulgar " },
                    { borde : " 5px_solid_black " , radio : 20 },
                    { overlay : " cloudinary_icon_white " },
                    { banderas : " relativo " , ancho : " 0.25 " , recorte : " escala " },
                    { opacidad : 50 },
                    { flags : " layer_apply " , gravity : " north_east " , x : 10 , y : 10 }
                    ]})
                await Media_files.create(files[i])
                promises.unlink(files[i].path)
            }catch(err){
                console.error(err)
            }
        }
        
    }
    return res.json(files)
}

export const delete_file:RequestHandler = async(req,res)=>{
    const {path} = req.body
    const deleted = await Media_files.findOneAndDelete({path})
    return res.json(deleted)
}