import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SubirRespuestaReto = () => {
  const [imagen, setImagen] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null); // Estado para almacenar el usuario_id
  //Toma el id del reto desde la url de App.
  const { retoId } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Obtener el usuario_id desde el perfil del usuario
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para realizar esta acción');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/auth/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarioId(response.data.id); // Guardar el usuario_id en el estado
      } catch (error) {
        console.error('Error al obtener la ID del usuario', error);
      }
    };

    fetchUser();
  }, [navigate, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!usuarioId) {
      alert('Error en la autenticación del usuario');
      setLoading(false);
      return;
    }

    console.log("Form Data antes de enviar:");
    const formData = new FormData();
    formData.append('imagen_usuario', imagen);
    formData.append('descripcion', descripcion);
    formData.append('reto_id', retoId);
    formData.append('usuario_id', usuarioId); // Incluir el usuario_id en el FormData

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token);

      const response = await axios.post(`${API_URL}/respuestas/subir`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log("Respuesta del servidor:", response.data);
      alert('¡Respuesta enviada con éxito!');
      navigate('/retos');
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      alert('Error al subir la respuesta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Subir Prueba del Reto</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Imagen de prueba:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Enviando...' : 'Enviar Respuesta'}
        </button>
      </form>
    </div>
  );
};

export default SubirRespuestaReto;