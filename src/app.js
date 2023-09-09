
import express from 'express'
import routes from './routes/routes'
import cors from 'cors'
import {createRoles} from './libs/initialSetup'
import path  from 'path'

const app = express()
createRoles()

const corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.use(express.json())

app.use("/imagenes", express.static(path.resolve("uploads")) )

app.use('/api',routes)

export default app  