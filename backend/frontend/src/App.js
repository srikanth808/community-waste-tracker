import React, { useState, useEffect, createContext, useContext } from 'react';

// Context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Mock API with enhanced features
const mockAPI = {
  login: (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'demo@example.com' && password === 'demo123') {
          resolve({
            user: {
              id: 1,
              name: 'Demo User',
              email: email,
              ecoPoints: 1250,
              level: 3,
              streak: 7,
              totalLogs: 47,
              carbonSaved: 24.5
            }
          });
        } else {
          resolve({ error: 'Invalid credentials' });
        }
      }, 500);
    });
  }
};

// Toast Notification Component
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6'
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: colors[type],
      color: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      zIndex: 2000,
      animation: 'slideIn 0.3s ease-out',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontWeight: '600'
    }}>
      <span style={{ fontSize: '20px' }}>
        {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      {message}
    </div>
  );
}

// Waste Log Modal Component
function WasteLogModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    category: '',
    quantity: '',
    unit: 'kg',
    disposalMethod: 'recycled',
    description: ''
  });

  const categories = [
    { name: 'Plastic', icon: '♻️', color: '#ef4444' },
    { name: 'Organic', icon: '🌱', color: '#10b981' },
    { name: 'Paper', icon: '📄', color: '#f59e0b' },
    { name: 'Glass', icon: '🥤', color: '#3b82f6' },
    { name: 'Metal', icon: '🔧', color: '#6b7280' },
    { name: 'Electronics', icon: '💻', color: '#8b5cf6' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      alert('Please select a category');
      return;
    }
    onSubmit(formData);
    setFormData({ category: '', quantity: '', unit: 'kg', disposalMethod: 'recycled', description: '' });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        animation: 'scaleIn 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>Log New Waste</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#6b7280',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#374151' }}>
              Select Category *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {categories.map(cat => (
                <div
                  key={cat.name}
                  onClick={() => setFormData({ ...formData, category: cat.name })}
                  style={{
                    padding: '16px',
                    border: formData.category === cat.name ? `3px solid ${cat.color}` : '2px solid #e5e7eb',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: formData.category === cat.name ? `${cat.color}15` : 'white',
                    transition: 'all 0.2s',
                    transform: formData.category === cat.name ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{cat.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>{cat.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Quantity *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lbs">lbs</option>
                <option value="items">items</option>
                <option value="liters">liters</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Disposal Method
            </label>
            <select
              value={formData.disposalMethod}
              onChange={(e) => setFormData({ ...formData, disposalMethod: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              <option value="recycled">♻️ Recycled</option>
              <option value="composted">🌱 Composted</option>
              <option value="landfill">🗑️ Landfill</option>
              <option value="donated">🎁 Donated</option>
              <option value="reused">🔄 Reused</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
                minHeight: '80px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              placeholder="Add any additional notes..."
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '14px',
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '14px',
                background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Log Waste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Achievement Popup Component
function AchievementPopup({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      zIndex: 2000,
      textAlign: 'center',
      animation: 'bounceIn 0.5s ease-out',
      minWidth: '300px'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏆</div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>
        Achievement Unlocked!
      </h2>
      <p style={{ fontSize: '18px', color: '#10b981', fontWeight: '600', marginBottom: '8px' }}>
        {achievement.name}
      </p>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        +{achievement.points} eco-points
      </p>
      <button
        onClick={onClose}
        style={{
          padding: '12px 32px',
          background: 'linear-gradient(135deg, #10b981, #14b8a6)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Awesome!
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [wasteLogs, setWasteLogs] = useState([
    { id: 1, type: 'Plastic', amount: '0.5 kg', date: 'Today', impact: '2.1', icon: '♻️' },
    { id: 2, type: 'Organic', amount: '1.2 kg', date: 'Yesterday', impact: '0.3', icon: '🌱' },
    { id: 3, type: 'Paper', amount: '0.8 kg', date: '2 days ago', impact: '0.9', icon: '📄' }
  ]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    const response = await mockAPI.login(email, password);
    setLoading(false);
    
    if (response.user) {
      setUser(response.user);
      setCurrentPage('dashboard');
      showToast('Welcome back! 🎉');
    } else {
      showToast('Invalid credentials. Try demo@example.com / demo123', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    showToast('Logged out successfully! 👋');
  };

  const handleWasteSubmit = (wasteData) => {
    const icons = {
      'Plastic': '♻️',
      'Organic': '🌱',
      'Paper': '📄',
      'Glass': '🥤',
      'Metal': '🔧',
      'Electronics': '💻'
    };

    const carbonImpact = (parseFloat(wasteData.quantity) * (Math.random() * 5 + 1)).toFixed(1);
    
    const newLog = {
      id: Date.now(),
      type: wasteData.category,
      amount: `${wasteData.quantity} ${wasteData.unit}`,
      date: 'Just now',
      impact: carbonImpact,
      icon: icons[wasteData.category] || '📦'
    };
    
    setWasteLogs([newLog, ...wasteLogs]);
    
    // Update user points
    const pointsEarned = Math.floor(Math.random() * 30) + 20;
    setUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + pointsEarned,
      totalLogs: prev.totalLogs + 1,
      carbonSaved: prev.carbonSaved + parseFloat(carbonImpact)
    }));

    showToast(`✅ Waste logged! +${pointsEarned} eco-points`);
    setIsModalOpen(false);

    // Random achievement
    if (Math.random() > 0.7) {
      setTimeout(() => {
        setAchievement({
          name: 'Eco Warrior!',
          points: 100
        });
      }, 500);
    }
  };

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {!user ? (
          <LoginPage onLogin={handleLogin} loading={loading} />
        ) : (
          <MainApp 
            user={user}
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            onLogout={handleLogout}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            wasteLogs={wasteLogs}
            onWasteSubmit={handleWasteSubmit}
          />
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {achievement && (
          <>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1999
            }} onClick={() => setAchievement(null)} />
            <AchievementPopup
              achievement={achievement}
              onClose={() => setAchievement(null)}
            />
          </>
        )}
      </div>
    </AuthContext.Provider>
  );
}

// Login Page Component
function LoginPage({ onLogin, loading }) {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'scaleIn 0.5s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '40px',
            animation: 'pulse 2s infinite'
          }}>
            ♻️
          </div>
          <h1 style={{ fontSize: '28px', marginBottom: '10px', color: '#1f2937', fontWeight: '700' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#6b7280' }}>Continue your sustainability journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'border 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'border 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #14b8a6)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f0fdf4',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#166534'
        }}>
          <strong>Demo Credentials:</strong><br />
          Email: demo@example.com<br />
          Password: demo123
        </div>
      </div>
    </div>
  );
}

// Main App with Navigation
function MainApp({ user, currentPage, setCurrentPage, onLogout, isModalOpen, setIsModalOpen, wasteLogs, onWasteSubmit }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            ♻️
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Waste Tracker
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <NavButton active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')}>
            📊 Dashboard
          </NavButton>
          <NavButton active={currentPage === 'analytics'} onClick={() => setCurrentPage('analytics')}>
            📈 Analytics
          </NavButton>
          <NavButton active={currentPage === 'leaderboard'} onClick={() => setCurrentPage('leaderboard')}>
            🏆 Leaderboard
          </NavButton>
          <NavButton active={currentPage === 'challenges'} onClick={() => setCurrentPage('challenges')}>
            🎯 Challenges
          </NavButton>
          
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #10b981, #14b8a6)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            + Log Waste
          </button>

          <div style={{
            padding: '8px 16px',
            background: '#f0fdf4',
            borderRadius: '10px',
            color: '#166534',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            ⚡ {user.ecoPoints} pts
          </div>

          <button
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#dc2626'}
            onMouseLeave={(e) => e.target.style.background = '#ef4444'}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {currentPage === 'dashboard' && <Dashboard user={user} wasteLogs={wasteLogs} />}
        {currentPage === 'analytics' && <Analytics />}
        {currentPage === 'leaderboard' && <Leaderboard user={user} />}
        {currentPage === 'challenges' && <Challenges />}
      </div>

      {/* Waste Log Modal */}
      <WasteLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onWasteSubmit}
      />
    </div>
  );
}

// Nav Button Component
function NavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        background: active ? '#f0fdf4' : 'transparent',
        color: active ? '#166534' : '#6b7280',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => !active && (e.target.style.background = '#f9fafb')}
      onMouseLeave={(e) => !active && (e.target.style.background = 'transparent')}
    >
      {children}
    </button>
  );
}

// Dashboard Component
function Dashboard({ user, wasteLogs }) {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #14b8a6)',
        borderRadius: '20px',
        padding: '40px',
        color: 'white',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }} />
        <h1 style={{ fontSize: '32px', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
          Welcome back, {user.name}! 🌱
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, position: 'relative', zIndex: 1 }}>
          You're on a {user.streak} day streak! Keep it up!
        </p>
        <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🎯</span>
            <span>Level {user.level}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🏆</span>
            <span>{user.ecoPoints} Points</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🔥</span>
            <span>{user.streak} Day Streak</span>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <StatsCard title="Total Logs" value={user.totalLogs} icon="📝" color="#10b981" change="+12 this week" />
        <StatsCard title="This Week" value="12" icon="📅" color="#3b82f6" change="+3 from last week" />
        <StatsCard title="Carbon Saved" value={`${user.carbonSaved} kg`} icon="🌍" color="#f59e0b" change="+5.2kg this week" />
        <StatsCard title="Rank" value="#3" icon="🏆" color="#8b5cf6" change="+2 positions" />
      </div>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>📋</span> Recent Activity
        </h3>
        {wasteLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <p>No waste logs yet. Start tracking your waste!</p>
          </div>
        ) : (
          wasteLogs.map((log) => (
            <ActivityItem key={log.id} {...log} />
          ))
        )}
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, icon, color, change }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>{title}</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>{value}</p>
          {change && (
            <p style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ↗ {change}
            </p>
          )}
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          background: color,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ type, amount, date, impact, icon }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px',
      background: '#f9fafb',
      borderRadius: '12px',
      marginBottom: '12px',
      transition: 'background 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
    onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'white',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          {icon}
        </div>
        <div>
          <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>{type}</p>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{amount} • {date}</p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: '14px', color: '#10b981', fontWeight: '600', margin: '0 0 4px 0' }}>{impact} kg CO₂</p>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Carbon impact</p>
      </div>
    </div>
  );
}

// Analytics Component
function Analytics() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '24px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>📈</span> Analytics Dashboard
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '18px', fontWeight: '600' }}>Weekly Trend</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <Bar height={60} label="Mon" value="2.1" />
            <Bar height={80} label="Tue" value="2.8" />
            <Bar height={70} label="Wed" value="2.4" />
            <Bar height={90} label="Thu" value="3.2" />
            <Bar height={75} label="Fri" value="2.7" />
            <Bar height={65} label="Sat" value="2.2" />
            <Bar height={85} label="Sun" value="3.0" />
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '18px', fontWeight: '600' }}>Category Breakdown</h3>
          <CategoryItem name="Plastic" percentage={35} color="#ef4444" icon="♻️" />
          <CategoryItem name="Organic" percentage={25} color="#10b981" icon="🌱" />
          <CategoryItem name="Paper" percentage={20} color="#f59e0b" icon="📄" />
          <CategoryItem name="Glass" percentage={15} color="#3b82f6" icon="🥤" />
          <CategoryItem name="Other" percentage={5} color="#6b7280" icon="📦" />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        <MetricCard
          title="Recycling Rate"
          value="73%"
          description="of your waste was recycled"
          color="#10b981"
        />
        <MetricCard
          title="Weekly Goal"
          value="85%"
          description="progress towards goal"
          color="#3b82f6"
        />
        <MetricCard
          title="Impact Score"
          value="A+"
          description="environmental impact"
          color="#8b5cf6"
        />
      </div>
    </div>
  );
}

// Bar Component for Chart
function Bar({ height, label, value }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '100%',
        height: `${height}%`,
        background: 'linear-gradient(180deg, #10b981, #14b8a6)',
        borderRadius: '8px 8px 0 0',
        position: 'relative',
        transition: 'height 0.3s ease'
      }}>
        <div style={{
          position: 'absolute',
          top: '-24px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          fontWeight: '600',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          {value} kg
        </div>
      </div>
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{label}</p>
    </div>
  );
}

// Category Item Component
function CategoryItem({ name, percentage, color, icon }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>{icon}</span>
          <span style={{ color: '#374151', fontWeight: '500' }}>{name}</span>
        </div>
        <span style={{ color: '#6b7280', fontWeight: '600' }}>{percentage}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: color,
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }}></div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ title, value, description, color }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      textAlign: 'center',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </h4>
      <div style={{ fontSize: '48px', fontWeight: '700', color: color, marginBottom: '8px' }}>
        {value}
      </div>
      <p style={{ fontSize: '14px', color: '#6b7280' }}>{description}</p>
      <div style={{ width: '100%', height: '4px', background: '#e5e7eb', borderRadius: '2px', marginTop: '16px', overflow: 'hidden' }}>
        <div style={{
          width: value.includes('%') ? value : '100%',
          height: '100%',
          background: color,
          borderRadius: '2px'
        }}></div>
      </div>
    </div>
  );
}

// Leaderboard Component
function Leaderboard({ user }) {
  const leaders = [
    { rank: 1, name: 'EcoWarrior2024', points: 2450, avatar: '🌱', change: '+2' },
    { rank: 2, name: 'GreenGuru', points: 2380, avatar: '♻️', change: '0' },
    { rank: 3, name: user.name, points: user.ecoPoints, avatar: '🌍', isYou: true, change: '+2' },
    { rank: 4, name: 'SustainableSam', points: 1180, avatar: '🌿', change: '-1' },
    { rank: 5, name: 'ZeroWasteZoe', points: 980, avatar: '🌳', change: '+1' },
    { rank: 6, name: 'RecycleRex', points: 875, avatar: '🦖', change: '-2' },
    { rank: 7, name: 'EarthLover', points: 760, avatar: '💚', change: '0' },
    { rank: 8, name: 'GreenThumb', points: 650, avatar: '👍', change: '+3' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '24px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>🏆</span> Community Leaderboard
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#6b7280', marginBottom: '12px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>
            Your Rank
          </h4>
          <div style={{ fontSize: '64px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>
            #{leaders.find(l => l.isYou)?.rank}
          </div>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>out of 1,247 users</p>
          <div style={{
            background: '#f0fdf4',
            padding: '12px',
            borderRadius: '10px'
          }}>
            <p style={{ fontSize: '14px', color: '#166534', fontWeight: '600' }}>
              📈 +2 positions this week!
            </p>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ color: '#374151', marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
            Community Stats
          </h4>
          <StatRow label="Total Users" value="1,247" />
          <StatRow label="Active This Week" value="892" />
          <StatRow label="Total Waste Logged" value="15.2 tons" />
          <StatRow label="Carbon Saved" value="2.3 tons CO₂" />
        </div>
      </div>
      
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Top Contributors</h3>
          <select style={{
            padding: '8px 12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <option>All Time</option>
            <option>This Month</option>
            <option>This Week</option>
          </select>
        </div>
        
        {leaders.map((leader, index) => (
          <div
            key={leader.rank}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              background: leader.isYou ? '#f0fdf4' : index < 3 ? '#fef3c7' : '#f9fafb',
              borderRadius: '12px',
              marginBottom: '12px',
              border: leader.isYou ? '2px solid #10b981' : 'none',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: leader.rank === 1 ? '#fbbf24' : leader.rank === 2 ? '#d1d5db' : leader.rank === 3 ? '#f97316' : '#e5e7eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              marginRight: '16px',
              fontSize: '16px',
              color: leader.rank <= 3 ? '#1f2937' : '#6b7280'
            }}>
              {leader.rank}
            </div>
            <div style={{ fontSize: '28px', marginRight: '16px' }}>{leader.avatar}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                {leader.name} {leader.isYou && <span style={{ color: '#10b981', fontSize: '14px' }}>(You)</span>}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{leader.points} eco-points</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              {leader.rank <= 3 && <span style={{ fontSize: '24px' }}>🏆</span>}
              <div style={{
                fontSize: '12px',
                color: leader.change.includes('+') ? '#10b981' : leader.change.includes('-') ? '#ef4444' : '#6b7280',
                fontWeight: '600',
                marginTop: '4px'
              }}>
                {leader.change !== '0' ? leader.change : '—'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Stat Row Component
function StatRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', padding: '8px 0' }}>
      <span style={{ color: '#6b7280', fontSize: '14px' }}>{label}</span>
      <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>{value}</span>
    </div>
  );
}

// Challenges Component
function Challenges() {
  const challenges = [
    {
      id: 1,
      title: 'Plastic-Free Week',
      description: 'Avoid single-use plastics for 7 consecutive days',
      progress: 65,
      reward: 500,
      icon: '♻️',
      daysLeft: 3,
      color: '#ef4444'
    },
    {
      id: 2,
      title: 'Composting Champion',
      description: 'Compost 10kg of organic waste this month',
      progress: 80,
      reward: 300,
      icon: '🌱',
      daysLeft: 12,
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Daily Logger',
      description: 'Log waste every day for 14 days',
      progress: 50,
      reward: 400,
      icon: '📝',
      daysLeft: 7,
      color: '#3b82f6'
    },
    {
      id: 4,
      title: 'Team Player',
      description: 'Join a team and complete a group challenge',
      progress: 0,
      reward: 600,
      icon: '🤝',
      daysLeft: 20,
      color: '#8b5cf6'
    }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '24px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>🎯</span> Active Challenges
      </h2>

      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>🌟 Featured Challenge</h3>
        <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '20px' }}>
          Complete any 3 challenges this month and earn a special "Eco Champion" badge!
        </p>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Progress: 1/3 challenges</span>
          <span style={{ fontWeight: '700', fontSize: '18px' }}>+1000 points</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
    </div>
  );
}

// Challenge Card Component
function ChallengeCard({ title, description, progress, reward, icon, daysLeft, color }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          background: color,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px'
        }}>
          {icon}
        </div>
        <div style={{
          background: '#fef3c7',
          color: '#92400e',
          padding: '4px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {daysLeft} days left
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
        {description}
      </p>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#374151', fontWeight: '600' }}>Progress</span>
          <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '700' }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: color,
            borderRadius: '4px',
            transition: 'width 0.5s ease'
          }}></div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <span style={{ fontWeight: '700', color: '#1f2937' }}>+{reward} points</span>
        </div>
        <button style={{
          padding: '8px 16px',
          background: progress === 100 ? '#10b981' : color,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          {progress === 100 ? '✓ Claim' : 'View'}
        </button>
      </div>
    </div>
  );
}

export default App;