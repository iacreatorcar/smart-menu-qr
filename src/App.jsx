import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import menuData from './data/config.json';

// Importazione Immagini
import sakuraImg from './assets/sakura.png';
import zenithImg from './assets/zenith.png';
import steakhouseImg from './assets/steakhouse.png';
import creperieImg from './assets/creperie.png';
import barImg from './assets/bar.png';

const imageMap = {
  sakura: sakuraImg,
  zenith: zenithImg,
  steakhouse: steakhouseImg,
  creperie: creperieImg,
  bar: barImg
};

function App() {
  const [lang, setLang] = useState('it');

  // Testi dell'interfaccia bilingue
  const ui = {
    it: { 
      title: "Menu Digitali", 
      subtitle: "Seleziona un ristorante per visualizzare il menu", 
      btn: "Sfoglia Menu", 
      scan: "Inquadra il QR Code" 
    },
    en: { 
      title: "Digital Menus", 
      subtitle: "Select a restaurant to view the menu", 
      btn: "View Menu", 
      scan: "Scan QR Code" 
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* SELETTORE LINGUA IN ALTO A DESTRA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', maxWidth: '1400px', margin: '0 auto 20px' }}>
        <button 
          onClick={() => setLang('it')}
          style={{
            padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            backgroundColor: lang === 'it' ? '#0f172a' : '#ffffff',
            color: lang === 'it' ? 'white' : '#64748b',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '700', transition: '0.3s'
          }}>IT</button>
        <button 
          onClick={() => setLang('en')}
          style={{
            padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            backgroundColor: lang === 'en' ? '#0f172a' : '#ffffff',
            color: lang === 'en' ? 'white' : '#64748b',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '700', transition: '0.3s'
          }}>EN</button>
      </div>

      <header style={{ marginBottom: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.02em' }}>
          {ui[lang].title}
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{ui[lang].subtitle}</p>
      </header>

      {/* GRIGLIA RISTORANTI */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px', 
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        {menuData.specialties.map(item => {
          // Genera l'URL assoluto per far funzionare correttamente il QR Code
           const pdfUrl = window.location.origin + `/menus/${item.file}`;
          
          return (
            <div key={item.id} style={{
              backgroundColor: '#ffffff', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', 
              border: '1px solid #e2e8f0',
              transition: 'transform 0.3s ease'
            }}>
              
              {/* FOTO CON POSIZIONAMENTO PERSONALIZZATO E OMBRA */}
              <div style={{ 
                height: '200px', 
                position: 'relative', 
                overflow: 'hidden',
                backgroundColor: '#f1f5f9' 
              }}>
                <img 
                  src={imageMap[item.imgName]} 
                  alt={item.label} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: item.position || 'center' 
                  }} 
                />
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  boxShadow: 'inset 0 -60px 50px -20px rgba(0,0,0,0.4)',
                  pointerEvents: 'none'
                }}></div>
              </div>

              <div style={{ padding: '25px', textAlign: 'center' }}>
                <span style={{ 
                  fontSize: '0.75rem', fontWeight: '800', color: '#3b82f6', 
                  textTransform: 'uppercase', letterSpacing: '0.1em' 
                }}>
                  {item[lang].cat}
                </span>
                <h2 style={{ margin: '8px 0 20px 0', fontSize: '1.6rem', color: '#1e293b' }}>
                  {item.label}
                </h2>
                
                {/* QR CODE DINAMICO */}
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '20px', 
                  display: 'inline-block', 
                  border: '1px solid #f1f5f9' 
                }}>
                  <QRCodeCanvas value={pdfUrl} size={140} />
                </div>

                <div style={{ marginTop: '25px' }}>
                  <a href={pdfUrl} target="_blank" rel="noreferrer" style={{
                    display: 'block', 
                    padding: '14px', 
                    backgroundColor: '#0f172a',
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '12px', 
                    fontWeight: '600', 
                    fontSize: '1rem'
                  }}>
                    {ui[lang].btn}
                  </a>
                  <p style={{ marginTop: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>
                    {ui[lang].scan}
                  </p>
                </div>
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

export default App;
