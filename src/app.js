import express from "express"
import passport from './config/jwt-strategy.js';
import { initMongoDB } from "./config/db.js";
import 'dotenv/config'

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('./src/public'))

app.use(passport.initialize())

app.get('/',(req,res) => {
    res.json({message: 'funciona'}) 
})

initMongoDB()
    .then(() => console.log("conectado a mongo"))
    .catch((error) => console.log(error))

app.listen(process.env.PUERTO, () => { 
    console.log(`http://localhost:${process.env.PUERTO}/`) 
})