import {RequestHandler} from 'express'
import { TCreatePostCategoria , TDeletePostCategoria, TGetPostCategoria} from '../../interfaces/posts.categorias.types'
import Posts from '../../mongodb/models/posts'
import post_categorias from '../../mongodb/models/post_categorias'
import { crearURL } from '../../plugins/string_to_slug'

export const get_categorias:RequestHandler = async(req,res)=>{
    const {
        url_post,
      } =  req.params
      if(!url_post){
        const categorias = await post_categorias.find()
        return res.json(categorias)
    }
    if(url_post){
        const post = await Posts.findOne({url:url_post})
        const categorias:TGetPostCategoria[]=[]
        if(!post) return res.status(404).json(categorias)
        
        for(let url of post.categoria){
            categorias.push(await post_categorias.findOne({url}))
        }
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
    if(!categoria.titulo){
        return res.status(403).json({msg:'falta el titulo'})
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