// models/Hotel.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: String, required: true },
});

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  rooms: [roomSchema],  // 每个酒店的房间类型
});

module.exports = mongoose.model('Hotel', hotelSchema);
