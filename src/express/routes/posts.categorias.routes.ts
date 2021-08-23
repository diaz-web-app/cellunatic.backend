import {Router} from 'express'
import * as categorias from '../controllers/categorias.controller'
const categorias_router = Router()

categorias_router.get('/categorias/:tipo?/',categorias.get_categorias)
categorias_router.get('/categoria/:url',categorias.get_categoria)
categorias_router.post('/categorias',categorias.create_categoria)
categorias_router.delete('/categorias',categorias.delete_categoria)
export {categorias_router}