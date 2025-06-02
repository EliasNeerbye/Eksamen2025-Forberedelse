const { body, param, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: null,
            error: errors.array()[0].msg,
            data: null,
        });
    }
    next();
};

const validateUserCreation = [
    body("username")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be 3-50 characters long")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores"
        ),

    body("email")
        .isEmail()
        .withMessage("Must be a valid email")
        .isLength({ max: 254 })
        .withMessage("Email must be less than 254 characters"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
            "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        ),

    handleValidationErrors,
];

const validateUserUpdate = [
    body("username")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be 3-50 characters long"),

    body("email").optional().isEmail().withMessage("Must be a valid email"),

    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    handleValidationErrors,
];

const validateLogin = [
    body("password").notEmpty().withMessage("Password is required"),

    body().custom((value) => {
        if (!value.username && !value.email) {
            throw new Error("Username or email is required");
        }
        return true;
    }),

    handleValidationErrors,
];

const validateUsername = [
    param("username")
        .notEmpty()
        .withMessage("Username parameter is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be 3-50 characters long"),

    handleValidationErrors,
];

module.exports = {
    validateUserCreation,
    validateUserUpdate,
    validateLogin,
    validateUsername,
};
