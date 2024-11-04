const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  destTitle: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  imgSrc: {
    type: String, // 图片地址
    required: true
  }
});

module.exports = mongoose.model('Destination', DestinationSchema);
