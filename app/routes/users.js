const { auth } = require('../middlewares');
const { UserController } = require('../controllers');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', auth, UserController.login);
module.exports = router;
