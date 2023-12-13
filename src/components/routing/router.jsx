import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import LoginForm from '../auth/loginForm';
import RegisterForm from '../auth/RegistrationForm';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
