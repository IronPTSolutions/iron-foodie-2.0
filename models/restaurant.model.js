const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  image: {
    type: String,
    default: "https://res.cloudinary.com/glovoapp/w_700,h_360,c_fill,f_auto,q_auto/Stores/swhuhbdfcf4if9hhyt6j",
  },
  description: {
    type: String,
    minlength: [10, 'Please tronco enter at least 10 characters ']
  },
  categories: {
    type: [String],
    default: []
  },
  capacity: {
    type: Number,
    required: [true, 'What about capaciy, does not mean anuthing for you?' ]
  }
}, { timestamps: true })

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant





























// Restaurant model

// name,
// address,
// image -> default? 'https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg',
// description -> minlength?,
// categories,
// capacity,
// maxProductCost,
// timeStamps?