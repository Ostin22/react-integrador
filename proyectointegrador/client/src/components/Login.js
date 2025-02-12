import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AuthStyles.css";

const Login = ({ setAuth }) => {
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", { nombre_usuario, contraseña });

      setMensaje({ type: response.data.type, text: response.data.message });

      if (response.data.type === "success") {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        setTimeout(() => navigate("/retos"), 2000);
      }
    } catch (error) {
      setMensaje({ type: "error", text: "Error de Login: Nombre de usuario o Contraseña Incorrecta" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {mensaje.text && <div className={`mensaje ${mensaje.type}`}>{mensaje.text}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={nombre_usuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
