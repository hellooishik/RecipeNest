import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Dashboard/Profile';
import AddRecipe from './components/Dashboard/AddRecipe';
import RecipeList from './components/Dashboard/RecipeList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RecipeList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
