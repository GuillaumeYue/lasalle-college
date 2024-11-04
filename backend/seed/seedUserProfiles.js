// seed/seedUserProfiles.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected for UserProfile seeding');
  insertUserProfiles();
}).catch(err => console.log(err));

const seedUserProfiles = async () => {
  try {
    const users = await User.find();  // 获取所有用户
    const profiles = users.map(user => ({
      userId: user._id,
      name: `User ${user._id}`,  // 可以根据需要自定义
      birthdate: new Date('1990-01-01'),
      gender: 'Male',
      phone: '123-456-7890',
      address: '123 Main St',
    }));
    await UserProfile.insertMany(profiles);
    console.log('UserProfile data inserted successfully');
  } catch (err) {
    console.log('Error inserting user profile data:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedUserProfiles();
