const User = require('../models/User');

// Get chef profile
exports.getProfile = async (req, res) => {
  try {
    const chef = await User.findById(req.userId);
    if (!chef) return res.status(404).json({ message: 'Chef not found' });

    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update chef profile
exports.updateProfile = async (req, res) => {
  const { username, bio, profileImage } = req.body;
  
  try {
    const chef = await User.findByIdAndUpdate(
      req.userId, 
      { username, bio, profileImage },
      { new: true }
    );

    if (!chef) return res.status(404).json({ message: 'Chef not found' });

    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
