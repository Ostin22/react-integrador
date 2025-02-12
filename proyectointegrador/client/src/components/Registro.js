import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AuthStyles.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
  });
  const [mensaje, setMensaje] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/agregarusuario", formData);
      setMensaje({ type: response.data.type, text: response.data.message });

      if (response.data.type === "success") {
        setMensaje({ type: "success", text: "Registro exitoso. Redirigiendo al login..." });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.message === "Solo usuarios de la PUCE pueden registrarse") {
        setMensaje({ type: "error", text: error.response.data.message });
      } else {
        setMensaje({ type: "error", text: "Error en el registro" });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro</h2>
        {mensaje.text && <div className={`mensaje ${mensaje.type}`}>{mensaje.text}</div>}
        <form onSubmit={handleRegistro}>
          {["nombre_usuario", "nombre", "apellido", "email", "contraseña"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : field === "contraseña" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          ))}
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
