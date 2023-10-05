import MongoDao from "../mongoDao.js";
import { createHash, isValidPassword } from "../../../middlewares/auth.js";
import config from "../../../../config.js";
import { userModel } from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import { logger } from "../../../utils/logger.js";
import { createTransport } from "nodemailer";

const SECRET_KEY = config.SECRET_KEY_JWT;


export default class UserManager extends MongoDao {
    constructor() {
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
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '20min',
        });
        return token;
    }

    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.model.findOne({ email });
            if (!existUser) {
                if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
                    const newUser = await userModel.create({ ...user, password: createHash(password), role: 'admin' });
                    const token = this.#generateToken(newUser);
                    return token;
                } else {
                    const newUser = await userModel.create({ ...user, password: createHash(password) });
                    const token = this.#generateToken(newUser);
                    return token;
                }
            } else {
                throw new Error('Invalid');
            }
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        }
    }

    async login(user) {
        try {
            const { email, password } = user;
            const userExists = await this.model.findOne({ email });
            if (userExists) {
                const passValid = isValidPassword(userExists, password);
                if (!passValid) return false
                else {
                    const token = this.#generateToken(userExists);
                    return token;
                }
            } return false;
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        }
    }

    async getAllUsers() {
        try {
            const users = await userModel.find({}).maxTimeMS(30000);
            return users;
        } catch (error) {
            logger.error(error)
        }

    }

    async getById(id) {
        try {
            const userExist = await userModel.findById(id);
            if (userExist) {
                return userExist;
            } return false
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({ email });
            if (userExist) {
                return userExist;
            } return false;
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        }
    }

    async getInactiveUsers(olderThanDate) {
        try {
            const inactiveUsers = await userModel.find({ lastActivity: { $lt: olderThanDate } });
            return inactiveUsers;
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        }
    }

    async deleteInactiveUsers(usersToDelete) {
        try {
            for (const user of usersToDelete) {
                await userModel.findByIdAndDelete(user._id);

                const transporter = createTransport({
                    service: 'gmail',
                    port: 465,
                    secure: true,
                    auth: {
                        user: config.EMAIL,
                        pass: config.PASSWORD
                    }
                });

                await transporter.sendMail({
                    from: config.EMAIL,
                    to: user.email,
                    subject: 'Account Deletion Due to Inactivity',
                    text: 'Your account has been deleted due to inactivity.',
                });
            }
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        }
    }

    async convertToPremium(id) {
        try {
            const result = await userModel.updateOne({ _id: id }, { $set: { role: 'premium' } });
            if(result){
                return result;   
            } else return false
    
        } catch (error) {
            logger.error(error)
            throw new Error(error)
        }
    }
}