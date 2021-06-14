const albumsModel = require('../models/albumsModel');
const slugify = require('slugify');
const playlistsModel = require('../models/playlistsModel');
const songsModel = require('../models/songsModel');
const singersModel = require('../models/singersModel');
const createError = require('http-errors');
class albumsController {
  constructor() {}
  // [GET] get all categories
  async getAlbums(req, res, next) {
    try {
      const albums = await albumsModel
        .find()
        .paginate(req)
        .populate({ path: 'singers' })
        .populate({ path: 'playlists' });

      res.status(200).json({ albums });
    } catch (error) {
      next(error);
    }
  }
  // [GET] get songs of album
  async getSongsOfAlbum(req, res, next) {
    try {
      const { albumSlug } = req.params;
      const album = await albumsModel.findOne({ slug: albumSlug });
      if (!album) {
        throw createError(404, 'Không tồn tại bài hát!');
      }
      const songs = await songsModel
        .find({ albums: album._id })
        .paginate(req)
        .populate({ path: 'singers' })
        .populate({ path: 'authors' })
        .populate({ path: 'categories' })
        .populate({ path: 'albums' });
      res.status(200).json({ songs });
    } catch (error) {
      next(error);
    }
  }
  // [GET] get albums of singer
  async getAlbumsOfSinger(req, res, next) {
    try {
      const { singerSlug } = req.params;
      const singer = await singersModel.findOne({ slug: singerSlug });
      const albums = await albumsModel
        .find({ singers: singer._id })
        .paginate(req)
        .populate({ path: 'singers' })
        .populate({ path: 'playlists' });
      if (!albums.length) {
        throw createError(404, 'Không tồn tại bài hát!');
      }

      res.status(200).json({ albums });
    } catch (error) {
      next(error);
    }
  }
  // [GET] get albums by slug playlists
  async getAlbumsByPlaylist(req, res, next) {
    try {
      const { playlistSlug } = req.params;
      const playlist = await playlistsModel.findOne({ slug: playlistSlug });
      const albums = await albumsModel
        .find({ playlists: playlist._id })
        .paginate(req)
        .populate({ path: 'singers' })
        .populate({ path: 'playlists' });
      res.status(200).json({ albums });
    } catch (error) {
      next(error);
    }
  }
  // [POST] create a new category
  async createAlbum(req, res, next) {
    try {
      const newAlbum = new albumsModel({
        ...req.body,
        slug: slugify(req.body.name, { lower: true, locale: 'vi' }),
      });
      await newAlbum.save();
      res.status(201).json({ message: 'Thêm album thành công!', newAlbum });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new albumsController();
