const Booking = require('../models/Booking');

module.exports = {
  async store(req,res){
    const { user_id } = req.headers;
    const { studio_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      studio: studio_id,
      date
    });

    await booking.populate('studio').populate('user').execPopulate();

    return res.json(booking);

  }
}