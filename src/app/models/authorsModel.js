const mongoose = require('mongoose');

const authorsSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 25, trim: true, required: true, unique: true },
    linkImage: {
      type: String,
      trim: true,
      default: 'https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png',
    },
    profile: { type: String, trim: true, default: '' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'songs' }],
    slug: { type: String, trim: true, unique: true, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('authors', authorsSchema);
