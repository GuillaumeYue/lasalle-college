// models/UserProfile.js
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  type: { type: String, enum: ['Home', 'Work', 'Other'], required: true },
  address: { type: String, required: true },
});

const UserProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  birthdate: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  phone: { type: String },
  addresses: [AddressSchema],
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
