// controllers/hotelBookingController.js
const HotelBooking = require('../models/HotelBooking');

exports.addBooking = async (req, res) => {
  const { userId, hotelId, roomType, bookingDate } = req.body;

  try {
    const booking = new HotelBooking({
      userId,
      hotelId,
      roomType,
      bookingDate,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
