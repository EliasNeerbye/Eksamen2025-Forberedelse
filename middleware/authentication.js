const { verifyToken } = require('../utils/jwtUtil');
const { checkIfValidJwtCookie } = require('../utils/cookie');

const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            req.user = null;
            return next();
        }

        const isValidToken = await checkIfValidJwtCookie(token);
        if (!isValidToken) {
            req.user = null;
            return next();
        }

        const decoded = verifyToken(token);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        console.error('Check user error:', error);
        req.user = null;
        next();
    }
};

const authenticateUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            msg: null,
            error: 'Access denied. Authentication required.',
            user: null
        });
    }
    next();
};

const stopUser = (req, res, next) => {
    if (req.user) {
        return res.status(403).json({
            msg: null,
            error: 'Access denied. Already authenticated.',
            user: null
        });
    }
    next();
};

module.exports = {
    checkUser,
    authenticateUser,
    stopUser
};
