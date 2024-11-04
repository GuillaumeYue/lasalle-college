require('dotenv').config(); // 这行确保加载.env中的环境变量
const mongoose = require('mongoose');
const Destination = require('../models/Destination');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    insertData();
  })
  .catch(err => console.log('Connection Error:', err));

  const seedDestinations = [
    {
      destTitle: 'Harbin',
      location: 'North East China',
      description: 'Known for its winter ice festival.',
      fees: 1000,
      imgSrc: '/assets/Harbin.jpg'
    },
    {
      destTitle: 'Yantai',
      location: 'Eastern China',
      description: 'A coastal city famous for its wineries.',
      fees: 1200,
      imgSrc: '/assets/Yantai.jpg'
    },
    {
      destTitle: "Xi'an",
      location: 'Middle West China',
      description: 'A coastal city famous for its wineries.',
      fees: 900,
      imgSrc: "/assets/Xi'an.jpg"
    },
    {
      destTitle: 'Kashi',
      location: 'Western China',
      description: 'A coastal city famous for its wineries.',
      fees: 1500,
      imgSrc: '/assets/Kashi.jpg'
    },
    {
      destTitle: 'Xizang',
      location: 'Western China',
      description: 'A coastal city famous for its wineries.',
      fees: 2000,
      imgSrc: '/assets/Xizang.jpg'
    },
    {
      destTitle: 'Lijiang',
      location: 'South West China',
      description: 'A coastal city famous for its wineries.',
      fees: 900,
      imgSrc: '/assets/Lijiang.jpg'
    },
    {
      destTitle: 'Xiamen',
      location: 'South East China',
      description: 'A coastal city famous for its wineries.',
      fees: 1200,
      imgSrc: '/assets/Xiamen.jpg'
    },
    {
      destTitle: 'Suzhou',
      location: 'Eastern China',
      description: 'A coastal city famous for its wineries.',
      fees: 1200,
      imgSrc: '/assets/Suzhou.jpg'
    },
    {
      destTitle: 'Enshi',
      location: 'Middle China',
      description: 'A coastal city famous for its wineries.',
      fees: 1500,
      imgSrc: '/assets/Enshi.jpg'
    }
  ];
  

const insertData = async () => {
  try {
    await Destination.insertMany(seedDestinations);
    console.log('Data inserted successfully');
    mongoose.connection.close();
  } catch (err) {
    console.log('Error inserting data:', err);
    mongoose.connection.close();
  }
};
