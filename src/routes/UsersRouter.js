import { Router } from "express";
import passport from "passport";
import { githubResponse } from "../controllers/userController.js";
import { frontResponse } from "../passport/local.js";



const router = Router();

router.post('/register', passport.authenticate('register', frontResponse.register))
router.post('/login', passport.authenticate('login', frontResponse.login))


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/views');
})

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse)

export default router;