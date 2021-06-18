const express = require('express');
const authorsController = require('../app/controllers/authorsController');
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const router = express.Router();

router.get('/', authorsController.getAuthors);
router.post('/', authsMiddleware, adminMiddleware, authorsController.createAuthor);

module.exports = router;
