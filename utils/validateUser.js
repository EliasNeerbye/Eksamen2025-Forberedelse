const validator = require("validator");

const validateUser = (user) => {
    const errors = [];

    if (
        !user.username ||
        typeof user.username !== "string" ||
        user.username.trim().length < 3
    ) {
        errors.push(
            "Username is required and must be at least 3 characters long."
        );
    }

    if (user.username && user.username.length > 50) {
        errors.push("Username must be less than 50 characters.");
    }

    if (user.email && user.email.length > 254) {
        errors.push("Email must be less than 254 characters.");
    }

    if (!user.email || !validator.isEmail(user.email)) {
        errors.push("A valid email is required.");
    }

    if (
        !user.password ||
        typeof user.password !== "string" ||
        user.password.length < 6
    ) {
        errors.push(
            "Password is required and must be at least 6 characters long."
        );
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
    };
};

module.exports = validateUser;
