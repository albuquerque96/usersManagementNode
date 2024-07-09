import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../server/services/authService';
import credentialsValidator from '../../server/services/credentialsFormatValidation';
const validateEmailFormat = credentialsValidator.validateEmailFormat
const validatePasswordFormat= credentialsValidator.validatePasswordFormat
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmailFormat(email)) {
      setErrorMessage('Invalid email address');
      return;
    }
    if (!validatePasswordFormat(password)) {
      return
    }

    try {
        const response = await login(email,password)
      // Successful login
      if (response.status === 200) {     
        setErrorMessage(''); // Clear any previous error message
        // Redirect to dashboard or another page upon successful login
        navigate('/dashboard');
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        setErrorMessage(response.data.message); 
      }
    } catch (error) {
      console.error('Error sending login request:', error.message);     
      setErrorMessage(error.message);
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
