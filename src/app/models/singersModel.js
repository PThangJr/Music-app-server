const mongoose = require('mongoose');

const singersSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 25, trim: true, required: true, unique: true },
    linkImage: {
      type: String,
      trim: true,
      default: 'https://res.cloudinary.com/dbfyyqmwr/image/upload/v1617707300/football-news/avatars/default_avatar.png',
    },
    profile: { type: String, trim: true, default: '' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'songs' }],
    slug: { type: String, trim: true, unique: true, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('singers', singersSchema);
