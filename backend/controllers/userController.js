const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 生成 JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// 用户注册
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, userId: user._id, message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error); // 添加详细的错误日志
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};



// 用户登录
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, userId: user._id, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error); // 添加详细的错误日志
    res.status(500).json({ message: 'Server error' });
  }
};


// 获取当前用户信息
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
