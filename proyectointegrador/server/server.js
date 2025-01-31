let cors = require('cors');
const sequelize = require("./models/database.js");
const express = require("express");
const dotenv = require("dotenv");
const retoRoutes = require("./routes/retoRoutes.js");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/retos", retoRoutes);

// Conectar a la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

