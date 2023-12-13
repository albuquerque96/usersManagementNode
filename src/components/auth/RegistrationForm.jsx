const React = require('react');
const { useState } = React;
const Axios = require('axios');

const validateEmail = require('../../server/validation.js').validateEmail;
const validatePassword = require('../../server/validation.js').validatePassword;

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    if (!emailValidationResult) {
      setErrorMessage("email format is invalid");
      return;
    }

    if (passwordValidationResult.length>0) {
      setErrorMessage(passwordValidationResult);
      return;
    }

    try {
      const response = await Axios.post('/register', {
        email,
        password,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error); // Display error message from server
      } else {
        setErrorMessage('Registration successful');
      }
    } catch (error) {
      console.error('Error sending register request:', error.message);
      setErrorMessage('Error sending register request');
    }
  };

  return (
    <div >
      <h1>Registration</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Register</button>

        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </form>
    </div>
  );
};

export default RegistrationForm;
