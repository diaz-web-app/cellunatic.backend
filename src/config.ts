import env from 'dotenv'

env.config()

export const mongodb={
        uri: process.env.MONGODB_URI || 'mongodb://localhost/cellunatic'
    }
export const express={
        port: process.env.PORT || 4000,
        domains:{
            backend_cellunatic: process.env.CELLUNATIC_BACKEND_URI || "http://localhost:4000"
        }
    }
export const cloudynary_api ={
    cloud_name: 'diaz-web-app', 
    api_key: '234879891383699', 
    api_secret: 'zQHZmdTyDay3sVrSskMoC2S5rWU'
}