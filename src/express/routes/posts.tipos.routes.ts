import {Router} from 'express'
import * as tipos from '../controllers/tipos.controller'
const tipos_router = Router()

tipos_router.get('/tipos/:url?',tipos.get_tipos)
tipos_router.post('/tipos',tipos.create_tipo)
tipos_router.put('/tipos',tipos.update_tipo)
tipos_router.delete('/tipos',tipos.delete_tipo)
export {tipos_router}