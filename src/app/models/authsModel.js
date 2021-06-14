const mongoose = require('mongoose');
const authsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: {
      type: String,
      trim: true,
      default:
        'https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('auths', authsSchema);
