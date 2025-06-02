const rateLimit = require("express-rate-limit");
const router = require("express").Router();

const {
    checkUser,
    stopUser,
    authenticateUser,
} = require("../middleware/authentication");
const { checkAdminRole } = require("../middleware/authorization");

const createUser = require("../controllers/users/create");
const getUser = require("../controllers/users/get");
const getAllUsers = require("../controllers/users/getAll");
const loginUser = require("../controllers/users/login");
const updateUser = require("../controllers/users/update");
const deleteUser = require("../controllers/admin/deleteUser");
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

router.post("/", stopUser, createUser);
router.post("/login", stopUser, loginUser);
router.get("/:username", getUser);
router.get("/", getAllUsers);
router.post("/logout", authenticateUser, logoutUser);

router.put("/:username", authenticateUser, updateUser);

router.delete("/:username", authenticateUser, checkAdminRole, deleteUser);

module.exports = router;
