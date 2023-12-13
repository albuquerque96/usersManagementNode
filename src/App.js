import React from 'react';
import Router from './components/routing/router';
import RegistrationForm from './components/auth/RegistrationForm';

const App = () => {
  return (
    <div className="app">
      {<Router />}
    </div>
  );
};

export default App;