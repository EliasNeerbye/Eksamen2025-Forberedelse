const User = require('../models/User');

const checkAdminRole = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                error: 'Authentication required'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({
                error: 'User not found'
            });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({
                error: 'Admin access required. Insufficient privileges.'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            error: 'Error verifying admin privileges'
        });
    }
};

module.exports = {
    checkAdminRole
};
