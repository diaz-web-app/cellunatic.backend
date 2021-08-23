import {RequestHandler} from 'express'
import { TUpdatePostMeta, TDeletePostMeta } from '../../interfaces/posts.metas.types'
import post_metas from '../../mongodb/models/post_metas'

export const get_metas:RequestHandler = async(req,res)=>{
    const {
        id_post,
        limite
      } =  req.params
    if(!id_post){
        const metas = await post_metas.find().limit(limite?parseInt(limite):10)
        return res.json(metas)
    }
    if(id_post == 'any'){
        const metas = await post_metas.find().limit(limite?parseInt(limite):10)
        return res.json(metas)
    }
    const metas = await post_metas.find({id_post}).limit(limite?parseInt(limite):10)
    return res.json(metas)
}
export const create_meta:RequestHandler = async(req,res)=>{
    const {id_post,clave,contenido} =  req.body
    try{
        const meta_created = await post_metas.create({id_post,clave,contenido})
        return res.json(meta_created)
    }catch(err){
        console.error(err)
        return res.status(500).json({msg:err})
    }
}
export const update_meta:RequestHandler = async(req,res)=>{
    const {_id, meta }:TUpdatePostMeta =  req.body
    try{
        const meta_updated = await post_metas.findByIdAndUpdate(_id,meta)
        return res.json(meta_updated)
    }catch(err){
        console.error(err)
        return res.status(500).json({msg:err})
    }
}
export const delete_meta:RequestHandler = async(req,res)=>{
    const { _id }:TDeletePostMeta =  req.body
    try{
        const meta_deleted = await post_metas.findByIdAndDelete(_id)
        return res.json(meta_deleted)
    }catch(err){
        console.error(err)
        return res.status(500).json({msg:err})
    }
}