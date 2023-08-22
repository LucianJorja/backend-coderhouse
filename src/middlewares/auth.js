import bcrypt from 'bcrypt' ;
import { v4 as uuidv4 } from 'uuid';
import { faker } from "@faker-js/faker";


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json(data);
}

export const renderView = (res, viewName, data) => {
    return res.render(viewName, data);
}

export const codeGenerator = () =>{
    return uuidv4();
};

export const generateProducts = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 1000, max: 15000}),
        category: faker.commerce.department()
    }
}
