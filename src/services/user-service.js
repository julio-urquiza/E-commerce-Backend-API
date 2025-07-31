import { userDao } from "../daos/mongoDB/user-dao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPassword } from "../utils/user-bcrypt-utils.js";
import { generateToken, generateTokenPass } from "../utils/user-jwt-util.js";
import { sendMail } from "../utils/mailer.js"
import Service from "./service.js";
import { cartService } from "./cart-service.js";
import 'dotenv/config'

class UserService extends Service{
  constructor(dao) {
    super(dao)
  }

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.dao.getByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 400);
      // crear carrito
      const carrito = await cartService.create({products:[]})
      if(!carrito) throw new CustomError("El carrito no se pudo crear", 400);
      //crear user
      const response = await this.dao.create({
        ...body,
        cart:carrito._id,
        password: createHash(password),
      });
      if (!response) throw new CustomError("Error al registrar usuario", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
      const passValid = isValidPassword(password, userExist.password);
      if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
      return userExist;
    } catch (error) {
      throw error;
    }
  }
  
  generateTokenUser = user => generateToken(user,process.env.CLAVE)

  generateTokenPass = email => generateTokenPass(email,process.env.CLAVEPASS)

  getByEmail = async (email) => {
    try{
      return await this.dao.getByEmail(email)
    } catch(error) {
      throw error
    }
  }

  sendRecoveryEmail = async (token, email) => {
    try {
      const info = await sendMail(
        email,
        'Recuperación de contraseña',
        `<p>
          Se ha creado un enlace de recuperacion de contraseña con una duracion de 60 minutos:<br>
          http://localhost:${process.env.PUERTO}/api/reset-password/${token}
        </p>`
      )
      return info
    } catch(error) {
      throw error
    }
  }
  changePassword = async (email, password) => {
    try {
      const user = await this.dao.getByEmail(email)
      if(!user) throw new CustomError("Usuario no encontrado", 400);
      user.password = createHash(password)
      const response = await this.dao.update(user.id,user)
      if(!response) throw new CustomError('No se pudo modificar la contraseña',400)
      return response
    } catch(error) {
      throw error
    }
  }

}

export const userService = new UserService(userDao)