import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AuthStyles.css"; // Importa los estilos CSS

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setAuth(true);
      navigate("/retos");
    } catch (error) {
      alert("Error en el login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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