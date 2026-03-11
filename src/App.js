import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import './App.css';
import AetherProject from './AetherProject.js'
import Breakdowns from './breakdowns.js';

import "prismjs/themes/prism.css";  // Estilo base de PrismJS
import Prism from "prismjs";         // PrismJS para resaltar sintaxis
import "prismjs/components/prism-csharp.min.js"; // Importar soporte para C#
//import "prismjs/components/prism-glsl.min.js";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="App">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aetherproject" element={<AetherProject />} />
          <Route path="/breakdowns" element={<Breakdowns />} />


          <Route path="*" element={<Home />} />   // Ruta por defecto, por si alguien pone algo random

        </Routes>
      </div>
    </Router>
  );
}

export default App;
