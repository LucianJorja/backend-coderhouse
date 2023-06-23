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
        const user = await userDao.getById(req.session.passport.user);
        const { firstName, lastName, email, age, role } = user;
        req.session.userData = {
            firstName,
            lastName,
            email,
            age,
            role
        };
    } catch (error) {
        next(error);
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        const { firstName, lastName, email, role, isGithub } = req.user;
        res.render('profile', {
            userData: {
                firstName,
                lastName,
                email,
                role,
                isGithub,
            },
        });
    } catch (error) {
        next(error);
    }
};