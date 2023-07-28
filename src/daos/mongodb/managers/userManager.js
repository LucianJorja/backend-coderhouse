import MongoDao from "../mongoDao.js";
import { createHash, isValidPassword } from "../../../middlewares/auth.js";
import config from "../../../../config.js";
import { userModel} from '../models/userModel.js'
import jwt from 'jsonwebtoken';


const SECRET_KEY = config.SECRET_KEY_JWT;


export default class UserManager extends MongoDao {
    constructor(){
        super(userModel);
    }

    #generateToken(user) {
        const payload = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            cartId: user.cartId
        }
        const token = jwt.sign(payload, SECRET_KEY,{
            expiresIn: '20min',
        });
        return token;
    }

    async register(user) {
        try {
            const { email, password} = user;
            const existUser = await this.model.findOne({email});
            if(!existUser){
                if(email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD){
                    const newUser = await userModel.create({...user, password: createHash(password), role: 'admin'});
                    const token = this.#generateToken(newUser);
                    return token;
                }else{
                    const newUser = await userModel.create({...user, password: createHash(password)});
                    const token = this.#generateToken(newUser);
                    return token;
                }
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }

    async login(user) {
        try {
            const {email, password} = user;
            const userExists = await this.getByEmail(email);
            if(userExists){
                const passValid = isValidPassword( userExists, password );
                if(!passValid) return false
                else {
                    const token = this.#generateToken(userExists);
                    return token;
                }
            } return false;
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }

    async getById(id){
        try {
            const userExist = await userModel.findById(id);
            if(userExist){
                return userExist;
            } return false  
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching user by ID');
        }
    }

    async getByEmail(email){
        try {
            const userExist = await this.model.findOne({email});
            if(userExist){
                return userExist;
            } return false;
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }
}