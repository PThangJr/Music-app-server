const express = require('express');
const singersController = require('../app/controllers/singersController');
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const router = express.Router();

router.get('/', singersController.getSingers);
<<<<<<< HEAD
router.get('/random', singersController.getRandomSingers);
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
router.get('/:slug', singersController.getSingerBySlug);
router.post('/', authsMiddleware, adminMiddleware, singersController.createSinger);

module.exports = router;
