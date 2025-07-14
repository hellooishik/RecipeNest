import React, { useState } from 'react';
import api from '../../services/api';

export default function AddRecipe() {
  const [data, setData] = useState({
    title: '', description: '', ingredients: '', instructions: '', tags: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/recipe', data);
    alert("Recipe added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>
      {Object.keys(data).map(key => (
        <input
          key={key}
          placeholder={key}
          onChange={e => setData({ ...data, [key]: e.target.value })}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
