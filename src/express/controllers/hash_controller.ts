import {RequestHandler} from 'express'

export const hash_handler:RequestHandler = async(req,res)=>{
    return res.send('ok')
}