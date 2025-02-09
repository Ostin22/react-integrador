// AccesoDenegado.js
import React from 'react';
import { Link } from 'react-router-dom';

const AccesoDenegado = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
      <p className="mb-4">No tienes los permisos necesarios para acceder a esta página.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Volver al inicio
      </Link>
    </div>
  );
};

export default AccesoDenegado;