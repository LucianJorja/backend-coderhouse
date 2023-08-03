import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/userController.js";
import { checkAuth } from '../middlewares/authJwt.js';
const controller = new UserController();
const router = Router();

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/products', checkAuth, controller.profile);


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/views');
})

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/profile-github', checkAuth, passport.authenticate('github', { scope: ['user:email'] }), controller.githubResponse)

export default router;