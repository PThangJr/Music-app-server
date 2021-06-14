const express = require('express');
const songsController = require('../app/controllers/songsController');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const router = express.Router();

router.get('/', songsController.getSongs);
router.get('/singer/:slug', songsController.getSongBySingers);
router.get('/ranking', songsController.getSongsOfRanking);
router.get('/:slug', songsController.getSongBySlug);

router.post('/', authsMiddleware, adminMiddleware, songsController.createSong);

router.put('/:songId', authsMiddleware, adminMiddleware, songsController.updateSong);

router.delete('/:songId', authsMiddleware, adminMiddleware, songsController.deleteSong);

module.exports = router;
