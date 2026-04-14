import './App.css';
import { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
import BoardersPage from './BoardersPage';

function App() {
  const [showRules, setShowRules] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [currentView, setCurrentView] = useState('home');

  // --- 1. Load Room Data (Persistent) ---
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('kos_rooms');
    return savedRooms ? JSON.parse(savedRooms) : [
      { id: 1, type: "Standard", price: "350.000", count: 0, img: "https://images.unsplash.com/photo-1486304873000-235643847519?q=80&w=1332" },
      { id: 2, type: "+ Kamar Mandi", price: "450.000", count: 0, img: "https://images.unsplash.com/photo-1486304873000-235643847519?q=80&w=1332" }
    ];
  });

  // --- 2. Load Boarders (With Auto-Expiry Check) ---
  const [boarders, setBoarders] = useState(() => {
    const saved = localStorage.getItem('kos_boarders');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    const now = new Date();
    return parsed.filter(b => new Date(b.expiryDate) > now);
  });

  // --- 3. Sync Data to LocalStorage ---
  useEffect(() => {
    localStorage.setItem('kos_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('kos_boarders', JSON.stringify(boarders));
  }, [boarders]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAdminMode(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Password Salah!');
    }
  };

  const updateRoom = (id, field, value) => {
    setRooms(rooms.map(r => {
      if (r.id === id) {
        const processedValue = field === 'count' ? (parseInt(value, 10) || 0) : value;
        return { ...r, [field]: processedValue };
      }
      return r;
    }));
  };

  return (
    <>
      <div className="rules-trigger" onClick={() => setShowRules(true)}>📋 Aturan Kost</div>

      {showRules && (
        <div className="modal-overlay" onClick={() => setShowRules(false)}>
          <div className="rules-box" onClick={(e) => e.stopPropagation()}>
            <div className="rules-header">
              <h3>Aturan & Peraturan Kost</h3>
              <button className="close-x" onClick={() => setShowRules(false)}>&times;</button>
            </div>
            <ul className="rules-list">
              <li><span>🔒</span> Tolong dikunci kamar saat ke kamar mandi.</li>
              <li><span>🚫</span> Dilarang membawa lawan jenis ke dalam kamar.</li>
              <li><span>🧹</span> Menjaga kebersihan area bersama.</li>
              <li><span>⚡</span> Matikan elektronik & kipas saat meninggalkan kamar.</li>
              <li><span>🤫</span> Harap tenang dan tidak berisik setelah pukul 21:00 WIB.</li>
            </ul>
            <button className="understand-btn" onClick={() => setShowRules(false)}>Saya Mengerti</button>
          </div>
        </div>
      )}

      <div className="admin-trigger" onClick={() => {
        if (isAdminMode) {
          setIsAdminMode(false);
          setCurrentView('home');
        } else {
          setShowLogin(true);
        }
      }}>
        {isAdminMode ? '🚪 Logout' : '⚙️ Admin'}
      </div>

      {/* Logic to show Boarders Page only if Admin is logged in and view is 'boarders' */}
      {isAdminMode && currentView === 'boarders' ? (
        <BoardersPage 
          boarders={boarders} 
          setBoarders={setBoarders} 
          onBack={() => setCurrentView('home')} 
        />
      ) : (
        <>
          <section id="hero-kost">
            <div className="hero-content">
              <h1>KOS <span className="highlight">PUTRA</span></h1>
              <p>Hunian strategis di pusat kota dengan fasilitas lengkap.</p>
              <div className="cta-group">
                <button className="BookingButton" onClick={() => window.open('https://wa.me/+6282387269716')}>
                   Pesan Kamar Sekarang
                </button>
              </div>
            </div>
          </section>

          {isAdminMode && (
            <AdminDashboard 
              rooms={rooms} 
              updateRoom={updateRoom} 
              boarders={boarders}       
              setBoarders={setBoarders}
              onNavigate={() => setCurrentView('boarders')} // Now dashboard can link to boarders
            />
          )}

          <div className="divider-ticks"></div>

          <section id="fasilitas">
            <h2>Informasi Kamar Kost</h2>
            <div className="grid-fasilitas">
              {rooms.map(room => (
                <div className="card" key={room.id}>
                  <div className="room-image-container">
                    <img src={room.img} alt={room.type} className="room-photo" />
                    <div className="price-tag">IDR {room.price} / bln</div>
                  </div>
                  <div className="room-details">
                    <h3>Tipe Kamar {room.type}</h3>
                    <div className="availability-container">
                      <span className={`dot ${room.count > 0 ? 'green' : 'red'}`}></span>
                      <span className="count-text">
                        {room.count > 0 ? `Tersedia: ${room.count} Kamar` : "Kamar Habis / Penuh"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="divider-ticks"></div>

          <section id="kontak-footer">
            <div className="footer-info">
              <h3>Lokasi Kami</h3>
              <p>Jl. Pemasyarakatan No. 1, Pekanbaru, Riau</p>
              <a href="https://goo.gl" target="_blank" className="map-link">
                Lihat di Google Maps
              </a>
            </div>
          </section>
        </>
      )}

      {showLogin && (
        <LoginPage 
          setPassword={setPassword} 
          handleLogin={handleLogin} 
          setShowLogin={setShowLogin} 
        />
      )}
    </>
  );
}

export default App;
