import { useState } from "react";

const SubirPoema = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const poemaData = { titulo, contenido };

    try {
      const response = await fetch("http://localhost:4000/api/poemas/agregarpoema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poemaData),
      });

      if (response.ok) {
        alert("Poema subido correctamente!");
      } else {
        alert("Error al subir el poema.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Título" onChange={(e) => setTitulo(e.target.value)} required />
      <textarea placeholder="Escribe tu poema aquí..." onChange={(e) => setContenido(e.target.value)} required />
      <button type="submit">Subir Poema</button>
    </form>
  );
};

export default SubirPoema;
