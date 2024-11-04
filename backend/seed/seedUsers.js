require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    insertUsers();
  })
  .catch(err => console.log('Connection Error:', err));

const seedUsers = [
  { email: 'user1@example.com', password: 'password1', name: 'User One' },
  { email: 'user2@example.com', password: 'password2', name: 'User Two' },
];

const insertUsers = async () => {
  try {
    const usersWithHashedPasswords = await Promise.all(
      seedUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    await User.insertMany(usersWithHashedPasswords);
    console.log('User data inserted successfully');
    mongoose.connection.close();
  } catch (err) {
    console.log('Error inserting user data:', err);
    mongoose.connection.close();
  }
};
