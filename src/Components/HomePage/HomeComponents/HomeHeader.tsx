import React from 'react';
import './home.css'; 
import Logo from "./UXlyLogo.png";
import LogoutButton from './LogoutButton';
import Profile from "./UserProfile";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
      <img src={Logo} alt="UXly Logo"className="logo"/>
      </div>
      <div className="profile-container">
      <Profile />
      </div>
      <div className="logout-button-container">
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;