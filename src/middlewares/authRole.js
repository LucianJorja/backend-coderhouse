export const isAdmin = (req, res, next) => {

    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'You are not authorized to perform this action.' });
};

export const isUser = (req, res, next) => {

    if (req.user && req.user.role === 'user') {
        return next();
    }
    res.status(403).json({ message: 'You are not authorized to perform this action.' });
};

export const checkUserRole = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'premium')) {
        next();
    } else {
        res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }
};