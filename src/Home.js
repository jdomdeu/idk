import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ASCIIText from './AsciiTextComponent';
import Noise from './noise';
import './HomePage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function HomePage() {
  
  useEffect(() => {
    AOS.init({
      duration: 1200, // duración de la animación
      once: false,    // animar solo una vez al entrar
    });
  }, []);

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh', // Cambiado a minHeight para permitir scroll
      backgroundColor: '#0d0d0d',
      position: 'relative',
      overflow: 'visible', // Permite el scroll
    }}>
      {/* Ruido de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>

      {/* Sección Superior */}
      <div style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Contenido principal */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start', // Alinea arriba
          paddingTop: '10vh',
  
        }}>
          {/* Título ASCII */}
          <div style={{ width: '100%', height: '45vh', position: 'relative',  marginBottom: '15vh' }}>
  <ASCIIText
    text='Shuxyzz'
    enableWaves={true}
    asciiFontSize={8}
    textFontSize={130}
    planeBaseHeight={15}
  />
</div>

          {/* Texto "Creador con propósito" con hover */}
          <div style={{
            fontFamily: 'monospace',
            color: '#f0f0f0',
            fontSize: '1rem',
            textAlign: 'center',
             margin: '-8.5rem 0 2rem 0',
          }}>
            <Link to="/about" className="hover-link" style={{ color: '#f0f0f0', textDecoration: 'none' }}>
  <span style={{ opacity: 0.4, marginRight: '0.3em' }}>[</span>
  Diseñador Caótico
  <span style={{ opacity: 0.4, marginLeft: '0.3em' }}>]</span>
</Link>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.5 rem' }}>
            {['GUÍAS', 'PORTFOLIO', 'DEVLOGS'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                style={{
                  color: '#f0f0f0',
                  backgroundColor: 'transparent',
                  padding: '0.6rem 1.8rem',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  border: '1px solid #f0f0f0',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={e => {
                  e.target.style.color = '#0d0d0d';
                  e.target.querySelector('.btn-fill').style.transform = 'translateY(0)';
                }}
                onMouseLeave={e => {
                  e.target.style.color = '#f0f0f0';
                  e.target.querySelector('.btn-fill').style.transform = 'translateY(100%)';
                }}
              >
                {item}
                <div className="btn-fill" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: '#f0f0f0',
                  zIndex: -1,
                  transform: 'translateY(100%)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />
              </Link>
            ))}
          </div>

          {/* Scroll indicator animado */}
          <div
            style={{
    marginTop: '10rem',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#888',
    opacity: 0.7,
    animation: 'bounce 1.5s infinite ease-in-out',
    cursor: 'pointer',
  }}
            onClick={() => window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            })}
          >
            ↓ scroll
          </div>
        </div>
      </div>

<div
  data-aos="fade-up"
  style={{
    border: '1px solid #333',
    padding: '1.5rem',
  }}
>
  {/* Sección Inferior (Projects) */}
      <div style={{
        padding: '6rem 2rem',
        borderTop: '1px solid #333',
        minHeight: '100vh',
      }}>
        <h3 style={{
          color: '#f0f0f0',
          fontFamily: 'monospace',
          textAlign: 'center',
          marginBottom: '3rem',
          letterSpacing: '1px'
        }}>
          ÚLTIMOS TRABAJOS
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[...Array(1)].map((_, i) => (
            <ProjectCard key={i} />
          ))}
        </div>

        <div style={{
          marginTop: '6rem',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          <p style={{ color: '#888', marginBottom: '1rem' }}>
            ¿Interesado en colaborar?
          </p>
          <a href="mailto:tu@email.com" style={{
            color: '#f0f0f0',
            textDecoration: 'none',
            borderBottom: '1px solid #ff6188',
            paddingBottom: '2px',
            transition: 'border-color 0.3s',
            ':hover': {
              borderColor: '#f0f0f0'
            }
          }}>
            CONTACTO
          </a>
        </div>
</div>
      
      </div>

      {/* Animación de bounce para el scroll indicator */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}

const ProjectCard = () => (
  <Link to="/aetherProject" className="hover-link" style={{ color: '#f0f0f0', textDecoration: 'none' }}>
  <div style={{
    border: '1px solid #333',
    padding: '1.5rem',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  }}>
    <div style={{
      height: '200px',
      background: '#111',
      marginBottom: '1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Placeholder para imagen del proyecto */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #0d0d0d, #1a1a1a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        fontSize: '0.8rem',
      }}>
        Preview proyecto
      </div>
    </div>
    <h4 style={{ color: '#f0f0f0', marginBottom: '0.5rem' }}>Aether Project</h4>
    <p style={{ color: '#888', fontSize: '0.9rem' }}>Trabajo Final del máster</p>
  </div>
  </Link>
);