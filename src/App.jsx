import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import menuData from './data/config.json';

// Importazione Immagini Ristoranti
import sakuraImg from './assets/sakura.png';
import zenithImg from './assets/zenith.png';
import steakhouseImg from './assets/steakhouse.png';
import creperieImg from './assets/creperie.png';
import barImg from './assets/bar.png';

// FIX LOGO: IMPORTAZIONE CON ESTENSIONE MINUSCOLA COME DA SCREENSHOT
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
      alert("Credenziali errate!");
    }
  };

  const ui = {
    it: { title: "Menu Digitali", subtitle: "Gestione Ristoranti", btn: "Apri Menu" },
    en: { title: "Digital Menus", subtitle: "Management", btn: "Open Menu" }
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        height: '100dvh', // Usa dvh per coprire tutto su mobile senza bordi
        width: '100vw',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed', // Impedisce bordi neri durante lo scroll
        top: 0,
        left: 0,
        fontFamily: '"Inter", sans-serif'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)', 
          padding: '40px 30px', 
          borderRadius: '30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)', 
          textAlign: 'center', 
          maxWidth: '360px', 
          width: '90%',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
        }}>
          {/* Logo circolare visibile e non tagliato */}
          <div style={{
            width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'white',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            border: '4px solid #3b82f6', marginBottom: '20px', overflow: 'hidden'
          }}>
            <img src={logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ color: '#0f172a', margin: '0 0 10px 0' }}>Benvenuto</h2>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
            <input 
              type="text" placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
            />
            <input 
              type="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
            />
            <button type="submit" style={{
              padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#3b82f6',
              color: 'white', fontWeight: 'bold', cursor: 'pointer'
            }}>ACCEDI</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
       {/* Il resto della dashboard rimane invariato */}
    </div>
  );
}

export default App;