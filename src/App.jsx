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
import logoImg from './assets/logo.png'; // Assicurati che il tuo logo.png sia nella cartella assets
import heroBg from './assets/hero.png'; // Assicurati che hero.png sia nella cartella assets

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
    if (username === 'admin' && password === 'admin test') {
      setIsLoggedIn(true);
    } else {
      alert("Credenziali errate! Riprova.");
    }
  };

  const ui = {
    it: { title: "Menu Digitali", subtitle: "Seleziona un ristorante", btn: "Sfoglia Menu", scan: "Inquadra il QR" },
    en: { title: "Digital Menus", subtitle: "Select a restaurant", btn: "View Menu", scan: "Scan QR" }
  };

  // 1. SCHERMATA DI PRESENTAZIONE / LOGIN
  if (!isLoggedIn) {
    return (
      <div style={{
        height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBg})`, // Usa heroBg
        backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: '"Inter", sans-serif'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)', padding: '40px', borderRadius: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)', textAlign: 'center', maxWidth: '380px', width: '90%',
          position: 'relative', // Per posizionare il logo
          overflow: 'hidden' // Per contenere eventuali bordi del logo
        }}>
          {/* LOGO CIRCOLARE SOPRA IL FORM */}
          <img 
            src={logoImg} 
            alt="Logo" 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', // Rende l'immagine circolare
              objectFit: 'cover', // Assicura che l'immagine copra il cerchio
              border: '4px solid #3b82f6', // Bordo blu
              marginBottom: '20px',
              marginTop: '-90px', // Sposta il logo più in alto, parzialmente fuori dal box
              backgroundColor: 'white' // Sfondo bianco per il logo
            }} 
          />

          <h2 style={{ color: '#0f172a', marginBottom: '10px', marginTop: '-10px' }}>Benvenuto nel sistema</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '30px' }}>Accedi per gestire i menu digitali</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
            />
            <input 
              type="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
            />
            <button type="submit" style={{
              padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#3b82f6',
              color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px',
              transition: 'background-color 0.3s'
            }}>ACCEDI</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SCHERMATA DEI QR CODE (DOPO IL LOGIN)
  return (
    <div style={{ padding: '20px', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* SELETTORE LINGUA E LOGOUT */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', maxWidth: '1400px', margin: '0 auto 20px' }}>
        <button onClick={() => setLang('it')} style={btnLangStyle(lang === 'it')}>IT</button>
        <button onClick={() => setLang('en')} style={btnLangStyle(lang === 'en')}>EN</button>
        <button onClick={() => setIsLoggedIn(false)} style={{
          padding: '8px 16px', borderRadius: '10px', border: '1px solid #ef4444', 
          backgroundColor: 'transparent', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold',
          transition: 'background-color 0.3s, color 0.3s'
        }}>Esci</button>
      </div>

      <header style={{ marginBottom: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: '800' }}>{ui[lang].title}</h1>
        <p style={{ color: '#64748b' }}>{ui[lang].subtitle}</p>
      </header>

      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px', maxWidth: '1400px', margin: '0 auto' 
      }}>
        {menuData.specialties.map(item => {
          const pdfUrl = window.location.origin + `/menus/${item.file}`; 
          return (
            <div key={item.id} style={cardStyle}>
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img src={imageMap[item.imgName]} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>{item.label}</h3>
                <QRCodeCanvas value={pdfUrl} size={120} />
                <a href={pdfUrl} target="_blank" rel="noreferrer" style={linkBtnStyle}>{ui[lang].btn}</a>
              </div>
            </div>
          );
        })}
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#cbd5e1', fontSize: '0.8rem' }}>
        <p>© 2026 Smart Menu QR System - Carmine D'Alise Digital Solutions</p>
      </footer>
    </div>
  );
}

// STILI DI SUPPORTO
const btnLangStyle = (active) => ({
  padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
  backgroundColor: active ? '#0f172a' : '#ffffff', color: active ? 'white' : '#64748b',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '700', transition: '0.3s'
});

const cardStyle = {
  backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden',
  boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', transition: 'transform 0.3s ease'
};

const linkBtnStyle = {
  display: 'block', padding: '12px', backgroundColor: '#0f172a', color: 'white',
  textDecoration: 'none', borderRadius: '10px', fontWeight: '600', marginTop: '15px',
  transition: 'background-color 0.3s'
};

export default App;