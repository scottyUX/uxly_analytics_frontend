import React from 'react';
import './Components/landingPage.css'; 
import Logo from "./Components/UXlyLogo.png";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
      <img src={Logo} alt="UXly Logo" className="logo"/>
      </div>
    </header>
  );
};

export default Header;
