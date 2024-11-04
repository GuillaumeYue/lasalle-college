// routes/userProfileRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');
const router = express.Router();

router.get('/:userId', getUserProfile);       // 获取用户信息
router.put('/:userId', updateUserProfile);     // 更新用户信息

module.exports = router;
