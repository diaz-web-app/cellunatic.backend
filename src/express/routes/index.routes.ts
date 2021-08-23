import {Response, Router,Request} from 'express'
import upload_cover from '../../plugins/multer_img'
import * as file_ctrl from '../controllers/media_files.controller'
const router = Router()

router.get('/',(_:Request,res:Response)=>{
    res.send('home')
})
router.post('/covers', upload_cover.single('cover'), file_ctrl.create_file)
export default router