const singersModel = require('../models/singersModel');
const authorsModel = require('../models/authorsModel');
const slugify = require('slugify');
const createError = require('http-errors');
class singersController {
  constructor() {}
  // [GET] get signers
  async getSingers(req, res, next) {
    try {
<<<<<<< HEAD
      const singers = await singersModel.find().paginate(req).sort({ name: 1, linkImage: 1 });
      res.status(200).json(singers);
    } catch (error) {
      next(error);
    }
  }
  // [GET] get random best signers
  async getRandomSingers(req, res, next) {
    try {
      const singers = await singersModel
        .find({
          linkImage: {
            $ne: 'https://res.cloudinary.com/dbfyyqmwr/image/upload/v1617707300/football-news/avatars/default_avatar.png',
          },
        })
        .paginate(req);
=======
      const singers = await singersModel.find();
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
      res.status(200).json(singers);
    } catch (error) {
      next(error);
    }
  }
  // [GET] get singer by slug
  async getSingerBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const singers = await singersModel.findOne({ slug }).populate({ path: 'songs' });
      res.status(200).json(singers);
    } catch (error) {
      next(error);
    }
  }
  //[POST] create new signers
  async createSinger(req, res, next) {
    try {
      const { name, profile, linkImage, isAuthor } = req.body;
      const singer = await singersModel.findOne({ name });
      if (singer) {
        throw createError(422, "The singer's name is exist!");
      }
      const newSinger = new singersModel({
        ...req.body,

        slug: slugify(name, { locale: 'vi', lower: true }),
      });
      await newSinger.save();
      if (isAuthor) {
        const author = await authorsModel.findOne({ name: newSinger.name });
        if (!author) {
          const newAuthor = new authorsModel({
            ...newSinger,
            ...req.body,
            slug: slugify(name, { locale: 'vi', lower: true }),
          });
          await newAuthor.save();
        }
      }
      res.status(201).json({ message: 'Thêm ca sĩ thành công!', newSinger });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new singersController();
