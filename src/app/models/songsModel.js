const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 20, trim: true, required: true },
    linkMp3: { type: String, required: true, trim: true },
    linkImage: {
      type: String,
      trim: true,
      default: 'https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png',
    },
    singers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'singers' }],
    singerTxt: { type: String, trim: true, default: '' },
    authors: [{ type: mongoose.Schema.Types.ObjectId, default: 'Đang cập nhật...', ref: 'authors' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'albums' }],
    time: { type: Date },
    lyric: { type: String, trim: true, default: '' },
    slug: { type: String, unique: true, trim: true, required: true },
  },
  { timestamps: true }
);
songsSchema.query.paginate = function (req) {
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page) || 1;
<<<<<<< HEAD

=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
  if (page) {
    const skip = limit * (page - 1);
    return this.limit(limit).skip(skip);
  } else {
    return this;
  }
};
<<<<<<< HEAD
songsSchema.index({ name: 'text' }, { default_language: 'none' });
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
module.exports = mongoose.model('songs', songsSchema);
