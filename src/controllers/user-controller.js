import userService from "../services/user-service.js"
import UserDTO from '../dtos/user-dto.js'

class UserController {
    constructor(service) {
        this.service = service
    }

    register = async (req, res) => {
        try {
            const response = await this.service.register(req.body)
            res.json(response)
        } catch (error) {
            res.status(error.status).json({message: error.message})
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await this.service.login(email, password)
            const token = this.service.generateTokenUser(user)
            res.json({ message: 'Usuario logeado correctamente', user, token })
        } catch (error) {
            res.status(error.status).json({message: error.message})
        }
    }

    userFormat = async (req, res) => {
        try {
            if(!req.user) res.status(400).json({message: 'el usuario no existe'})
            res.json(new UserDTO(req.user))
        } catch(error) {
            res.status(400).json({message: 'ocurrio un error'})
        }
    }

    recoverPassword = async (req, res) => {
        try {
            const { email } =  req.body
            const user = await this.service.getByEmail(email)
            if(!user) res.status(400).json({message: 'El usuario no existe'})
            const token = this.service.generateTokenPass(email)
            const info = await this.service.sendRecoveryEmail(token, email)
            res.json({message: `Mensaje de recuperacion enviado a ${email}`,info: info})
        }catch(error){
            res.status(error.status).json({message: error.message})
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { password } = req.body
            if(!password && !req.email) res.status(400).json({message: 'datos incorrectos'})
            const changedUser = await this.service.changePassword(req.email, password)
            res.json({message: 'Contraseña modificada con exito', changedUser})
        }catch(error){
            res.status(error.status).json({message: error.message})
        }
    }
}

export default new UserController(userService);