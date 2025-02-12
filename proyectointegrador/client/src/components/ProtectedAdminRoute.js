import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedAdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verificarPermisos = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
        const response = await axios.get(`${API_URL}/auth/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsAdmin(response.data.permiso_id === 2);
        setLoading(false);
      } catch (error) {
        console.error("Error al verificar permisos:", error);
        setLoading(false);
      }
    };

    verificarPermisos();
  }, [token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/acceso-denegado" />;
  }

  return children;
};


export default ProtectedAdminRoute;