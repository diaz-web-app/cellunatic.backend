import {Router} from 'express'
import Posts from '../../mongodb/models/posts'
import post_metas from '../../mongodb/models/post_metas'
const search_router = Router()

search_router.get('/search/:text/:limite',async(req,res)=>{
    let metas,posts
    try{
        const total_posts = await Posts.find({
            $text:{
                    $search:req.params.text
                }
            }
        ).countDocuments()
        posts = await Posts.find({
            $text:{
                    $search:req.params.text
                }
            }
        ).sort({createdAt:-1}).limit(parseInt(req.params.limite))
        if(posts.length > 0){
            if(posts.length > 0){
                //consultamos los metas
                for(let i = 0; i < posts.length;i++){
                    metas = await post_metas.find({id_post:posts[i]._id})
                }
            }
            return res.status(200).json({posts,metas,total_posts})
        }
        return res.status(404).json(posts)
    }catch(err){
        console.error(err)
        return res.status(500).send('error')
    }
})
export {search_router}