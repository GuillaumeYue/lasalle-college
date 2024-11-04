const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 认证中间件
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// 注册用户
router.post('/signup', registerUser);

// 用户登录
router.post('/login', loginUser);

// 获取用户信息
router.get('/me', getUserProfile);

module.exports = router;
