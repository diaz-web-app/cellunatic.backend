import {RequestHandler} from 'express'
import { TCreatePostCategoria , TDeletePostCategoria} from '../../interfaces/posts.categorias.types'
import post_categorias from '../../mongodb/models/post_categorias'
import { crearURL } from '../../plugins/string_to_slug'

export const get_categorias:RequestHandler = async(req,res)=>{
    const {
        tipo,
      } =  req.params
    if(!tipo){
        const categorias = await post_categorias.find()
        return res.json(categorias)
    }
    if(tipo){
        const categorias = await post_categorias.find({tipo_post:tipo})
        return res.json(categorias)
    }
}
export const get_categoria:RequestHandler = async(req,res)=>{
    const {
        url,
      } =  req.params
    if(url){
        const categorias = await post_categorias.findOne({url})
        return res.json(categorias)
    }
    return res.json()
}
export const create_categoria:RequestHandler = async(req,res)=>{
    const categoria:TCreatePostCategoria =  req.body
    if(!categoria.titulo || !categoria.tipo_post){
        return res.status(403).json({msg:'falta el titulo y los tipos de posts'})
    }
    const url = crearURL(categoria.titulo)
    const exist = await post_categorias.findOne({url})
    if(exist){
        categoria.url = url+Date.now()
        const created = await post_categorias.create(categoria)
        return res.json(created)
    }
    categoria.url = url
    const created = await post_categorias.create(categoria)
    return res.json(created)
}

export const delete_categoria:RequestHandler = async(req,res)=>{
    const {_id}:TDeletePostCategoria =  req.body
    const deleted = await post_categorias.findByIdAndDelete(_id)
    return res.json(deleted)
}