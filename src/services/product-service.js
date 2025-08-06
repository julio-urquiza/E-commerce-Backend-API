import { productDao } from "../daos/mongoDB/product-dao.js"
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
            const lists = {rejectedProducts:[], aceptedProducts:[]}
            for (const item of listProducts){
                const productDB = await this.dao.getById(item.product)
                if(productDB.stock >= item.quantity){
                    lists.aceptedProducts.push(item)
                    productDB.stock -= item.quantity
                    await productDB.save()
                }
                else{
                    lists.rejectedProducts.push(item)
                }
            }
            return lists
        } catch(error) {
            throw error
        }
    }

    calculatePrice = async (listProducts) => {
        try {
            let acum = 0
            for(const item of listProducts){
                const productDB = await this.dao.getById(item.product)
                acum += item.quantity * productDB.price
            }
            return acum
        } catch(error) {
            throw error
        }
    }
}

export const productService = new ProductService(productDao)