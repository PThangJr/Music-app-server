const mongoose = require('mongoose');

<<<<<<< HEAD
const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 20, trim: true, required: true, unique: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId }],
    linkImage: {
      type: String,
      default: 'https://photo-zmp3.zadn.vn/cover/8/0/4/7/8047a5134646835763068f7439e17f2b.jpg',
    },
    slug: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('categories', categoriesSchema);
=======
const categoriesSchema = new mongoose.Schema({
    name: { type: String, min: 2, max: 20, trim: true, required: true, unique: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId }],
    slug: { type: String, required: true, trim: true, unique: true }

}, { timestamps: true })
module.exports = mongoose.model('categories', categoriesSchema)
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
