import React from 'react';
import ASCIIText from './AsciiTextComponent.js'; // importa el componente real
import Noise from './noise.js';
import './App.css';

export default function AsciiTextPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: 'rgb(40, 40, 40)' }}>
      <div className="noise-overlay">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>
      <ASCIIText
        text="Shuxyzz"
        enableWaves={true}
        asciiFontSize={9}
      />
    </div>
  );
}
