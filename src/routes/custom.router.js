import { Router } from "express"
import checkRoles from "../middlewares/checkRoles.js"

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

    get(path, permissions,  ...callbacks) {
        this.router.get(path, checkRoles(permissions), this.resolveCallbacks(callbacks))
    }

    post(path, permissions,  ...callbacks) {
        this.router.post(path, checkRoles(permissions),  this.resolveCallbacks(callbacks))
    }

    put(path, permissions,  ...callbacks) {
        this.router.put(path, checkRoles(permissions),  this.resolveCallbacks(callbacks))
    }

    delete(path, permissions,  ...callbacks) {
        this.router.delete(path, checkRoles(permissions),  this.resolveCallbacks(callbacks))
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
        throw new Error("Init() method not implemented")
    }
}