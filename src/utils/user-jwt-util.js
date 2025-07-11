import jwt from "jsonwebtoken"

export const generateToken = (user, clave) => {
    const payload = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        carrito: user.product,
        age: user.age,
        role: user.role
    }
    return jwt.sign(payload, clave, {
        expiresIn: "20m",
    })
}