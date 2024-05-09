import React, { useState } from 'react';
import Axios from 'axios';
import credentialsValidator from '../../server/formatValidation.js';
const validateEmail = credentialsValidator.validateEmail
const validatePassword= credentialsValidator.validatePassword
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      return;
    }
    if (!validatePassword(password)) {
      return
    }

    try {
        const response = await Axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error); // Display error message from server
      } 
    } catch (error) {
      console.error('Error sending register request:', error.message);

      // Display error message
      setErrorMessage('Error sending register request');
    }
  };

  return (
    <div className="login-form">
      <h1>welcome to the Login page</h1>


      <form onSubmit={handleSubmit}>
        <label for="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label for="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>

        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </form>
    </div>
  );
};

export default LoginForm
