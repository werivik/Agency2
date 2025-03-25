import React from 'react';

function Home() {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  };

  const heroStyle = {
    textAlign: 'center',
    padding: '4rem 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.8rem 2rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  };

  return React.createElement('div', { style: containerStyle },
    React.createElement('div', { style: heroStyle },
      React.createElement('h1', { style: titleStyle }, 'Welcome to The Spot'),
      React.createElement('p', { style: subtitleStyle }, 'Find and join amazing events in your area!'),
      React.createElement('a', { href: '/events', style: buttonStyle }, 'Browse Events')
    ),
    React.createElement('div', { className: 'featured-events' },
      React.createElement('h2', null, 'Featured Events'),
      React.createElement('p', null, 'Coming soon...')
    )
  );
}

export default Home; 