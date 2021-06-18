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
<<<<<<< HEAD
  // [PUT] update category
  async updateCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const update = {
        ...req.body,
      };
      if (req.body.name) {
        update.name = slugify(req.body.name, { lower: true, locale: 'vi' });
      }
      const categoryUpdated = await categoriesModel.findByIdAndUpdate(categoryId, update);
      res.status(201).json({ message: 'Update category is successfully!', categoryUpdated });
    } catch (error) {
      next(error);
    }
  }
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
}
module.exports = new categoriesController();
