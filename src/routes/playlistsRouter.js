const express = require('express');
const playlistsController = require('../app/controllers/playlistsController');
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const router = express.Router();

router.get('/', playlistsController.getPlaylists);
router.get('/:playlistSlug', playlistsController.getPlaylistBySlug);
router.post('/', authsMiddleware, adminMiddleware, playlistsController.createPlaylist);

module.exports = router;
