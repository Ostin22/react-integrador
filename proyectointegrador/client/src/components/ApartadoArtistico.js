import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApartadoArtistico.css';

const API_URL = process.env.REACT_APP_API_URL;

const ApartadoArtistico = () => {
  const navigate = useNavigate();
  return (
    <div className="apartado-artistico">
      <h2>Apartado Artístico</h2>
      <p>Selecciona que tipo de obra quieres compartir con nosotros!</p>
      
      <div className="opciones-artisticas">
        <button 
          className="opcion-btn dibujo"
          onClick={() => navigate('/subir-dibujo')}
        >
          <span className="icono">🎨</span>
          <h3>Subir Dibujo</h3>
          <p>Comparte tus creaciones visuales con la comunidad</p>
        </button>

        <button 
          className="opcion-btn poema"
          onClick={() => navigate('/subir-poema')}
        >
          <span className="icono">📝</span>
          <h3>Escribir Poema</h3>
          <p>Puedes expresar tus sentimientos por medio de un poema</p>
        </button>

        <button 
          className="opcion-btn poema"
          onClick={() => navigate('/poemas-dibujos')}
        >
          <span className="icono"></span>
          <h3>Escribir Poema</h3>
          <p>Puedes expresar tus sentimientos por medio de un poema</p>
        </button>
      </div>
    </div>
  );
};


export default ApartadoArtistico;