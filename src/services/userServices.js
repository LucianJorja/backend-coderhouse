import Services from "./classServices.js";
import UserManager from "../daos/mongodb/managers/userManager.js";
import { logger } from "../utils/logger.js";

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
            logger.error(error.message)
            throw new Error(error.message);
        }
    }

    login = async(user) => {
        try {
            const userExists = await this.manager.login(user);
            return userExists;
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message);
        }
    }

    getUsers = async() => {
        try {
            const users = await this.manager.getAllUsers();
            return users;
        } catch (error) {
            logger.error(error.message)
        }
    }

    
}