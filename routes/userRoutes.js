const router = require('express').Router();

const { checkUser, stopUser } = require('../middleware/authentication');

const createUser = require('../controllers/user/create');
const getUser = require('../controllers/user/get');
const getAllUsers = require('../controllers/user/getAll');

router.use(checkUser);

router.post('/', stopUser, createUser);
router.get('/:username', getUser);
router.get('/', getAllUsers);

module.exports = router;