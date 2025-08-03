import jwt from 'jsonwebtoken'
import "dotenv/config"

export const verifyResetToken = (req, res, next) => {
    try {
        const { token } = req.params
        const decoded = jwt.verify(token, process.env.CLAVEPASS)
        req.email = decoded.email
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}
