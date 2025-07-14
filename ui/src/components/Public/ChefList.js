import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function ChefList() {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    api.get('/chef').then(res => setChefs(res.data));
  }, []);

  return (
    <div>
      <h2>All Chefs</h2>
      <ul>
        {chefs.map(chef => (
          <li key={chef.chefId}>
            <Link to={`/chef/${chef.chefId}`}>{chef.fullName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
