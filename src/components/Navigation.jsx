import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      marginBottom: '2rem'
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '2rem',
        margin: 0,
        padding: 0
      }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        </li>
        <li>
          <Link to="/events" style={{ textDecoration: 'none', color: '#333' }}>Events</Link>
        </li>
        <li>
          <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>About</Link>
        </li>
        <li>
          <Link to="/contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</Link>
        </li>
        <li>
          <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</Link>
        </li>
        <li>
          <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation; 