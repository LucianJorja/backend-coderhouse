import { userModel } from "./models/userModel.js";

export default class UserDao {
    async createUser(user) {
        try {
            const {email, password} = user;
            const existUser = await userModel.find({email, password});
            if(existUser.length === 0){
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    return await userModel.create({...user, role: 'admin'});
                }
                const newUser = await userModel.create(user);
                return newUser;
            }else{
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }

    async loginUser(user) {
        try {
            const {email, password} = user;
            const userExists = await userModel.find({email, password});
            if(userExists.length !== 0){
                return userExists
            }else{
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }
}