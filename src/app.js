import express from "express"
import passport from './config/jwt-strategy.js';
import { initMongoDB } from "./config/db.js";
import routerUser from "./routes/user-router.js"
import routerProducts from "./routes/products.router.js"
import routerCarts from "./routes/cart.router.js"
import 'dotenv/config'

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('./src/public'))

// passport
app.use(passport.initialize())

// rutas
app.use('/api',routerUser)
app.use('/api/products',routerProducts)
app.use('/api/carts',routerCarts)

// MongoDB
initMongoDB()
    .then(() => console.log("conectado a mongo"))
    .catch((error) => console.log(error))

app.listen(process.env.PUERTO, () => { 
    console.log(`http://localhost:${process.env.PUERTO}/`) 
})