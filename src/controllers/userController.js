import Controllers from "./classController.js";
import UserService from "../services/userServices.js";
import { createResponse, renderView } from "../middlewares/auth.js";
import { userDto } from "../daos/mongodb/dtos/userDto.js";
import UserManager from "../daos/mongodb/managers/userManager.js";
import { createCartsService } from "../services/cartsServices.js";
import { HttpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";
const userService = new UserService();
const userManager = new UserManager();
const httpResponse = new HttpResponse();
export default class UserController extends Controllers {
    constructor() {
        super(userService)
    }

    getUserDto = async (req, res, next) => {
        try {
            const isLoggedIn = req.session.passport
            if (!isLoggedIn) {
                renderView(res, 'products', isLoggedIn);
            } else {
                const user = await userManager.getUserById(req.session.user);
                const userDto = new userDto(user);
                req.session.userDto = userDto;
                renderView(res, 'products', userDto);
            }
        } catch (error) {
            next(error)
        }
    }

    register = async (req, res, next) => {
        try {
            const newCart = await createCartsService()
            const userData = { ...req.body, carts: newCart._id }
            const token = await this.service.register(userData);
            const user = { token, cartId: newCart._id }
            createResponse(res, 200, user);
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        try {
            const userExist = await this.service.login(req.body);
            createResponse(res, 200, userExist);
        } catch (error) {
            renderView(res, 'errorLogin', { error: error.message });
        }
    }

    profile = (req, res, next) => {
        try {
            const { firstName, lastName, email, role } = req.user;
            createResponse(res, 200, { firstName, lastName, email, role })
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

    getAllUsers = async (req, res, next) => {
        try {
            const users = await this.service.getUsers()
            const userArray = users.map((user) => ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            }));
            createResponse(res, 200, userArray);
        } catch (error) {
            createResponse(res, 500, { error: "Internal server error" });
        }
    }
    async deleteInactiveUsers(req, res, next) {
        try {
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

            const inactiveUsers = await userManager.getInactiveUsers(twoDaysAgo);

            await userManager.deleteInactiveUsers(inactiveUsers);

            createResponse(res, 200, { message: 'Inactive users have been deleted and notified.' })
        } catch (error) {
            logger.error(error);
            createResponse(res, 500, { error: "Internal server error" });
        }
    }

    async convertUserToPremium(req, res, next) {
        try {
            const userId = req.params.userId;
            if(req.user.role === 'admin'){
                await userManager.convertToPremium(userId);
                return httpResponse.OK(res, "User updated to premium")
            }else return httpResponse.Unauthorized(res, 'Unauthorized user')
        } catch (error) {
            logger.error(error)
            createResponse(res, 500, { error: "Internal server error" });
        }
    }
}


