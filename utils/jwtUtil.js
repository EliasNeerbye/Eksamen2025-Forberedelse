const jsonwebtoken = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    return jsonwebtoken.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
}

const verifyToken = (token) => {
    try {
        return jsonwebtoken.verify(token, config.JWT_SECRET);
    } catch (err) {
        console.error('Error verifying token:', err);
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken
};