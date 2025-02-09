const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./models/config/database");
require('dotenv').config(); 
const path = require('path');

/*Inicializar Express*/
const app = express();

/*Importar rutas*/
const retoRoutes = require("./routes/retoRoutes");
const dibujoRoutes = require("./routes/dibujoRoutes");
const poemaRoutes = require("./routes/poemaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const retosRespuestasRoutes = require("./routes/retosrespuestasRoutes");

/*Conecta las peticiones del front con el back*/ 
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001", ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
};
app.use(cors(corsOptions));


/*Configuración de variables de entorno*/
dotenv.config();

/*Middlewares*/
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/*Rutas*/

app.use("/retos", retoRoutes);
app.use("/dibujos", dibujoRoutes);
app.use("/poemas", poemaRoutes);
app.use("/respuestas", retosRespuestasRoutes);

/*Ruta de autenticacion*/ 
app.use('/auth', usuarioRoutes);

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`[${Object.keys(middleware.route.methods).join(",").toUpperCase()}] ${middleware.route.path}`);
    }
});

/*Manejador de rutas no encontradas*/
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});


sequelize.sync({ alter: true })
    .then(() => {
        console.log("Base de datos sincronizada correctamente");
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error("Error al sincronizar la base de datos:", error));

app.use((err, req, res, next) => {
    res.status(500).json({ error: "Error interno del servidor" });
});
    