export const cartValidator = (req, res, next) => {
    try {
        const { quantity } = req.body;
        if (!quantity || quantity <= 0){
            return res.status(400).json({
                message: 'Invalid or missing property or value.',
                details: "Cart must have at least 1 product to move on with the purchase."
            });
        }
        next();
    } catch (error) {
        throw new Error(error.message);
    }
}