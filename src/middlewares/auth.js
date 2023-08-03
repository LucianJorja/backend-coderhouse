import bcrypt from 'bcrypt' ;
import { v4 as uuidv4 } from 'uuid';
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