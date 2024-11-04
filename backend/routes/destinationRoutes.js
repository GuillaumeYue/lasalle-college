const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// 获取所有目的地或根据查询搜索目的地
router.get('/', async (req, res) => {
  const search = req.query.search || '';  // 如果没有提供搜索查询，则默认空字符串
  const regex = new RegExp(search, 'i');  // 正则表达式，忽略大小写
  try {
    const destinations = await Destination.find({ destTitle: regex });
    res.json(destinations);  // 返回符合条件的目的地数据
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
