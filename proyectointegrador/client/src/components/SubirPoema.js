import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubirPoema = () => {
  const [titulo_poema, setTitulo] = useState('');
  const [rima, setContenido] = useState('');
  const [usuarioId, setUsuarioId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para realizar esta acción');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/auth/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarioId(response.data.id); 
      } catch (error) {
        console.error('Error al obtener la ID del usuario', error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!usuarioId) {
        alert('Error en la autenticación del usuario');
        return;
    }

    const poemaData = {
        titulo_poema,
        rima,
        usuario_id: usuarioId,
    };

    try {
        const response = await axios.post(
            'http://localhost:4000/poemas/agregarpoema', 
            poemaData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        if (response.status >= 200 && response.status < 300) {
            alert('Poema subido correctamente!');
            navigate('/apartado-artistico');
        } else {
            alert(`Error al subir el poema: ${response.data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al subir el poema:', error);
        
        if (error.response) {
            alert(`Error al subir el poema: ${error.response.data.message || error.response.data.error || 'Error del servidor'}`);
        } else if (error.request) {
            alert('Error de conexión: No se pudo contactar con el servidor');
        } else {
            
          alert('Error al procesar la solicitud');
        }
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={titulo_poema} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
      <textarea value={rima} onChange={(e) => setContenido(e.target.value)} placeholder="Escribe tu poema aquí..." required />
      <button type="submit">Subir Poema</button>
    </form>
  );
};

export default SubirPoema;

