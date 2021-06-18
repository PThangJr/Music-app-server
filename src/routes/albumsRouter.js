const express = require('express');
const albumsController = require('../app/controllers/albumsController');
const router = express.Router();
const authsMiddleware = require('../app/middlewares/authsMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
router.get('/', albumsController.getAlbums);
router.get('/:playlistSlug', albumsController.getAlbumsByPlaylist);
router.get('/singer/:singerSlug', albumsController.getAlbumsOfSinger);
router.get('/songs/:albumSlug', albumsController.getSongsOfAlbum);

router.delete('/:albumId', authsMiddleware, adminMiddleware, albumsController.deleteAlbum);

router.put('/:albumId', authsMiddleware, adminMiddleware, albumsController.updateAlbum);

router.post('/', authsMiddleware, adminMiddleware, albumsController.createAlbum);

module.exports = router;
