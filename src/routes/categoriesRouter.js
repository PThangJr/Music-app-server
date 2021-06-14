const express = require('express');
const categoriesController = require('../app/controllers/categoriesController');
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const router = express.Router();

router.get('/', categoriesController.getCategories);
router.post('/', authsMiddleware, adminMiddleware, categoriesController.createCategory);

module.exports = router;
