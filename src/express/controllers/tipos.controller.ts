import {RequestHandler} from 'express'
import Posts from '../../mongodb/models/posts'
import Post_tipos from '../../mongodb/models/post_tipos'
import { crearURL } from '../../plugins/string_to_slug'

export const get_tipos:RequestHandler = async(req,res)=>{
    const {
        url
      } =  req.params
      if(!url){
          const all = await Post_tipos.find()
          return res.json(all)
      }
      if(url){
        const one = await Post_tipos.find({url})
        return res.json(one)
    }
}
export const create_tipo:RequestHandler = async(req,res)=>{
    const { titulo } =  req.body
    const url = crearURL(titulo)
    const exist = await Post_tipos.findOne({url})
    if(exist){ //Si retornamos un error
        return res.status(500).json({msg:'duplicado'})
    }
    
    const new_tipo = await Post_tipos.create({titulo,url})
    return res.json(new_tipo)
}
export const update_tipo:RequestHandler = async(req,res)=>{
    const { _id, titulo, url } =  req.body
    const exist = await Post_tipos.findOne({url})
    if(exist){ //Si existe retornamos un error
        return res.status(500).json({msg:'duplicado'})
    }
    
    const new_tipo = await Post_tipos.findByIdAndUpdate(_id,{titulo,url})
    return res.json(new_tipo)
}
export const delete_tipo:RequestHandler = async(req,res)=>{
    const { _id } =  req.body
    const deleted = await Post_tipos.findByIdAndDelete(_id)
    if(deleted){
        const posts = await Posts.find({tipo:deleted.url})
        if(posts.length > 0){
            for(let post of posts){
                await Posts.findByIdAndDelete(post._id)
            }
        }
    }
    return res.json(deleted)
}