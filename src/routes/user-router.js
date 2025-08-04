import CustomRouter from "./custom.router.js";
import { userController } from "../controllers/user-controller.js"
import { verifyResetToken } from "../middlewares/verifyTokenPass.js"
import checkRoles from "../middlewares/checkRoles.js";

class router extends CustomRouter{
    init() {
        this.post("/register", checkRoles(['PUBLIC']), userController.register)
        this.post("/login", checkRoles(['PUBLIC']), userController.login)
        this.get("/sessions/current", checkRoles(['ADMIN', 'USER']), userController.usuarioFormat)
        this.get("/recover-password", checkRoles(['PUBLIC']), userController.recoverPassword)
        this.put("/reset-password/:token", checkRoles(['PUBLIC']), verifyResetToken, userController.resetPassword)
    }
}

export default new router()

