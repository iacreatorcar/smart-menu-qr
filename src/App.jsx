import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import menuData from './data/config.json';

// Importazione Immagini Ristoranti
import sakuraImg from './assets/sakura.png';
import zenithImg from './assets/zenith.png';
import steakhouseImg from './assets/steakhouse.png';
import creperieImg from './assets/creperie.png';
import barImg from './assets/bar.png';

// NUOVE IMPORTAZIONI PER IL LOGIN
import logoImg from './assets/logo.png'; 
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
    // PASSWORD AGGIORNATA A 1234
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert("Credenziali errate! Riprova.");
    }
  };

  const ui = {
    it: { title: "Menu Digitali", subtitle: "Gestione Ristoranti", btn: "Apri Menu", scan: "Scannerizza QR" },
    en: { title: "Digital Menus", subtitle: "Restaurant Management", btn: "Open Menu", scan: "Scan QR" }
  };

  // 1. SCHERMATA DI LOGIN SISTEMATA
  if (!isLoggedIn) {
    return (
      <div style={{
        height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: '"Inter", sans-serif',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '30px', borderRadius: '25px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)', textAlign: 'center', maxWidth: '380px', width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          {/* LOGO SISTEMATO: NON PIÙ TAGLIATO */}
          <div style={{
            width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'white',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            border: '4px solid #3b82f6', marginBottom: '20px', overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <img src={logoImg} alt="Logo" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
          </div>

          <h2 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '1.5rem' }}>Benvenuto nel sistema</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>Inserisci le credenziali admin</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <input 
              type="text" placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
            <input 
              type="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
            <button type="submit" style={{
              padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#3b82f6',
              color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem'
            }}>ACCEDI</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SCHERMATA INTERNA (CARD SISTEMATE PER MOBILE)
  return (
    <div style={{ padding: '20px', fontFamily: '"Inter", sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      
      {/* HEADER PULITO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 30px' }}>
        <img src={logoImg} alt="logo" style={{ height: '40px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setLang('it')} style={btnLangStyle(lang === 'it')}>IT</button>
          <button onClick={() => setLang('en')} style={btnLangStyle(lang === 'en')}>EN</button>
          <button onClick={() => setIsLoggedIn(false)} style={{
            padding: '8px 12px', borderRadius: '8px', border: '1px solid #ef4444', color: '#ef4444', 
            backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold'
          }}>Esci</button>
        </div>
      </div>

      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: '800' }}>{ui[lang].title}</h1>
        <p style={{ color: '#64748b' }}>{ui[lang].subtitle}</p>
      </header>

      {/* GRIGLIA RESPONSIVE: SI ADATTA A CELLULARE E DESKTOP */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', maxWidth: '1200px', margin: '0 auto' 
      }}>
        {menuData.specialties.map(item => {
          const pdfUrl = window.location.origin + `/menus/${item.file}`; 
          return (
            <div key={item.id} style={cardStyle}>
              {/* IMMAGINE CARD */}
              <div style={{ height: '160px', overflow: 'hidden' }}>
                <img src={imageMap[item.imgName]} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#1e293b', fontSize: '1.2rem' }}>{item.label}</h3>
                
                {/* QR CODE RESPONSIVE */}
                <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '15px', display: 'inline-block', marginBottom: '15px' }}>
                  <QRCodeCanvas value={pdfUrl} size={110} />
                </div>
                
                <a href={pdfUrl} target="_blank" rel="noreferrer" style={linkBtnStyle}>{ui[lang].btn}</a>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '8px' }}>{ui[lang].scan}</p>
              </div>
            </div>
          );
        })}
      </div>

      <footer style={{ marginTop: '50px', textAlign: 'center', paddingBottom: '30px' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>© 2026 Smart Menu System - Carmine D'Alise</p>
      </footer>
    </div>
  );
}

// STILI PULITI
const btnLangStyle = (active) => ({
  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
  backgroundColor: active ? '#0f172a' : '#ffffff', color: active ? 'white' : '#64748b',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '700'
});

const cardStyle = {
  backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0'
};

const linkBtnStyle = {
  display: 'block', padding: '12px', backgroundColor: '#0f172a', color: 'white',
  textDecoration: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '0.9rem'
};

export default App;