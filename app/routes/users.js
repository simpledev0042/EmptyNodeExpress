const { MAIL_SERVICE_GMAIL } = require('../controllers/UserController');
const { AuthMiddleware } = require('../middlewares');
const { UserController } = require('../controllers');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', AuthMiddleware.auth, UserController.login);
module.exports = router;
