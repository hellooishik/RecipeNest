const Recipe = require('../models/Recipe');

// Add a recipe
exports.addRecipe = async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  
  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      chefId: req.userId,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recipes by chef
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ chefId: req.userId });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  const { recipeId, title, ingredients, instructions } = req.body;

  try {
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { title, ingredients, instructions },
      { new: true }
    );

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.body;

  try {
    await Recipe.findByIdAndDelete(recipeId);
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
