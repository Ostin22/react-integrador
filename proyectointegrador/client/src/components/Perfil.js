import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para realizar esta acción");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:4000/auth/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener perfil", error);
      }
    };

    fetchPerfil();
  }, [navigate]);

  return usuario ? (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-titulo">Perfil de {usuario.nombre}</h2>
        <div className="perfil-info">
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Puntos:</strong> {usuario.puntos}</p>
        </div>
        <button className="perfil-boton" onClick={() => navigate("/retos")}>Volver a Retos</button>
      </div>
    </div>
  ) : (
    <p className="perfil-cargando">Cargando perfil...</p>
  );
};

export default Perfil;
