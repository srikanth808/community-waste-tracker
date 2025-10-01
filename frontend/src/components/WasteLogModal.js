import React, { useState } from 'react';

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
    onSubmit(formData);
    setFormData({ category: '', quantity: '', unit: 'kg', disposalMethod: 'recycled', description: '' });
    onClose();
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
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>Log New Waste</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#374151' }}>
              Select Category
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
                    background: formData.category === cat.name ? `${cat.color}10` : 'white',
                    transition: 'all 0.2s'
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
                Quantity
              </label>
              <input
                type="number"
                step="0.1"
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
                  boxSizing: 'border-box'
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
                boxSizing: 'border-box'
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
                resize: 'vertical'
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
                cursor: 'pointer'
              }}
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
                cursor: 'pointer'
              }}
            >
              Log Waste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WasteLogModal;