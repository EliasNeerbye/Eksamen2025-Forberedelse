const router = require('express').Router();

const { checkUser, stopUser, authenticateUser } = require('../middleware/authentication');
const { checkAdminRole } = require('../middleware/authorization');

const createUser = require('../controllers/users/create');
const getUser = require('../controllers/users/get');
const getAllUsers = require('../controllers/users/getAll');
const loginUser = require('../controllers/users/login');
const updateUser = require('../controllers/users/update');
const deleteUser = require('../controllers/admin/deleteUser');
const logoutUser = require('../controllers/users/logout');

router.use(checkUser);

router.post('/', stopUser, createUser);
router.post('/login', stopUser, loginUser);
router.get('/:username', getUser);
router.get('/', getAllUsers);
router.post('/logout', authenticateUser, logoutUser);

router.put('/:username', authenticateUser, updateUser);

router.delete('/:username', authenticateUser, checkAdminRole, deleteUser);

module.exports = router;