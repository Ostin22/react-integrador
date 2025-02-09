import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MostrarDibujosPoemas.css';
import { FaEye } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

const MostrarDibujosPoemas = () => {
  const navigate = useNavigate();
  const [poemas, setPoemas] = useState([]);
  const [dibujos, setDibujos] = useState([]);

  useEffect(() => {
      const fetchPoemas = async () => {
          try {
              const response = await fetch(`${API_URL}/poemas/obtenerpoemas`);
              const data = await response.json();
              setPoemas(data);
          } catch (error) {
              console.error('Error al obtener los poemas:', error);
          }
      };

      fetchPoemas();
  }, []);

  useEffect(() => {
      const fetchDibujos = async () => {
          try {
              const response = await fetch(`${API_URL}/dibujos/obtenerdibujos`);
              const data = await response.json();
              console.log('Dibujos recibidos:', data);
              setDibujos(data);
          } catch (error) {
              console.error('Error al obtener los dibujos:', error);
          }
      };

      fetchDibujos();
  }, []);
  const getImageUrl = (imagenUrl) => {
    return `${API_URL}${imagenUrl}`;
};

  return (
      <div className="contenedor-principal">
          <h2>Dibujos y Poemas Creados por los Usuarios</h2>
          <h2 className='subtituloPoemasDibujos'>Poemas Ecologicos</h2>
          <div className="poemas-grid">
              {poemas.map((poema) => (
                  <div key={poema.id} className="poema-card">
                      <h3 className="poema-titulo">{poema.titulo_poema}</h3>
                      <p className="poema-autor">
                          Creado por: {poema.Usuario?.nombre_usuario || 'Usuario desconocido'}
                      </p>
                      <p className="poema-fecha">
                          {new Date(poema.fecha_subida).toLocaleDateString()}
                      </p>
                      <button className='boton-visualizacion' onClick={() => navigate('/')}>
                          <FaEye />
                      </button>
                  </div>
              ))}
          </div>
          <h2 className='subtituloPoemasDibujos'>Dibujos Ecologicos</h2>
          <div className="dibujos-grid">
                {dibujos.map((dibujo) => (
                    <div key={dibujo.id} className="dibujos-card">
                        {dibujo.imagenUrl && (
                            <div className="imagen-container">
                                <img 
                                    src={getImageUrl(dibujo.imagenUrl)}
                                    alt={dibujo.nombre_dibujo}
                                    className="dibujo-imagen"
                                    onError={(e) => {
                                        console.error('Error al cargar la imagen:', dibujo.imagenUrl);
                                        e.target.onerror = null;
                                        e.target.src = '/placeholder.png'; 
                                    }}
                                />
                            </div>
                        )}
                        <div className="dibujo-info">
                            <h3 className="dibujos-titulo">{dibujo.nombre_dibujo}</h3>
                            <p className="dibujos-autor">
                                Creado por: {dibujo.Usuario?.nombre_usuario || 'Usuario desconocido'}
                            </p>
                            <p className="dibujos-fecha">
                                {new Date(dibujo.fecha_subida).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostrarDibujosPoemas;