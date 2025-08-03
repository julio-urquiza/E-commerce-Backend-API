import { Router } from "express"

export default class CustomRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter() {
        return this.router
    }

    use(...middlewares) {
        this.router.use(...middlewares)
    }

    get(path, ...callbacks) {
        this.router.get(path, this.resolveCallbacks(callbacks))
    }

    post(path, ...callbacks) {
        this.router.post(path, this.resolveCallbacks(callbacks))
    }

    put(path, ...callbacks) {
        this.router.put(path, this.resolveCallbacks(callbacks))
    }

    delete(path, ...callbacks) {
        this.router.delete(path, this.resolveCallbacks(callbacks))
    }

    resolveCallbacks(callbacks) {
        return callbacks.map((cb) => async (...params) => {
            try {
                await cb.apply(this, params)
            } catch (error) {
                params[1].status(500).send({ status: "error", message: error.message })
            }
        })
    }

    init() {
        throw new Error("Metodo init() no implementado")
    }
}