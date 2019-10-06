const Spot = require('../models/Spot');
const User = require('../models/User');


module.exports = {
  async index(req, res){
    const { art } = req.query;

    const filterArts = await Spot.find({ arts: art })

    return res.json(filterArts)
  },

  async store(req,res){
    const { filename } = req.file;
    const { studio, price, arts } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if(!user){
      return res.status(400).json({ error: 'User does not exist' })
    }

    const spot = await Spot.create({
      user: user_id,
      studio,
      price,
      arts: arts.split(',').map(art => art.trim()),
      thumbnail: filename
    })

    return res.json(spot)
  }
};