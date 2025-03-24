import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submission:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.8rem 2rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  return React.createElement('div', { style: containerStyle },
    React.createElement('h1', null, 'Contact Us'),
    React.createElement('p', { style: { marginBottom: '2rem' } },
      'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
    ),
    React.createElement('form', { onSubmit: handleSubmit, style: formStyle },
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'name', style: labelStyle }, 'Name'),
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
        React.createElement('label', { htmlFor: 'email', style: labelStyle }, 'Email'),
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
        React.createElement('label', { htmlFor: 'subject', style: labelStyle }, 'Subject'),
        React.createElement('input', {
          type: 'text',
          id: 'subject',
          name: 'subject',
          value: formData.subject,
          onChange: handleChange,
          required: true,
          style: inputStyle
        })
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'message', style: labelStyle }, 'Message'),
        React.createElement('textarea', {
          id: 'message',
          name: 'message',
          value: formData.message,
          onChange: handleChange,
          required: true,
          style: textareaStyle
        })
      ),
      React.createElement('button', { type: 'submit', style: buttonStyle }, 'Send Message')
    )
  );
}

export default Contact; 