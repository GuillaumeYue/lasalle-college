// controllers/userProfileController.js
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

// 获取用户详细信息
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 更新用户详细信息
exports.updateUserProfile = async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
