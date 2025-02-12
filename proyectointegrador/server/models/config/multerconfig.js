const multer = require("multer"); /* maneja la carga de archivos en aplicaciones web, normalmente en combinación con Express.*/
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../../public/imageuploadsdibujos");

/* Verifica si la carpeta existe, si no, la crea */
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("Carpeta creada:", uploadPath);
}

/*Configuración del almacenamiento de las imagenes*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/imageuploadsdibujos/"); /*Carpeta donde se guardarán las imágenes*/
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix); /* Genera un nombre único para cada imagen*/
    }
});

/* Filtro para aceptar solo imágenes */
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error("Formato de imagen no válido. Solo se permiten JPEG, JPG, PNG y GIF."));
    }
};

/* Limita el tamaño de archivos (5MB) */
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } /*calcula 5mb*/
});

module.exports = upload;


