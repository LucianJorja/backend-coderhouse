import UserManager from "../daos/mongodb/managers/userManager.js";
import { getAllService, createService, getServiceById, updateService, deleteServiceById } from "../services/productsServices.js";
import { HttpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";
import { createTransport } from "nodemailer";
import config from "../../config.js";
const httpResponse = new HttpResponse();
const userManager = new UserManager();
export const getAllController =  async (req, res, next) => {
    try {
        const {limit = 10, page = 1, sort, query} = req.query;
        const sortOptions = {};
        const queryOptions = {};
        if (sort === 'asc'){
            sortOptions.price = -1;
        }else if (sort === 'desc'){
            sortOptions.price = 1;
        }
        if(query){
            queryOptions.category = query;
        }

        const products = await getAllService( page, limit,queryOptions, sortOptions)

        const next = products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}` : null
        const prev = products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}` : null
        
        res.json({
            status: 'success', 
            payload: products.docs,
            next,
            prev
        });
    } catch (error) {
        logger.error(error)
        next(error);
    }
}
export const createController =  async (req, res, next) => {
    try {
        const ownerEmail = req.user.email;
        const { title, description, price, stock, category } = req.body
        let role = 'user'
        if (req.user.role === 'premium') {
            role = 'premium'
        }

        const newProduct = await createService ({title, description, price, stock, category, ownerEmail, owner: role})
        httpResponse.OK(res, newProduct);
    } catch (error) {
        logger.error(error)
        next(error);
    }
}
export const getControllerById =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await getServiceById(id);
        httpResponse.OK(res, doc)
    } catch (error) {
        logger.error(error)
        next(error);
    }
}
export const updateController =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {title, description, price, stock, category} = req.body;
        await getServiceById(id);
        const updatedDoc = await updateService(id, {title, description, price, stock, category})
        httpResponse.OK(res, updatedDoc)
    } catch (error) {
        logger.error(error)
        next(error);
    }
}
export const delController =  async (req, res, next) => {
    try {
        const ownerEmail = req.user.email;
        const { id } = req.params;
        const product = await getServiceById(id);
        if (!product) {
            return httpResponse.NotFound(res,'Product not found');
        }
        const owner = product.owner;

        if (!owner) {
            return httpResponse.NotFound(res, 'Owner not found');
        }

        if (owner === 'premium') {
            const transporter = createTransport({
                service: 'gmail',
                port: 465, 
                secure: true,
                auth: {
                    user: config.EMAIL,
                    pass: config.PASSWORD
                }
            });

            const gmailOptions = {
                from: config.ADMIN_EMAIL,
                to: ownerEmail,
                subject: 'Product Deletion Notification',
                text: `Your premium account product '${product.title}' has been deleted.`,
            };
            const response = await transporter.sendMail(gmailOptions);
            if(response) {
                await deleteServiceById(id, response);
                return httpResponse.OK(res, {message: 'Deleted successfully and email was successfully sent.'});
            }else{
                return httpResponse.NotFound(res, 'Couldnt proceed with the mail');
            }
        }else {
            await deleteServiceById(id);
            httpResponse.OK(res, {message: 'Deleted successfully'});
        }

    } catch (error) {
        logger.error(error)
        next(error);
    }
};