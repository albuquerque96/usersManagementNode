import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegistrationForm.css';
import { register } from '../../server/services/authService';
import credentialsValidator from '../../server/services/credentialsFormatValidation';
const validateEmailFormat = credentialsValidator.validateEmailFormat
const validatePasswordFormat= credentialsValidator.validatePasswordFormat


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedPassword = password.replace(/[^a-zA-Z0-9!@#$%^&*()_+-=|{}[]\\<>\/?.,:\s]/g, '');
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9._@-]/g, '');
    const emailValidationResult = validateEmailFormat(sanitizedEmail);
    const passwordValidationResult = validatePasswordFormat(sanitizedPassword);

    let errorMessages = [];

    if (!emailValidationResult) {
      errorMessages.push('Invalid email format');
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (passwordValidationResult.length >  0) {
      setPasswordErrors(passwordValidationResult);
    } else {
      setPasswordErrors([]);
    }

    if (passwordValidationResult  && emailValidationResult) {
      const registrationResponse = await register(email, password);

      if (!registrationResponse) {
        setErrorMessage('Registration failed');
      } else {
        setErrorMessage('Registration successful!');
        navigate('/dashboard');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form id="registerForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className={emailError ? 'form-control error' : 'form-control'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <small className="error-message">Invalid email format</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={passwordErrors.length >  0 ? 'form-control error' : 'form-control'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="toggle-password-button" onClick={togglePasswordVisibility}>
            {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
          </button>
          {passwordErrors.length >  0 && (
            <ul className="error-messages">
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="submit-button">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
