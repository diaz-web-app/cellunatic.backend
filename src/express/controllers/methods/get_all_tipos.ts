import Post_tipos from '../../../mongodb/models/post_tipos'

export const get_all_tipos = async()=>{
    return await Post_tipos.find()
} 