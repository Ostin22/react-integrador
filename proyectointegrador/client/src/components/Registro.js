import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AuthStyles.css"; // Importa los estilos CSS

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/registro", {
        nombre,
        email,
        password,
      });
      if (response.status === 201) {
        alert("Registro exitoso. Por favor, inicia sesión.");
        navigate("/login");
      }
    } catch (error) {
      alert("Error en el registro");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro</h2>
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
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
          <button type="submit">Registrarse</button>
        </form>
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;