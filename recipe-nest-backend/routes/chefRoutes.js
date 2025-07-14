const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');
const { verifyToken } = require('../config/auth');

router.get('/profile', verifyToken, chefController.getProfile);
router.put('/profile', verifyToken, chefController.updateProfile);

module.exports = router;
