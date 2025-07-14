import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

export default function ChefProfile() {
  const { id } = useParams();
  const [chef, setChef] = useState(null);

  useEffect(() => {
    api.get(`/chef/${id}`)
      .then(res => setChef(res.data))
      .catch(() => alert('Failed to load chef profile'));
  }, [id]);

  if (!chef) return <p>Loading...</p>;

  return (
    <div>
      <h2>{chef.fullName}</h2>
      <p>{chef.bio}</p>
      <img src={chef.profileImage} alt={`${chef.fullName} profile`} width="150" />
      <h3>Recipes by {chef.fullName}</h3>
      <ul>
        {chef.recipes?.map(recipe => (
          <li key={recipe.recipeId}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}
