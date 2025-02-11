import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarReto.css"; // Archivo de estilos

function AgregarReto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [puntos_retos, setPuntos] = useState("");
  const [mensaje, setMensaje] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const guardarDatos = async () => {
    if (!nombre || !descripcion || !puntos_retos) {
      setMensaje({ type: "error", text: "Todos los campos son obligatorios" });
      return;
    }

    const body = { nombre, descripcion, puntos_retos };

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/retos/agregarreto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMensaje({ type: "success", text: "Reto guardado exitosamente" });
        setTimeout(() => navigate("/retos"), 2000);
        setNombre("");
        setDescripcion("");
        setPuntos("");
      } else {
        const errorData = await response.json();
        setMensaje({ type: "error", text: errorData.message || "Error al guardar el reto" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje({ type: "error", text: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className="form-container">
      <form className="subir-prueba-form">
        <h2>Agregar Reto</h2>
        {mensaje.text && <div className={`mensaje ${mensaje.type}`}>{mensaje.text}</div>}
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del reto"
          required
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del reto"
          required
        />
        <input
          type="number"
          value={puntos_retos}
          onChange={(e) => setPuntos(e.target.value)}
          placeholder="Puntos del reto"
          required
        />
        <button type="button" onClick={guardarDatos}>
          Guardar Reto
        </button>
      </form>
    </div>
  );
}

export default AgregarReto;
