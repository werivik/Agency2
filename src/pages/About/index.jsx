import React from 'react';

function About() {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  };

  const sectionStyle = {
    marginBottom: '2rem'
  };

  const titleStyle = {
    color: '#333',
    marginBottom: '1rem'
  };

  const textStyle = {
    color: '#666',
    lineHeight: '1.6'
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0
  };

  const listItemStyle = {
    marginBottom: '0.5rem',
    paddingLeft: '1.5rem',
    position: 'relative'
  };

  const bulletStyle = {
    position: 'absolute',
    left: 0,
    color: '#007bff'
  };

  return React.createElement('div', { style: containerStyle },
    React.createElement('section', { style: sectionStyle },
      React.createElement('h1', { style: titleStyle }, 'About The Spot'),
      React.createElement('p', { style: textStyle },
        'The Spot is your go-to platform for discovering and joining amazing events in your area. ' +
        'Our mission is to connect people through shared experiences and create memorable moments.'
      )
    ),
    React.createElement('section', { style: sectionStyle },
      React.createElement('h2', { style: titleStyle }, 'What We Offer'),
      React.createElement('ul', { style: listStyle },
        React.createElement('li', { style: listItemStyle },
          React.createElement('span', { style: bulletStyle }, '•'),
          'Easy event discovery and browsing'
        ),
        React.createElement('li', { style: listItemStyle },
          React.createElement('span', { style: bulletStyle }, '•'),
          'Simple event creation and management'
        ),
        React.createElement('li', { style: listItemStyle },
          React.createElement('span', { style: bulletStyle }, '•'),
          'Secure user authentication'
        ),
        React.createElement('li', { style: listItemStyle },
          React.createElement('span', { style: bulletStyle }, '•'),
          'Real-time updates and notifications'
        )
      )
    ),
    React.createElement('section', { style: sectionStyle },
      React.createElement('h2', { style: titleStyle }, 'Our Mission'),
      React.createElement('p', { style: textStyle },
        'We believe in the power of community and shared experiences. ' +
        'The Spot aims to make it easier for people to find, create, and join events ' +
        'that bring them together with like-minded individuals.'
      )
    )
  );
}

export default About; 