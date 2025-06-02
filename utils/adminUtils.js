const User = require("../models/User");

const amIAdmin = async (req) => {
    if (!req.user || !req.user._id) {
        return false;
    }
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return false;
        }
        return user.role === "admin";
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
};
module.exports = {
    amIAdmin,
};
