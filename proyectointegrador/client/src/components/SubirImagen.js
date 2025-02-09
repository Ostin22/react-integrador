import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SubirImagen = () => {
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [usuarioId, setUsuarioId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", localStorage.getItem("token"));

      if (!token) {
        alert("Debes iniciar sesión para realizar esta acción");
        return;
      }
      try {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
        const response = await axios.get(`${API_URL}/auth/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarioId(response.data.id);
      } catch (error) {
        console.error("Error al obtener la ID del usuario", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen || !titulo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("nombre_dibujo", titulo);
    formData.append("usuario_id", usuarioId);

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const response = await axios.post(`${API_URL}/dibujos/agregardibujo`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        alert("Imagen subida correctamente!");
        navigate('/apartado-artistico');
      } else {
        alert(`Error al subir la imagen: ${response.data.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      if (error.response) {
        alert(`Error del servidor: ${error.response.data.message || error.response.data.error}`);
      } else {
        alert("Error de conexión.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setImagen(e.target.files[0])} required />
      <button type="submit">Subir Imagen</button>
    </form>
  );
};

export default SubirImagen;
