const categoriesModel = require('../models/categoriesModel');
const slugify = require('slugify');
class categoriesController {
  constructor() {}
  // [GET] get all categories
  async getCategories(req, res, next) {
    const categories = await categoriesModel.find();
    res.json(categories);
  }
  // [POST] create a new category
  async createCategory(req, res, next) {
    try {
      const newCategory = new categoriesModel({
        ...req.body,
        slug: slugify(req.body.name, { lower: true, locale: 'vi' }),
      });
      await newCategory.save();
      res.status(201).json({ message: 'Thêm thể loại nhạc thành công!', newCategory });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new categoriesController();
