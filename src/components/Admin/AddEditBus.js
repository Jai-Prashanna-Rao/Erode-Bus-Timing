import React, { useState } from 'react';
import { db } from '../../firebase';
import { ref, set, get } from 'firebase/database';

function AddEditBus() {
  const [busId, setBusId] = useState('');
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      setError('Invalid coordinates!');
      setLoading(false);
      return;
    }

    try {
      await set(ref(db, 'buses/' + busId), {
        name,
        lat: parsedLat,
        lng: parsedLng,
        status
      });
      setError('Bus saved successfully!');
      setBusId(''); 
      setName(''); 
      setLat(''); 
      setLng('');
      setStatus('active');
    } catch (err) {
      setError('Failed to save bus. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadBusData = async () => {
    if (!busId) {
      setError('Please enter Bus ID.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const snap = await get(ref(db, 'buses/' + busId));
      if (snap.exists()) {
        const data = snap.val();
        setName(data.name || '');
        setLat(data.lat || '');
        setLng(data.lng || '');
        setStatus(data.status || 'active');
        setError('Bus data loaded successfully!');
      } else {
        setError("Bus not found");
      }
    } catch (err) {
      setError('Failed to load bus data. Please try again.');
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
    maxWidth: '400px',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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

  const selectStyle = {
    ...inputStyle,
    padding: '0.75rem',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%204%205%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M2%200L0%202h4zm0%205L0%203h4z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem top 50%',
    backgroundSize: '0.65em auto'
  };

  const selectFocusStyle = {
    ...selectStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
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

  const loadButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4f46e5',
    width: '48%',
    margin: '0.5rem 1%'
  };

  const loadButtonHoverStyle = {
    ...loadButtonStyle,
    backgroundColor: '#4338ca',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)'
  };

  return (
    <div style={backgroundStyle}>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Add / Edit Bus</h2>
        {error && (
          <p style={{ color: error.includes('success') || error.includes('loaded') ? '#10b981' : '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Bus ID"
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style = inputFocusStyle)}
            onBlur={(e) => (e.target.style = inputStyle)}
            required
          />
          <button 
            type="button" 
            onClick={loadBusData}
            style={loadButtonStyle}
            onMouseEnter={(e) => !loading && (e.target.style = loadButtonHoverStyle)}
            onMouseLeave={(e) => !loading && (e.target.style = loadButtonStyle)}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load'}
          </button>
          <input
            placeholder="Bus Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style = inputFocusStyle)}
            onBlur={(e) => (e.target.style = inputStyle)}
            required
          />
          <input
            placeholder="Latitude"
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style = inputFocusStyle)}
            onBlur={(e) => (e.target.style = inputStyle)}
            required
          />
          <input
            placeholder="Longitude"
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style = inputFocusStyle)}
            onBlur={(e) => (e.target.style = inputStyle)}
            required
          />
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            style={selectStyle}
            onFocus={(e) => (e.target.style = selectFocusStyle)}
            onBlur={(e) => (e.target.style = selectStyle)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button 
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => !loading && (e.target.style = buttonHoverStyle)}
            onMouseLeave={(e) => !loading && (e.target.style = buttonStyle)}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Bus'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditBus;