const User = require('../models/User');

const amIAdmin = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            msg: null,
            error: 'Authentication required',
            user: null
        });
    }
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                msg: null,
                error: 'User not found',
                user: null
            });
        }

        const isAdmin = user.role === 'admin';

        return isAdmin;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return res.status(500).json({
            msg: null,
            error: 'Internal server error',
            user: null
        });
    }
}
module.exports = {
    amIAdmin
};