const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { verifyToken } = require('../config/auth');

router.post('/', verifyToken, recipeController.addRecipe);
router.get('/', verifyToken, recipeController.getRecipes);
router.put('/', verifyToken, recipeController.updateRecipe);
router.delete('/', verifyToken, recipeController.deleteRecipe);

module.exports = router;
