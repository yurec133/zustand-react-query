// src/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default AppRoutes;
