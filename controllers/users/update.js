const User = require('../../models/User');
const validateUser = require('../../utils/validateUser');
const { amIAdmin } = require('../../utils/adminUtils');
const { hashPassword } = require('../../utils/hashing');

module.exports = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({
            msg: null,
            error: 'Authentication required',
            data: null
        });
    }

    const usernameToUpdate = req.params.username;
    let user;

    try {
        user = await User.findOne({ username: usernameToUpdate }); if (!user) {
            return res.status(404).json({
                msg: null,
                error: 'User not found',
                data: null
            });
        }
    } catch (error) {
        console.error('Error fetching user:', error); return res.status(500).json({
            msg: null,
            error: 'Error fetching user',
            data: null
        });
    }

    const adminCheck = await amIAdmin(req, res); if (usernameToUpdate !== req.user.username && !adminCheck) {
        return res.status(403).json({
            msg: null,
            error: 'Access denied. You can only update your own profile.',
            data: null
        });
    }

    const { username, email, password, role } = req.body;

    const validation = validateUser({ username, email, password }); if (!validation.isValid) {
        return res.status(400).json({ msg: null, error: validation.errors[0], data: null });
    }

    try {
        if (username) user.username = username;
        if (email) user.email = email;
        const hashedPassword = password ? await hashPassword(password) : null; if (!hashedPassword && password) {
            return res.status(500).json({ msg: null, error: 'Error hashing password', data: null });
        }
        if (hashedPassword) user.password = hashedPassword;
        if (role && adminCheck) user.role = role; await user.save();

        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }; res.status(200).json({
            msg: 'User updated successfully',
            error: null,
            data: userResponse
        });
    } catch (error) {
        console.error('Error updating user:', error); res.status(500).json({
            msg: null,
            error: 'Internal server error',
            data: null
        });
    }
}