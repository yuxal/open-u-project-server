const userRepository = require('../repositories/userRepsitory');
exports.verifyAdmin = async (req, res, next) => {
    try {
        const isAdmin = await userRepository.isCurrentUserAdmin(req.userId);
        if (!isAdmin) {
            return res.status(401).json({ message: 'This is a Admin Only Api' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Fail to verify Admin' });
    }
}