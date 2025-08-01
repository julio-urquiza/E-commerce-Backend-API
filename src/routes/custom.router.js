import { Router } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

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

    get(path, roles, ...callbacks) {
        this.router.get(path, this.checkRoles(roles), this.resolveCallbacks(callbacks))
    }

    post(path, roles, ...callbacks) {
        this.router.post(path, this.checkRoles(roles), this.resolveCallbacks(callbacks))
    }

    put(path, roles, ...callbacks) {
        this.router.put(path, this.checkRoles(roles), this.resolveCallbacks(callbacks))
    }

    delete(path, roles, ...callbacks) {
        this.router.delete(path, this.checkRoles(roles), this.resolveCallbacks(callbacks))
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

    checkRoles = (roles) => {
        return (req, res, next) => {
        try {
            if (roles.includes("PUBLIC")) return next()

            const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
            if (!token) return res.status(401).send({ error: "No token provided" })

            const user = jwt.verify(token, process.env.JWT_SECRET)
            if (!roles.includes(user.role.toUpperCase())) {
            return res.status(403).send({ error: "No tenés permisos suficientes" })
            }

            req.user = user
            next()
        } catch (error) {
            res.status(401).send({ error: "Token inválido o expirado" })
        }
        }
    }
    init() {
        throw new Error("Metodo init() no implementado")
    }
}