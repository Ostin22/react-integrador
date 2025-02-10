import './RankingSemanal.css';
import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const RankingSemanal = () => {
  const [ranking, setRanking] = useState([]);
  useEffect(() => {
      const fetchRanking = async () => {
        try {
          const response = await fetch(`${API_URL}/auth/ranking`);
          const data = await response.json();
          setRanking(data);
        } catch (error) {
          console.error('Error al obtener los usuarios para el ranking:', error);
        }
      };
  
      fetchRanking();
    }, []);

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">Ranking Semanal</h2>
      <p className="ranking-subtitle">¡Compite y gana puntos eco!</p>
      
      <div className="ranking-list">
        {ranking.map((rankings, index) => (
          <div key={rankings.id} className="ranking-card">
            <div className="user-header">
              <span className="position">{index + 1}</span>
              <span className="username">{rankings.nombre_usuario}</span>
            </div>
            
            <div className="user-details">
              <div className="points">{rankings.puntos} pts</div>
              <div className="streak">
                <span role="img" aria-label="fire">🔥</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingSemanal;