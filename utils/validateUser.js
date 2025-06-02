const validator = require('validator');

const validateUser = (user) => {
    const errors = [];

    if (!user.username || typeof user.username !== 'string' || user.username.trim() === '') {
        errors.push('Username is required and must be a non-empty string.');
    }

    if (!user.email || !validator.isEmail(user.email)) {
        errors.push('A valid email is required.');
    }

    if (!user.password || typeof user.password !== 'string' || user.password.length < 6) {
        errors.push('Password is required and must be at least 6 characters long.');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = validateUser;