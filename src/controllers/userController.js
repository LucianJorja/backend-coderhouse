import UserDao from "../daos/mongodb/usersDao.js";
const userDao = new UserDao();

export const registerResponse = (req, res, next) => {
    try {
        res.render('register', {session: req.session})
    } catch (error) {
        next(error);
    }
}

export const loginResponse = async (req, res, next) => {
    try {
        const user = await userDao.getById(req.session.passport.user)
        console.log('user', user);
        const { firstName, lastName, email, age } = user;
        res.render('products', {firstName, lastName, email, age})
    } catch (error) {
        next(error);
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        const {firstName, lastName, email} = req.user;
        res.render('profile', {firstName, lastName, email})
    } catch (error) {
        next(error);
    }
};

