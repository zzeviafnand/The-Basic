import './App.css'
import { useState } from 'react';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
function App() {
  const [showRules, setShowRules] = useState(false);
  
  // --- States for Admin Logic ---
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  // --- States for Dorm Data (Manageable) ---
  const [rooms, setRooms] = useState([
    { id: 1, type: "Standard", price: "350.000", count: 13, img: "https://images.unsplash.com/photo-1486304873000-235643847519?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, type: "+ Kamar Mandi", price: "450.000", count: 2, img: "https://images.unsplash.com/photo-1486304873000-235643847519?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ]);

  const handleLogin = () => {
    if (password === 'admin123') { // Simple hardcoded password
      setIsAdminMode(true);
      setShowLogin(false);
    } else {
      alert('Password Salah!');
    }
  };

  const updateRoom = (id, field, value) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, [field]: value } : r));
  };
  return (
  <>
  {/* --- Floating Rules Button --- */}
      <div className="rules-trigger" onClick={() => setShowRules(true)}>
        📋 Aturan Kost
      </div>
      {/* --- Aturan Kost Modal --- */}
      {showRules && (
        <div className="modal-overlay" onClick={() => setShowRules(false)}>
          <div className="rules-box" onClick={(e) => e.stopPropagation()}>
            <div className="rules-header">
              <h3>Aturan & Peraturan Kost</h3>
              <button className="close-x" onClick={() => setShowRules(false)}>&times;</button>
            </div>
            <ul className="rules-list">
              <li><span> 🔒 </span> Tolong di kunci kamar saat ke kamar mandi.</li>
              <li><span>🚫</span> Dilarang membawa lawan jenis ke dalam kamar.</li>
              <li><span>🧹</span> Menjaga kebersihan area bersama.</li>
              <li><span>⚡</span> Matikan elektronik & kipas saat meninggalkan kamar.</li>
              <li><span>🤫</span> Harap tenang dan tidak berisik setelah pukul 21:00 WIB.</li>
            </ul>
            <button className="understand-btn" onClick={() => setShowRules(false)}>Saya Mengerti</button>
          </div>
        </div>
      )}
  {/* --- Admin Icon Overlay --- */}
      <div className="admin-trigger" onClick={() => isAdminMode ? setIsAdminMode(false) : setShowLogin(true)}>
        {isAdminMode ? '🚪 Logout' : '⚙️ Admin'}
      </div>
    <section id="hero-kost">
      <div className="hero-content">
        <h1>KOS <span className="highlight">PUTRA</span></h1>
        <p>Hunian strategis di pusat kota dengan fasilitas lengkap.</p>
        <div className="cta-group">
          <button className="BookingButton" onClick={() => window.open('https:/wa.me/+6282387269716', 'Dev')}>
             Pesan Kamar Sekarang
          </button>
        </div>
      </div>
    </section>


    {/* --- Admin Management Page (Shows only if AdminMode is true) --- */}
      {isAdminMode && <AdminDashboard rooms={rooms} updateRoom={updateRoom} />}

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
                  <span className="dot"></span>
                  <span className="count-text">Tersedia: {room.count} Kamar</span>
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
        <a href="https://maps.app.goo.gl/rUXEQT8inN5hiFiB8?g_st=aw" target="Kos Putra" className="map-link">Lihat di Google Maps</a>
      </div>
    </section>

    {/* --- Simple Login Modal --- */}
      {showLogin && (
        <LoginPage 
          setPassword={setPassword} 
          handleLogin={handleLogin} 
          setShowLogin={setShowLogin} 
        />
      )}
  </>
)
}

export default App
