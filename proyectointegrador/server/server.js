let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();
let RetosRoutes = require('../server/routes/retoRoutes');
let path = require('path');
//Usar los archivos estaticos de las views en el front

let port = 3000;
const reactPort = 3001;


const corsOptions = {
    origin: 'http://localhost:${reactPort}',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization'],
    credentials: true,

};
app.use(cors(corsOptions));



//Funcion para conectar la base de datos
async function connectDB(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/challenge', {useNewUrlParser: true, useUnifiedTopology: true})
    } catch (error) {
        console.error('Existe un error al conectar la base de datos', error),
        process.exit(1);
    }
}

connectDB();


//Activa cors para poder comunicar el front con la api del backend


//analiza (parsea) los cuerpos de las solicitudes HTTP con formato JSON y los convierte en un objeto JavaScript accesible desde req.body.
app.use(express.json());

//Pone el prefijo /retos a cualquier ruta importada de 'RetosRoutes'
app.use('/retos', RetosRoutes);

//Empezar el servidor

app.listen(port, ()=>{
    console.log('El servidor esta corriendo en el puerto:', port)
})


