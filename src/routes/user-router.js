import CustomRouter from "./custom.router.js";
import { userController } from "../controllers/user-controller.js"
import { verifyResetToken } from "../middlewares/verifyTokenPass.js"
import passport from "passport"

class router extends CustomRouter{
    init() {
        this.post("/register", ['PUBLIC'], userController.register)
        this.post("/login", ['PUBLIC'], userController.login)
        this.get("/sessions/current", ['PUBLIC'], passport.authenticate("current",{ session: false }),userController.usuarioFormat)
        this.get("/recover-password", ['PUBLIC'], userController.recoverPassword)
        this.put("/reset-password/:token", ['PUBLIC'], verifyResetToken, userController.resetPassword)
    }
}

export default new router()

