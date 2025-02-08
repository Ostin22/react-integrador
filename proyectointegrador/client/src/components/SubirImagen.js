import { useState } from "react";

const SubirImagen = () => {
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("titulo", titulo);

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/api/dibujos/agregardibujo`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Imagen subida correctamente!");
      } else {
        alert("Error al subir la imagen.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Título" onChange={(e) => setTitulo(e.target.value)} required />
      <input type="file" onChange={(e) => setImagen(e.target.files[0])} required />
      <button type="submit">Subir Imagen</button>
    </form>
  );
};

export default SubirImagen;
