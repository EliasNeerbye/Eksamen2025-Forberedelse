const JwtBlacklist = require("../models/JwtBlacklist");
const config = require("../config/config");

const createJwtCookie = (res, token) => {
    const cookieOptions = {
        httpOnly: true,
        secure: config.HTTPS_ENABLED,
        // sameSite: 'lax', // Uncomment if you want to enforce sameSite policy
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("jwt", token, cookieOptions);
};

const checkIfValidJwtCookie = async (token) => {
    try {
        const blacklisted = await JwtBlacklist.findOne({ token });
        if (blacklisted) {
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error checking JWT blacklist:", err);
        throw new Error("Error checking token validity");
    }
};

const clearJwtCookie = async (res, token = null) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: config.HTTPS_ENABLED,
        // sameSite: 'lax', // Uncomment if you want to enforce sameSite policy
        path: "/",
    });

    if (token) {
        try {
            await JwtBlacklist.create({ token });
        } catch (err) {
            console.error("Error adding JWT to blacklist:", err);
        }
    }
};

module.exports = {
    createJwtCookie,
    checkIfValidJwtCookie,
    clearJwtCookie,
};
