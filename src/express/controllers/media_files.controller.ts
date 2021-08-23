import {RequestHandler} from 'express'
import { TMediaFile } from '../../interfaces/media_files.types'
import Media_files from '../../mongodb/models/media_files'
export const get_files:RequestHandler = async(req,res)=>{
    return
}
export const create_file:RequestHandler = async(req,res)=>{
    const file:TMediaFile = req.file
    file.url = req.file.path.replace('public','')
    const new_file = await Media_files.create(file)
    return res.json(new_file)
}

export const delete_file:RequestHandler = async(req,res)=>{
    
    return 
}