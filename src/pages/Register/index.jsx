import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Registration attempt:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return React.createElement('div', { className: 'register-container' },
    React.createElement('h2', null, 'Register'),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'name' }, 'Full Name'),
        React.createElement('input', {
          type: 'text',
          id: 'name',
          name: 'name',
          value: formData.name,
          onChange: handleChange,
          required: true,
          style: inputStyle
        })
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'email' }, 'Email'),
        React.createElement('input', {
          type: 'email',
          id: 'email',
          name: 'email',
          value: formData.email,
          onChange: handleChange,
          required: true,
          style: inputStyle
        })
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'password' }, 'Password'),
        React.createElement('input', {
          type: 'password',
          id: 'password',
          name: 'password',
          value: formData.password,
          onChange: handleChange,
          required: true,
          style: inputStyle
        })
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'confirmPassword' }, 'Confirm Password'),
        React.createElement('input', {
          type: 'password',
          id: 'confirmPassword',
          name: 'confirmPassword',
          value: formData.confirmPassword,
          onChange: handleChange,
          required: true,
          style: inputStyle
        })
      ),
      React.createElement('button', { type: 'submit', style: buttonStyle }, 'Register')
    )
  );
}

export default Register; 