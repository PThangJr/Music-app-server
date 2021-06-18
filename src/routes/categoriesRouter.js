const express = require('express');
const categoriesController = require('../app/controllers/categoriesController');
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const router = express.Router();

router.get('/', categoriesController.getCategories);
router.post('/', authsMiddleware, adminMiddleware, categoriesController.createCategory);
<<<<<<< HEAD
router.patch('/:categoryId', categoriesController.updateCategory);
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272

module.exports = router;
