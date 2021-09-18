import {App} from './express/app'
import {express} from './config'
import Post_tipos from './mongodb/models/post_tipos'

import './mongodb/connection.mongoose'
import { crearURL } from './plugins/string_to_slug'

async function main(){
    const tipo_post = await Post_tipos.findOne({url:'post'})
    const tipo_pagina = await Post_tipos.findOne({url:'pagina'})
    if(!tipo_pagina){
        const titulo = 'página'
        const url = crearURL(titulo)
        await Post_tipos.create({titulo,url})
    }
    if(!tipo_post){
        const titulo = 'post'
        const url = crearURL(titulo)
        await Post_tipos.create({titulo,url})
    }
    const app = new App(express.port)
    await app.listen()
}

main()