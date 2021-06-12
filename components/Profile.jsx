/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Profile = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="player-score-card">
      <h1>This will be player profile</h1>
    </div>

  );
};

export default Profile;
