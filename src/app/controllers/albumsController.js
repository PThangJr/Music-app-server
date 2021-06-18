const albumsModel = require('../models/albumsModel');
const slugify = require('slugify');
const playlistsModel = require('../models/playlistsModel');
const songsModel = require('../models/songsModel');
const singersModel = require('../models/singersModel');
const createError = require('http-errors');
<<<<<<< HEAD
const categoriesModel = require('../models/categoriesModel');
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
class albumsController {
  constructor() {}
  // [GET] get all categories
  async getAlbums(req, res, next) {
<<<<<<< HEAD
    // try {

    //   const albums = await albumsModel
    //     .find()
    //     .paginate(req)
    //     .populate({ path: 'singers' })
    //     .populate({ path: 'playlists' });

    //   res.status(200).json({ albums });
    // } catch (error) {
    //   next(error);
    // }
    let { category, playlist, limit, page } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    const query = {};
    const categoryQuery = categoriesModel.findOne({ slug: category });
    const playlistQuery = playlistsModel.findOne({ slug: playlist });
    Promise.all([categoryQuery, playlistQuery])
      .then((results) => {
        const [categoryResult, playlistResult] = results;
        if (categoryResult) {
          query.categories = categoryResult;
        }
        if (playlistResult) {
          query.playlists = playlistResult;
        }
        return query;
      })
      .then((query) => {
        const albumsQuery = albumsModel
          .find(query)
          .paginate(req)
          .populate({ path: 'singers' })
          .populate({ path: 'playlists' })
          .populate({ path: 'categories' });
        const totalItemsQuery = albumsModel.countDocuments();
        Promise.all([albumsQuery, totalItemsQuery]).then((results) => {
          const [albums, totalItems] = results;
          const totalPages = Math.ceil(totalItems / limit);
          res.status(200).json({ albums, pagination: { totalPages, limit, page } });
        });
      })
      .catch(next);
=======
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
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
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
<<<<<<< HEAD
  // [POST] create a new album
=======
  // [POST] create a new category
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
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
<<<<<<< HEAD

  //[DELETE] Delete a album
  async deleteAlbum(req, res, next) {
    try {
      const { albumId } = req.params;
      const albumDeleted = await albumsModel.findByIdAndDelete({ _id: albumId });
      res.status(201).json({ albumDeleted, message: 'Delete album is successfully!' });
    } catch (error) {
      next(error);
    }
  }
  //[PUT] Update a album
  async updateAlbum(req, res, next) {
    try {
      const { albumId } = req.params;
      const { name, linkImage, playlists, categories } = req.body;
      //Update
      const update = {
        name,
        linkImage,
        playlists,
        categories,
        slug: slugify(name, { lower: true, locale: 'vi' }),
      };
      const albumUpdated = await albumsModel.findByIdAndUpdate({ _id: albumId }, update);
      res.status(200).json({ albumUpdated, message: 'Update album is successfully!' });
    } catch (error) {
      next(error);
    }
  }
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
}
module.exports = new albumsController();
