const RetosRespuestas = require("../models/retosRespuestas");
const Usuario = require("../models/usuario");
const Reto = require("../models/reto");
const sequelize = require("../models/config/database");
const multer = require('multer');
const path = require('path');
const { QueryTypes } = require('sequelize');
const fs = require("fs");

const uploadPath = path.join(__dirname, "../uploads/retos-respuestas");
const ESTADO_PENDIENTE_ID = 4; /* Asume que en catalogos el ID 1 es para "pendiente" */
const ESTADO_APROBADO_ID = 5;  /* Asume que en catalogos el ID 2 es para "aprobado" */
const ESTADO_RECHAZADO_ID = 6;

/* Verificar si la carpeta existe, si no, la crea*/
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Carpeta creada:", uploadPath);
}

/* Configuración de multer para subida de imágenes */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/retos-respuestas/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Solo se permiten archivos de imagen"));
    }
  }).single('imagen_usuario');
  

  
/* Controlador para subir una nueva respuesta a un reto */
const subirRespuestaReto = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ type: "error", message: err.message });
    }

    try {
      const { reto_id, descripcion, usuario_id } = req.body;

      const respuestaExistente = await RetosRespuestas.findOne({ where: { reto_id, usuario_id } });
      if (respuestaExistente) {
        return res.status(400).json({ type: "error", message: "Ya has subido una respuesta para este reto." });
      }

      const nuevaRespuesta = await RetosRespuestas.create({
        usuario_id,
        reto_id,
        imagen_usuario: req.file.path,
        descripcion,
        fecha_subida: new Date(),
        estado_id: ESTADO_PENDIENTE_ID,
      });

      res.status(201).json({ type: "success", message: "Respuesta al reto subida exitosamente", data: nuevaRespuesta });
    } catch (error) {
      console.error("Error al subir respuesta:", error);
      res.status(500).json({ type: "error", message: "Error al procesar la respuesta al reto" });
    }
  });
};

exports.obtenerRespuestasPendientes = async (req, res) => {
    try {
      const estados = await obtenerEstadosIds();
      
      const respuestas = await RetosRespuestas.findAll({
        where: { estado_id: estados['pendiente'] },
        include: [
          {
            model: Usuario,
            attributes: ['nombre_usuario', 'nombre', 'apellido']
          },
          {
            model: Reto,
            attributes: ['nombre', 'descripcion', 'puntos_retos']
          }
        ],
        order: [['fecha_subida', 'DESC']]
      });
  
      res.json(respuestas);
    } catch (error) {
      console.error('Error al obtener respuestas:', error);
      res.status(500).json({ message: "Error al obtener las respuestas" });
    }
  };

  const obtenerRespuestasPendientes = async (req, res) => {
    try {
      const respuestas = await RetosRespuestas.findAll({
        where: { estado_id: ESTADO_PENDIENTE_ID },
        include: [
          {
            model: Usuario,
            attributes: ['nombre_usuario', 'nombre', 'apellido']
          },
          {
            model: Reto,
            attributes: ['nombre', 'descripcion', 'puntos_retos']
          }
        ],
        order: [['fecha_subida', 'DESC']]
      });
  
      res.json(respuestas);
    } catch (error) {
      console.error('Error al obtener respuestas:', error);
      res.status(500).json({ message: "Error al obtener las respuestas" });
    }
  };
  
  /* Procesa la respuesta (aprobar o rechazar) */
  const procesarRespuesta = async (req, res) => {
    const { id, accion } = req.body;
  
    try {
      const respuesta = await RetosRespuestas.findByPk(id, {
        include: [{ model: Reto }, { model: Usuario }],
      });
  
      if (!respuesta) {
        return res.status(404).json({ type: "error", message: "Respuesta no encontrada" });
      }
  
      if (accion === "aprobar") {
        await Usuario.increment({ puntos: respuesta.Reto.puntos_retos }, { where: { id: respuesta.usuario_id } });
        await respuesta.update({ estado_id: ESTADO_APROBADO_ID });
        return res.json({ type: "success", message: "Respuesta aprobada y puntos asignados" });
      } else if (accion === "rechazar") {
        await respuesta.update({ estado_id: ESTADO_RECHAZADO_ID });
        return res.json({ type: "success", message: "Respuesta rechazada" });
      } else {
        return res.status(400).json({ type: "error", message: "Acción no válida" });
      }
    } catch (error) {
      console.error("Error al procesar respuesta:", error);
      res.status(500).json({ type: "error", message: "Error al procesar la respuesta" });
    }
  };
  
  module.exports = {
    subirRespuestaReto,
    obtenerRespuestasPendientes,
    procesarRespuesta
  };
  