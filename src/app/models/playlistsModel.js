const mongoose = require('mongoose');

const playlistsSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 20, trim: true, required: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('playlists', playlistsSchema);
