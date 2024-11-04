// routes/hotelRoutes.js
const express = require('express');
const { getHotelById, getAllHotels } = require('../controllers/hotelController');
const router = express.Router();

router.get('/', getAllHotels); // 获取所有酒店
router.get('/:id', getHotelById);

module.exports = router;
