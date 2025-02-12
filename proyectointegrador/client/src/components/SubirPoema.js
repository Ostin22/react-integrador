import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SubirPoema.css';

const SubirPoema = () => {
  const [titulo_poema, setTitulo] = useState('');
  const [rima, setContenido] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [mensaje, setMensaje] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMensaje({ type: 'error', text: 'Debes iniciar sesión para realizar esta acción' });
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
      setMensaje({ type: 'error', text: 'Error en la autenticación del usuario' });
      return;
    }

    const poemaData = {
      titulo_poema,
      rima,
      usuario_id: usuarioId,
    };

    try {
      const response = await axios.post('http://localhost:4000/poemas/agregarpoema', poemaData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.type === 'success') {
        setMensaje({ type: 'success', text: response.data.message });
        setTimeout(() => navigate('/apartado-artistico'), 2000);
      } else {
        setMensaje({ type: 'error', text: response.data.message });
      }
    } catch (error) {
      console.error('Error al subir el poema:', error);
      setMensaje({
        type: 'error',
        text: error.response ? error.response.data.message || 'Error del servidor' : 'Error de conexión',
      });
    }
  };

  return (
    <div className="container-subir-poema">
      <form onSubmit={handleSubmit} className="poema-form">
        {mensaje.text && <div className={`mensaje ${mensaje.type}`}>{mensaje.text}</div>}
        <input
          type="text"
          value={titulo_poema}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          required
          className="poema-input"
        />
        <textarea
          value={rima}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe tu poema aquí..."
          required
          className="poema-textarea"
        />
        <button type="submit" className="poema-button">Subir Poema</button>
      </form>
    </div>
  );
}

export default SubirPoema;
