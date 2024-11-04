const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');
const router = express.Router();

router.get('/:userId', getUserProfile); // 确保路径和 userId 参数一致
router.put('/:userId', updateUserProfile);

module.exports = router;
