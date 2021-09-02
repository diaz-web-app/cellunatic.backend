import {Router} from 'express'
import Posts from '../../mongodb/models/posts'
const search_router = Router()

search_router.get('/search/:text',async(req,res)=>{
    try{
        const posts = await Posts.find({
            $text:{
                    $search:req.params.text
                }
            }
        )
        if(posts.length > 0){
            return res.status(200).json(posts)
        }
        return res.status(404).json(posts)
    }catch(err){
        console.error(err)
        return res.status(500).send('error')
    }
})
export {search_router}