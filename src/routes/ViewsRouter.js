import { Router } from "express";
const router = Router();

router.get('/', (req, res) =>{
    res.render('login')
})
router.get('/register', (req, res) =>{
    res.render('register')
})
router.get('/error-register', (req, res) =>{
    res.render('errorRegister')
})
router.get('/error-login', (req, res) =>{
    res.render('errorLogin')
})
router.get('/products', (req, res) =>{
    const user = req.user;
    const { firstName, lastName, email, age } = user;
    res.render('products', {firstName, lastName, email, age})
})
router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/views')
})
router.get('/profile-github', (req, res) =>{
    res.render('profile')
})


export default router;


