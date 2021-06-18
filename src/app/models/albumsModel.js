const mongoose = require('mongoose');

const albumsSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 20, trim: true, required: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    linkImage: { type: String, trim: true },
<<<<<<< HEAD
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
    singers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'singers' }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'playlists' }],
  },
  { timestamps: true }
);
albumsSchema.query.paginate = function (req) {
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page) || 1;
  if (page) {
    const skip = limit * (page - 1);
    return this.limit(limit).skip(skip);
  } else {
    return this;
  }
};
<<<<<<< HEAD
albumsSchema.index({ name: 'text' });
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
module.exports = mongoose.model('albums', albumsSchema);
