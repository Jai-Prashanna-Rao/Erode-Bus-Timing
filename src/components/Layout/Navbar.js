// src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../firebase';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const snap = await get(ref(db, `users/${u.uid}/role`));
        setIsAdmin(snap.val() === 'admin');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return unsub;
  }, []);

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#60a5fa' : '#e2e8f0',
    padding: '0.7rem 1.2rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    background: location.pathname === path ? 'rgba(96,165,250,0.2)' : 'transparent'
  });

  return (
    <nav style={{ background: 'rgba(15,23,42,0.95)', padding: '1.5rem', position: 'sticky', top: 0, zIndex: 1000, backdropFilter: 'blur(10px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#60a5fa', textDecoration: 'none' }}>
          Erode Bus Buddy
        </Link>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" style={linkStyle('/')}>Home</Link>
          <Link to="/map" style={linkStyle('/map')}>Live Map</Link>
          <Link to="/buses" style={linkStyle('/buses')}>Bus List</Link>
          {isAdmin && <Link to="/admin" style={linkStyle('/admin')}>Admin Panel</Link>}
        </div>

        {user ? (
          <button onClick={() => signOut(auth)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ color: '#60a5fa', fontWeight: 'bold' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}