import {Router} from 'express'
import * as metas from '../controllers/post.metas.controller'
const post_metas_router = Router()

post_metas_router.get('/post_metas/:id_post?/:limite?',metas.get_metas)
post_metas_router.post('/post_metas',metas.create_meta)
post_metas_router.put('/post_metas',metas.update_meta)
post_metas_router.delete('/post_metas',metas.delete_meta)
export {post_metas_router}