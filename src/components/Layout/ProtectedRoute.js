// src/components/Layout/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../firebase';

export default function ProtectedRoute({ children, allowedRoles = ['admin'] }) {
  const [allowed, setAllowed] = useState(null); // null = loading
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAllowed(false);
        return;
      }

      try {
        const snap = await get(ref(db, `users/${user.uid}/role`));
        const role = snap.val(); // "admin" or null
        setAllowed(role && allowedRoles.includes(role));
      } catch (error) {
        console.error("Error checking role:", error);
        setAllowed(false);
      }
    });

    return () => unsubscribe();
  }, [allowedRoles]);

  // Still checking...
  if (allowed === null) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0f172a',
        color: '#e2e8f0',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  // Not authorized → redirect to login
  if (!allowed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authorized → show protected page
  return children;
}