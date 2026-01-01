import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

function BusList() {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const busRef = ref(db, 'buses');
    
    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const busList = Object.entries(data).map(([id, value]) => ({
          id,
          name: value.name || 'Unknown Bus',
          route: value.route || '—',
          status: value.status || 'unknown',
          timestamp: value.timestamp || Date.now(),
        }));
        setBuses(busList);
      } else {
        setBuses([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching buses:", error);
      setBuses([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredBuses = buses.filter(bus =>
    bus.name.toLowerCase().includes(search.toLowerCase()) ||
    bus.route.toLowerCase().includes(search.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/login-bg.jpg)`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        background: 'rgba(0, 0, 0, 0.78)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '2rem'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b, #334155)',
          padding: '2rem 1.5rem 1.5rem',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
            Live Buses
          </h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '1.1rem' }}>
            {buses.length} active bus{buses.length !== 1 ? 'es' : ''}
          </p>
        </div>

        {/* Search */}
        <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
          <input
            type="text"
            placeholder="Search bus name or route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.2rem',
              borderRadius: '14px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.12)',
              color: 'white',
              fontSize: '1.1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.22)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.12)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* List */}
        <div style={{ padding: '0 1rem 1.5rem', maxHeight: '65vh', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '5px solid #334155',
                borderTop: '5px solid #60a5fa',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }}></div>
              <p>Loading buses...</p>
            </div>
          ) : filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div
                key={bus.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  margin: '0.8rem 0.5rem',
                  padding: '1.3rem 1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Live Dot */}
                {bus.status === 'active' && (
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    width: '12px',
                    height: '12px',
                    background: '#10b981',
                    borderRadius: '50%',
                    boxShadow: '0 0 0 0 rgba(16, 185, 129, 1)',
                    animation: 'pulse 2s infinite'
                  }}></div>
                )}

                <div style={{ marginLeft: '28px' }}>
                  <div style={{
                    fontSize: '1.35rem',
                    fontWeight: 'bold',
                    color: '#f1f5f9',
                    marginBottom: '0.5rem'
                  }}>
                    {bus.name}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ color: '#94a3b8' }}>
                      Route: <span style={{ color: '#60a5fa', fontWeight: '600' }}>{bus.route}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '0.85rem',
                        color: '#94a3b8',
                        background: 'rgba(255,255,255,0.08)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px'
                      }}>
                        {formatTime(bus.timestamp)}
                      </span>

                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        background: bus.status === 'active' 
                          ? 'rgba(16, 185, 129, 0.25)' 
                          : 'rgba(239, 68, 68, 0.25)',
                        color: bus.status === 'active' ? '#10b981' : '#ef4444'
                      }}>
                        {bus.status === 'active' ? 'LIVE' : 'OFFLINE'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              <p style={{ fontSize: '1.2rem' }}>
                {search ? 'No matching buses found' : 'No buses available'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.2rem',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.9rem',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
          Real-time updates • Smooth & fast
        </div>
      </div>

      {/* Inline CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default BusList;