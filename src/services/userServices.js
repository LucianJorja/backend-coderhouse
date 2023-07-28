import Services from "./classServices.js";
import UserManager from "../daos/mongodb/managers/userManager.js";

const userManager = new UserManager();

export default class UserService extends Services{
    constructor(){
        super(userManager)
    }

    register = async(user) => {
        try {
            const token = await this.manager.register(user);
            return token;
        } catch (error) {
            console.log(error);
        }
    }

    login = async(user) => {
        try {
            const userExists = await this.manager.login(user);
            return userExists;
        } catch (error) {
            console.log(error);
        }
    }
}