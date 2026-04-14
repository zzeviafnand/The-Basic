import React, { useState } from 'react';
import './boarder.css';

function BoardersPage({ boarders, setBoarders }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Standard');

  // Create: Add a new boarder
  const addBoarder = () => {
    if (!name.trim()) return alert("Masukkan nama penghuni!");
    
    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + 30); // 30-day expiry logic

    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      roomType: type,
      joinDate: today.toLocaleDateString('id-ID'),
      expiryDate: expiry.toISOString(), // Stored for auto-expiry checks
    };

    setBoarders([...boarders, newEntry]);
    setName(''); // Reset input
  };

  // Delete: Remove a boarder
  const removeBoarder = (id) => {
    if(window.confirm("Hapus penghuni ini dari daftar?")) {
      setBoarders(boarders.filter(b => b.id !== id));
    }
  };

  return (
    <section className="boarders-page">
      <div className="admin-header">
        {/* Back button removed for a cleaner look */}
        <h2>👥 Daftar Penghuni Kost</h2>
      </div>

      <div className="add-boarder-box">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Nama Penghuni Baru..." 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Standard">Standard</option>
            <option value="+ Kamar Mandi">+ Kamar Mandi</option>
          </select>
          <button onClick={addBoarder} className="add-btn">Tambah Penghuni</button>
        </div>
      </div>

      <table className="boarders-table">
        <thead>
          <tr>
            <th>Nama Penghuni</th>
            <th>Tipe Kamar</th>
            <th>Tgl Masuk</th>
            <th>Tgl Habis Sewa</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {boarders.length > 0 ? (
            boarders.map(b => (
              <tr key={b.id}>
                <td><strong>{b.name}</strong></td>
                <td>{b.roomType}</td>
                <td>{b.joinDate}</td>
                <td className="expiry-text">
                  {new Date(b.expiryDate).toLocaleDateString('id-ID')}
                </td>
                <td>
                  <button onClick={() => removeBoarder(b.id)} className="del-btn">Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Belum ada penghuni terdaftar.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default BoardersPage;
