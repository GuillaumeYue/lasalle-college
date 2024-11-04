// seed/seedUserProfiles.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for UserProfile seeding'))
  .catch(err => console.log(err));

const seedUserProfiles = async () => {
  try {
    const user = await User.findOne({ email: 'example@example.com' }); // 查找一个测试用户
    if (user) {
      const profileData = {
        userId: user._id,
        name: 'Guillaume Yue',
        birthdate: new Date('1993-08-08'),
        gender: 'Male',
        phone: '(514) 566-3218',
        addresses: [
          { type: 'Home', address: '2100 Boulevard de Maisonneuve O, Montréal, QC' },
          { type: 'Work', address: 'Sinsa-dong Community Service Center, 128 Apgujeong-ro, Sinsa-dong, Gangnam-gu, Seoul' },
        ],
      };

      await UserProfile.create(profileData);
      console.log('UserProfile seeded successfully');
    }
  } catch (error) {
    console.log('Error seeding UserProfile:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedUserProfiles();
