import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user ? (
      <div className="profile">
      <div> 
        <img src={user.picture} alt={user.name} />
        <div className="profile-info">
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
      </div>
    ) : null
  );
}; 

export default Profile;
