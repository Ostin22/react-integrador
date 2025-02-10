import React from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RetosList from './components/RetosList';
import AgregarReto from './components/AgregarReto';
import RankingSemanal from './components/RankingSemanal';
import Login from './components/Login';
import Registro from './components/Registro';
import { useState, useEffect } from "react";
import SubirImagen from './components/SubirImagen';
import SubirPoema from './components/SubirPoema';
import './App.css';
import ApartadoArtistico from './components/ApartadoArtistico';
import Perfil from "./components/Perfil";
import ProtectedRetosRespuestas from './components/ProtectedRetosRespuestas';
import AccesoDenegado from './components/ProtectedAdminRoute';
import MostrarDibujosPoemas from './components/MostrarDibujosPoemas';
import SubirRespuestaReto from './components/SubirRespuestaReto';
import RetosRespuestas from './components/RetosRespuestas';
import VerPoema from './components/VerPoema';

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  // Rutas en las que NO queremos mostrar Header y Footer
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/registro";

  return (
    <>
      {!hideNavAndFooter && <Header auth={auth} setAuth={setAuth} />}
      <main>
        <Routes>
          {/* Rutas Públicas */}
          <Route 
            path="/login" 
            element={
              auth ? <Navigate to="/retos" replace /> : <Login setAuth={setAuth} />
            } 
          />
          <Route path="/registro" element={<Registro />} />


          <Route path="/subir-respuesta/:retoId" element={<SubirRespuestaReto />} />


          {/* Rutas Protegidas */}


          {/* Ruta privada de administrador */}

          <Route path="/retos-respuestas" element={<RetosRespuestas />} />
          <Route path="/acceso-denegado" element={<AccesoDenegado />} />

          <Route
            path="/perfil"
            element={auth ? <Perfil /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/retos"
            element={auth ? <RetosList /> : <Navigate to="/login" replace />}
          />


          
          <Route
            path="/agregar-reto"
            element={auth ? <AgregarReto /> : <Navigate to="/login" replace />}
          />
           {/* Ruta para futuros componentes (ejemplo: apartado artístico) */}
           <Route
            path="/apartado-artistico" element={<ApartadoArtistico  />}
            
          />
          {/* Ruta para subir dibujos */}
        <Route path="/subir-dibujo" element={<SubirImagen />} />

          {/* Ruta para subir poemas */}
          <Route path="/subir-poema" element={<SubirPoema />} />

          {/* Ruta para ver los dibujos y poemas */}
          <Route path="/poemas-dibujos" element={<MostrarDibujosPoemas/>} />

          {/* Ruta para ver los dibujos y poemas */}
          <Route path="/ver-poema/:poemaId" element={<VerPoema/>} />

          {/* Ruta para ranking semanal */}
          <Route path="/ranking-semanal" element={<RankingSemanal />} />


          <Route path="/" element={<Navigate to="/retos" replace />} />
          <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
