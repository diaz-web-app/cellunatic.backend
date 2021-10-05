import { TMediaFile } from "./media_files.types"
import { TCreatePostMeta } from "./posts.metas.types"

export type TGetPost={
    categoria:string[]
    estado:string
    _id:string
    titulo:string
    meta_keywords:string
    meta_description:string
    html:string
    tipo:string
    url:string
    cover:string
    createdAt:Date
    updatedAt:Date
}
export type TCreatePost={
    titulo:string
    meta_description:string
    tipo:string
    url:string
    cover?:string
    categoria:string[]
}
export type TUpdatePost={
    _id:string
    post:{
        categoria?:string[]
        estado?:string
        titulo?:string
        meta_description?:string
        html?:string
        tipo?:string
        url?:string
        meta_keywords?:string
    },
    post_metas:TCreatePostMeta[]
    covers:TMediaFile[]
}
export type TDeletePost={
    _id:string
}