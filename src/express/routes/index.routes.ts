import {Response, Router,Request} from 'express'
import upload_cover from '../../plugins/multer_img'
import * as file_ctrl from '../controllers/media_files.controller'
import {twiml} from 'twilio'
const router = Router()

const MessagingResponse = twiml.MessagingResponse
router.get('/',(_:Request,res:Response)=>{
    
    return res.send('https://0786-185-147-55-10.ngrok.io')
})

router.post('/',(req:Request,res:Response)=>{
    const twiml = new MessagingResponse();
    console.log(twiml.toString())
    console.log(req.body)
    return res.json(twiml.toString())
})

router.post('/covers', upload_cover.array('cover'), file_ctrl.create_file)
router.delete('/covers', file_ctrl.delete_file)

export default router