import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import config from '../../config.js';
import UserManager from "../daos/mongodb/managers/userManager.js";
const userManager = new UserManager();


const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.env.SECRET_KEY_JWT
}

const cookieExtractor = (req) => {
    const token = req.cookie.token
    return token;
}

const strategyOptionsCookie = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.env.SECRET_KEY_JWT
}

const verifyToken = async (req, res, next) => {
    const user = await userManager.getById(jwt_payload.user_id);
    if(!user) return done(null, false)
    return done(null, jwt_payload)
}

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken));
passport.use('jwtCookies', new jwtStrategy(strategyOptionsCookie, verifyToken));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser( async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user)
})