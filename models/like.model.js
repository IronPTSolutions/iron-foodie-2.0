const mongoose = require('mongoose');
const Schema = mongoose.Schema

const likeSchema = new Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema)
module.exports = Like

