import { getAllService, createService, getServiceById, updateService, deleteServiceById } from "../services/productsServices.js";

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
        next(error);
    }
}
export const createController =  async (req, res, next) => {
    try {
        const { title, description, price, stock, category } = req.body
        const newProduct = await createService ({title, description, price, stock, category})
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
        const {title, description, price, stock, category} = req.body;
        await getServiceById(id);
        const updatedDoc = await updateService(id, {title, description, price, stock, category})
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
