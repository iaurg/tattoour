const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: String,
  appoved: Boolean,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  studio:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spot'
  }
});


module.exports = mongoose.model('Booking', BookingSchema);