const { verifyToken } = require("../utils/jwtUtil");
const { checkIfValidJwtCookie } = require("../utils/cookie");

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
            _id: decoded._id,
            username: decoded.username,
            email: decoded.email,
        };

        next();
    } catch (error) {
        console.error("Check user error:", error);
        req.user = null;
        next();
    }
};

const authenticateUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            msg: null,
            error: "Access denied. Authentication required.",
            data: null,
        });
    }
    next();
};

const stopUser = (req, res, next) => {
    if (req.user) {
        return res.status(403).json({
            msg: null,
            error: "Access denied. Already authenticated.",
            data: null,
        });
    }
    next();
};

module.exports = {
    checkUser,
    authenticateUser,
    stopUser,
};
