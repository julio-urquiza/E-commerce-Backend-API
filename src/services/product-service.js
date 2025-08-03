import { productDao } from "../daos/mongoDB/product-dao.js"
import CustomError from "../utils/custom-error.js"
import Service from "./service.js"

class ProductService extends Service {
    constructor(dao){
        super(dao)
    }

    paginate = async (query, opciones) => {
        try{
            return this.dao.paginate(query, opciones)
        }catch(error){
            throw error
        }
    }

    
    separateProducts = async (listProducts) => {
        try {
            return listProducts.reduce(async (lists, item) => {
                const productDB = await this.dao.getById(item.product)
                if(productDB.quantity >= item.quantity){
                    lists.aceptedProducts.push(item)
                    productDB.quantity -= item.quantity
                    productDB.save()
                }
                else{
                    lists.rejectedProducts.push(item)
                }
            },{rejectedProducts:[], aceptedProducts:[]})
        } catch(error) {
            throw error
        }
    }

    calculatePrice = async (listProducts) => {
        try {
            return listProducts.reduce(async (acum, item) => {
                const productDB = await this.dao.getById(item.product)
                acum += item.quantity * productDB.price
            },0)
        } catch(error) {
            throw error
        }
    }
}

export const productService = new ProductService(productDao)