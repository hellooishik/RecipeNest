import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/chef/me').then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>{profile.fullName}</h2>
      <p>{profile.bio}</p>
      <img src={profile.profileImage} alt="Profile" width="150" />
    </div>
  );
}
