import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from "../daos/mongodb/managers/userManager.js";
const userDao = new UserDao();
import config from '../../config.js';

const strategyOptions = {
    clientID: config.CLIENT_ID,
    clientSecret: config.GITHUB_KEY,
    callbackURL: config.CALLBACK_URL
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
