import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SubirImagen.css"; // Archivo de estilos

const SubirImagen = () => {
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [usuarioId, setUsuarioId] = useState(null);
  const [mensaje, setMensaje] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMensaje({ type: "error", text: "Debes iniciar sesión para realizar esta acción" });
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
      setMensaje({ type: "error", text: "Por favor, completa todos los campos." });
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

      if (response.data.type === "success") {
        setMensaje({ type: "success", text: response.data.message });
        setTimeout(() => navigate("/apartado-artistico"), 2000);
      } else {
        setMensaje({ type: "error", text: response.data.message });
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setMensaje({
        type: "error",
        text: error.response ? error.response.data.message || "Error del servidor" : "Error de conexión.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="imagen-form">
      {mensaje.text && <div className={`mensaje ${mensaje.type}`}>{mensaje.text}</div>}
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        className="imagen-input"
      />
      <input type="file" onChange={(e) => setImagen(e.target.files[0])} required className="imagen-file" />
      <button type="submit" className="imagen-button">Subir Imagen</button>
    </form>
  );
};

export default SubirImagen;
