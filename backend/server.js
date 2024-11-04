const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const hotelBookingRoutes = require('./routes/hotelBookingRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes'); // 确认引入userProfileRoutes

const app = express();
app.use(express.json());
app.use(cors());

// 连接 MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 使用路由
app.use('/api/users', userRoutes);
app.use('/api/hotelBookings', hotelBookingRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/userProfiles', userProfileRoutes); // 注册路由

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
