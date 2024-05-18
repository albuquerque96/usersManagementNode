import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import LoginForm from '../auth/loginForm';
import RegisterForm from '../auth/RegistrationForm';
import Dashboard from '../dashboard';
import Profile from '../profile';
import Task from '../task';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
