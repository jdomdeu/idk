import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import './App.css';
import AetherProject from './AetherProject.js'

import "prismjs/themes/prism.css";  // Estilo base de PrismJS
import Prism from "prismjs";         // PrismJS para resaltar sintaxis
import "prismjs/components/prism-csharp.min.js"; // Importar soporte para C#

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="App">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aetherproject" element={<AetherProject />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
