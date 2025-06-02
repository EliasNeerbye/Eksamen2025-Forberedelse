const User = require('../../models/User');
const { verifyPassword } = require('../../utils/hashing');
const { generateToken } = require('../../utils/jwtUtil');
const { createJwtCookie } = require('../../utils/cookie');

const loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username && !email) {
        return res.status(400).json({
            msg: null,
            error: 'Username or email is required',
            user: null
        });
    }
    if (!password) {
        return res.status(400).json({
            msg: null,
            error: 'Password is required',
            user: null
        });
    }

    try {
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            return res.status(404).json({
                msg: null,
                error: 'User not found',
                user: null
            });
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: null,
                error: 'Invalid password',
                user: null
            });
        }

        const token = generateToken({
            id: user._id,
            username: user.username,
            email: user.email,
        });

        if (!token) {
            return res.status(500).json({
                msg: null,
                error: 'Error generating token',
                user: null
            });
        }

        createJwtCookie(res, token);

        res.status(200).json({
            msg: 'Login successful',
            error: null,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            msg: null,
            error: 'Internal server error',
            user: null
        });
    }
}

module.exports = loginUser;