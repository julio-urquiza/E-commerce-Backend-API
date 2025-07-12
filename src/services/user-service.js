import { userDao } from "../daos/mongoDB/user-dao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPassword } from "../utils/user-bcrypt-utils.js";
import { generateToken } from "../utils/user-jwt-util.js";
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
        product:carrito._id,
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
}

export const userService = new UserService(userDao)