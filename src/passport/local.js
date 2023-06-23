import UserDao from "../daos/mongodb/usersDao.js";
const userDao = new UserDao();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const StrategyOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}
const signup = async (req, email, pasword, done) =>{
    try {
        const user = await userDao.getByEmail(email);
        if (user) return done(null, false);
        const newUser = await userDao.createUser(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, email, password, done) =>{
    try {
        const user = { email, password };
        const userLogin = await userDao.loginUser(user)
        if (!userLogin) return done(null, false);
        req.session.email = userLogin.email;
        console.log('email', req.session.email);
        req.session.userData = {
            firstName: userLogin.firstName,
            lastName: userLogin.lastName,
            email: userLogin.email,
            age: userLogin.age,
            role: userLogin.role
        };
        console.log('user', req.session.userData);
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
}

const signupStrategy = new LocalStrategy(StrategyOptions, signup);
const loginStrategy = new LocalStrategy(StrategyOptions, login);

passport.use('register', signupStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) =>{
    done(null, user._id);
});

passport.deserializeUser(async(id, done) =>{
    const user = await userDao.getById(id);
    return done(null, user);
})

export const frontResponse = {
    login:{
        failureRedirect: '/views/error-login',
        successRedirect: '/views/products',
        passReqToCallback: true,
    },
    register:{
        failureRedirect: '/views/error-register',
        successRedirect: '/views',
        passReqToCallback: true,            
    }
}
