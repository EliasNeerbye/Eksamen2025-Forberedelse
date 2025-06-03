const validator = require("validator");

const validateUser = (user, options = {}) => {
    const { isUpdate = false } = options;
    const errors = [];

    if (user.username !== undefined) {
        if (
            typeof user.username !== "string" ||
            user.username.trim().length < 3
        ) {
            errors.push("Username must be at least 3 characters long.");
        }
        if (user.username.length > 50) {
            errors.push("Username must be less than 50 characters.");
        }
        if (user.username && !user.username.match(/^[a-zA-Z0-9_]+$/)) {
            errors.push(
                "Username can only contain letters, numbers, and underscores."
            );
        }
    } else if (!isUpdate) {
        errors.push(
            "Username is required and must be at least 3 characters long."
        );
    }

    if (user.email !== undefined) {
        if (!validator.isEmail(user.email)) {
            errors.push("A valid email is required.");
        }
        if (user.email.length > 254) {
            errors.push("Email must be less than 254 characters.");
        }
    } else if (!isUpdate) {
        errors.push("A valid email is required.");
    }

    if (user.password !== undefined) {
        if (typeof user.password !== "string" || user.password.length < 6) {
            errors.push("Password must be at least 6 characters long.");
        }

        if (
            user.password &&
            !user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        ) {
            errors.push(
                "Password must contain at least one lowercase letter, one uppercase letter, and one number."
            );
        }
    } else if (!isUpdate) {
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
