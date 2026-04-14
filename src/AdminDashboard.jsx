import React, { useState } from 'react';
import BoardersPage from './BoardersPage';
import './admin.css'; 

function AdminDashboard({ rooms, updateRoom, boarders, setBoarders }) {
  const [view, setView] = useState('rooms'); 

  return (
    <section id="admin-panel">
      <div className="admin-header">
        <h2>🛠️ Dashboard Management</h2>
        <p>Kelola ketersediaan kamar dan data penghuni.</p>
        
        <div className="admin-nav-tabs-wrapper">
          <nav className="admin-nav-tabs filled">
            {/* The indicator now uses a simple class toggle */}
            <div className={`nav-slider ${view === 'boarders' ? 'is-boarders' : 'is-rooms'}`}></div>
            
            <button 
              type="button"
              className={`nav-item ${view === 'rooms' ? 'active' : ''}`} 
              onClick={() => setView('rooms')}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Kelola Kamar</span>
            </button>
            
            <button 
              type="button"
              className={`nav-item ${view === 'boarders' ? 'active' : ''}`} 
              onClick={() => setView('boarders')}
            >
              <span className="nav-icon">👥</span>
              <div className="nav-label-group">
                  <span className="nav-label">Penghuni</span>
                  <span className="nav-badge">{boarders?.length || 0}</span>
              </div>
            </button>
          </nav>
        </div>



      </div>

      <div className="admin-content-area">
        {view === 'rooms' ? (
          <div className="admin-grid">
            {rooms.map(room => (
              <div key={room.id} className="admin-control-card">
                <h4>Tipe: {room.type}</h4>
                <div className="input-group">
                  <label>Harga (IDR):</label>
                  <input 
                    type="number" 
                    value={room.price} 
                    onChange={(e) => updateRoom(room.id, 'price', e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Jumlah Kamar Tersedia:</label>
                  <input 
                    type="number" 
                    value={room.count} 
                    // Fix: Ensure value is passed correctly to the parent function
                    onChange={(e) => updateRoom(room.id, 'count', e.target.value)}
                    placeholder='0' 
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Ensure BoardersPage is receiving the props correctly */
          <BoardersPage 
            boarders={boarders || []} 
            setBoarders={setBoarders} 
            rooms={rooms} // Useful if you want to select room type in BoardersPage
          />
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
