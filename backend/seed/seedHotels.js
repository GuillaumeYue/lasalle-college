require('dotenv').config();
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected for Hotel seeding');
    insertHotels();
  })
  .catch(err => console.log('Connection Error:', err));

// Seed data for hotels
const seedHotels = [
  {
    hotelName: 'Hotel Sunshine',
    location: 'Paris, France',
    price: '$500',
    description: 'A luxury hotel in the heart of Paris',
    bookingDate: new Date('2024-05-10'),
    rooms: [
      { type: 'Standard Room', price: '$300' },
      { type: 'Deluxe Room', price: '$500' },
      { type: 'Suite', price: '$800' },
    ],
  },
  {
    hotelName: 'Ocean Breeze Resort',
    location: 'Maldives',
    price: '$1000',
    description: 'A beachside resort with beautiful ocean views',
    bookingDate: new Date('2024-06-15'),
    rooms: [
      { type: 'Beach Villa', price: '$700' },
      { type: 'Overwater Bungalow', price: '$1200' },
      { type: 'Garden Villa', price: '$900' },
    ],
  },
  // Add more hotel entries as needed
];

// Insert seed data into the Hotel collection
const insertHotels = async () => {
  try {
    await Hotel.insertMany(seedHotels);
    console.log('Hotel data inserted successfully');
    mongoose.connection.close();
  } catch (err) {
    console.log('Error inserting hotel data:', err);
    mongoose.connection.close();
  }
};
