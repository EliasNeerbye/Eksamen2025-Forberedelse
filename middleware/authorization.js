const User = require("../models/User");

const checkAdminRole = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                msg: null,
                error: "Authentication required",
                data: null,
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({
                msg: null,
                error: "User not found",
                data: null,
            });
        }
        if (user.role !== "admin") {
            return res.status(403).json({
                msg: null,
                error: "Admin access required. Insufficient privileges.",
                data: null,
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            msg: null,
            error: "Error verifying admin privileges",
            data: null,
        });
    }
};

module.exports = {
    checkAdminRole,
};
