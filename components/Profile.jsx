import React, {useContext} from 'react';
import { UserContext } from '../pages/userContext'

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  console.log('userInfo: ', userInfo);

  return (
    <div className="player-score-card">
      <h1>This will be player profile</h1>
    </div>
    
  )
}

export default Profile;