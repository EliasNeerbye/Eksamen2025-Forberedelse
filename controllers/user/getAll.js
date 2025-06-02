const User = require('../../models/user');

module.exports = async (req, res) => {
    try {
        const users = await User.find({}, 'username');

        const usernames = users.map(user => user.username);

        res.status(200).json({ msg: 'Users retrieved successfully', error: null, users: usernames });
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ msg: null, error: 'Internal server error', users: null });
    }
}