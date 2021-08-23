import { TGetPostCategoria } from "./posts.categorias.types"
import { TCreatePostMeta } from "./posts.metas.types"

export type TGetPost={
    categoria:string[]
    estado:string
    _id:string
    titulo:string
    keywords:string
    contenido:string
    html:string
    tipo:string
    url:string
    cover:string
    createdAt:Date
    updatedAt:Date
}
export type TCreatePost={
    titulo:string
    contenido:string
    tipo:string
    url:string
    categoria:string[]
}
export type TUpdatePost={
    _id:string
    post:{
        categoria?:string[]
        estado?:string
        titulo?:string
        contenido?:string
        html?:string
        tipo?:string
        url?:string
        keywords?:string
    },
    post_metas:TCreatePostMeta[]
}
export type TDeletePost={
    _id:string
}