// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminPanel from './components/Admin/AdminPanel';
import BusMap from './components/Bus/BusMap';
import BusList from './components/Bus/BusList';
import ProtectedRoute from './components/Layout/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Public Bus Features (anyone can see live map/list) */}
      <Route path="/map" element={<BusMap />} />
      <Route path="/buses" element={<BusList />} />

      {/* Admin Only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#e2e8f0',
          background: '#0f172a',
          fontSize: '1.5rem'
        }}>
          <h1>404 - Page Not Found</h1>
          <a href="/" style={{ color: '#60a5fa', marginTop: '1rem' }}>Go Home</a>
        </div>
      } />
    </Routes>
  );
}

export default AppRoutes;