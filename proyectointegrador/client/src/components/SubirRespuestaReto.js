import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SubirRespuestaReto.css"; 

const SubirRespuestaReto = () => {
  const [imagen, setImagen] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [mensaje, setMensaje] = useState({ type: "", text: "" });
  const { retoId } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMensaje({ type: "error", text: "Debes iniciar sesión para realizar esta acción" });
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/auth/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarioId(response.data.id);
      } catch (error) {
        console.error("Error al obtener la ID del usuario", error);
      }
    };

    fetchUser();
  }, [navigate, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!usuarioId) {
      setMensaje({ type: "error", text: "Error en la autenticación del usuario" });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("imagen_usuario", imagen);
    formData.append("descripcion", descripcion);
    formData.append("reto_id", retoId);
    formData.append("usuario_id", usuarioId);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/respuestas/subir`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.type === "success") {
        setMensaje({ type: "success", text: response.data.message });
        setTimeout(() => navigate("/retos"), 2000);
      } else {
        setMensaje({ type: "error", text: response.data.message });
      }
    } catch (error) {
      console.error("Error al subir la respuesta:", error);
      setMensaje({
        type: "error",
        text: error.response ? error.response.data.message || "Error del servidor" : "Error de conexión.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Subir Prueba del Reto</h2>
      {mensaje.text && <div className={`mensaje ${mensaje.type}`}>{mensaje.text}</div>}
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
          {loading ? "Enviando..." : "Enviar Respuesta"}
        </button>
      </form>
    </div>
  );
};

export default SubirRespuestaReto;
