const Destination = require('../models/Destination');

// 搜索目的地
exports.searchDestinations = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const results = await Destination.find({ 
      name: { $regex: searchQuery, $options: 'i' }
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching destinations' });
  }
};
