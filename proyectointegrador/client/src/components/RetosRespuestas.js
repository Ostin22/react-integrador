import React, { useState, useEffect } from "react";
import axios from "axios";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import "./RetosRespuestas.css";

const RetosRespuestas = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState({ type: "", text: "" });
  const API_URL = process.env.REACT_APP_API_URL;

  const cargarRespuestas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/respuestas/pendientes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRespuestas(response.data);
    } catch (error) {
      console.error("Error:", error);
      setMensaje({ type: "error", text: "Error al cargar las respuestas" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRespuestas();
  }, []);

  const procesarRespuesta = async (id, accion) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/respuestas/procesar`,
        { id, accion },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje({ type: response.data.type, text: response.data.message });
      cargarRespuestas();
    } catch (error) {
      console.error("Error:", error);
      setMensaje({ type: "error", text: "Error al procesar la respuesta" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Retos y Respuestas Pendientes</h1>
      {mensaje.text && <div className={`mensaje ${mensaje.type}`}>{mensaje.text}</div>}
      {loading ? (
        <p>Cargando respuestas...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {respuestas.map((respuesta) => (
            <div key={respuesta.id} className="border rounded p-4">
              <h3 className="font-bold">{respuesta.Reto.nombre}</h3>
              <p className="text-sm text-gray-600">Usuario: {respuesta.Usuario.nombre_usuario}</p>
              <p className="mt-2">{respuesta.descripcion}</p>
              <img
                src={`${API_URL}/${respuesta.imagen_usuario}`}
                alt="Prueba del reto"
                className="mt-2 w-full rounded"
              />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => procesarRespuesta(respuesta.id, "aprobar")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => procesarRespuesta(respuesta.id, "rechazar")}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ProtectedRetosRespuestas() {
  return (
    <ProtectedAdminRoute>
      <RetosRespuestas />
    </ProtectedAdminRoute>
  );
}
