export type TGetPostMeta={
    _id:string
    id_post:string
    clave:string
    valor:string
    vista:boolean
    createdAt:Date
    updatedAt:Date
}
export type TCreatePostMeta={
    id_post:string
    clave:string
    valor:string
    vista:boolean
}
export type TUpdatePostMeta={
    _id:string
    meta:TCreatePostMeta
}
export type TDeletePostMeta={
    _id:string
}