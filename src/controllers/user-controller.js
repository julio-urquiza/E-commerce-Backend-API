import { userService } from "../services/user-service.js";
import UserDTO from '../dtos/user-dto.js'

class UserController {
    constructor(service) {
        this.service = service;
    }

    register = async (req, res, next) => {
        try {
            const response = await this.service.register(req.body);
            res.json(response);
        } catch (error) {
            res.status(error.status).json({message: error.message})
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await this.service.login(email, password)
            const token = this.service.generateTokenUser(user)
            res.json({ user, token })
        } catch (error) {
            res.status(error.status).json({message: error.message})
        }
    }

    usuarioFormat = async (req, res, next) => {
        try {
            res.json(new UserDTO(req.user))
        } catch(error) {
            next(error)
        }
    }
}

export const userController = new UserController(userService);