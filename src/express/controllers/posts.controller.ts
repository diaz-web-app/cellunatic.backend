import {RequestHandler} from 'express'
import { TMediaFile } from '../../interfaces/media_files.types';
import { TCreatePostMeta } from '../../interfaces/posts.metas.types';
import { TCreatePost, TDeletePost, TUpdatePost } from '../../interfaces/posts.types';
import media_files from '../../mongodb/models/media_files';
import Posts from "../../mongodb/models/posts";
import PostMetas from "../../mongodb/models/post_metas";
import { crearURL } from '../../plugins/string_to_slug';

export const get_posts:RequestHandler = async(req,res)=>{
    const {
        tipo,
        estado,
        categoria,
        limite
      } =  req.params
    let metas,posts
    
    if(!tipo && !estado && !categoria){ // si no hay parametros
        const total_posts = await Posts.find().countDocuments()
        
        posts = await Posts.find().sort({createdAt:-1}).limit(limite?parseInt(limite):10)

        if(posts.length > 0){
            //consultamos los metas
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }
    if(tipo =='any' && estado=='any' && categoria=='any'){ // solo el parametro limite
        const total_posts = await Posts.find().countDocuments()
        
        posts = await Posts.find().sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){ 
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }

    if(tipo !='any' && !estado && !categoria){ // solo el parametro tipo
        const total_posts = await Posts.find({tipo}).countDocuments()
        
        posts = await Posts.find({tipo}).sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }            
        }
        return res.json({posts,metas,total_posts})
    }

    if(tipo !='any' && estado =='any' && categoria=='any'){ // solo el parametro tipo
        const total_posts = await Posts.find({tipo}).countDocuments()
        
        posts = await Posts.find({tipo}).sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }
    
    if(tipo == 'any' && estado !='any' && !categoria){ // solo el parametro estado o limite
        const total_posts = await Posts.find({estado}).countDocuments()
        
        posts = await Posts.find({estado}).sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }
    if(tipo == 'any' && estado !='any' && categoria == 'any'){ // solo el parametro estado o limite
        const total_posts = await Posts.find({estado}).countDocuments()
        
        posts = await Posts.find({estado}).sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }
    if(tipo == 'any' && estado =='any' && categoria !== 'any'){ // solo el parametro categoria o limite
        const total_posts = await Posts.find({categoria}).countDocuments()
        
        posts = await Posts.find({categoria}).sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }
    if(tipo != 'any' && estado =='any' && categoria !== 'any'){ // solo el parametro categoria y tipo o limite
        const total_posts = await Posts.find({tipo,categoria}).countDocuments()
        
        posts = await Posts.find({tipo,categoria}).sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }
    if(tipo != 'any' && estado !='any' && categoria != 'any'){ // si existe  tipo estado y categoria
        const total_posts = await Posts.find({tipo,estado,categoria}).countDocuments()
        
        posts = await Posts.find({tipo,estado,categoria}).sort({createdAt:-1}).limit(limite?parseInt(limite):10)
        if(posts.length > 0){
            for(let i = 0; i < posts.length;i++){
                metas = await PostMetas.find({id_post:posts[i]._id})
            }
        }
        return res.json({posts,metas,total_posts})
    }
}

export const get_post:RequestHandler = async(req,res)=>{
    const {
        tipo,
        url
    } = req.params
    let post,metas,covers
    if(url && tipo=='any'){ // solo el parametro url
        post = await Posts.findOne({url})
        if(post){
            metas = await PostMetas.find({id_post:post._id})
            covers = await media_files.find({id_post:post._id})
        }
        return res.json({post,metas,covers})
    }
    if(url && tipo!=='any'){ // solo el parametro url
        post = await Posts.findOne({url,tipo})
        if(post){
            metas = await PostMetas.find({id_post:post._id})
            covers = await media_files.find({id_post:post._id})
        }
        return res.json({post,metas,covers})
    }
    return res.status(404).json({msg:'not found'})
}

type CreateParams={
    post:TCreatePost
    post_metas?:TCreatePostMeta[]
    post_categorias?:string[]
    covers:TMediaFile[]
}
export const create_post:RequestHandler = async(req,res)=>{
    const {post,post_metas,post_categorias,covers}:CreateParams =  req.body
    
    if(!post || !post.titulo || !post.meta_description || !post.tipo ){ // si no existen los parametros oblicatorios
        
        return res.status(500).json({required:"titulo,meta_description,tipo",provided:{post,post_metas,post_categorias,covers}})
    }

    // si existen los parametros 
    const url = crearURL(post.titulo)
    const exist = await Posts.findOne({url})// comprobando si existe la url
    post.cover = covers[0].url
    const metas = []
    let new_post
    
    if(exist){ //si existe la url se le añade un prefijo datatime
        post.url = url+Date.now()
        post.categoria = post_categorias?post_categorias:[]
        new_post = await Posts.create<TCreatePost>(post)

        if(post_metas && post_metas.length > 0){ // se comprueba si existes metas
            for(let meta of post_metas){ // se recorren los metas y se crean
                const new_meta = await PostMetas.create<TCreatePostMeta>({id_post:new_post._id,clave:meta.clave,valor:meta.valor,vista:meta.vista})
                metas.push(new_meta)
            }
        }
        for(let cover of covers){ // se recorren los covers y se crean
            await media_files.findOneAndUpdate({path:cover.path},{id_post:new_post._id})
        }
        return res.json({new_post,metas})
    }

    // Si no existe la url
    post.url = url
    post.categoria = post_categorias?post_categorias:[]
    new_post = await Posts.create<TCreatePost>(post) //se crea el post

    if(post_metas && post_metas.length > 0){ // se comprueba si existes metas
        for(let meta of post_metas){ // se recorren los metas y se crean
            const new_meta = await PostMetas.create<TCreatePostMeta>({id_post:new_post._id,clave:meta.clave,valor:meta.valor,vista:meta.vista})
            metas.push(new_meta)
        }
    }
    for(let cover of covers){ // se recorren los covers y se crean
        await media_files.findOneAndUpdate({path:cover.path},{id_post:new_post._id})
    }
    return res.json({new_post,metas})
    
}

export const update_post:RequestHandler = async(req,res)=>{
    const {_id,post,post_metas,covers}:TUpdatePost = req.body
    
    try{
        const post_updated = await Posts.findByIdAndUpdate(_id,post,{new:true})
        if(post_metas && post_metas.length > 0){ // se comprueba si existen metas
            const exist_metas = await PostMetas.find({id_post:_id})
            if(exist_metas && exist_metas.length > 0){
                for(let meta of exist_metas){ // se recorren los metas y se eliminan
                    await PostMetas.findByIdAndDelete(meta._id)
                }
            }
            for(let meta of post_metas){ // se recorren los nuevos metas y se crean            
                await PostMetas.create<TCreatePostMeta>({id_post:_id,clave:meta.clave,valor:meta.valor,vista:meta.vista})
            }
            
            if(covers.length >0){
                for(let cover of covers){ // se recorren los covers y se crean
                    await media_files.findOneAndUpdate({path:cover.path},{id_post:_id})
                }
            }
        }
        const metas = await PostMetas.find({id_post:_id})
        return res.json({post_updated,metas})
    }catch(err){
        console.error(err)
        return res.status(500).json({msg:err})
    }
}
export const delete_post:RequestHandler = async(req,res)=>{
    const {_id}:TDeletePost = req.body
    try{
        await Posts.findByIdAndDelete(_id)
        if(_id){
            const metas:any[] = PostMetas.find({id_post:_id})
            if(metas && metas.length > 0){
                for(let meta of metas){
                    await PostMetas.findByIdAndDelete(meta._id)
                }
            }
            return res.json({msg:'deleted'})
        }
        return res.status(401).json({msg:'invalid params'})
    }catch(err){
        console.error(err)
        return res.status(500).json({msg:err})
    }
    
}