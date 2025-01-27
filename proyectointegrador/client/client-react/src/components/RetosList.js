import React, { useState, useEffect } from 'react';
import "./RetosList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

function RetosList() {
  const [retos, setRetos] = useState([]);

  useEffect(() => {
    const fetchRetos = async () => {
      try {
        const response = await fetch('http://localhost:3000/retos/api/todos');
        const data = await response.json();
        setRetos(data);
      } catch (error) {
        console.error('Error al obtener los retos:', error);
      }
    };

    fetchRetos();
  }, []);

    // Configuración del carrusel
  const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
    };


  return (
    <div>

    
        <div id="todosLosRetos">
          <Slider {...sliderSettings} className="slider">
            <div>
              <img src="/static/paisaje1.jpg" alt="Paisaje 1" />
            </div>
            <div>
              <img src="/static/paisaje2.jpg" alt="Paisaje 2" />
            </div>
            <div>
              <img src="/static/paisaje3.jpg" alt="Paisaje 3" />
            </div>
          </Slider>
          <h2 id="tituloPagina">Todos los retos</h2>
          <div className="retos-grid">
            {retos.map((reto) => (
              <div key={reto.id} className="reto-card">
                <h3 className="reto-titulo">{reto.nombre}</h3>
                <p className="reto-descripcion">{reto.descripcion}</p>
                <p className="reto-puntos">Puntos: {reto.puntos}</p>
                <a href="#" className="reto-enlace">Cumple el reto</a>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}


export default RetosList;
