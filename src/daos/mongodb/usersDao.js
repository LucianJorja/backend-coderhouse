import { userModel } from "./models/userModel.js";
import { createHash, isValidPassword} from "../../path.js";
export default class UserDao {
    async createUser(user) {
        try {
            const { email, password} = user;
            const existUser = await userModel.findOne({email});
            if(!existUser){
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    const newUser = await userModel.create({...user, password: createHash(password), role: 'admin'});
                    return newUser;
                }else{
                    const newUser = await userModel.create({...user, password: createHash(password)});
                    return newUser;
                }
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }

    async loginUser(user) {
        try {
            const {email, password} = user;
            const userExists = await this.getByEmail(email);
            if(userExists){
                const passValid = isValidPassword( userExists, password );
                if(!passValid) return false
                else return userExists;
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
            const userExist = await userModel.findOne({email});
            if(userExist){
                return userExist;
            } return false;
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }
}