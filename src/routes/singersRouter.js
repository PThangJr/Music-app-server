const express = require('express');
const singersController = require('../app/controllers/singersController');
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const router = express.Router();

router.get('/', singersController.getSingers);
router.get('/random', singersController.getRandomSingers);
router.get('/:slug', singersController.getSingerBySlug);
router.post('/', authsMiddleware, adminMiddleware, singersController.createSinger);

module.exports = router;
