import React, { useState } from 'react';
import './RankingSemanal.css';

const RankingSemanal = () => {
  const [rankings] = useState([
    { id: 1, username: "Felipe Cepeda", points: 2500, avatar: "🌳", streak: 15, liga: "Liga Diamante" },
    { id: 2, username: "Ricardo Carrión", points: 2350, avatar: "🌿", streak: 12, liga: "Liga Oro" },
    { id: 3, username: "Kluivert López", points: 2200, avatar: "🌱", streak: 10, liga: "Liga Oro" },
    { id: 4, username: "Shock", points: 2100, avatar: "♻️", streak: 8, liga: "Liga Plata" },
    { id: 5, username: "Silvester Stallone ", points: 1950, avatar: "🍃", streak: 7, liga: "Liga Plata" }
  ]);

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">Ranking Semanal</h2>
      <p className="ranking-subtitle">¡Compite y gana puntos eco!</p>
      
      <div className="ranking-list">
        {rankings.map((user, index) => (
          <div key={user.id} className="ranking-card">
            <div className="user-header">
              <span className="position">{index + 1}</span>
              <span className="avatar">{user.avatar}</span>
              <span className="username">{user.username}</span>
            </div>
            
            <div className="user-details">
              <div className="liga">{user.liga}</div>
              <div className="points">{user.points} pts</div>
              <div className="streak">
                <span role="img" aria-label="fire">🔥</span> {user.streak} días
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingSemanal;