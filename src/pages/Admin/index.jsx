import React from 'react';
import CreateEvent from './CreateEvent/index';

function Admin() {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  };

  const headerStyle = {
    marginBottom: '2rem',
    color: '#333'
  };

  return React.createElement('div', { style: containerStyle },
    React.createElement('h1', { style: headerStyle }, 'Admin Dashboard'),
    React.createElement('div', { className: 'admin-content' },
      React.createElement('section', null,
        React.createElement('h2', null, 'Create New Event'),
        React.createElement(CreateEvent)
      )
    )
  );
}

export default Admin; 