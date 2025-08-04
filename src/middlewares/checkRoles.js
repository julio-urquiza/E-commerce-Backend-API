import passport from "passport"

const checkRoles = (roles) => {
    return (req, res, next) => {
        if (roles.includes("PUBLIC")) return next()

        passport.authenticate("current", { session: false }, (err, user, info) => {
            if (err) return next(err)
            if (!user || !roles.includes(user.role.toUpperCase())) {
                return res.status(403).send({ error: "Unauthorized" })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}
export default checkRoles