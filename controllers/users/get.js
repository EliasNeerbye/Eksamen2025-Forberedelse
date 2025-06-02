const User = require('../../models/User');

module.exports = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ msg: null, error: 'Username parameter is required', user: null });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: null, error: 'User not found', user: null });
        }

        res.status(200).json({ msg: 'User found successfully', error: null, user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ msg: null, error: 'Internal server error', user: null });
    }
}