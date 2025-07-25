import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import Movimiento from './Movimiento.js';
import Codigo from './code.tsx'; // Asegúrate de importar el componente
import Inputs from './Inputs.js'
import Colisiones from './Colisiones.js'
import Listas from './listas.js'
import Eventos from './eventos.js'
import Interfaz from './Interfaz.js'
import Singletones from './Singletones.js'
import Quaternions from './quaternions.js'
import Corrutinas from './Corrutinas.js'
import Ascii from './PruebaGuapa.js'
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
          <Route path="/code" element={<Codigo />} />
          <Route path="/movimiento" element={<Movimiento />} />
          <Route path="/inputs" element={<Inputs />} />
          <Route path="/colisiones" element={<Colisiones />} />
          <Route path="/listas" element={<Listas />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/interfaz" element={<Interfaz />} />
          <Route path="/singletones" element={<Singletones />} />
          <Route path="/quaternions" element={<Quaternions />} />
          <Route path="/corrutinas" element={<Corrutinas />} />
          <Route path="/prueba" element={<Ascii />} />
          <Route path="/aetherproject" element={<AetherProject />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
