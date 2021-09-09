import {RequestHandler} from 'express'
import Media_files from '../../mongodb/models/media_files'
export const get_files:RequestHandler = async(req,res)=>{
    return
}
export const create_file:RequestHandler = async(req,res)=>{
    const {files}:any = req

    for(let i=0;i<files.length;i++ ){
        files[i].url = files[i].path.replace('public','')
        await Media_files.create(files[i])
    }
    return res.json(files)
}

export const delete_file:RequestHandler = async(req,res)=>{
    const {path} = req.body
    const deleted = await Media_files.findOneAndDelete({path})
    return res.json(deleted)
}