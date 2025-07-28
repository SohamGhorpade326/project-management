import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/shared/Header';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import AccountSettings from './pages/AccountSettings';

function App() {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/project/:id" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;