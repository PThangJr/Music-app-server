const playlistsModel = require('../models/playlistsModel');
const albumsModel = require('../models/albumsModel');
const slugify = require('slugify');
class playlistsController {
  constructor() {}
  // [GET] get all playlists
  async getPlaylists(req, res, next) {
    try {
      const playlists = await playlistsModel.find();
      res.status(200).json({ playlists });
    } catch (error) {
      next(error);
    }
  }
  // [GET] get  playlist by slug
  async getPlaylistBySlug(req, res, next) {
    try {
      const { playlistSlug } = req.params;
      const playlists = await playlistsModel.findOne({ slug: playlistSlug });
      res.status(200).json({ playlists });
    } catch (error) {
      next(error);
    }
  }
  // [POST] create a new playlists
  async createPlaylist(req, res, next) {
    try {
      const newPlaylist = new playlistsModel({
        ...req.body,
        slug: slugify(req.body.name, { lower: true, locale: 'vi' }),
      });
      await newPlaylist.save();
      res.status(201).json({ message: 'Thêm playlist thành công!', newPlaylist });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new playlistsController();
