const Dibujo = require("../models/dibujo");
const Usuario = require("../models/usuario"); 
const path = require("path");
const sequelize = require("../models/config/database")

exports.agregarDibujo = async (req, res) => {
    console.log("Inicio del controlador agregarDibujo");
    try {
      console.log("Datos iniciales del cuerpo de la solicitud:", req.body);
  
      const { nombre_dibujo, puntos_dibujo, usuario_id } = req.body;
  
      // Verificar si se subió una imagen
      if (!req.file) {
        console.log("No se subió ninguna imagen.");
        return res.status(400).json({ error: "No se subió ninguna imagen" });
      }
  
      console.log("Datos de la imagen recibida (req.file):", req.file);
      console.log("Datos del cuerpo después de extraer:", { nombre_dibujo, puntos_dibujo, usuario_id });
  
      // Verificar si el usuario existe
      console.log(`Buscando usuario con ID: ${usuario_id}`);
      const usuario = await Usuario.findByPk(usuario_id);
      if (!usuario) {
        console.log(`Usuario con ID ${usuario_id} no encontrado.`);
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      console.log("Usuario encontrado:", usuario);
  
      // Asignar valor por defecto a puntos_dibujo si no se proporciona
      let puntos = puntos_dibujo;
      if (!puntos) {
        console.log("No se proporcionaron puntos, consultando el valor por defecto...");
        const [resultado] = await sequelize.query(
          "SELECT valornumerico FROM catalogos WHERE tipo = 'PUNTOS'"
        );
        if (resultado.length === 0) {
          console.log("No se encontró el valor de los puntos para dibujos.");
          return res.status(500).json({ error: "No se encontró el valor de los puntos para dibujos" });
        }
        puntos = resultado[0].valornumerico;
        console.log("Valor de puntos obtenido:", puntos);
      }
  
      // Ruta donde la imagen se guardará
      const imagen = `/public/imageuploadsdibujos/${req.file.filename}`;
      console.log("Ruta de imagen a guardar:", imagen);
  
      // Fecha actual
      const fecha_subida = new Date();
      console.log("Fecha de subida:", fecha_subida);
  
      // Guardar dibujo en la base de datos
      console.log("Preparando para crear el dibujo en la base de datos...");
      const nuevoDibujo = await Dibujo.create({
        nombre_dibujo,
        imagen,
        puntos_dibujo: puntos || 0,
        fecha_subida,
        usuario_id,
      });
  
      console.log("Nuevo dibujo guardado en la base de datos:", nuevoDibujo);
      res.status(201).json({ message: "Dibujo guardado con éxito", dibujo: nuevoDibujo });
    } catch (error) {
      console.error("Error al subir el dibujo:", error);
      res.status(500).json({ error: "Error al subir el dibujo" });
    }
  };
  

exports.obtenerTodosLosDibujos = async (req, res) => {
try {
    const dibujos = await Dibujo.findAll({
        include: {
          model: Usuario,
          attributes: ["id", "nombre_usuario", "email"]
        }
    });
    const dibujosConRutas = dibujos.map(dibujo => {
      const dibujoData = dibujo.get({ plain: true });
      return {
          ...dibujoData,
          imagenUrl: dibujoData.imagen ? `${dibujoData.imagen}` : null
      };
  });

    console.log("Dibujos obtenidos:", dibujosConRutas);
    res.json(dibujosConRutas);
}catch (error) {
  console.error("Error al obtener los dibujos:", error);
  res.status(500).json({ error: "Error al obtener los dibujos" });
}
};
