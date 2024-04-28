const jwt = require('jsonwebtoken');

exports.SUPER_SECRET_KEY = 'supersecretkey';
exports.protectedRoute = async (req, res, next) => {
    const token = req.params.token; // Extract token from URL params
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, this.SUPER_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Got token but could not verify' });
    }
}