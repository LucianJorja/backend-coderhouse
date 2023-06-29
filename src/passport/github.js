import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from "../daos/mongodb/usersDao.js";
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.7f578ec6e1d112de',
    clientSecret: 'a631119c81f1ef5786b0f47dc7ef16d6e9e2dcd7',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email;
    const user = await userDao.getByEmail(email);
    if (user) return done(null, user);

    const newUser = await userDao.createUser({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1],
        email,
        password: ' ',
        isGithub: true
    });

    return done(null, newUser); 
};

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));
