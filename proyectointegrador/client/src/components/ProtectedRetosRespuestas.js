// RetosRespuestas.js
import React from 'react';
import ProtectedAdminRoute from './ProtectedAdminRoute';

const RetosRespuestas = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Retos y Respuestas</h1>
      {/* Contenido del componente */}
    </div>
  );
};

const ProtectedRetosRespuestas = () => {
  return (
    <ProtectedAdminRoute>
      <RetosRespuestas />
    </ProtectedAdminRoute>
  );
};

export default ProtectedRetosRespuestas;