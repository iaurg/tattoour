const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  studio: String,
  price: Number,
  arts: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Spot', SpotSchema);