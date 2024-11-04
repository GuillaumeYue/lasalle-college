// models/HotelBooking.js
const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, // 使用 ObjectId 引用 Hotel 模型
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 记录预订用户的信息
    roomType: { type: String, required: true }, // 可以参考 Hotel 模型中的 room 类型
    bookingDate: { type: Date, required: true },
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
