const songsModel = require('../models/songsModel');
const slugify = require('slugify');
const createError = require('http-errors');
const authorsModel = require('../models/authorsModel');
const singersModel = require('../models/singersModel');
const shortid = require('shortid');
const categoriesModel = require('../models/categoriesModel');
const albumsModel = require('../models/albumsModel');
class songsController {
  constructor() {}
  // [GET] get all songs
  async getSongs(req, res, next) {

    // const { limit, page } = req.params;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const { category, album, singer, random } = req.query;
    const query = {};
    const categoryQuery = categoriesModel.findOne({ slug: category });
    const albumQuery = albumsModel.findOne({ slug: album });
    const singerQuery = singersModel.findOne({ slug: singer });
    Promise.all([categoryQuery, albumQuery, singerQuery])
      .then((results) => {
        const [categoryResult, albumResult, singerResult] = results;
        if (categoryResult) {
          query.categories = categoryResult._id;
        }
        if (albumResult) {
          query.albums = albumResult._id;
        }
        if (singerResult) {
          query.singers = singerResult._id;
        }
        return query;
      })
      .then((query) => {
        const songsQuery = songsModel
          .find(query)
          .paginate(req)
          .populate({ path: 'singers' })
          .populate({ path: 'authors' })
          .populate({ path: 'categories' })
          .sort({ slug: 1 })
          .populate({ path: 'albums' });
        const totalItemsQuery = songsModel.find(query).countDocuments();
        Promise.all([songsQuery, totalItemsQuery])
          .then((results) => {
            const [songs, totalItems] = results;
            const totalPages = Math.ceil(totalItems / limit);

            res.status(200).json({ songs, pagination: { totalPages, limit, page } });
          })
          .catch(next);
      })
      .catch(next);
    // console.log(query);
    // const songs = await songsModel
    //   .find(query)
    //   .paginate(req)
    //   .populate({ path: 'singers' })
    //   .populate({ path: 'authors' })
    //   .populate({ path: 'categories' })
    //   .populate({ path: 'albums' });
    // const totalItems = await songsModel.find().countDocuments();
    // const totalPages = Math.ceil(totalItems / limit);
    // res.status(200).json({ songs, pagination: { totalPages, limit, page } });
  }
  // [GET] get top 10 songs
  async getSongsOfRanking(req, res, next) {
    const songs = await songsModel
      .find()
      .sort({ views: -1, createdAt: -1 })
      .paginate(req)
      .populate({ path: 'singers' })
      .populate({ path: 'authors' })
      .populate({ path: 'categories' })
      .populate({ path: 'albums' });
    res.status(200).json({ songs });
  }
  // [GET] get song by slug
  async getSongBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const song = await songsModel.findOne({ slug });
      res
        .status(200)
        .json({ song })
        .paginate(req)
        .populate({ path: 'singers' })
        .populate({ path: 'authors' })
        .populate({ path: 'categories' })
        .populate({ path: 'albums' });
    } catch (error) {
      next(error);
    }
  }
  // [GET] get song by singers
  async getSongBySingers(req, res, next) {
    try {
      const { slug } = req.params;
      const singer = await singersModel.findOne({ slug });
      if (!singer) {
        throw createError(404, 'Không tồn tại bài hát!');
      }
      const songs = await songsModel
        .find({ singers: singer._id })
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

  // [PUT] update a new song
  async createSong(req, res, next) {
    try {
      let { linkMp3, singersTxt } = req.body;
      const singers = await singersModel.find({ _id: req.body.singers });

      // Convert singer's name to string
      let singersName = singers.reduce((acc, cur) => {
        if (acc) {
          return `${acc} ft ${cur.name}`;
        } else {
          return `${cur.name}`;
        }
      }, '');
      singersName = singersName || singersTxt;
      const newSong = new songsModel({
        ...req.body,
        linkMp3,
        slug: `${slugify(req.body.name, { locale: 'vi', lower: true })}.${slugify(singersName, {
          locale: 'vi',
          lower: true,
        })}`,
      });
      await newSong.save();
      // // Save songs to singers
      // await singersModel.updateMany({ _id: req.body.singers }, { $addToSet: { songs: [newSong._id] } });

      // //Save songs to authors
      // await authorsModel.updateMany({ _id: req.body.singers }, { $addToSet: { songs: [newSong._id] } });
      res.status(201).json({ message: 'Thêm bài hát mới thành công!', newSong });
    } catch (error) {
      next(error);
    }
  }
  async updateSong(req, res, next) {
    try {
      const { songId } = req.params;
      const singers = await singersModel.find({ _id: req.body.singers });

      // Convert singer's name to string
      let singersName = singers.reduce((acc, cur) => {
        if (acc) {
          return `${acc} ft ${cur.name}`;
        } else {
          return `${cur.name}`;
        }
      }, '');
      const update = {
        ...req.body,
        slug: `${slugify(req.body.name, { lower: true, locale: 'vi' })}.${slugify(singersName, {
          locale: 'vi',
          lower: true,
        })}`,
      };
      const songUpdated = await songsModel.findByIdAndUpdate(songId, update);
      res.status(200).json({ songUpdated, message: 'Update Song successfully' });
    } catch (error) {
      next(error);
    }
  }
  //[DELETE] song
  async deleteSong(req, res, next) {
    try {
      const { songId } = req.params;
      const songDeleted = await songsModel.findByIdAndDelete(songId);
      res.status(200).json({ songDeleted, message: 'Delete Song successfully' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new songsController();
