// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const uid = cred.user.uid;

      // Now reads from your actual structure: users/uid/role
      const snap = await get(ref(db, `users/${uid}/role`));
      const role = snap.val();

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/map');
      }
    } catch (err) {
      let msg = 'Invalid email or password';
      if (err.code?.includes('user-not-found')) msg = 'No account found';
      if (err.code?.includes('wrong-password')) msg = 'Wrong password';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/login-bg.jpg)`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.85)',
        padding: '3rem 2rem',
        borderRadius: '20px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
      }}>
        <h2 style={{ color: '#60a5fa', fontSize: '2.2rem', marginBottom: '2rem' }}>
          Erode Bus Buddy
        </h2>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading}
            style={{ width: '100%', padding: '1rem', margin: '0.8rem 0', borderRadius: '12px', border: 'none', fontSize: '1.1rem' }} />
          
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading}
            style={{ width: '100%', padding: '1rem', margin: '0.8rem 0', borderRadius: '12px', border: 'none', fontSize: '1.1rem' }} />
          
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '1rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: '#e2e8f0' }}>
          No account? <Link to="/signup" style={{ color: '#60a5fa' }}>Sign Up</Link>
        </p>
        <p><Link to="/map" style={{ color: '#34d399' }}>View Live Map (Guest)</Link></p>
      </div>
    </div>
  );
}