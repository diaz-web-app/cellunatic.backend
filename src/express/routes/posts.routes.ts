import {Router} from 'express'
import * as posts from '../controllers/posts.controller'
const posts_router = Router()

posts_router.get('/post/:tipo?/:url?',posts.get_post)
posts_router.get('/posts/:tipo?/:estado?/:categoria?/:limite?',posts.get_posts)
posts_router.post('/posts',posts.create_post)
posts_router.put('/posts',posts.update_post)
posts_router.delete('/posts',posts.delete_post)
export {posts_router}