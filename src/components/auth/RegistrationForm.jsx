import { useState, useEffect } from 'react';
const validateEmail =  require('../../server/validation.js').validateEmail;
const validatePassword =  require('../../server/validation.js').validatePassword;

const makeRegistrationRequest = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    let errorMessages = [];

    if (!emailValidationResult) {
      errorMessages.push('Invalid email format');
    }

    if (passwordValidationResult.length > 0) {
      for (const error of passwordValidationResult) {
        errorMessages.push(error);
      }
    }

    if (errorMessages.length > 0) {
      setErrorMessage(errorMessages.join(','));
      return;
    }

    const registrationResponse = await makeRegistrationRequest(email, password);

    if (!registrationResponse.ok) {
      const error = registrationResponse.data.error;
      setErrorMessage(error);
    } else {
      setErrorMessage('Registration successful!');
    }
  };
  const [user, setUser] = useState({});

  useEffect(() => {
    // Submit the form using an asynchronous function with await
    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        // Simulate an API call to register the user
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        });

        // The response is now available
        if (response.ok) {
          // The registration was successful
          const registrationData = await response.json();
          if (registrationData.registered) {
            setUser({ ...user, registered: true });
          } else {
            console.error('Registration failed');
          }
        } else {
          // The registration was not successful
          console.error('Registration failed');
        }
      } catch (error) {
        // An error occurred during the registration
        console.error(error);
      }
    };

    // Attach the handleSubmit handler to the form
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', handleSubmit);
  }, []);

  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" value={user.username} onChange={(event) => setUser({ ...user, username: event.target.value })} />
      <br />
      <label>Password:</label>
      <input type="password" value={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} />
      <br />
      <button type="submit">Register</button>
      {user.registered && <p>Registration successful!</p>}
    </form>
  );
};

export default RegistrationForm;
