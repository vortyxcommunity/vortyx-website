import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
