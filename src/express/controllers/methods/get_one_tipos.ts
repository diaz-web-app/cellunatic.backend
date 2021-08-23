import Post_tipos from '../../../mongodb/models/post_tipos'

type Params={
    url:String
}

export const get_one_tipos = async({url}:Params)=>{
    return await Post_tipos.findOne({url})
} 