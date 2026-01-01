import { useState } from 'react';
import { db } from '../../firebase';
import { ref, set, remove } from 'firebase/database';

function AdminPanel() {
  const [addId, setAddId] = useState('');
  const [addName, setAddName] = useState('');
  const [addLat, setAddLat] = useState('');
  const [addLng, setAddLng] = useState('');
  const [addStatus, setAddStatus] = useState('');
  const [delId, setDelId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddBus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const lat = parseFloat(addLat);
    const lng = parseFloat(addLng);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Invalid coordinates!');
      setLoading(false);
      return;
    }

    try {
      await set(ref(db, 'buses/' + addId), {
        name: addName,
        lat,
        lng,
        status: addStatus
      });
      // Clear form
      setAddId('');
      setAddName('');
      setAddLat('');
      setAddLng('');
      setAddStatus('');
      setError('Bus added successfully!');
    } catch (err) {
      setError('Failed to add bus. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await remove(ref(db, 'buses/' + delId));
      setDelId('');
      setError('Bus removed successfully!');
    } catch (err) {
      setError('Failed to remove bus. Please try again.');
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

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ef4444'
  };

  const deleteButtonHoverStyle = {
    ...deleteButtonStyle,
    backgroundColor: '#dc2626',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)'
  };

  const sectionStyle = {
    marginBottom: '2rem',
    textAlign: 'left'
  };

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#10b981'
  };

  return (
    <div style={backgroundStyle}>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Admin Panel</h2>
        {error && (
          <p style={{ color: error.includes('success') ? '#10b981' : '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}
        
        {/* Add Bus Section */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Add Bus</h3>
          <form onSubmit={handleAddBus}>
            <input
              placeholder="Bus ID"
              value={addId}
              onChange={(e) => setAddId(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
              required
            />
            <input
              placeholder="Bus Name"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
              required
            />
            <input
              placeholder="Latitude"
              type="number"
              step="any"
              value={addLat}
              onChange={(e) => setAddLat(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
              required
            />
            <input
              placeholder="Longitude"
              type="number"
              step="any"
              value={addLng}
              onChange={(e) => setAddLng(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
              required
            />
            <input
              placeholder="Status"
              value={addStatus}
              onChange={(e) => setAddStatus(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => !loading && (e.target.style = buttonHoverStyle)}
              onMouseLeave={(e) => !loading && (e.target.style = buttonStyle)}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Bus'}
            </button>
          </form>
        </div>

        {/* Delete Bus Section */}
        <div style={sectionStyle}>
          <h3 style={{ ...sectionTitleStyle, color: '#ef4444' }}>Remove Bus</h3>
          <form onSubmit={handleDeleteBus}>
            <input
              placeholder="Bus ID"
              value={delId}
              onChange={(e) => setDelId(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style = inputFocusStyle)}
              onBlur={(e) => (e.target.style = inputStyle)}
              required
            />
            <button
              type="submit"
              style={deleteButtonStyle}
              onMouseEnter={(e) => !loading && (e.target.style = deleteButtonHoverStyle)}
              onMouseLeave={(e) => !loading && (e.target.style = deleteButtonStyle)}
              disabled={loading}
            >
              {loading ? 'Removing...' : 'Remove Bus'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;