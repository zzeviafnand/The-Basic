import React from 'react';

function LoginPage({ setPassword, handleLogin, setShowLogin }) {
  return (
    <div className="modal-overlay">
      <div className="login-box">
        <h3>Admin Login</h3>
        <input 
          type="password" 
          placeholder="Masukkan Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}>Login</button>
        <button className="cancel" onClick={() => setShowLogin(false)}>Batal</button>
      </div>
    </div>
  );
}

export default LoginPage;
