const mongoose = require('mongoose');

const albumsSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 20, trim: true, required: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    linkImage: { type: String, trim: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
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
albumsSchema.index({ name: 'text' });
module.exports = mongoose.model('albums', albumsSchema);
