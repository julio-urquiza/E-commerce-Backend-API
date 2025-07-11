import passport from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import "dotenv/config"

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.CLAVE
}

const verifyToken = async (jwt_payload, done) => {
    if (!jwt_payload) return done(null, false, { messages: "Invalid Token" })
    return done(null, jwt_payload)
}

passport.use("current", new Strategy(strategyConfig, verifyToken))

export default passport