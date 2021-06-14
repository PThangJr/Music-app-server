const express = require('express');
const authsController = require('../app/controllers/authsController');
const router = express.Router();

router.post('/login', authsController.login);
router.post('/register', authsController.register);

module.exports = router;
