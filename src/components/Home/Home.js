import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [hoveredButton, setHoveredButton] = React.useState(null);

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/bus-bg.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const contentStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '2rem 3rem',
    borderRadius: '12px',
    color: 'white',
    maxWidth: '500px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease'
  };

  const buttonStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '12px 24px',
    backgroundColor: '#10b981', // Updated to green theme for consistency with BusMap
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' // Matching BusMap hover shadow
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#059669', // Darker green hover
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
  };

  const signupButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4f46e5' // Purple for signup to differentiate
  };

  const signupButtonHoverStyle = {
    ...signupButtonStyle,
    backgroundColor: '#4338ca',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)'
  };

  const guestButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6b7280', // Gray for guest/demo
    marginTop: '1rem',
    display: 'block' // Full width for guest button
  };

  const guestButtonHoverStyle = {
    ...guestButtonStyle,
    backgroundColor: '#4b5563',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(107, 114, 128, 0.4)'
  };

  return (
    <div style={backgroundStyle}>
      <div style={contentStyle}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>🚌 Erode Bus Buddy</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Track your buses live in Erode City with ease!</p>
        <div>
          <Link
            to="/login"
            style={hoveredButton === 'login' ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={hoveredButton === 'signup' ? signupButtonHoverStyle : signupButtonStyle}
            onMouseEnter={() => setHoveredButton('signup')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Sign Up
          </Link>
        </div>
        {/* New: Guest Access Button to View Map */}
        <Link
          to="/map" // Assuming BusMap is routed at /map; adjust if needed
          style={hoveredButton === 'guest' ? guestButtonHoverStyle : guestButtonStyle}
          onMouseEnter={() => setHoveredButton('guest')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          👀 View Live Map (Guest)
        </Link>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '1rem' }}>
          No account? Jump in as a guest to see buses in action!
        </p>
      </div>
    </div>
  );
}

export default Home;