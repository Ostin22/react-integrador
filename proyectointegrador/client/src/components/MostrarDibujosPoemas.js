import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MostrarDibujosPoemas.css';
import { FaEye } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

const MostrarDibujosPoemas = ()=>{
    const navigate = useNavigate();
    const [poemas, setPoemas] = useState([]);
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
    return(
    <>
        <h2>Dibujos y Poemas Creados por los Usuarios</h2>
          <div className="poemas-grid">
            {poemas.map((poema) => (
              <div key={poema.id} className="poema-card">
              <h3 className="poema-titulo">{poema.titulo_poema}</h3>
              <p className="poema-autor">Creado por: {poema.Usuario?.nombre_usuario || 'Usuario desconocido'}</p>
              <p className="poema-fecha">{new Date(poema.fecha_subida).toLocaleDateString()}</p>
              <button className='boton-visualizacion' onClick={() => navigate('/')}><FaEye /></button>
          </div>
            ))}
          </div>
    </>
    )
}
export default MostrarDibujosPoemas