import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header({ auth, setAuth }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verificarPermisos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
        const response = await axios.get(`${API_URL}/auth/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setIsAdmin(response.data.permiso_id === 2);
      } catch (error) {
        console.error("Error al verificar permisos:", error);
        setIsAdmin(false);
      }
    };

    if (auth) {
      verificarPermisos();
    } else {
      setIsAdmin(false);
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img height="100px" width="100px" src="/images/logo.jpg" alt="Logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/retos")}>
                  INICIO
                </button>
              </li>
              
              {auth && (
                <button 
                  onClick={() => navigate("/perfil")} 
                  style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                >
                  Perfil
                </button>
              )}
              
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/apartado-artistico")}>
                  APARTADO ARTÍSTICO
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/ranking-semanal")}>
                  RANKING SEMANAL
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/agregar-reto")}>
                  Agregar un nuevo reto
                </button>
              </li>

              {/* Solo mostrar el botón de retos-respuestas si el usuario es admin */}
              {isAdmin && (
                <li className="nav-item">
                  <button className="nav-link" onClick={() => navigate("/retos-respuestas")}>
                    Vista protegida de admin
                  </button>
                </li>
              )}

              <li className="nav-item">
                <span className="navbar-text"></span>
              </li>
            </ul>
          </div>
          
          {!auth ? (
            <button 
              onClick={handleLogin} 
              style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
            >
              Iniciar Sesión
            </button>
          ) : (
            <button 
              onClick={handleLogout} 
              style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;