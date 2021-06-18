const authorsModel = require('../models/authorsModel');
const slugify = require('slugify');
const createError = require('http-errors');
class authorsController {
  constructor() {}
  // [GET] get authors
  async getAuthors(req, res, next) {
    const authors = await authorsModel.find();
    res.json(authors);
  }
  //[POST] create new author
  async createAuthor(req, res, next) {
    try {
      const { name, story } = req.body;
      const author = await authorsModel.findOne({ name });
      if (author) {
        throw createError(422, "The author's name is exist!");
      }
      const newAuthor = new authorsModel({
        ...req.body,
        slug: slugify(name, { locale: 'vi', lower: true }),
      });
      await newAuthor.save();
      res.status(201).json({ message: 'Thêm tác giả thành công!', newAuthor });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new authorsController();
