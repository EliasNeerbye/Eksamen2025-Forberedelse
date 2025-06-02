const User = require('../../models/User');

module.exports = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            msg: null,
            error: 'Authentication required',
            user: null
        });
    }
    const usernameToDelete = req.params.username;
    let user;
    try {
        user = await User.findOne({ username: usernameToDelete });
        if (!user) {
            return res.status(404).json({
                msg: null,
                error: 'User not found',
                user: null
            });
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            msg: null,
            error: 'Error fetching user',
            user: null
        });
    }
    const adminCheck = await amIAdmin(req, res);
    if (usernameToDelete !== req.user.username && !adminCheck) {
        return res.status(403).json({
            msg: null,
            error: 'Access denied. You can only delete your own profile.',
            user: null
        });
    }
    try {
        await User.deleteOne({ username: usernameToDelete });
        return res.status(200).json({
            msg: 'User deleted successfully',
            error: null,
            user: null
        });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            msg: null,
            error: 'Error deleting user',
            user: null
        });
    }
}