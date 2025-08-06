import { cartService } from "../services/cart-service.js"

class CartController {
    constructor(service) {
        this.service = service
    }

    createCart = async (req, res) => {
        try{
            const cart = req.body
            const result = await this.service.create(cart)
            res.send({status: 'success', mensaje: 'carrito creado correctamente', result})
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    AddProductCart = async (req, res) => {
        try{
            const {cart} = req.user
            const products = req.body
            const result = await this.service.addProducts(cart,products)
            res.send(result)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    getAllProducts = async (req, res) => {
        try{
            const {cart} = req.user
            const result = await this.service.getByIdPop(cart)
            res.send(result)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    listAllCarts = async (req, res) => {
        try{
            const cart = await this.service.findPopulate()
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    UpdateQuantityCart = async (req, res) => {
        try{
            const {cart} = req.user
            const result = await this.service.updateOne({_id: cart , 'products.product': req.body.product},{ $set: {'products.$.quantity': req.body.quantity } })
            res.send(result)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }


    RemoveAllProductsCart = async (req, res) => {
        try{
            const {cart} = req.user
            const result = await this.service.deleteAllProducts(cart)
            res.send(result)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    RemoveProductCart = async (req, res) => {
        try{
            const {cart} = req.user
            const {pid} = req.params
            const result = await this.service.deleteProduct(cart, pid)
            res.send(result)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    completePurchase = async (req, res) => {
        try {
            const result = await this.service.createTicket(req.user)
            res.send(result)
        }
        catch(error) {
            res.send({status: 'Ocurrio un error', message: error.message })
        }
    }
}

export default new CartController(cartService)