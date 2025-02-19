const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')


router.post('/login', userController.login);
router.get('/list', userController.listUsers);

module.exports = router;    

