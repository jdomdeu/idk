import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TargetCursor from './TargetCursor';
import AOS from 'aos';
import 'aos/dist/aos.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function checkMobile() { setIsMobile(window.innerWidth < 768); }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
}

export default function BreakdownsIndex() {
  const isMobile = useIsMobile();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Definimos las categorías aquí para que sea fácil añadir más
  const categories = [
    {
      id: 'shaders',
      title: 'SHADERS & VFX',
      desc: 'Mejora el nivel visual de tus proyectos en Unity',
      color: '#ff6188',
      path: '/breakdowns/shaders'
    },
    {
      id: 'iot',
      title: 'IOT & ELECTRONICS',
      desc: 'Conectando el mundo físico y digital',
      color: '#a9dc76',
      path: '/breakdowns/iot'
    },
    {
      id: 'video-editing',
      title: 'VIDEO EDITING',
      desc: 'Post-producción y narrativa visual',
      color: '#ab9df2',
      path: '/breakdowns/editing'
    },
    // {
    //   id: 'making-off',
    //   title: 'ANALYSIS & MISC',
    //   desc: 'Desglose de procesos creativos y análisis técnico de medios.',
    //   color: '#ab9df2',
    //   path: '/breakdowns/misc'
    // }
  ];

  return (
    <div style={containerStyle}>
      {!isMobile && (
        <TargetCursor 
          spinDuration={3}
          hideDefaultCursor={true}
          targetSelector=".cursor-target" 
        />
      )}

      {/* Header */}
      <nav style={{ padding: '2rem' }}>
        <Link to="/" className="cursor-target" style={backLinkStyle}>← HOME</Link>
      </nav>

      <header style={headerStyle} data-aos="fade-up">
        <h1 style={titleStyle}>BREAKDOWNS</h1>
        <p style={subtitleStyle}>Desglose y anatomía de mis proyectos</p>
      </header>

      {/* Grid de Categorías */}
      <div style={gridStyle}>
        {categories.map((cat, index) => (
          <Link 
            key={cat.id} 
            to={cat.path} 
            className="cursor-target category-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            style={{ ...cardStyle, borderColor: '#222' }}
          >
            <div className="card-content">
              <span style={{ ...tagStyle, color: cat.color }}>{`// 0${index + 1}`}</span>
              <h2 style={cardTitleStyle}>{cat.title}</h2>
              <p style={cardDescStyle}>{cat.desc}</p>
            </div>
            <div className="card-footer" style={{ borderTop: `1px solid #222`, paddingTop: '1rem', color: cat.color }}>
              EXPLORAR _
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .category-card {
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        
        /* Efecto de hover que complementa al TargetCursor */
        .category-card:hover {
          background: #151515;
          border-color: #444 !important;
          transform: translateY(-5px);
        }

        .category-card:hover h2 {
          color: #fff;
        }
      `}</style>
    </div>
  );
}

// Estilos en objetos (JSS)
const containerStyle = {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#0d0d0d',
  color: '#f0f0f0',
  fontFamily: 'monospace',
};

const headerStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  maxWidth: '800px',
  margin: '0 auto'
};

const titleStyle = {
  fontSize: 'clamp(3rem, 10vw, 5rem)',
  margin: 0,
  letterSpacing: '-2px',
  fontWeight: 'bold'
};

const subtitleStyle = {
  color: '#666',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '1rem',
  marginTop: '1rem'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem',
  padding: '0 2rem 4rem 2rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle = {
  background: '#111',
  border: '1px solid #222',
  padding: '2rem',
  minHeight: '250px',
  cursor: 'pointer'
};

const cardTitleStyle = {
  fontSize: '1.4rem',
  margin: '1rem 0',
  color: '#aaa',
  transition: 'color 0.3s'
};

const cardDescStyle = {
  color: '#666',
  fontSize: '0.9rem',
  lineHeight: '1.5'
};

const tagStyle = {
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const backLinkStyle = {
  color: '#444',
  textDecoration: 'none',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  letterSpacing: '2px'
};