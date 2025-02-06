const Reto = require("../models/reto.js");

/*Controlador para agregar un nuevo reto.*/
exports.agregarReto = async (req, res) => {
    console.log('Request recibida', req.body);
    const { nombre, descripcion, puntos_retos } = req.body;

    if (!nombre || !descripcion || puntos_retos === undefined) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const reto = await Reto.create({ nombre, descripcion, puntos_retos });
        console.log('Se guardó el reto correctamente', reto);
        res.status(201).json({ message: 'El reto se ha guardado correctamente', reto });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al guardar el reto.' });
    }
};

/*Controlador para obtener todos los retos de la base de datos*/
exports.obtenerTodosLosRetos = async (req, res) => {
    try {
        const retos = await Reto.findAll();
        res.status(200).json(retos);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener los retos' });
    }
};