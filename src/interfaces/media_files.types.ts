
export type TMediaFile={
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
    id_post?: string
    url?: string
}

export type TGetMediaFiles={
    _id: string
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
    url: string
    id_post?: string
    createdAt: Date
    updatedAt: Date
}