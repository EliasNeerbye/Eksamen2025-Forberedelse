const router = require('express').Router();

const { checkUser, stopUser, authenticateUser } = require('../middleware/authentication');

const createUser = require('../controllers/users/create');
const getUser = require('../controllers/users/get');
const getAllUsers = require('../controllers/users/getAll');
const loginUser = require('../controllers/users/login');
const updateUser = require('../controllers/users/update');

router.use(checkUser);

router.post('/', stopUser, createUser);
router.post('/login', stopUser, loginUser);
router.get('/:username', getUser);
router.get('/', getAllUsers);

router.put('/:username', authenticateUser, updateUser);

module.exports = router;