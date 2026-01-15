import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import menuData from './data/config.json';

// Importazione Immagini Ristoranti
import sakuraImg from './assets/sakura.png';
import zenithImg from './assets/zenith.png';
import steakhouseImg from './assets/steakhouse.png';
import creperieImg from './assets/creperie.png';
import barImg from './assets/bar.png';

// Importazione Logo e Hero
import logoImg from './assets/logo.jpg'; 
import heroBg from './assets/hero.png'; 

const imageMap = {
  sakura: sakuraImg,
  zenith: zenithImg,
  steakhouse: steakhouseImg,
  creperie: creperieImg,
  bar: barImg
};

function App() {
  const [lang, setLang] = useState('it');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert(lang === 'it' ? "Credenziali errate!" : "Invalid credentials!");
    }
  };

  const ui = {
    it: { 
      welcome: "Benvenuto", 
      instruction: "Accesso Amministratore",
      loginBtn: "ACCEDI",
      title: "Menu Digitali", 
      subtitle: "Gestione Ristoranti", 
      btn: "Apri Menu", 
      scan: "Scannerizza QR",
      logout: "Esci"
    },
    en: { 
      welcome: "Welcome", 
      instruction: "Admin Access",
      loginBtn: "LOGIN",
      title: "Digital Menus", 
      subtitle: "Management", 
      btn: "Open Menu", 
      scan: "Scan QR",
      logout: "Logout"
    }
  };

  // 1. SCHERMATA DI LOGIN CON SELETTORE LINGUA
  if (!isLoggedIn) {
    return (
      <div style={{
        height: '100dvh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center', position: 'fixed', top: 0, left: 0,
        fontFamily: '"Inter", sans-serif'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)', padding: '30px', borderRadius: '30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center', maxWidth: '360px', width: '90%',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          
          {/* SELETTORE LINGUA NEL LOGIN */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button onClick={() => setLang('it')} style={btnLangStyle(lang === 'it')}>IT</button>
            <button onClick={() => setLang('en')} style={btnLangStyle(lang === 'en')}>EN</button>
          </div>

          <div style={{
            width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'white',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            border: '4px solid #3b82f6', marginBottom: '15px', overflow: 'hidden'
          }}>
            <img src={logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ color: '#0f172a', margin: '0 0 5px 0', fontWeight: '800' }}>{ui[lang].welcome}</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>{ui[lang].instruction}</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <input 
              type="text" placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
            <input 
              type="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
            <button type="submit" style={{
              padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#3b82f6',
              color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem'
            }}>{ui[lang].loginBtn}</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD INTERNA
  return (
    <div style={{ padding: '20px', fontFamily: '"Inter", sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 30px' }}>
        <img src={logoImg} alt="logo" style={{ height: '45px', borderRadius: '5px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setLang('it')} style={btnLangStyle(lang === 'it')}>IT</button>
          <button onClick={() => setLang('en')} style={btnLangStyle(lang === 'en')}>EN</button>
          <button onClick={() => setIsLoggedIn(false)} style={{
            padding: '8px 15px', borderRadius: '10px', border: '1px solid #ef4444', color: '#ef4444', 
            backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold'
          }}>{ui[lang].logout}</button>
        </div>
      </div>

      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: '800' }}>{ui[lang].title}</h1>
        <p style={{ color: '#64748b' }}>{ui[lang].subtitle}</p>
      </header>

      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px', maxWidth: '1200px', margin: '0 auto' 
      }}>
        {menuData.specialties.map(item => {
          const pdfUrl = `${window.location.origin}/menus/${item.file}`; 
          return (
            <div key={item.id} style={cardStyle}>
              <div style={{ height: '180px', overflow: 'hidden' }}>
                <img src={imageMap[item.imgName]} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '25px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem', color: '#1e293b' }}>{item.label}</h3>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '15px', display: 'inline-block' }}>
                  <QRCodeCanvas value={pdfUrl} size={130} />
                </div>
                <a href={pdfUrl} target="_blank" rel="noreferrer" style={linkBtnStyle}>{ui[lang].btn}</a>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '10px' }}>{ui[lang].scan}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#cbd5e1', paddingBottom: '30px' }}>
        <p>© 2026 Smart Menu System - Carmine D'Alise</p>
      </footer>
    </div>
  );
}

const btnLangStyle = (active) => ({
  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
  backgroundColor: active ? '#0f172a' : '#ffffff', color: active ? 'white' : '#64748b',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontWeight: '700', fontSize: '0.8rem'
});

const cardStyle = {
  backgroundColor: '#ffffff', borderRadius: '24px', overflow: 'hidden',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0'
};

const linkBtnStyle = {
  display: 'block', padding: '14px', backgroundColor: '#0f172a', color: 'white',
  textDecoration: 'none', borderRadius: '12px', fontWeight: '600', marginTop: '15px'
};

export default App;