import { Router } from "express"
import { userController } from "../controllers/user-controller.js"
import { verifyResetToken } from "../middlewares/verifyTokenPass.js"
import passport from "passport"


const router = Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/sessions/current", passport.authenticate("current",{ session: false }),userController.usuarioFormat)
router.get("/recover-password", userController.recoverPassword)
// router.put("/reset-password/:token", verifyResetToken)
router.put("/reset-password/:token", verifyResetToken, userController.resetPassword)

export default router
