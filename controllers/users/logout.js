const { clearJwtCookie } = require("../../utils/cookie");

module.exports = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        await clearJwtCookie(res, token);
        res.status(200).json({
            msg: "Logout successful",
            error: null,
            data: null,
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({
            msg: null,
            error: "Internal server error",
            data: null,
        });
    }
};
