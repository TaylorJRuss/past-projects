import React from 'react'
import logo from '../logo.png';
import "../static/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from '../util';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userSession = localStorage.getItem("user");

    if (!userSession) {
        console.error("No user session found.");
        return;
    }

    const sessionData = JSON.parse(userSession);
    const accessToken = sessionData.access_token;

    const result = await logoutUser(accessToken);

    if (result.success) {
        localStorage.removeItem("user");
        localStorage.removeItem("user_email");
        navigate("/");
    } else {
        console.error("Logout error:", result.message);
    }
};
  
  return (
    <header className="navbar"
      style={{ backgroundColor: 'white', padding: '5px 5px' }}
    >
      <img src={logo} alt="logo" className="navbar-logo"
        style={{ width: '150px', height: 'auto' }}
      />
      <nav className="navbar-links">
        <Link to="/home" style = {{ color: 'black', margin: '0 15px', fontSize: '50px', textDecoration: 'none' }}>Home</Link>
        <Link to="/take-a-trip" style = {{ color: 'black', margin: '0 15px', fontSize: '50px', textDecoration: 'none' }}>Take a Trip</Link>
        <Link to="/saved-trips" style = {{ color: 'black', margin: '0 15px', fontSize: '50px', textDecoration: 'none' }}>Saved Trips</Link>
      </nav>
      
      <button
        onClick={handleLogout}
        className="logout-button"
        style={{
          color: 'white',
          backgroundColor: 'blue',
          border: '1px solid white',
          fontSize: '20px',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar

