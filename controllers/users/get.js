const User = require('../../models/User');

module.exports = async (req, res) => {
    try {
        const { username } = req.params; if (!username) {
            return res.status(400).json({ msg: null, error: 'Username parameter is required', data: null });
        } const user = await User.findOne({ username }); if (!user) {
            return res.status(404).json({ msg: null, error: 'User not found', data: null });
        }

        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        res.status(200).json({ msg: 'User found successfully', error: null, data: userResponse });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ msg: null, error: 'Internal server error', data: null });
    }
}