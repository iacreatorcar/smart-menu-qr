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
import logoImg from './assets/logo.png'; // Cambia l'estensione in .jpg se il nuovo file è un JPG
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
      alert("Credenziali errate!");
    }
  };

  const ui = {
    it: { title: "Menu Digitali", subtitle: "Gestione Ristoranti", btn: "Apri Menu" },
    en: { title: "Digital Menus", subtitle: "Management", btn: "Open Menu" }
  };

  // 1. SCHERMATA DI LOGIN - FIX SFONDO FULL E LOGO
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh', 
        width: '100vw',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroBg})`,
        backgroundSize: 'cover',         // Copre tutto senza lasciare bordi
        backgroundPosition: 'center',    // Centra l'immagine delle navi
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',   // Impedisce lo scorrimento dello sfondo su mobile
        fontFamily: '"Inter", sans-serif',
        padding: '20px',
        margin: 0,
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          padding: '40px 30px', 
          borderRadius: '25px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)', 
          textAlign: 'center', 
          maxWidth: '400px', 
          width: '100%',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
        }}>
          {/* Cerchio Logo */}
          <div style={{
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            border: '5px solid #3b82f6', 
            marginBottom: '20px', 
            overflow: 'hidden',
            boxShadow: '0 8px 15px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={logoImg} 
              alt="Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>

          <h2 style={{ color: '#0f172a', margin: '0 0 10px 0', fontWeight: '800' }}>Benvenuto</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '30px' }}>Inserisci le credenziali admin</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
            />
            <button type="submit" style={{
              padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#3b82f6',
              color: 'white', fontWeight: '700', cursor: 'pointer', marginTop: '10px', fontSize: '1.1rem'
            }}>ACCEDI</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SCHERMATA INTERNA (CARD ORDINATE)
  return (
    <div style={{ padding: '20px', fontFamily: '"Inter", sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 30px' }}>
        <img src={logoImg} alt="logo" style={{ height: '50px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setLang('it')} style={btnLangStyle(lang === 'it')}>IT</button>
          <button onClick={() => setLang('en')} style={btnLangStyle(lang === 'en')}>EN</button>
          <button onClick={() => setIsLoggedIn(false)} style={{
            padding: '8px 15px', borderRadius: '10px', border: '1px solid #ef4444', color: '#ef4444', fontWeight: 'bold'
          }}>Esci</button>
        </div>
      </div>

      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: '800' }}>{ui[lang].title}</h1>
        <p style={{ color: '#64748b' }}>{ui[lang].subtitle}</p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
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
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem' }}>{item.label}</h3>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '15px', display: 'inline-block' }}>
                  <QRCodeCanvas value={pdfUrl} size={130} />
                </div>
                <a href={pdfUrl} target="_blank" rel="noreferrer" style={linkBtnStyle}>{ui[lang].btn}</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const btnLangStyle = (active) => ({
  padding: '8px 16px', borderRadius: '10px', border: 'none',
  backgroundColor: active ? '#0f172a' : '#ffffff', color: active ? 'white' : '#64748b',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '700', cursor: 'pointer'
});

const cardStyle = {
  backgroundColor: '#ffffff', borderRadius: '24px', overflow: 'hidden',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0'
};

const linkBtnStyle = {
  display: 'block', padding: '14px', backgroundColor: '#0f172a', color: 'white',
  textDecoration: 'none', borderRadius: '12px', fontWeight: '600', marginTop: '20px'
};

export default App;