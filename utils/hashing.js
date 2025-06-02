const argon2 = require("argon2");

const hashPassword = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
};

const verifyPassword = async (password, hash) => {
    try {
        const isValid = await argon2.verify(hash, password);
        return isValid;
    } catch (err) {
        console.error("Error verifying password:", err);
        throw err;
    }
};

module.exports = {
    hashPassword,
    verifyPassword,
};
