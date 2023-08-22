export const productValidator = (req, res, next) => {
    try {
        const { title, description, price, stock, category } = req.body;

        if (!title || !description || !price || !stock || !category) {
            return res.status(400).json({
                message: 'Invalid or missing property or value.',
                details: 'Product must contain the following properties: title, description, price, stock, category.',
            });
        }

        next();
    } catch (error) {
        throw new Error(error.message)
    }
};