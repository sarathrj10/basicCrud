import express,{Request,Response} from 'express'
import bodyParser from 'body-parser'

import settings from './config'
import router from './routes'
import {connect} from './config/database'

const app = express()

// connect mongoDb
connect()

// parse the request
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.all('/api/*', router);

// error handling 
app.use((err :Error,req:Request,res:Response) => {
    console.log("err--->",err)
    res.status(500).json({message : err.message})
})

app.listen(settings.server.port,()=>{
    console.log(`server is running on : http://${settings.server.host}:${settings.server.port}`)
})