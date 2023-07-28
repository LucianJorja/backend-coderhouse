import Controllers from "./classController.js";
import UserService from "../services/userServices.js";
import { renderView } from "../middlewares/auth.js";
import { userDto } from "../daos/mongodb/dtos/userDto.js";
const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(userService)
    }

    register = async (req, res, next) => {
        try {
            const token = await this.service.register(req.body);
            renderView(res, 'register', { token });
        } catch (error) {
            renderView(res, 'errorRegister', { error: error.message });
        }
    }

    login = async (req, res, next) => {
        try {
            const userExist = await this.service.login(req.body);
            const { firstName, lastName, email, age } = userExist;
            renderView(res, 'products', { firstName, lastName, email, age });
        } catch (error) {
            renderView(res, 'errorLogin', { error: error.message });
        }
    }

    profile = (req, res, next) => {
        try {
            const { firstName, lastName, email, age } = req.user;
            renderView(res, 'products', { firstName, lastName, email, age });
        } catch (error) {
            renderView(res, 'errorLogin', { error: error.message });
        }
    }

    githubResponse = async (req, res, next) => {
        try {
            const { firstName, lastName, email } = req.user;
            renderView(res, 'profile', { firstName, lastName, email })
        } catch (error) {
            next(error);
        }
    }

    getCurrentUser = async (req, res, next) => {
        try {
            const { userId } = req;
            const userDTO = await this.service.getById(userId);
            if (!userDTO) {
                createResponse(res, 404, { error: "User not found" });
            } else {
                createResponse(res, 200, userDTO);
            }
        } catch (error) {
            createResponse(res, 500, { error: "Internal server error" });
        }
    };

}


