import Service from "./service.js"
import cartDao from "../daos/mongoDB/cart-dao.js"
import ticketService from "./ticket-service.js"
import productService from "./product-service.js"
import makeRandomCode from '../utils/random-string.js'
import CustomError from "../utils/custom-error.js"


class CartService extends Service {
    constructor(dao){
        super(dao)
    }

    addProducts = async (id, products) => {
        try {
            const cart = await this.dao.getById(id)
            products.forEach(i => {
                const productFound = cart.products.find(item => item.product == i.product)
                if(productFound) {
                    productFound.quantity += i.quantity
                    return
                }
                else {
                    cart.products.push(i)
                }
            })
            await cart.save()
            return cart
        } catch (error) {
            throw error
        }
    }

    deleteAllProducts = async (id) => {
        try {
            return await this.dao.update(id,{ $set: { products: [] } })
        } catch (error) {
            throw error
        }
    }

    deleteProduct = async (cid, pid) => {
        try {
            return await this.service.update(cid,{ $pull: { products: { product: pid }}})
        } catch (error) {
            throw error
        }
    }

    getByIdPop = async (id) => {
        try{
            // const cart = await this.dao.getById(id)
            // return cart.populate('products.product')
            return (await this.dao.getById(id)).populate('products.product', '_id title price')
        }catch (error) {
            throw error
        }
    }

    findPopulate = async () => {
        try{
            return (await this.dao.getAll()).populate('products.product', '_id title price')
        }catch(error){
            throw error
        }
    }

    createTicket = async (user) => {
        try {
            const cart = await this.dao.getById(user.cart)
            const {rejectedProducts, aceptedProducts} = await productService.separateProducts(cart.products)
            cart.products = rejectedProducts
            await cart.save()
            if(!aceptedProducts.length) throw new Error('No se pudo agregar los productos a la compra')
            const ticket = await ticketService.create(
                {
                    code: makeRandomCode(20),
                    amount: await productService.calculatePrice(aceptedProducts),
                    purchaser: user.email,
                    products: aceptedProducts
                }
            )
            return ticket.populate('products.product', '_id title price')
        } catch (error) {
            throw error
        }
    }
}

export default new CartService(cartDao)