import express from "express"
import passport from './config/jwt-strategy.js';
import { initMongoDB } from "./config/db.js";
import router from "./routes/index.router.js";
import 'dotenv/config'

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('./src/public'))

// passport
app.use(passport.initialize())

// rutas
app.use('/',router)

// MongoDB
initMongoDB()
    .then(() => console.log("conectado a mongo"))
    .catch((error) => console.log(error))

app.listen(process.env.PUERTO, () => { 
    console.log(`http://localhost:${process.env.PUERTO}/`) 
})