import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import './Header.css';
import logo from './LOGO.jpeg';
const Header = () => {
  const { user, signOut } = useUser(); 
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(); 
    navigate('/login'); 
  };

  return (
    <header className="header">
      <div className="logo1">
        <img src={logo} alt="SURE Trust Logo" />
        <h1 className='L'>SURE TRUST</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/intern">Internships</Link></li>
          <li><Link to="/alumni">Alumni</Link></li>
          {user ? (
            <li><button onClick={handleSignOut} className="signout-button">Sign Out</button></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              {/* <li><Link to="/signup">Signup</Link></li> */}
            </>
          )}
        </ul>
      </nav>
      {/* <div className="actions">
        <button className="icon-button home-icon"></button>
        <button className="icon-button grid-icon"></button>
        <button className="icon-button theme-icon"></button>
      </div> */}
      {user && (
        <div className="user-info">
          <p>Welcome, {user.name}</p> 
        </div>
      )}
    </header>
  );
};

export default Header;
