import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('/recipe/my').then(res => setRecipes(res.data));
  }, []);

  return (
    <div>
      <h2>My Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.recipeId}>
            <strong>{recipe.title}</strong><br />
            <small>{recipe.description}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
