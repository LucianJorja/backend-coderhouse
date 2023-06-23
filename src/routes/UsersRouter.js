import { Router } from "express";
import passport from "passport";
import { registerResponse, loginResponse, githubResponse } from "../controllers/userController.js";
import { frontResponse } from "../passport/local.js";



const router = Router();

router.post('/register', passport.authenticate('register', frontResponse.register), registerResponse)
router.post('/login', passport.authenticate('login', frontResponse.login), loginResponse)

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/views');
})

router.get('/register-github', passport.authenticate('github', { scope: ['user:email']}))

router.get('/profile-github', passport.authenticate('github', {scope: ['user:email']}), githubResponse )

export default router;