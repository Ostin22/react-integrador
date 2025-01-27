import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
                <Link className="nav-link" to="/retos">INICIO</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/apartado-artistico">APARTADO ARTÍSTICO</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ranking-semanal">RANKING SEMANAL</Link>
              </li>
              <li className="nav-item">
                <span className="navbar-text">Puntaje Obtenido:</span>
              </li>
            </ul>
          </div>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/logout">Cerrar Sesión</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
