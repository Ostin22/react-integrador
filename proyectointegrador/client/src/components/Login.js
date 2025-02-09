import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AuthStyles.css";

const Login = ({ setAuth }) => {
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();  

    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        nombre_usuario,
        contraseña
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        alert('Login exitoso!');
        setAuth(true);  
        navigate('/retos');  
      } else {
        alert('Error en el login: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error de login:', error);
      alert('Error al conectar al servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
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
