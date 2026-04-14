import React from 'react';

function AdminDashboard({ rooms, updateRoom }) {
  return (
    <section id="admin-panel">
      <div className="admin-header">
        <h2>🛠️ Dashboard Management</h2>
        <p>Update harga dan sisa kamar secara real-time.</p>
      </div>
      <div className="admin-grid">
        {rooms.map(room => (
          <div key={room.id} className="admin-control-card">
            <h4>Tipe: {room.type}</h4>
            <label>Harga (IDR):</label>
            <input 
              type="text" 
              value={room.price} 
              onChange={(e) => updateRoom(room.id, 'price', e.target.value)} 
            />
            <label>Jumlah Kamar Tersedia:</label>
            <input 
              type="number" 
              value={room.count} 
              onChange={(e) => updateRoom(room.id, 'count', e.target.value)} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;
