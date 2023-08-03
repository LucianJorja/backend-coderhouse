import jwt from "jsonwebtoken";
import config from '../../config.js';
import UserManager from "../daos/mongodb/managers/userManager.js";

const userManager = new UserManager();

const PRIVATE_KEY = config.SECRET_KEY_JWT;

export const checkAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    
    if (!authHeader) return res.status(401).json({msg: 'Unauthorized'});

    try {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(
            token,
            PRIVATE_KEY
        )
        const user = await userManager.getById(decode.userId);
        
        if(!user) return res.status(400).json({msg: 'Unauthorized'});
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Unauthorized' });
    }
}

