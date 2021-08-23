export type TGetPostCategoria={
    _id:string
    titulo:string
    url:string
    tipo_post:string[]
    keywords:string
    contenido:string
    createdAt:Date
    updatedAt:Date
}
export type TCreatePostCategoria={
    titulo:string
    tipo_post:string[]
    url:string
    keywords?:string
    contenido?:string
}
export type TUpdatePostCategoria={
    _id:string
    categoria:TCreatePostCategoria
}
export type TDeletePostCategoria={
    _id:string
}