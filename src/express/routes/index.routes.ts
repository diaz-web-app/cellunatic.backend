import {Response, Router,Request} from 'express'
import upload_cover from '../../plugins/multer_img'
import { hash_handler } from '../controllers/hash_controller'
import * as file_ctrl from '../controllers/media_files.controller'

const router = Router()

router.get('/',hash_handler)


router.post('/covers', upload_cover.array('cover'), file_ctrl.create_file)
router.delete('/covers', file_ctrl.delete_file)

export default router