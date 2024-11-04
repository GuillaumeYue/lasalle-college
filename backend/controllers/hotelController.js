// controllers/hotelController.js
const Hotel = require('../models/Hotel');

// 定义 getAllHotels 函数
const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find(); // 查询所有酒店
        res.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// 定义 getHotelById 函数
const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id); // 根据 ID 查询酒店
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        console.error('Error fetching hotel by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// 导出 getHotelById 和 getAllHotels 函数
module.exports = { getHotelById, getAllHotels };
