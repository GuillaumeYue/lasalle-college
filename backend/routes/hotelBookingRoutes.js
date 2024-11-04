// routes/hotelBookingRoutes.js
const express = require('express');
const { addBooking } = require('../controllers/hotelBookingController');
const router = express.Router();

// 添加新的酒店预订
router.post('/', addBooking);

module.exports = router;
