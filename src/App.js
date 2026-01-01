import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout & Auth
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Layout/ProtectedRoute';

// Pages
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminPanel from './components/Admin/AdminPanel';

// Bus Features
import BusMapLeaflet from './components/Bus/BusMapLeaflet';
import BusList from './components/Bus/BusList';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Only Admins */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Both Admin & Normal Users */}
        <Route
          path="/map"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <BusMapLeaflet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buses"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <BusList />
            </ProtectedRoute>
          }
        />

        {/* Optional: Catch-all for 404 */}
        <Route path="*" element={
          <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#e2e8f0',
            background: '#0f172a'
          }}>
            <h1>404 - Page Not Found</h1>
            <p><a href="/" style={{ color: '#60a5fa' }}>Go Home</a></p>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;