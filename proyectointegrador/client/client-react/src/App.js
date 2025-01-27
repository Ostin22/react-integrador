import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RetosList from './components/RetosList';
import AgregarReto from './components/AgregarReto';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          {/* Ruta principal para la lista de retos */}
          <Route path="/retos" element={<RetosList />} />

          {/* Ruta para agregar un nuevo reto */}
          <Route path="/agregar-reto" element={<AgregarReto />} />

          {/* Redirección a /retos si se accede a la raíz */}
          <Route path="/" element={<Navigate to="/retos" />} />

          {/* Ruta para futuros componentes (ejemplo: apartado artístico) */}
          <Route
            path="/apartado-artistico"
            element={<h2>Aquí irá el componente del apartado artístico</h2>}
          />

          {/* Ruta para manejar páginas no encontradas */}
          <Route
            path="*"
            element={<h2 style={{ textAlign: 'center' }}>404 - Página no encontrada</h2>}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
