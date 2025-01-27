import React, { useState } from 'react';

function AgregarReto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [puntos, setPuntos] = useState('');

  const guardarDatos = async () => {
    if (!nombre || !descripcion || !puntos) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const body = { nombre, descripcion, puntos }; // Define el objeto body correctamente

    try {
      const response = await fetch('http://localhost:3000/retos/agregarreto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), // Convierte el objeto body a JSON
        
      });

      if (response.ok) {
        alert('Reto guardado exitosamente');
        setNombre('');
        setDescripcion('');
        setPuntos('');
      } else {
        alert('Error al guardar el reto');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="container">
      <h1 id="titulo">Agregar reto</h1>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del reto"
      />
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción del reto"
      />
      <input
        type="text"
        value={puntos}
        onChange={(e) => setPuntos(e.target.value)}
        placeholder="Puntos del reto"
      />
      <button onClick={guardarDatos}>Guardar Reto</button>
    </div>
  );
}

export default AgregarReto;
