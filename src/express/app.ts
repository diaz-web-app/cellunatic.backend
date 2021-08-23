import express,{Application,json, urlencoded,text } from 'express'
import cors from 'cors'

//Routes
import indexRoutes from './routes/index.routes'
import { posts_router } from './routes/posts.routes'
import { tipos_router } from './routes/posts.tipos.routes'
import { post_metas_router } from './routes/posts.metas.routes'
import { categorias_router } from './routes/posts.categorias.routes'

export class App{
    private app:Application
    private port:any
    constructor(port:any){
        this.app= express()
        this.port = port

        this.middlewares()
        this.routes()
    }
    middlewares(){
        this.app.use(cors())
        this.app.use(urlencoded({extended:true,limit:'2048mb'}))
        this.app.use(json({limit:'2048mb'}))
        this.app.use(text({limit:'2048mb'}))
        
    }
    routes(){
        this.app.use(express.static('./public'))
        this.app.use(indexRoutes)
        this.app.use(posts_router)
        this.app.use(tipos_router)
        this.app.use(post_metas_router)
        this.app.use(categorias_router)
    }
    async listen(){
        try{
            await this.app.listen(this.port)
            console.log('server on port: ',this.port)
        }
        catch(err){
            return console.log(err)
        }
    }
}
