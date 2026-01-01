import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added missing Link import
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { ref, set } from 'firebase/database';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user'); // New state for role selection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await set(ref(db, 'users/' + userCred.user.uid), { role: selectedRole });
      localStorage.setItem('role', selectedRole);
      
      // Use navigate here to redirect on success (fixes the unused var warning)
      navigate('/dashboard'); // Or make it role-based: selectedRole === 'admin' ? navigate('/admin') : navigate('/user-dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/login-bg.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem'
  };

  const formStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    borderRadius: '12px',
    color: 'white',
    width: '100%',
    maxWidth: '320px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const inputFocusStyle = {
    ...inputStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '1rem 0',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#10b981',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: loading ? 0.7 : 1
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#059669',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
  };

  const passwordContainerStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '100%'
  };

  const eyeIconStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.2rem',
    userSelect: 'none'
  };

  const roleContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '1rem 0',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: '0.75rem',
    borderRadius: '6px'
  };

  const roleLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'Red',
    fontSize: '0.9rem',
    userSelect: 'none'
  };

  const roleInputStyle = {
    marginRight: '0.5rem',
    accentColor: '#10b981'
  };

  return (
    <div style={backgroundStyle}>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Sign Up</h2>
        {error && (
          <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSignup}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style = inputFocusStyle)}
            onBlur={(e) => (e.target.style = inputStyle)}
            required
          />
          <div style={passwordContainerStyle}>
            <input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
              required
            />
            <span
              style={eyeIconStyle}
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
          <div style={passwordContainerStyle}>
            <input
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
              required
            />
            <span
              style={eyeIconStyle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '👁️' : '🙈'}
            </span>
          </div>
          <div style={roleContainerStyle}>
            <label style={roleLabelStyle}>
              <input
                type="radio"
                value="user"
                checked={selectedRole === 'user'}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={roleInputStyle}
                required
              />
              User
            </label>
            <label style={roleLabelStyle}>
              <input
                type="radio"
                value="admin"
                checked={selectedRole === 'admin'}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={roleInputStyle}
                required
              />
              Admin
            </label>
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => !loading && (e.target.style = buttonHoverStyle)}
            onMouseLeave={(e) => !loading && (e.target.style = buttonStyle)}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#4f46e5' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;