import { getAllService, createService, getServiceById, updateService, deleteServiceById } from "../services/productsServices.js";

export const getAllController =  async (req, res, next) => {
    try {
        const docs = await getAllService();
        res.json(docs);
    } catch (error) {
        next(error);
    }
}
export const createController =  async (req, res, next) => {
    try {
        const { title, description, price, stock } = req.body
        const newProduct = await createService ({title, description, price, stock})
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
}
export const getControllerById =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await getServiceById(id);
        res.json(doc);
    } catch (error) {
        next(error);
    }
}
export const updateController =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {title, description, price, stock} = req.body;
        await getServiceById(id);
        const updatedDoc = await updateService(id, {title, description, price, stock})
        res.json(updatedDoc);
    } catch (error) {
        next(error);
    }
}
export const delController =  async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteServiceById(id);
        res.json({message: 'Deleted Successfully!'});
    } catch (error) {
        next(error);
    }
}
