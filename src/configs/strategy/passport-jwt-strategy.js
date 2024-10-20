const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const knex = require('../db/knex')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // Use environment variable in production
};

const strategy = new JwtStrategy(options, async (jwtPayload, next) => {
    try {
        const result = await knex('users').where({userId: jwtPayload.userId}).first()
        if (result) {
            return next(null, jwtPayload);
        }
        return next(null, false);
    } catch (error) {
        return next(error, false);
    }
});

module.exports = (passport) => {
    passport.use(strategy);
};