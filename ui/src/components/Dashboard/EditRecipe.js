import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    tags: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/recipe/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load recipe');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/recipe/${id}`, data);
      alert('Recipe updated!');
      navigate('/dashboard');
    } catch {
      alert('Failed to update recipe');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      {Object.keys(data).map(key => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={data[key]}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Update</button>
    </form>
  );
}
