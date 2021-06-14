const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: { type: String, min: 2, max: 20, trim: true, required: true, unique: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId }],
    slug: { type: String, required: true, trim: true, unique: true }

}, { timestamps: true })
module.exports = mongoose.model('categories', categoriesSchema)