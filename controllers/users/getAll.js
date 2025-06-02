const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const users = await User.find({}, "username");

        if (!users || users.length === 0) {
            return res.status(404).json({
                msg: "No users found",
                error: null,
                data: null,
            });
        }

        const usernames = users.map((user) => user.username);

        res.status(200).json({
            msg: "Users retrieved successfully",
            error: null,
            data: usernames,
        });
    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).json({
            msg: null,
            error: "Internal server error",
            data: null,
        });
    }
};
