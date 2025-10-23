import express from "express"
import passport from './config/jwt-strategy.js'
import cors from 'cors'
import mongooseSingleton  from "./config/db.js"
import router from "./routes/index.router.js"
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(passport.initialize())

app.use('/',router)

await mongooseSingleton.connect(process.env.MONGO_CONEXION);

app.listen(process.env.PUERTO, () => console.log(`http://localhost:${process.env.PUERTO}/api-docs`))