import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import config from '../../config.js';
import UserManager from '../daos/mongodb/managers/userManager.js';
const userManager = new UserManager();

const strategyOptions = {
    clientID: config.CLIENT_ID,
    clientSecret: config.GITHUB_KEY,
    callbackURL: config.CALLBACK_URL
};



const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email;
    const user = await userManager.getByEmail(email);
    if (user) return done(null, user);

    const newUser = await userManager.login({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1],
        email,
        password: ' ',
        isGithub: true
    });

    return done(null, newUser); 
};

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));
