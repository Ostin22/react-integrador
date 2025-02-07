const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./models/config/database");

/*Importar rutas*/
const retoRoutes = require("./routes/retoRoutes");
const dibujoRoutes = require("./routes/dibujoRoutes");
const poemaRoutes = require("./routes/poemaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const retosRespuestasRoutes = require("./routes/retosrespuestasRoutes");
const rankingRoutes = require("./routes/rankingRoutes")
/*Configuración de variables de entorno*/
dotenv.config();

/*Inicializar Express*/
const app = express();

/*Middlewares*/
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public")); 

/*Rutas*/
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/retos", retoRoutes);
app.use("/api/dibujos", dibujoRoutes);
app.use("/api/poemas", poemaRoutes);
app.use("/api/respuestas", retosRespuestasRoutes);
app.use("/api/ranking", rankingRoutes);
/*Conectar a la base de datos y levantar servidor*/
sequelize.sync({ alter: true })
    .then(() => {
        console.log("Base de datos sincronizada correctamente");
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error("Error al sincronizar la base de datos:", error));

