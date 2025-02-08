import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';  // Asegúrate de que la ruta al archivo es correcta

const SubirPoema = () => {
  const [titulo_poema, setTitulo] = useState("");
  const [rima, setContenido] = useState("");
  const { authToken } = useAuth(); // Correct usage of useAuth inside the component

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!authToken) {
        alert('No estás autenticado');
        return;
    }

    const usuario_id = jwtDecode(authToken).id;
    const poemaData = {
      titulo_poema,
      rima,
      usuario_id  // Assuming you want to send this to the server
    };

    try {
      const response = await fetch("http://localhost:4000/poemas/agregarpoema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(poemaData),
      });

      if (response.ok) {
        alert("Poema subido correctamente!");
    } else {
        try {
            const responseData = await response.json();
            alert("Error al subir el poema: " + (responseData.error || "Error desconocido"));
        } catch (error) {
            console.error("Error al procesar la respuesta:", error);
            alert("Error al subir el poema: Error desconocido");
        }
    }    
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={titulo_poema} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
      <textarea value={rima} onChange={(e) => setContenido(e.target.value)} placeholder="Escribe tu poema aquí..." required />
      <button type="submit">Subir Poema</button>
    </form>
  );
};

export default SubirPoema;
