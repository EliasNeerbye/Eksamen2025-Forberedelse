const rateLimit = require("express-rate-limit");
const router = require("express").Router();

const {
    validateUserCreation,
    validateUserUpdate,
    validateLogin,
    validateUsername,
} = require("../middleware/validation");
const {
    checkUser,
    stopUser,
    authenticateUser,
} = require("../middleware/authentication");

const createUser = require("../controllers/users/create");
const getUser = require("../controllers/users/get");
const getAllUsers = require("../controllers/users/getAll");
const loginUser = require("../controllers/users/login");
const updateUser = require("../controllers/users/update");
const deleteUser = require("../controllers/users/delete");
const logoutUser = require("../controllers/users/logout");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        msg: "Too many requests, please try again later.",
        error: "Rate limit exceeded",
        data: null,
    },
});

router.use(limiter);
router.use(checkUser);

router.post("/", stopUser, validateUserCreation, createUser);
router.post("/login", stopUser, validateLogin, loginUser);
router.get("/:username", validateUsername, getUser);
router.get("/", getAllUsers);
router.post("/logout", authenticateUser, logoutUser);

router.put("/:username", authenticateUser, validateUserUpdate, updateUser);

router.delete("/:username", authenticateUser, validateUsername, deleteUser);

module.exports = router;
